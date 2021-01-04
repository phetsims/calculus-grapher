// Copyright 2020, University of Colorado Boulder

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
import CurveManipulationModes from './CurveManipulationModes.js';

// constants
const CURVE_MANIPULATION_WIDTH_RANGE = CalculusGrapherConstants.CURVE_MANIPULATION_WIDTH_RANGE;
const SMOOTHING_WINDOW_WIDTH = CalculusGrapherQueryParameters.smoothingWindowWidth;
const POINTS_PER_COORDINATE = CalculusGrapherQueryParameters.pointsPerCoordinate;

class OriginalCurve extends Curve {

  constructor() {

    super();

    // @public {EnumerationProperty.<CurveManipulationModes>} - the 'mode' that user is in for manipulating curves. This
    //                                                          is manipulated by the view.
    this.curveManipulationModeProperty = new EnumerationProperty( CurveManipulationModes, CurveManipulationModes.HILL );

    // @public {NumberProperty} - the width of the curve-manipulation. This only applies to some CurveManipulationModes
    //                            and the value is interpreted differently for each response algorithm to curve
    //                            user-manipulation.
    this.curveManipulationWidthProperty = new NumberProperty( CURVE_MANIPULATION_WIDTH_RANGE.defaultValue, {
      range: CURVE_MANIPULATION_WIDTH_RANGE
    } );

    // @public (read-only) - the tilting angle.
    this.angle = 0;
  }

  /**
   * Resets the OriginalCurve.
   * @override
   * @public
   *
   * Called when the reset-all button is pressed.
   */
  reset() {
    super.reset();
    this.curveManipulationModeProperty.reset();
    this.curveManipulationWidthProperty.reset();
  }

  /**
   * Saves the current y-values of the Points for the next undoToLastSave() method.
   * @public
   *
   * This method is invoked when the user starts manipulating the OriginalCurve. When the undo button is pressed,
   * the Points of the OriginalCurve will be set to their last saved state.
   */
  saveCurrentPoints() {

    // Save the current y-value of each CurvePoint.
    this.points.forEach( point => { point.save(); } );
  }

  /**
   * Sets the y-values of this CurvedPoints of this Curve to its last saved state.
   * @public
   *
   * This method is invoked when the undo button is pressed, which successively undos the last action.
   */
  undoToLastSave() {

    // Revert back to the saved y-value of each CurvePoint.
    this.points.forEach( point => { point.undoToLastSave(); } );

    // Signal that this Curve has changed.
    this.curveChangedEmitter.emit();
  }

  /**
   * Gets the current CurveManipulationMode.
   * @public
   *
   * @returns {CurveManipulationMode}
   */
  get curveManipulationMode() {
    return this.curveManipulationModeProperty.value;
  }

  /**
   * Gets the current curve-manipulation width.
   * @public
   *
   * @returns {number}
   */
  get curveManipulationWidth() {
    return this.curveManipulationWidthProperty.value;
  }

  /*----------------------------------------------------------------------------*
   * Curve Manipulation Algorithms
   *----------------------------------------------------------------------------*/

  /**
   * Smooths the curve. Called when the user presses the 'smooth' button.
   * @public
   *
   * This method uses the simple moving-average algorithm for 'smoothing' a curve, which is described in
   * https://en.wikipedia.org/wiki/Moving_average#Simple_moving_average. This algorithm was adapted but significantly
   * improved from the flash implementation of calculus grapher.
   */
  smooth() {

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
   * @public
   *
   * @param {Vector2} position - in model coordinates
   */
  shiftToPosition( position ) {
    assert && assert( position instanceof Vector2, `invalid position: ${position}` );
    assert && assert( this.curveManipulationMode === CurveManipulationModes.SHIFT );

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
   * @public
   *
   * @param {Vector2} position - in model coordinates
   */
  tiltToPosition( position ) {
    // assert && assert( position instanceof Vector2, `invalid position: ${position}` );
    // assert && assert( this.curveManipulationMode === CurveManipulationModes.TILT );

    // // Amount to shift the CurvePoint closest to the passed-in position.
    this.angle = Utils.clamp( Utils.toDegrees( Math.atan2( position.y, position.x ) ), -CalculusGrapherQueryParameters.maxTilt, CalculusGrapherQueryParameters.maxTilt );
    // const deltaY = Math.tan( Utils.toRadians( this.angle ) ) * position.x - this.getClosestPointAt( position.x ).lastSavedY;

    // // Shift each of the CurvePoints by a factor of deltaY.
    // this.points.forEach( point => {
    //   point.y = point.lastSavedY + deltaY * point.x / position.x;
    // } );

    // // Signal that this Curve has changed.
    // this.curveChangedEmitter.emit();
  }

  /**
   * Hill
   * @public
   *
   * TODO: this was copied from flash. Understand and improve?
   */
  hill( position ) {
    const width = 20;

    const closestPoint = this.getClosestPointAt( position.x );
    assert && assert( closestPoint && closestPoint.exists, `invalid closestPoint: ${closestPoint}` );

    // Amount to shift the entire curve.
    const deltaY = Math.abs( position.y - closestPoint.lastSavedY );
    let P = 1;

    this.points.forEach( point => {
      if ( point !== closestPoint ) {
        const dist = Math.abs( point.x - closestPoint.x ) * POINTS_PER_COORDINATE;
        P = Math.exp( -dist / ( point === closestPoint ? 1 : width * Math.log( deltaY + 1 ) ) );
        assert && assert( Number.isFinite( P ), `${ dist } ${ deltaY } ${ Math.log( deltaY + 1 ) } ${ -dist / ( width * Math.log( deltaY + 1 ) ) }` );

        point.y = P * position.y + ( 1 - P ) * point.lastSavedY;
      }

      point.y = ( P * position.y + ( 1 - P ) * point.y );

    } );

    // Signal that this Curve has changed.
    this.curveChangedEmitter.emit();
  }

  /**
   * Line
   * @public
   * TODO: this was copied from flash. Understand and improve?
   */
  line( position ) {
    const closestPoint = this.getClosestPointAt( position.x );

    // Amount to shift the CurvePoint closest to the passed-in position.
    const deltaY = position.y - closestPoint.lastSavedY;

    // const width = 20;
    const slope = 1;
    // const slopeMin = 1 / 5;
    // const slopeMax = 15;
    // const fS = Math.pow( slopeMax / slopeMin, 1 / 10 );
    // const slope = slopeMin * Math.pow( fS, 1 );

    this.points.forEach( point => {
      const newY = position.y - Math.sign( deltaY ) * slope * Math.abs( point.x - closestPoint.x );

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
   * Parabola
   * @public
   * TODO: this was copied from flash. Understand and improve?
   */
  parabola( position ) {
    const closestPoint = this.getClosestPointAt( position.x );

    // Amount to shift the CurvePoint closest to the passed-in position.
    const deltaY = position.y - closestPoint.lastSavedY;

    // const width = 20;
    const a = 1;
    // const slopeMin = 1 / 5;
    // const slopeMax = 15;
    // const fS = Math.pow( slopeMax / slopeMin, 1 / 10 );
    // const slope = slopeMin * Math.pow( fS, 1 );

    this.points.forEach( point => {
      const newY = position.y - Math.sign( deltaY ) * a * Math.pow( point.x - closestPoint.x, 2 );

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
   * Pedestal
   * @public
   * TODO: this was copied from flash. Understand and improve?
   */
  pedestal( position ) {
    const width = 10;
    const c = 1.5;

    const closestPoint = this.getClosestPointAt( position.x );

    // https://en.wikipedia.org/wiki/Gaussian_function
    this.points.forEach( point => {
      // let newY;
      let P = 1;

      if ( Math.abs( point.x - closestPoint.x ) < width / 2 ) {
        P = 1;
      }
      else if ( point.x <= closestPoint.x ) {
        P = Math.exp( -Math.pow( point.x - ( closestPoint.x - width / 2 ), 4 ) / ( 2 * c * c ) );
      }
      else {  // https://en.wikipedia.org/wiki/Gaussian_function
        P = Math.exp( -Math.pow( point.x - ( closestPoint.x + width / 2 ), 4 ) / ( 2 * c * c ) );
      }

      point.y = P * position.y + ( 1 - P ) * point.lastSavedY;
    } );

    // Signal that this Curve has changed.
    this.curveChangedEmitter.emit();
  }

  /**
   * Freeform.
   * @public
   *
   * @param {Vector2} position - in model coordinates
   */
  drawFreeformToPosition( position ) {
    assert && assert( position instanceof Vector2, `invalid position: ${position}` );
    assert && assert( this.curveManipulationMode === CurveManipulationModes.FREEFORM );

    const closestPoint = this.getClosestPointAt( position.x );

    // Amount to shift the CurvePoint closest to the passed-in position.
    closestPoint.y = position.y;


    if ( this.last ) {
      const distX = Math.abs( closestPoint.x - this.last.x );

      if ( distX > 1 / POINTS_PER_COORDINATE ) {

        for ( let dx = 1 / POINTS_PER_COORDINATE; dx < distX; dx += 1 / POINTS_PER_COORDINATE ) {
          const W = dx / distX;

          if ( closestPoint.x > this.last.x ) {
            this.getClosestPointAt( this.last.x + dx ).y = (1 - W) * this.last.y + W * closestPoint.y;
          }
          else {
            this.getClosestPointAt( this.last.x - dx ).y = (1 - W) * this.last.y + W * closestPoint.y;
          }
        }
      }
    }

    this.last = closestPoint;

    // Signal that this Curve has changed.
    this.curveChangedEmitter.emit();
  }

  /**
   * Sine
   * @public
   * TODO: this was copied from flash. Understand and improve?
   */
  sine( position ) {
    // const closestPoint = this.getClosestPointAt( position.x );

    // Amount to shift the CurvePoint closest to the passed-in position.
    // const deltaY = position.y - closestPoint.lastSavedY;

    const width = 1;


    this.points.forEach( point => {
      const newY = position.y * Math.cos( point.x * width );
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
export default OriginalCurve;