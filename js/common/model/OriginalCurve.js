// Copyright 2020, University of Colorado Boulder

/**
 * OriginalCurve is a Curve sub-type for the main curve that the user interacts with and manipulates, which then
 * triggers a change in the OriginalCurve and its integral/derivative/second-derivative Curve.
 *
 * The OriginalCurve can be manipulated in various ways, mainly through the 8 CurveManipulationModes that were ported
 * from the flash implementation of the simulation.
 *
 * OriginalCurve is mainly responsible for:
 *   - Keeping track of the current CurveManipulationMode
 *   - Keeping track of the width of the curve-manipulation 'dent' that the user makes in the curve. This only applies
 *     to HILL, LINE, PEDESTAL, PARABOLA, and SINE (which make a 'dent' in the curve).
 *   - Changing the Curve based on where the user is dragging the CurvePoint and the CurveManipulationMode or when
 *     the user 'smooths' the Curve. The algorithms for curve manipulation were adapted and improved from the flash
 *     implementation of Calculus Grapher.
 *
 * Like Curve, OriginalCurve is created at the start and persists for the lifetime of the simulation. Links
 * are left as-is and DerivativeCurves are never disposed.
 *
 * @author Brandon Li
 */

import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
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
    this.curveManipulationModeProperty = new EnumerationProperty( CurveManipulationModes,
      CurveManipulationModes.HILL );


    // @public {NumberProperty} - the width of the curve-manipulation 'dent' that the user makes in the curve. This only
    //                            applies to some CurveManipulationModes. See the comment at the top of this file.
    this.curveManipulationWidthProperty = new NumberProperty( CURVE_MANIPULATION_WIDTH_RANGE.defaultValue, {
      range: CURVE_MANIPULATION_WIDTH_RANGE
    } );
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
   * This method is invoked when the user finishes manipulating the OriginalCurve. When the undo button is pressed,
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

      // Loop through each point on BOTH sides of the window, adding the y-value to our total.
      for ( let dx = -SMOOTHING_WINDOW_WIDTH / 2; dx < SMOOTHING_WINDOW_WIDTH / 2; dx += 1 / POINTS_PER_COORDINATE ) {

        // Add the Point's previousY, which was the Point's y-value before the smooth() method was called.
        movingTotal += this.getClosestsPointAt( point.x + dx ).previousY;
      }

      // Set the Point's new y-value to the moving average.
      point.y = movingTotal / SMOOTHING_WINDOW_WIDTH;
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
    assert && assert( position instanceof Vector2, `invalid position: ${position}` );
    assert && assert( this.curveManipulationMode === CurveManipulationModes.TILT );

    // Amount to shift the CurvePoint closest to the passed-in position.
    const deltaY = position.y - this.getClosestPointAt( position.x ).y;

    // Shift each of the CurvePoints by a factor of deltaY.
    this.points.forEach( point => {
      point.y += deltaY * point.x / position.x;
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

    // Signal that this Curve has changed.
    this.curveChangedEmitter.emit();


    //     xP = Math.round(xP);
    // this.y_arr[xP] = yP;
    // var distX:int = Math.abs(xP - lastX);
    // var sign:Number = xP - lastX;
    // var W:Number;

    // if ( distX > 1 ) {
    //     for ( var i:int = 1; i < distX; i++ ) {
    //         W = i / distX;
    //         if ( sign > 0 ) {
    //             this.y_arr[lastX + i] = (1 - W) * this.lastY + W * yP;
    //         }
    //         else {
    //             this.y_arr[lastX - i] = (1 - W) * this.lastY + W * yP;
    //         }

    //     }
    // }
    // this.lastX = xP;
    // this.lastY = yP;
  }
}

calculusGrapher.register( 'OriginalCurve', OriginalCurve );
export default OriginalCurve;