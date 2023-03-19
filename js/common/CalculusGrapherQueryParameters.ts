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

  // Initial value of the 'Variable' preference.
  // The function variable to be used throughout the simulation
  functionVariable: {
    type: 'string',
    defaultValue: 'x',
    validValues: FunctionVariableValues,
    public: true
  },

  // Initial value of the 'Notation' preference.
  // The derivative notation to be used throughout the simulation
  derivativeNotation: {
    type: 'string',
    defaultValue: 'lagrange',
    validValues: DerivativeNotationValues,
    public: true
  },

  // Initial value of the 'Discontinuities' preference.
  // Whether to connect discontinuities with nothing or a dashed line
  connectDiscontinuities: {
    type: 'string',
    defaultValue: 'noLine',
    validValues: ConnectDiscontinuitiesValues,
    public: true
  },

  // Initial value of the 'Values' preference.
  // Shows numerical values wherever they appear in the sim: tick labels, tangent-line slope, etc.
  valuesVisible: {
    type: 'boolean',
    defaultValue: false,
    public: true
  },

  // Initial value of the 'Predict' preference.
  // Determines whether features related to the predict curve are shown in the UI.
  predict: {
    type: 'boolean',
    defaultValue: false,
    public: true
  },

  // Whether the 'Show f(x)' checkbox will be shown when in 'Predict' mode.
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
   * using a Gaussian kernel. The value below is the standard deviation of the Gaussian function kernel.
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
   * The maximum tilting (slope) of curves relative to the horizontal. Used for Tilt in Curve Manipulation Mode
   * See https://github.com/phetsims/calculus-grapher/issues/26
   */
  maxTilt: {
    type: 'number',
    isValidValue: value => value > 0,
    defaultValue: 3
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
  labeledLinesVisible: {
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
