// Copyright 2020-2022, University of Colorado Boulder

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
import { Node } from '../../../../scenery/js/imports.js';

// constants
// const CURVE_MANIPULATION_ICON_WIDTH = 10;
// const CURVE_MANIPULATION_ICON_HEIGHT = 5;

const CalculusGrapherIconFactory = {

  /*--------------------------- Screen Icons ---------------------------------*/

  /*--------------------- Curve Manipulation Icons ---------------------------*/

  /**
   * Creates the Curve Manipulation Icon for CurveManipulationModes.HILL.
   */
  createHillIcon(): Node {
    // OriginalCurve.createHillShape
    return new Node();
  },

  /**
   * Creates the Curve Manipulation Icon for CurveManipulationModes.TRIANGLE.
   */
  createLineIcon(): Node {
    return new Node();
  },

  /**
   * Creates the Curve Manipulation Icon for CurveManipulationModes.PEDESTAL.
   */
  createPedestalIcon(): Node {
    return new Node();
  },

  /**
   * Creates the Curve Manipulation Icon for CurveManipulationModes.PARABOLA.
   */
  createParabolaIcon(): Node {
    return new Node();
  },

  /**
   * Creates the Curve Manipulation Icon for CurveManipulationModes.SINE.
   */
  createSineIcon(): Node {
    return new Node();
  },

  /**
   * Creates the Curve Manipulation Icon for CurveManipulationModes.FREEFORM.
   */
  createFreeformIcon(): Node {
    return new Node();
  },

  /**
   * Creates the Curve Manipulation Icon for CurveManipulationModes.TILT.
   */
  createTiltIcon(): Node {
    return new Node();
  },

  /**
   * Creates the Curve Manipulation Icon for CurveManipulationModes.SHIFT.
   */
  createShiftIcon(): Node {
    return new Node();
  }
};

calculusGrapher.register( 'CalculusGrapherIconFactory', CalculusGrapherIconFactory );
export default CalculusGrapherIconFactory;
