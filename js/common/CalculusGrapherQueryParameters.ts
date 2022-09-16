// Copyright 2020-2021, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 *
 * @author Brandon Li
 */

// @ts-nocheck
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
    isValidValue: value => value > 0,
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
    isValidValue: value => value > 0,
    defaultValue: 1.2
  },

  /**
   * The maximum tilting of curves relative to the horizontal. See
   * https://github.com/phetsims/calculus-grapher/issues/26
   *
   * For internal use.
   */
  maxTilt: {
    type: 'number',
    isValidValue: value => value >= 0 && value < 90,
    defaultValue: 45
  },

  /**
   * The maximum difference between the slope of the left and right secant lines of a Point on a curve for it to be
   * considered differentiable.
   * See https://github.com/phetsims/calculus-grapher/issues/28
   *
   * For internal use.
   */
  derivativeThreshold: {
    type: 'number',
    isValidValue: value => value > 0,
    defaultValue: 12
  }
} );

calculusGrapher.register( 'CalculusGrapherQueryParameters', CalculusGrapherQueryParameters );
export default CalculusGrapherQueryParameters;
