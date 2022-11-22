// Copyright 2020-2022, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 *
 * @author Brandon Li
 * @author Martin Veillette
 */

import calculusGrapher from '../calculusGrapher.js';
import logGlobal from '../../../phet-core/js/logGlobal.js';
import { DerivativeNotationValues } from './model/DerivativeNotation.js';
import { FunctionVariableValues } from './model/FunctionVariable.js';

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
    defaultValue: 25
  },

  /**
   * The smooth algorithm for 'Calculus Grapher' uses a procedure described in https://en.wikipedia.org/wiki/Kernel_smoother.
   * using a gaussian kernel. The value below is the standard deviation of the gaussian function kernel.
   * The larger the standard deviation is, the smoother the function.
   *
   * For internal use.
   */
  smoothingStandardDeviation: {
    type: 'number',
    isValidValue: value => value > 0,
    defaultValue: 0.25
  },

  /**
   * The maximum tilting of curves relative to the horizontal in degrees. See
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
   * The pedestal mode creates a smooth and continuous trapezoidal-shaped curve with rounded corners.
   * The rounded corners are set by a constant called edgeSlopeFactor.
   * A larger value creates a wider edge.
   * https://github.com/phetsims/calculus-grapher/issues/75
   *
   * For internal use.
   */
  edgeSlopeFactor: {
    type: 'number',
    isValidValue: value => value >= 0,
    defaultValue: 1.5
  },

  /**
   * The maximum difference between the angle (in radians) of the left and right secant lines of a Point on a curve for it to be
   * considered differentiable.
   * See https://github.com/phetsims/calculus-grapher/issues/28
   *
   * For internal use.
   */
  derivativeThreshold: {
    type: 'number',
    isValidValue: value => value > 0,
    defaultValue: 25 * Math.PI / 180
  },

  /**
   * Shows all the curve points as circles in a scatter plot
   *
   * For internal use.
   */
  allPoints: {
    type: 'boolean',
    defaultValue: false
  },

  /**
   * Shows the cusps points on a curve as circles in a scatter plot
   *
   * For internal use.
   */
  cuspsPoints: {
    type: 'boolean',
    defaultValue: false
  },

  /**
   * Shows numerical values wherever they appear in the sim: tick labels, tangent-line slope, etc.
   */
  valuesVisible: {
    type: 'boolean',
    defaultValue: false,
    public: true
  },

  // Whether to connect discontinuities with a dashed line (true) or leave a gap (false).
  connectDiscontinuities: {
    type: 'boolean',
    defaultValue: false,
    public: true
  },

  // The derivative notation to be used throughout the simulation
  derivativeNotation: {
    type: 'string',
    defaultValue: 'lagrange',
    validValues: DerivativeNotationValues,
    public: true
  },

  // The function variable to be used throughout the simulation
  functionVariable: {
    type: 'string',
    defaultValue: 'x',
    validValues: FunctionVariableValues,
    public: true
  }
} );

calculusGrapher.register( 'CalculusGrapherQueryParameters', CalculusGrapherQueryParameters );

// Log query parameters
logGlobal( 'phet.chipper.queryParameters' );
logGlobal( 'phet.preloads.phetio.queryParameters' );
logGlobal( 'phet.calculusGrapher.CalculusGrapherQueryParameters' );

export default CalculusGrapherQueryParameters;
