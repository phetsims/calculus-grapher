// Copyright 2020-2023, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 *
 * @author Brandon Li
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import calculusGrapher from '../calculusGrapher.js';
import logGlobal from '../../../phet-core/js/logGlobal.js';
import CalculusGrapherConstants from './CalculusGrapherConstants.js';

export const ConnectDiscontinuitiesValues = [ 'noLine', 'dashedLine' ];
export type ConnectDiscontinuities = ( typeof ConnectDiscontinuitiesValues )[ number ];

export const DerivativeNotationValues = [ 'lagrange', 'leibniz' ] as const;
export type DerivativeNotation = ( typeof DerivativeNotationValues )[number];

export const FunctionVariableValues = [ 'x', 't' ] as const;
export type FunctionVariable = ( typeof FunctionVariableValues )[number];

const CalculusGrapherQueryParameters = QueryStringMachine.getAll( {

  //====================================================================================================================
  // public
  //====================================================================================================================

  /**
   * Shows numerical values wherever they appear in the sim: tick labels, tangent-line slope, etc.
   */
  valuesVisible: {
    type: 'boolean',
    defaultValue: false,
    public: true
  },

  // Whether to connect discontinuities with nothing or a dashed line
  connectDiscontinuities: {
    type: 'string',
    defaultValue: 'noLine',
    validValues: ConnectDiscontinuitiesValues,
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
  },

  /**
   * Whether the 'Predict' feature is available
   */
  predict: {
    type: 'boolean',
    defaultValue: false,
    public: true
  },

  /**
   * Whether the 'Show f(x)' checkbox will be shown when in 'Predict' mode.
   */
  hasShowOriginalCurveCheckbox: {
    type: 'boolean',
    defaultValue: true,
    public: true
  },

  //====================================================================================================================
  // private - for internal use only
  //====================================================================================================================

  /**
   * The Curves for 'Calculus Grapher' are discretized into equally spaced points. The higher the numberOfPoints
   * the more faithful is the reproduction of a curve. For values less than 400 points, oddities
   * are apparent for the underTheCurveTool and tangentTool (see https://github.com/phetsims/calculus-grapher/issues/176)
   */
  numberOfPoints: {
    type: 'number',
    isValidValue: value => value > 0,
    defaultValue: 1251
  },

  /**
   * The smooth algorithm for 'Calculus Grapher' uses a procedure described in https://en.wikipedia.org/wiki/Kernel_smoother.
   * using a gaussian kernel. The value below is the standard deviation of the gaussian function kernel.
   * The larger the standard deviation is, the smoother the function.
   */
  smoothingStandardDeviation: {
    type: 'number',
    isValidValue: value => value > 0,
    defaultValue: 0.005 * CalculusGrapherConstants.CURVE_X_RANGE.getLength()
  },

  /**
   * The pedestal mode creates a smooth and continuous trapezoidal-shaped curve with rounded corners.
   * The rounded corners are set by a constant called edgeSlopeFactor.
   * A larger value creates a wider edge.
   * https://github.com/phetsims/calculus-grapher/issues/75
   */
  edgeSlopeFactor: {
    type: 'number',
    isValidValue: value => value >= 0,
    defaultValue: 0.04 * CalculusGrapherConstants.CURVE_X_RANGE.getLength()
  },

  /**
   * The maximum tilting of curves relative to the horizontal in radians. See
   * https://github.com/phetsims/calculus-grapher/issues/26
   */
  maxTilt: {
    type: 'number',
    isValidValue: value => value >= 0 && value < Math.PI / 2,
    defaultValue: Math.PI / 4
  },

  /**
   * The maximum difference between the angle (in radians) of the left and right secant lines of a Point on a curve for it to be
   * considered differentiable. Otherwise, the point will be labeled a cusp.
   * See https://github.com/phetsims/calculus-grapher/issues/28
   */
  angleMismatchThreshold: {
    type: 'number',
    isValidValue: value => value > 0,
    defaultValue: 25 * Math.PI / 180
  },

  /**
   * The maximum slope at a Point on a curve for it to be considered differentiable.
   * Beyond this value, the point will be considered discontinuous
   * See https://github.com/phetsims/calculus-grapher/issues/28
   */
  slopeThreshold: {
    type: 'number',
    isValidValue: value => value > 0,
    defaultValue: 200
  },

  // Cycle through preset functions using the left/right arrow keys.
  presetFunctions: {
    type: 'boolean',
    defaultValue: false
  },

  // Shows all the curve points as circles in a scatter plot.
  allPoints: {
    type: 'boolean',
    defaultValue: false
  },

  // Shows the cusp points on a curve as circles in a scatter plot
  cuspPoints: {
    type: 'boolean',
    defaultValue: false
  },

  // For debugging, to make all LabeledLine instances initially visible.
  verticalLinesVisible: {
    type: 'boolean',
    defaultValue: false
  },

  // For debugging, to make all LabeledPoint instances initially visible.
  labeledPointsVisible: {
    type: 'boolean',
    defaultValue: false
  },

  // Alpha for CalculusGrapherColors.integralPositiveFillProperty, so that PhET designer can fine-tune
  // See https://github.com/phetsims/calculus-grapher/issues/166
  positiveAlpha: {
    type: 'number',
    isValidValue: alpha => ( alpha > 0 && alpha <= 1 ),
    defaultValue: 0.25
  },

  // Alpha for CalculusGrapherColors.integralPositiveFillProperty, so that PhET designer can fine-tune
  // See https://github.com/phetsims/calculus-grapher/issues/166
  negativeAlpha: {
    type: 'number',
    isValidValue: alpha => ( alpha > 0 && alpha <= 1 ),
    defaultValue: 0.55
  }
} );

calculusGrapher.register( 'CalculusGrapherQueryParameters', CalculusGrapherQueryParameters );

// Log query parameters
logGlobal( 'phet.chipper.queryParameters' );
logGlobal( 'phet.preloads.phetio.queryParameters' );
logGlobal( 'phet.calculusGrapher.CalculusGrapherQueryParameters' );

export default CalculusGrapherQueryParameters;
