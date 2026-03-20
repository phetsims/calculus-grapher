// Copyright 2020-2026, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 *
 * @author Brandon Li
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import logGlobal from '../../../phet-core/js/logGlobal.js';
import { QueryStringMachine } from '../../../query-string-machine/js/QueryStringMachineModule.js';
import CalculusGrapherConstants from './CalculusGrapherConstants.js';

export const ConnectDiscontinuitiesValues = [ 'noLine', 'dashedLine' ] as const;
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
  functionVariable: {
    type: 'string',
    defaultValue: 'x',
    validValues: FunctionVariableValues,
    public: true
  },

  // Initial value of the 'Notation' preference.
  derivativeNotation: {
    type: 'string',
    defaultValue: 'lagrange',
    validValues: DerivativeNotationValues,
    public: true
  },

  // Initial value of the 'Discontinuities' preference.
  connectDiscontinuities: {
    type: 'string',
    defaultValue: 'noLine',
    validValues: ConnectDiscontinuitiesValues,
    public: true
  },

  // Initial value of the 'Values' preference.
  // Shows numerical values wherever they appear in the visual UI: tick labels, tangent-line slope, etc.
  valuesVisible: {
    type: 'boolean',
    defaultValue: false,
    public: true
  },

  // Initial value of the 'Predict' preference.
  predict: {
    type: 'boolean',
    defaultValue: false,
    public: true
  },

  // Whether the 'Show f(x)' checkbox will be shown when in 'Predict' mode.
  hasShowPrimaryCurveCheckboxProperty: {
    type: 'boolean',
    defaultValue: true,
    public: true
  },

  //====================================================================================================================
  // private - for internal use only
  //====================================================================================================================

  /**
   * Curves are discretized into equally spaced points. The higher the numberOfPoints the more faithful is the
   * reproduction of a curve. For values less than 400 points, oddities are visible for the Area Under Curve tool
   * and Tangent tool. See https://github.com/phetsims/calculus-grapher/issues/176
   */
  numberOfPoints: {
    type: 'number',
    isValidValue: value => value > 0,
    // This value was arrived at by experimenting and provides a nice tradeoff between smoothness of the curve and performance.
    defaultValue: 1251
  },

  /**
   * The smooth algorithm uses a Gaussian kernel procedure described in https://en.wikipedia.org/wiki/Kernel_smoother.
   * The value below is the standard deviation of the Gaussian kernel. The larger the standard deviation is,
   * the smoother the function.
   */
  smoothingStandardDeviation: {
    type: 'number',
    isValidValue: value => value > 0,
    defaultValue: 0.005 * CalculusGrapherConstants.CURVE_X_RANGE.getLength()
  },

  /**
   * CurveManipulationType.PEDESTAL creates a smooth and continuous trapezoidal-shaped curve with rounded corners.
   * The rounded corners are set by a constant called edgeSlopeFactor. A larger value creates a wider edge.
   * https://github.com/phetsims/calculus-grapher/issues/75
   */
  edgeSlopeFactor: {
    type: 'number',
    isValidValue: value => value >= 0,
    defaultValue: 0.04 * CalculusGrapherConstants.CURVE_X_RANGE.getLength()
  },

  /**
   * CurveManipulationType.TILT tilts the curve relative to the horizontal axis, anchored at x=0. To prevent problems
   * with having an infinite slope, we set a maximum tilt (slope). The default value strikes a balance between the curve
   * manipulator getting disconnected from the curve, and the curve becoming visually lost as it approaches the y-axis.
   * See https://github.com/phetsims/calculus-grapher/issues/26 for motivation.
   * See https://github.com/phetsims/calculus-grapher/issues/392 for defaultValue change.
   */
  maxTilt: {
    type: 'number',
    isValidValue: value => value > 0,
    defaultValue: 25
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

  // Enables the arrows that cue the user to drag the curve.
  cueingArrowsEnabled: {
    type: 'boolean',
    defaultValue: true
  }
} );

// Log query parameters
logGlobal( 'phet.chipper.queryParameters' );
logGlobal( 'phet.preloads.phetio.queryParameters' );
phet.log && phet.log( `CalculusGrapherQueryParameters: ${JSON.stringify( CalculusGrapherQueryParameters, null, 2 )}` );

export default CalculusGrapherQueryParameters;
