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
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import CalculusGrapherQueryParameters from '../CalculusGrapherQueryParameters.js';
import Curve from './Curve.js';
import CurveManipulationMode from './CurveManipulationMode.js';


// constants
const CURVE_MANIPULATION_WIDTH_RANGE = CalculusGrapherConstants.CURVE_MANIPULATION_WIDTH_RANGE;
const SMOOTHING_WINDOW_WIDTH = CalculusGrapherQueryParameters.smoothingWindowWidth;
const POINTS_PER_COORDINATE = CalculusGrapherQueryParameters.pointsPerCoordinate;

type SelfOptions = EmptySelfOptions;

export type OriginalCurveOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class OriginalCurve extends Curve {

  // the 'mode' that user is in for manipulating curves. This
  // is manipulated by the view.
  public curveManipulationModeProperty: EnumerationProperty<CurveManipulationMode>;

  // the width of the curve-manipulation. This only applies to some CurveManipulationModes
  // and the value is interpreted differently for each response algorithm to curve
  // user-manipulation.
  public curveManipulationWidthProperty: NumberProperty;

  public constructor( providedOptions?: OriginalCurveOptions ) {

    const options = optionize<OriginalCurveOptions, SelfOptions>()( {}, providedOptions );

    super( options );

    this.curveManipulationModeProperty = new EnumerationProperty( CurveManipulationMode.HILL, {
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
   * TODO: this was copied from flash. Understand and improve on it.
   */
  public createHillAt( peak: Vector2 ): void {

    // width of the hill
    const width = this.curveManipulationWidth;

    const closestPoint = this.getClosestPointAt( peak.x );
    assert && assert( closestPoint && closestPoint.exists, `invalid closestPoint: ${closestPoint}` );

    // Amount to shift the entire curve.
    const deltaY = Math.abs( peak.y - closestPoint.lastSavedY );
    let P = 1;

    this.points.forEach( point => {
      if ( point !== closestPoint ) {
        const dist = Math.abs( point.x - closestPoint.x ) * POINTS_PER_COORDINATE;
        P = Math.exp( -dist / ( point === closestPoint ? 1 : width * Math.log( deltaY + 1 ) ) );

        point.y = P * peak.y + ( 1 - P ) * point.lastSavedY;
      }

      point.y = ( P * peak.y + ( 1 - P ) * point.y );
    } );

    // Signal that this Curve has changed.
    this.curveChangedEmitter.emit();
  }

  /**
   * Creates a triangle-shaped peak that is non-differentiable where it intersects with the rest of the Curve.
   * TODO: this was copied from flash. Understand and improve?
   */
  public createTriangleAt( peak: Vector2 ): void {

    const closestPoint = this.getClosestPointAt( peak.x );

    // Amount to shift the CurvePoint closest to the passed-in peak.
    const deltaY = peak.y - closestPoint.lastSavedY;

    // TODO: hard-coded for now (testing algorithm), but this corresponds to curveManipulationWidthProperty in the future. See the flash source code.
    // const width = 20;
    const slope = 1; // TODO: derive slope from width

    // TODO: this is from flash source code. Understand this and determine if still needed.
    // const slopeMin = 1 / 5;
    // const slopeMax = 15;
    // const fS = Math.pow( slopeMax / slopeMin, 1 / 10 );
    // const slope = slopeMin * Math.pow( fS, 1 );

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
   * TODO: this was copied from flash. Understand and improve?
   */
  public createParabolaAt( peak: Vector2 ): void {

    const closestPoint = this.getClosestPointAt( peak.x );

    // Amount to shift the CurvePoint closest to the passed-in peak.
    const deltaY = peak.y - closestPoint.lastSavedY;

    // TODO: hard-coded for now (testing algorithm), but this corresponds to curveManipulationWidthProperty in the future. See the flash source code.
    // TODO: this is from flash. Understand this and integrate into the algorithm.
    // const width = 20;
    // const slopeMin = 1 / 5;
    // const slopeMax = 15;
    // const fS = Math.pow( slopeMax / slopeMin, 1 / 10 );
    // const slope = slopeMin * Math.pow( fS, 1 );

    this.points.forEach( point => {
      const newY = peak.y - Math.sign( deltaY ) * Math.pow( point.x - closestPoint.x, 2 );

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
   *
   * TODO: this was copied from flash. Understand and improve?
   */
  public createPedestalAt( peak: Vector2 ): void {

    // width of the hill
    const width = this.curveManipulationWidth;

    const edgeSlopeFactor = 1.5;

    const closestPoint = this.getClosestPointAt( peak.x );

    // See https://en.wikipedia.org/wiki/Gaussian_function
    this.points.forEach( point => {
      let P;

      if ( Math.abs( point.x - closestPoint.x ) < width / 2 ) {
        P = 1;
      }
      else if ( point.x <= closestPoint.x ) {
        P = Math.exp( -Math.pow( point.x - ( closestPoint.x - width / 2 ), 4 ) / ( 2 * edgeSlopeFactor * edgeSlopeFactor ) );
      }
      else {
        P = Math.exp( -Math.pow( point.x - ( closestPoint.x + width / 2 ), 4 ) / ( 2 * edgeSlopeFactor * edgeSlopeFactor ) );
      }

      point.y = P * peak.y + ( 1 - P ) * point.lastSavedY;
    } );

    // Signal that this Curve has changed.
    this.curveChangedEmitter.emit();
  }

  /**
   * Allows the user to drag Points in the Curve to any desired position to create custom Curves shapes.
   *
   * @param position - in model coordinates
   */
  public drawFreeformToPosition( position: Vector2 ): void {
    assert && assert( this.curveManipulationMode === CurveManipulationMode.FREEFORM );

    const closestPoint = this.getClosestPointAt( position.x );

    // Amount to shift the CurvePoint closest to the passed-in position.
    closestPoint.y = position.y;

    // TODO: this was copied from flash. Understand and improve?
    // @ts-ignore
    if ( this.last ) {
      // @ts-ignore
      const distX = Math.abs( closestPoint.x - this.last.x );

      if ( distX > 1 / POINTS_PER_COORDINATE ) {

        for ( let dx = 1 / POINTS_PER_COORDINATE; dx < distX; dx += 1 / POINTS_PER_COORDINATE ) {
          const W = dx / distX;
          // @ts-ignore
          if ( closestPoint.x > this.last.x ) {
            // @ts-ignore
            this.getClosestPointAt( this.last.x + dx ).y = ( 1 - W ) * this.last.y + W * closestPoint.y;
          }
          else {
            // @ts-ignore
            this.getClosestPointAt( this.last.x - dx ).y = ( 1 - W ) * this.last.y + W * closestPoint.y;
          }
        }
      }
    }
    // @ts-ignore
    this.last = closestPoint;

    // Signal that this Curve has changed.
    this.curveChangedEmitter.emit();
  }

  /**
   * Creates a sinusoidal wave with a varying amplitude based on the drag-position.
   * TODO: this was copied from flash. Understand and improve?
   */
  public createSineAt( position: Vector2 ): void {

    // const closestPoint = this.getClosestPointAt( position.x );

    // Amount to shift the CurvePoint closest to the passed-in position.
    // const deltaY = position.y - closestPoint.lastSavedY;

    // width of the hill
    const width = this.curveManipulationWidth;

    this.points.forEach( point => {
      const newY = position.y * Math.cos( point.x * width / ( Math.PI * 2 ) );

      const clearForSine = Math.abs( newY ) > Math.abs( point.lastSavedY );

      if ( clearForSine ) {
        point.y = newY;
      }
      else {
        point.y = point.lastSavedY;
      }
    } );

    // Signal that this Curve has changed.
    this.curveChangedEmitter.emit();
  }
}

calculusGrapher.register( 'OriginalCurve', OriginalCurve );