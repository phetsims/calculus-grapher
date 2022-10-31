// Copyright 2020-2022, University of Colorado Boulder

/**
 * OriginalCurve is a Curve sub-type for the main curve that the user interacts with and manipulates, which then
 * triggers a change in the CurvePoints and the OriginalCurve's integral, derivative, and second-derivative Curves.
 *
 * OriginalCurve is mainly responsible for:
 *   - Keeping track of the current CurveManipulationMode. When the user drags on the OriginalCurve, the curve is
 *     manipulated based on the current CurveManipulationMode, allowing the user to create custom curves.
 *
 *   - Keeping track of the 'width' of the curve-manipulation. This only applies to HILL, TRIANGLE, PEDESTAL, PARABOLA,
 *     and SINE, and the value is interpreted differently for each response algorithm to curve user-manipulation.
 *
 *   - Implementing the response algorithms that are used when the user drags on the OriginalCurve. The response is
 *     affected by the CurveManipulationMode and the 'width' of the curve-manipulation. The algorithms for curve
 *     manipulation response were adapted and improved from the flash implementation of Calculus Grapher.
 *
 *   - Implementing smoothing, saving, undoing, and other interactions.
 *
 * Like Curve, OriginalCurve is created at the start and persists for the lifetime of the simulation. Links
 * are left as-is and OriginalCurves are never disposed.
 *
 * @author Brandon Li
 */

import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import CalculusGrapherQueryParameters from '../CalculusGrapherQueryParameters.js';
import Curve, { CurveOptions } from './Curve.js';
import CurveManipulationMode from './CurveManipulationMode.js';
import CurvePoint from './CurvePoint.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';

// constants
const CURVE_MANIPULATION_WIDTH_RANGE = CalculusGrapherConstants.CURVE_MANIPULATION_WIDTH_RANGE;
const STANDARD_DEVIATION = CalculusGrapherQueryParameters.smoothingStandardDeviation;
const EDGE_SLOPE_FACTOR = CalculusGrapherQueryParameters.edgeSlopeFactor;

type SelfOptions = EmptySelfOptions;

export type OriginalCurveOptions = SelfOptions & CurveOptions;

export default class OriginalCurve extends Curve {

  // the 'mode' that user is in for manipulating curves. This
  // is manipulated by the view.
  public readonly curveManipulationModeProperty: EnumerationProperty<CurveManipulationMode>;

  // the width of the curve-manipulation. This only applies to some CurveManipulationModes
  // and the value is interpreted differently for each response algorithm to curve
  // user-manipulation.
  public readonly curveManipulationWidthProperty: NumberProperty;

  public constructor( curveManipulationModeChoices: CurveManipulationMode[],
                      providedOptions: OriginalCurveOptions ) {


    const options = optionize<OriginalCurveOptions, SelfOptions, CurveOptions>()( {}, providedOptions );

    super( options );

    this.curveManipulationModeProperty = new EnumerationProperty( CurveManipulationMode.HILL, {
      validValues: curveManipulationModeChoices,
      tandem: options.tandem.createTandem( 'curveManipulationModeProperty' )
    } );

    this.curveManipulationWidthProperty = new NumberProperty( CURVE_MANIPULATION_WIDTH_RANGE.defaultValue, {
      range: CURVE_MANIPULATION_WIDTH_RANGE,
      tandem: options.tandem.createTandem( 'curveManipulationWidthProperty' )
    } );
  }

  /**
   * Gets the current CurveManipulationMode.
   *
   */
  public get curveManipulationMode(): CurveManipulationMode {
    return this.curveManipulationModeProperty.value;
  }

  /**
   * Gets the current curve-manipulation width.
   */
  public get curveManipulationWidth(): number {
    return this.curveManipulationWidthProperty.value;
  }

  /**
   * Resets the OriginalCurve.
   * Called when the reset-all button is pressed.
   */
  public reset(): void {

    this.resetCurvePoints();

    this.curveManipulationModeProperty.reset();
    this.curveManipulationWidthProperty.reset();
  }


  // reset the curve points to their initial values
  private resetCurvePoints(): void {

    // Reset every CurvePoint to its initial state.
    this.points.forEach( point => point.reset() );

    // Signal once that this Curve has changed.
    this.curveChangedEmitter.emit();
  }

  /**
   * Saves the current y-values of the Points for the next undoToLastSave() method.
   *
   * This method is invoked when the user starts manipulating the OriginalCurve. When the undo button is pressed,
   * the Points of the OriginalCurve will be set to their last saved state.
   */
  public saveCurrentPoints(): void {

    // Save the current y-value of each CurvePoint.
    this.points.forEach( point => { point.save(); } );
  }

  /**
   * Sets the y-values of this CurvedPoints of this Curve to its last saved state.
   *
   * This method is invoked when the undo button is pressed, which successively undos the last action.
   */
  public undoToLastSave(): void {

    // Revert to the saved y-value of each CurvePoint.
    this.points.forEach( point => { point.undoToLastSave(); } );

    // Signal that this Curve has changed.
    this.curveChangedEmitter.emit();
  }

  /*----------------------------------------------------------------------------*
   * Curve Manipulation Algorithms
   *----------------------------------------------------------------------------*/

  /**
   * Smooths the curve. Called when the user presses the 'smooth' button
   * This method uses a weighted-average algorithm for 'smoothing' a curve, using a gaussian kernel
   * see https://en.wikipedia.org/wiki/Kernel_smoother
   */
  public smooth(): void {

    // Save the current values of our Points for the next undoToLastSave call.
    // Note that the current y-values are the same as the previous y-values
    // for all Points in the OriginalCurve.
    this.saveCurrentPoints();

    // gaussian kernel that will be used in the convolution of our curve
    const gaussianFunction = ( x: number ) => Math.exp( -1 / 2 * ( x / STANDARD_DEVIATION ) ** 2 ) /
                                              ( STANDARD_DEVIATION * Math.sqrt( 2 * Math.PI ) );

    // Loop through each Point of the curve and set the new y-value.
    this.points.forEach( point => {

      // Flag that tracks the sum of the weighted y-values of all Points
      let weightedY = 0;
      let totalWeight = 0;

      // we want to use the kernel over a number of standard deviations
      // beyond 3 standard deviations, the kernel has a very small weight, less than 1%, so it becomes irrelevant.
      const numberOfStandardDeviations = 3;

      // Loop through each point on BOTH sides of the window, adding the y-value to our total.
      for ( let dx = -numberOfStandardDeviations * STANDARD_DEVIATION;
            dx < numberOfStandardDeviations * STANDARD_DEVIATION;
            dx += 1 / this.pointsPerCoordinate ) {

        // weight of the point
        const weight = gaussianFunction( dx );

        totalWeight += weight;

        // Add the Point's lastSavedY, which was the Point's y-value before the smooth() method was called.
        weightedY += this.getClosestPointAt( point.x + dx ).lastSavedY * weight;
      }

      // Set the Point's new y-value to the weighted average.
      point.y = weightedY / totalWeight;
    } );

    // Signal that this Curve has changed.
    this.curveChangedEmitter.emit();
  }

  /**
   * Shifts the curve to the specified drag Position.
   *
   * @param position - in model coordinates
   */
  public shiftToPosition( position: Vector2 ): void {
    assert && assert( this.curveManipulationMode === CurveManipulationMode.SHIFT );

    // Amount to shift the entire curve.
    const deltaY = position.y - this.getClosestPointAt( position.x ).y;

    // Shift each of the CurvePoints by deltaY.
    this.points.forEach( point => {
      point.y += deltaY;
    } );

    // Signal that this Curve has changed.
    this.curveChangedEmitter.emit();
  }

  /**
   * Tilts the curve to the specified drag Position.
   *
   * @param position - in model coordinates
   */
  public tiltToPosition( position: Vector2 ): void {
    assert && assert( position.x !== 0, 'x position cannot be zero' );
    assert && assert( this.curveManipulationMode === CurveManipulationMode.TILT );

    // maximum tilt converted from degrees to radians
    const maxTilt = Utils.toRadians( CalculusGrapherQueryParameters.maxTilt );

    // Find the angle of the tile, based on where the user dragged the Curve.
    const angle = Utils.clamp( Math.atan( position.y / position.x ), -maxTilt, maxTilt );

    // Amount to shift the CurvePoint closest to the passed-in position.
    const deltaY = Math.tan( angle ) * position.x - this.getClosestPointAt( position.x ).lastSavedY;

    // Shift each of the CurvePoints by a factor of deltaY.
    this.points.forEach( point => {
      point.y = point.lastSavedY + deltaY * point.x / position.x;
    } );

    // Signal that this Curve has changed.
    this.curveChangedEmitter.emit();
  }

  /**
   * Creates a smooth, continuous, and differentiable bell-shaped curve, to the passed-in peak.
   */
  public createHillAt( peak: Vector2 ): void {

    assert && assert( this.curveManipulationMode === CurveManipulationMode.HILL );

    // width of the hill
    const width = this.curveManipulationWidth;

    const closestPoint = this.getClosestPointAt( peak.x );
    assert && assert( closestPoint && closestPoint.exists, `invalid closestPoint: ${closestPoint}` );

    this.points.forEach( point => {

      const P = Math.exp( -Math.pow( ( point.x - closestPoint.x ) / ( width / ( 2 * Math.sqrt( 2 ) ) ), 2 ) );

      point.y = P * peak.y + ( 1 - P ) * point.lastSavedY;
    } );

    // Signal that this Curve has changed.
    this.curveChangedEmitter.emit();
  }

  /**
   * Creates a triangle-shaped peak that is non-differentiable where it intersects with the rest of the Curve.
   */
  public createTriangleAt( peak: Vector2 ): void {

    assert && assert( this.curveManipulationMode === CurveManipulationMode.TRIANGLE );

    const closestPoint = this.getClosestPointAt( peak.x );

    // Amount to shift the CurvePoint closest to the passed-in peak.
    const deltaY = peak.y - closestPoint.lastSavedY;

    // full 'width' of the triangle
    const width = this.curveManipulationWidth;

    const maxY = 5;// TODO, this should be pull from the max Y bounds

    // set the slope coefficient such that the triangle at y=0 has a 'width' equal to this.curveManipulationWidth when the peak is at maxY
    const slope = maxY / ( width / 2 );

    this.points.forEach( point => {
      const newY = peak.y - Math.sign( deltaY ) * slope * Math.abs( point.x - closestPoint.x );

      // If the point is within the 'width' of the triangle, modify the y position.
      // Otherwise , the point is not within the width and don't modify its position.
      if ( ( deltaY > 0 && newY > point.lastSavedY ) || ( deltaY < 0 && newY < point.lastSavedY ) ) {
        point.y = newY;
      }
      else {
        point.y = point.lastSavedY;
      }
    } );

    // Signal that this Curve has changed.
    this.curveChangedEmitter.emit();
  }

  /**
   * Creates a quadratic that is non-differentiable where it intersects with the rest of the Curve.
   *
   */
  public createParabolaAt( peak: Vector2 ): void {

    assert && assert( this.curveManipulationMode === CurveManipulationMode.PARABOLA );

    // full 'width' of the parabola
    const width = this.curveManipulationWidth;

    const closestPoint = this.getClosestPointAt( peak.x );

    // Amount to shift the CurvePoint closest to the passed-in peak.
    const deltaY = peak.y - closestPoint.lastSavedY;

    const maxY = 5;// TODO, this should be pull from the max Y bounds

    // set the parabola coefficient such that the parabola at y=0 has a 'width' equal to this.curveManipulationWidth when the peak is at maxY
    const A = maxY * Math.pow( 2 / width, 2 );

    this.points.forEach( point => {
      const newY = peak.y - Math.sign( deltaY ) * A * Math.pow( point.x - closestPoint.x, 2 );

      // If the point is within the 'width' of the parabola, modify the y position.
      // Otherwise , the point is not within the width and don't modify its position.
      if ( ( deltaY > 0 && newY > point.lastSavedY ) || ( deltaY < 0 && newY < point.lastSavedY ) ) {
        point.y = newY;
      }
      else {
        point.y = point.lastSavedY;
      }
    } );

    // Signal that this Curve has changed.
    this.curveChangedEmitter.emit();
  }

  /**
   * Creates a smooth and continuous trapezoidal-shaped curve with rounded corners.
   */
  public createPedestalAt( peak: Vector2 ): void {

    assert && assert( this.curveManipulationMode === CurveManipulationMode.PEDESTAL );

    // width of the hill
    const width = this.curveManipulationWidth;

    const closestPoint = this.getClosestPointAt( peak.x );

    this.points.forEach( point => {
      let P;

      if ( Math.abs( point.x - closestPoint.x ) < width / 2 ) {
        P = 1;
      }
      else if ( point.x <= closestPoint.x ) {

        // use the square of a gaussian in order to have a very symmetric derivative at the edges
        P = Math.exp( -Math.pow( ( point.x - ( closestPoint.x - width / 2 ) ) / ( EDGE_SLOPE_FACTOR ), 4 ) );
      }
      else {
        P = Math.exp( -Math.pow( ( point.x - ( closestPoint.x + width / 2 ) ) / ( EDGE_SLOPE_FACTOR ), 4 ) );
      }

      point.y = P * peak.y + ( 1 - P ) * point.lastSavedY;
    } );

    // Signal that this Curve has changed.
    this.curveChangedEmitter.emit();
  }

  /**
   * Allows the user to drag Points in the Curve to any desired position to create custom Curves shapes.
   * This method will update the curve with the new position value.
   *
   * TODO: add documentation
   * @param position - in model coordinates
   * @param penultimatePosition - in model coordinates
   * @param antepenultimatePosition - in model coordinates
   */
  public drawFreeformToPosition( position: Vector2,
                                 penultimatePosition: Vector2,
                                 antepenultimatePosition: Vector2 | null ): void {

    assert && assert( this.curveManipulationMode === CurveManipulationMode.FREEFORM );

    //  closest point associated with the position
    const closestPoint = this.getClosestPointAt( position.x );

    // Amount to shift the CurvePoint closest to the passed-in position.
    closestPoint.y = position.y;

    // point associated with the last drag event
    const lastPoint = this.getClosestPointAt( penultimatePosition.x );

    this.interpolate( closestPoint, lastPoint );


    if ( antepenultimatePosition instanceof Vector2 ) {

      // point associated with the last drag event
      const nextToLastPoint = this.getClosestPointAt( antepenultimatePosition.x );

      // ensure that lastPoint is in between closestPoint and lastPoint
      if ( ( closestPoint.x - lastPoint.x ) * ( nextToLastPoint.x - lastPoint.x ) < 0 ) {

        // x separation between two adjacent points in curve array
        const deltaX = 1 / this.pointsPerCoordinate;

        // x distance between the new and old point
        const distXl = Math.abs( closestPoint.x - lastPoint.x );

        // x distance between the old and very old point
        const distXR = Math.abs( nextToLastPoint.x - lastPoint.x );

        const signedOne: number = ( closestPoint.x < lastPoint.x ) ? -1 : 1;

        // TODO: explain
        for ( let j = 0; j < 3; j++ ) {

          for ( let dx = -distXR / 2; dx < distXl / 2; dx += deltaX ) {

            // point to be smoothed
            const xPosition = nextToLastPoint.x + signedOne * dx;

            // update the y value based on adjacent points
            this.getClosestPointAt( xPosition ).y =
              this.getClosestPointAt( xPosition + 2 * deltaX ).y / 5 +
              this.getClosestPointAt( xPosition - 2 * deltaX ).y / 5 +
              this.getClosestPointAt( xPosition ).y / 5 +
              this.getClosestPointAt( xPosition + deltaX ).y / 5 +
              this.getClosestPointAt( xPosition - deltaX ).y / 5;
          }
        }


      }
    }

    // Signal that this Curve has changed.
    this.curveChangedEmitter.emit();
  }

  public interpolate( point1: CurvePoint, point2: CurvePoint ): void {

    // x separation between two adjacent points in curve array
    const deltaX = 1 / this.pointsPerCoordinate;

    // x distance between the new and old point
    const distX = Math.abs( point1.x - point2.x );

    const signedOne: number = ( point1.x > point2.x ) ? -1 : 1;

    // perform a linear interpolation between lastPoint and closestPoint
    for ( let dx = deltaX; dx < distX; dx += deltaX ) {

      // the xPosition of the point to be interpolated, is either to the left or right of the closestPoint
      const xPosition = point1.x + signedOne * dx;

      // weight needed to interpolate the y-values, weight will never exceed 1.
      const W = dx / distX;

      // update the y value of an intermediate point
      this.getClosestPointAt( xPosition ).y = ( 1 - W ) * point1.y + W * point2.y;

    }
  }

  /**
   * Creates a sinusoidal wave with a varying amplitude based on the drag-position.
   * TODO: this is a bit of a mess, simplify and/or document properly
   */
  public createSineAt( position: Vector2 ): void {

    assert && assert( this.curveManipulationMode === CurveManipulationMode.SINE );


    const closestIndex = this.getClosestIndexAt( position.x );
    const closestPoint = this.getClosestPointAt( position.x );

    // width of the hill
    const width = this.curveManipulationWidth;

    const arrayLength = this.points.length;

    let isClear: boolean;

    // update point
    const updatePoint = ( index: number ): void => {
      const point = this.points[ index ];
      const newY = position.y * Math.cos( ( closestPoint.x - point.x ) * width / ( Math.PI * 2 ) );
      const clearForSine = Math.abs( newY ) > Math.abs( point.lastSavedY );

      if ( clearForSine && isClear ) {
        point.y = newY;
      }
      else {
        point.y = point.lastSavedY;
        isClear = false;
      }
    };

    isClear = true;
    for ( let index = closestIndex; index < arrayLength; ++index ) {
      updatePoint( index );
    }

    isClear = true;
    for ( let index = closestIndex; index >= 0; --index ) {
      updatePoint( index );
    }

    // Signal that this Curve has changed.
    this.curveChangedEmitter.emit();
  }
}

calculusGrapher.register( 'OriginalCurve', OriginalCurve );
