// Copyright 2020, University of Colorado Boulder

/**
 * Curve is the base-class for a single curve that appears in a 'Calculus Grapher' simulation. It provides functionality
 * that is common to all CurveTyes and is intended to be sub-classed for CurveType-specific features.
 *
 * For an overview of the class hierarchy of Curves, see
 * https://github.com/phetsims/calculus-grapher/blob/master/doc/implementation-notes.md
 *
 * Primary responsibilities are:
 *   - Create an array of CurvePoints for 'every' x-value in its interval. Technically, there is an infinite number
 *     of x-values in an interval, but we represent the curve by creating a large finite number of CurvePoints that are
 *     close together.
 *   - Create convenience methods to reference and mutate CurvePoints at a x-value.
 *   - Provide the reset method and other convenience methods.
 *
 * For the 'Calculus Grapher' sim, the same Curves instances are used throughout the lifetime of the simulation. Curves
 * are created at the start of the sim and persist, so no dispose method is necessary.
 *
 * @author Brandon Li
 */

import calculusGrapher from '../../calculusGrapher.js';

class Curve {

  constructor() {

  }
}

calculusGrapher.register( 'Curve', Curve );
export default Curve;