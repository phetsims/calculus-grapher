// Copyright 2020, University of Colorado Boulder

/**
 * Factory for creating the various icons that appear in the 'Calculus Grapher' simulation. All methods are static.
 *
 * CalculusGrapherIconFactory currently creates the following icons:
 *   - Screen Icons
 *   - Curve Manipulation Icons
 *
 *
 * NOTE: All 'magic' numbers in this file were tentatively determined empirically to match the design document.
 *
 * @author Brandon Li
 */

import calculusGrapher from '../../calculusGrapher.js';

// constants
// const CURVE_MANIPULATION_ICON_WIDTH = 10;
// const CURVE_MANIPULATION_ICON_HEIGHT = 5;

const CalculusGrapherIconFactory = {


  /*--------------------------- Screen Icons ---------------------------------*/


  /*--------------------- Curve Manipulation Icons ---------------------------*/

  /**
   * Creates the Curve Manipulation Icon for CurveManipulationModes.HILL.
   * @public
   *
   * @returns {Node}
   */
  createHillIcon() {
    // OriginalCurve.createHillShape

  },

  /**
   * Creates the Curve Manipulation Icon for CurveManipulationModes.TRIANGLE.
   * @public
   *
   * @returns {Node}
   */
  createLineIcon() {

  },

  /**
   * Creates the Curve Manipulation Icon for CurveManipulationModes.PEDESTAL.
   * @public
   *
   * @returns {Node}
   */
  createPedestalIcon() {

  },

  /**
   * Creates the Curve Manipulation Icon for CurveManipulationModes.PARABOLA.
   * @public
   *
   * @returns {Node}
   */
  createParabolaIcon() {

  },

  /**
   * Creates the Curve Manipulation Icon for CurveManipulationModes.SINE.
   * @public
   *
   * @returns {Node}
   */
  createSineIcon() {

  },

  /**
   * Creates the Curve Manipulation Icon for CurveManipulationModes.FREEFORM.
   * @public
   *
   * @returns {Node}
   */
  createFreeformIcon() {

  },

  /**
   * Creates the Curve Manipulation Icon for CurveManipulationModes.TILT.
   * @public
   *
   * @returns {Node}
   */
  createTiltIcon() {

  },

  /**
   * Creates the Curve Manipulation Icon for CurveManipulationModes.SHIFT.
   * @public
   *
   * @returns {Node}
   */
  createShiftIcon() {

  }
};

calculusGrapher.register( 'CalculusGrapherIconFactory', CalculusGrapherIconFactory );
export default CalculusGrapherIconFactory;