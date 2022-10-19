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
import Curve from './Curve.js';
import CurveManipulationMode from './CurveManipulationMode.js';
import Tandem from '../../../../tandem/js/Tandem.js';


// constants
const CURVE_MANIPULATION_WIDTH_RANGE = CalculusGrapherConstants.CURVE_MANIPULATION_WIDTH_RANGE;
const SMOOTHING_WINDOW_WIDTH = CalculusGrapherQueryParameters.smoothingWindowWidth;
const POINTS_PER_COORDINATE = CalculusGrapherQueryParameters.pointsPerCoordinate;

type ParabolaParameters = { A: number; B: number; C: number };

export default class OriginalCurve extends Curve {

  // the 'mode' that user is in for manipulating curves. This
  // is manipulated by the view.
  public readonly curveManipulationModeProperty: EnumerationProperty<CurveManipulationMode>;

  // the width of the curve-manipulation. This only applies to some CurveManipulationModes
  // and the value is interpreted differently for each response algorithm to curve
  // user-manipulation.
  private readonly curveManipulationWidthProperty: NumberProperty;

  public constructor( curveManipulationModeChoices: CurveManipulationMode[], tandem: Tandem ) {

    super( tandem );

    this.curveManipulationModeProperty = new EnumerationProperty( CurveManipulationMode.HILL, {
      validValues: curveManipulationModeChoices,
      tandem: tandem.createTandem( 'curveManipulationModeProperty' )
    } );

    this.curveManipulationWidthProperty = new NumberProperty( CURVE_MANIPULATION_WIDTH_RANGE.defaultValue, {
      range: CURVE_MANIPULATION_WIDTH_RANGE,
      tandem: tandem.createTandem( 'curveManipulationWidthProperty' )
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
  public override reset(): void {
    super.reset();
    this.curveManipulationModeProperty.reset();
    this.curveManipulationWidthProperty.reset();
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
   * Smooths the curve. Called when the user presses the 'smooth' button.
   *
   * This method uses the simple moving-average algorithm for 'smoothing' a curve, which is described in
   * https://en.wikipedia.org/wiki/Moving_average#Simple_moving_average. This algorithm was adapted but significantly
   * improved from the flash implementation of calculus grapher.
   */
  public smooth(): void {

    // Save the current values of our Points for the next undoToLastSave call. Note that the current y-values are the
    // same as the previous y-values for all Points in the OriginalCurve.
    this.saveCurrentPoints();

    // Loop through each Point and set the Point's new y-value.
    this.points.forEach( point => {

      // Flag that tracks the sum of the y-values of all Points within the moving window.
      let movingTotal = 0;
      let addedPoints = 0;

      // Loop through each point on BOTH sides of the window, adding the y-value to our total.
      for ( let dx = -SMOOTHING_WINDOW_WIDTH / 2; dx < SMOOTHING_WINDOW_WIDTH / 2; dx += 1 / POINTS_PER_COORDINATE ) {

        // Add the Point's lastSavedY, which was the Point's y-value before the smooth() method was called.
        movingTotal += this.getClosestPointAt( point.x + dx ).lastSavedY;

        addedPoints += 1;
      }

      // Set the Point's new y-value to the moving average.
      point.y = movingTotal / addedPoints;
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

    // Find the angle of the tile, based on where the user dragged the Curve.
    const angle = Utils.toRadians( Utils.clamp(
      Utils.toDegrees( Math.atan( position.y / position.x ) ),
      -CalculusGrapherQueryParameters.maxTilt,
      CalculusGrapherQueryParameters.maxTilt
    ) );

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

    // width of the hill
    const width = this.curveManipulationWidth;

    const edgeSlopeFactor = 1.5;

    const closestPoint = this.getClosestPointAt( peak.x );


    this.points.forEach( point => {
      let P;

      if ( Math.abs( point.x - closestPoint.x ) < width / 2 ) {
        P = 1;
      }
      else if ( point.x <= closestPoint.x ) {

        // use the square of a gaussian in order to have a very symmetric derivative at the edges
        P = Math.exp( -Math.pow( ( point.x - ( closestPoint.x - width / 2 ) ) / ( edgeSlopeFactor ), 4 ) );
      }
      else {
        P = Math.exp( -Math.pow( ( point.x - ( closestPoint.x + width / 2 ) ) / ( edgeSlopeFactor ), 4 ) );
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

    // x separation between two adjacent points in curve array
    const deltaX = 1 / POINTS_PER_COORDINATE;

    if ( antepenultimatePosition instanceof Vector2 ) {

      // point associated with the last drag event
      const lastPoint = this.getClosestPointAt( penultimatePosition.x );

      // point associated with the last drag event
      const nextToLastPoint = this.getClosestPointAt( antepenultimatePosition.x );

      // ensure that lastPoint is in between closestPoint and lastPoint
      if ( ( closestPoint.x - lastPoint.x ) * ( nextToLastPoint.x - lastPoint.x ) < 0 ) {

        const P = this.parabolaParameters(
          closestPoint.x, closestPoint.y,
          lastPoint.x, lastPoint.y,
          nextToLastPoint.x, nextToLastPoint.y );

        // x distance between the new and oldest point
        const distX = Math.abs( closestPoint.x - nextToLastPoint.x );

        const signedOne: number = ( nextToLastPoint.x > closestPoint.x ) ? 1 : -1;

        // perform a quadratic interpolation between closestPoint and nextToLastPoint
        for ( let dx = deltaX; dx < distX; dx += deltaX ) {

          // the xPosition of the point to be interpolated, is either to the left or right of the closestPoint
          const xPosition = closestPoint.x + signedOne * dx;

          // update the y value of an intermediate point
          this.getClosestPointAt( xPosition ).y = P.A * xPosition * xPosition + P.B * xPosition + P.C;

        }
      }
      else {

        // x distance between the new and old point
        const distX = Math.abs( closestPoint.x - lastPoint.x );

        const signedOne: number = ( closestPoint.x > lastPoint.x ) ? 1 : -1;

        // perform a linear interpolation between lastPoint and closestPoint
        for ( let dx = deltaX; dx < distX; dx += deltaX ) {

          // the xPosition of the point to be interpolated, is either to the left or right of the closestPoint
          const xPosition = closestPoint.x + signedOne * dx;

          // weight needed to interpolate the y-values, weight will never exceed 1.
          const W = dx / distX;

          // update the y value of an intermediate point
          this.getClosestPointAt( xPosition ).y = ( 1 - W ) * lastPoint.y + W * closestPoint.y;

        }
      }

    }
    // Signal that this Curve has changed.
    this.curveChangedEmitter.emit();
  }


  /**
   * Creates a sinusoidal wave with a varying amplitude based on the drag-position.
   * TODO: this is a bit of a mess, simplify and/or document properly
   */
  public createSineAt( position: Vector2 ): void {

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

  /**
   * Find the parameters A, B, C in  'y= A x^2= Bx + C'  from three points (Vector2)
   * The points must have distinct x values.
   *
   */
  public parabolaParameters( x1: number, y1: number, x2: number, y2: number, x3: number, y3: number ):
    ParabolaParameters {

    const denominator = ( x1 - x2 ) * ( x1 - x3 ) * ( x2 - x3 );

    assert && assert( denominator !== 0, 'x values of three points must be different' );

    const A = ( x1 * ( y3 - y2 ) + x2 * ( y1 - y3 ) + x3 * ( y2 - y1 ) ) / denominator;
    const B = ( x1 * x1 * ( y2 - y3 ) + x2 * x2 * ( y3 - y1 ) + x3 * x3 * ( y1 - y2 ) ) / denominator;
    const C = ( x2 * x3 * ( x2 - x3 ) * y1 + x3 * x1 * ( x3 - x1 ) * y2 + x1 * x2 * ( x1 - x2 ) * y3 ) / denominator;

    return { A: A, B: B, C: C };
  }

}

calculusGrapher.register( 'OriginalCurve', OriginalCurve );
