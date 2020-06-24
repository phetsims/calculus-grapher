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
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import Curve from './Curve.js';
import CurveManipulationModes from './CurveManipulationModes.js';

// constants
const CURVE_MANIPULATION_WIDTH_RANGE = CalculusGrapherConstants.CURVE_MANIPULATION_WIDTH_RANGE;

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
}

calculusGrapher.register( 'OriginalCurve', OriginalCurve );
export default OriginalCurve;