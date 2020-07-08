// Copyright 2020, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 *
 * @author Brandon Li
 */

import calculusGrapher from '../calculusGrapher.js';

const CalculusGrapherQueryParameters = QueryStringMachine.getAll( {

  /**
   * The number of CurvePoints per coordinate of Curves. For the 'Calculus Grapher' simulation, there are a large
   * number of curve points that map out the y-values of the curve. This value changes how close together the points
   * are, where a higher number means more points packed together.
   *
   * For internal use only.
   */
  pointsPerCoordinate: {
    type: 'number',
    isValidValue: value => ( value > 0 ),
    defaultValue: 12
  },

  /**
   * The 'window' width for smoothing, in model coordinates (x-values). The smooth algorithm for 'Calculus Grapher' uses
   * the moving average algorithm described in https://en.wikipedia.org/wiki/Moving_average#Simple_moving_average. This
   * value is the width of the window to sample (on each side) for each Point's value.
   *
   * For internal use.
   */
  smoothingWindowWidth: {
    type: 'number',
    isValidValue: value => ( value > 0 ),
    defaultValue: 1.2
  }
} );

calculusGrapher.register( 'CalculusGrapherQueryParameters', CalculusGrapherQueryParameters );
export default CalculusGrapherQueryParameters;