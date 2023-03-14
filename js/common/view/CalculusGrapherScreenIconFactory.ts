// Copyright 2023, University of Colorado Boulder

/**
 * CalculusGrapherScreenIconFactory is a collection of factory methods for creating dynamic ScreenIcons.
 * See https://github.com/phetsims/calculus-grapher/issues/139 for design history.
 *
 * The curves for these icons are created solely using kite.Shape, not using bamboo. Colors are Properties
 * from CalculusGrapherColors, so that color changes (via the phetmarks Color Editor, or via Studio) cause
 * the icons to update. The math expressions in these icons update when the 'Variable' and 'Notation'
 * preferences are changed.
 *
 * Note that the same 3 Shapes are used for curves in the Derivative, Integral, and Lab screen icons. If there's
 * a need to customize these curves in the future, then the functions that create them will need to be further
 * parameterized, and the arguments will need to be tweaked to provide the desired look.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import calculusGrapher from '../../calculusGrapher.js';
import GraphTypeLabelNode from './GraphTypeLabelNode.js';
import GraphType from '../model/GraphType.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import ScreenIcon from '../../../../joist/js/ScreenIcon.js';
import { Circle, Line, Node, Path, VBox } from '../../../../scenery/js/imports.js';
import { Shape } from '../../../../kite/js/imports.js';

const CURVE_WIDTH = 50; // width of the curves for the Derivative, Integral, and Lab screen icons
const CURVE_HEIGHT = 10; // height of the curves for the Derivative, Integral, and Lab screen icons
const LINE_WIDTH = 2; // lineWidth value for Paths
const STANDARD_DEVIATION = 6; // of the Gaussian curve and its derivative

/**
 * Creates a Gaussian shape for the original curve.
 */
function createOriginalShape(): Shape {

  // Gaussian coefficients, see https://en.wikipedia.org/wiki/Gaussian_function
  const a = -CURVE_HEIGHT; // sign is flipped for scenery view coordinate frame
  const b = CURVE_WIDTH / 2;
  const c = STANDARD_DEVIATION;

  const shape = new Shape();
  for ( let x = 0; x <= CURVE_WIDTH; x++ ) {

    // sign is flipped for scenery view coordinate frame
    const y = a * Math.exp( -Math.pow( x - b, 2 ) / ( 2 * c * c ) );
    if ( x === 0 ) {
      shape.moveTo( x, y );
    }
    else {
      shape.lineTo( x, y );
    }
  }

  return shape;
}

/**
 * Creates a derivative-of-Gaussian shape for the original curve.
 * The implementation is similar to createOriginalShape, but with a yFactor and different y computation.
 */
function createDerivativeShape(): Shape {

  const a = -CURVE_HEIGHT; // sign is flipped for scenery view coordinate frame
  const b = CURVE_WIDTH / 2;
  const c = STANDARD_DEVIATION;
  const yFactor = 0.25; // to scale, because this is the derivative of a Gaussian

  const shape = new Shape();
  for ( let x = 0; x <= CURVE_WIDTH; x++ ) {
    const y = yFactor * a * Math.exp( -Math.pow( x - b, 2 ) / ( 2 * c * c ) ) * ( b - x );
    if ( x === 0 ) {
      shape.moveTo( x, y );
    }
    else {
      shape.lineTo( x, y );
    }
  }

  return shape;
}

/**
 * Creates an integral-of-Gaussian curve (a sigmoid).
 */
function createIntegralShape(): Shape {

  const a = -CURVE_HEIGHT; // sign is flipped for scenery view coordinate frame
  const b = 0.03 * CURVE_WIDTH;

  const shape = new Shape();
  for ( let x = 0; x <= CURVE_WIDTH; x++ ) {
    const y = a / ( 1 + Math.exp( -( x - CURVE_WIDTH / 2 ) / b ) );
    if ( x === 0 ) {
      shape.moveTo( x, y );
    }
    else {
      shape.lineTo( x, y );
    }
  }

  return shape;
}

const CalculusGrapherScreenIconFactory = {

  /**
   * Creates the ScreenIcon for the 'Derivative' screen.
   */
  createDerivativeScreenIcon(): ScreenIcon {

    // Derivative math expression, the form of which changes based on 'Variable' and 'Notation' preferences
    const expressionNode = new GraphTypeLabelNode( GraphType.DERIVATIVE );

    // A sample curve, rendered with the color of the derivative curve
    const curveNode = new Path( createDerivativeShape(), {
      stroke: CalculusGrapherColors.derivativeCurveStrokeProperty,
      lineWidth: LINE_WIDTH
    } );

    // Math expression above the curve
    const iconNode = new VBox( {
      children: [ expressionNode, curveNode ],
      spacing: 4
    } );

    return new ScreenIcon( iconNode, {
      fill: CalculusGrapherColors.screenBackgroundColorProperty
    } );
  },

  /**
   * Creates the ScreenIcon for the 'Integral' screen.
   */
  createIntegralScreenIcon(): ScreenIcon {

    // Integral math expression, the form of which changes based on 'Variable' and 'Notation' preferences.
    const expressionNode = new GraphTypeLabelNode( GraphType.INTEGRAL );

    // A sample curve, rendered with the color of the integral curve.
    const curveNode = new Path( createIntegralShape(), {
      stroke: CalculusGrapherColors.integralCurveStrokeProperty,
      lineWidth: LINE_WIDTH
    } );

    // Math expression above the curve
    const iconNode = new VBox( {
      children: [ expressionNode, curveNode ],
      spacing: 4
    } );

    return new ScreenIcon( iconNode, {
      fill: CalculusGrapherColors.screenBackgroundColorProperty
    } );
  },

  /**
   * Creates the ScreenIcon for the 'Advanced' screen.
   */
  createAdvancedScreenIcon(): ScreenIcon {

    const triangleWidth = 80;
    const triangleHeight = 15;
    const discontinuityPointRadius = 2;

    // Original curve, a triangle rendered with the color of the original curve
    const triangleShape = new Shape()
      .moveTo( 0, 0 )
      .lineTo( triangleWidth / 2, -triangleHeight )
      .lineTo( triangleWidth, 0 );
    const originalCurveNode = new Path( triangleShape, {
      stroke: CalculusGrapherColors.originalCurveStrokeProperty,
      lineWidth: LINE_WIDTH
    } );

    // Derivative curve, which contains a discontinuity at the peak of the triangle
    const leftLine = new Line( 0, 0, triangleWidth / 2, 0, {
      stroke: CalculusGrapherColors.derivativeCurveStrokeProperty,
      lineWidth: LINE_WIDTH
    } );
    const rightLine = new Line( triangleWidth / 2, triangleHeight, triangleWidth, triangleHeight, {
      stroke: CalculusGrapherColors.derivativeCurveStrokeProperty,
      lineWidth: LINE_WIDTH
    } );
    const leftDiscontinuityPoint = new Circle( {
      x: triangleWidth / 2,
      y: 0,
      radius: discontinuityPointRadius,
      stroke: CalculusGrapherColors.derivativeCurveStrokeProperty,
      fill: CalculusGrapherColors.screenBackgroundColorProperty,
      lineWidth: LINE_WIDTH
    } );
    const rightDiscontinuityPoint = new Circle( {
      x: triangleWidth / 2,
      y: triangleHeight,
      radius: discontinuityPointRadius,
      stroke: CalculusGrapherColors.derivativeCurveStrokeProperty,
      fill: CalculusGrapherColors.screenBackgroundColorProperty,
      lineWidth: LINE_WIDTH
    } );
    const derivativeCurveNode = new Node( {
      children: [ leftLine, rightLine, leftDiscontinuityPoint, rightDiscontinuityPoint ]
    } );

    // Original curve above the derivative curve
    const iconNode = new VBox( {
      children: [ originalCurveNode, derivativeCurveNode ],
      spacing: 8
    } );

    return new ScreenIcon( iconNode, {
      fill: CalculusGrapherColors.screenBackgroundColorProperty,
      maxIconWidthProportion: 1
    } );
  },

  /**
   * Creates the ScreenIcon for the 'Lab' screen.
   */
  createLabScreenIcon(): ScreenIcon {

    // 3 curves, as in the Lab screen
    const integralCurveNode = new Path( createIntegralShape(), {
      stroke: CalculusGrapherColors.integralCurveStrokeProperty,
      lineWidth: LINE_WIDTH
    } );

    const originalCurveNode = new Path( createOriginalShape(), {
      stroke: CalculusGrapherColors.originalCurveStrokeProperty,
      lineWidth: LINE_WIDTH
    } );

    const derivativeCurveNode = new Path( createDerivativeShape(), {
      stroke: CalculusGrapherColors.derivativeCurveStrokeProperty,
      lineWidth: LINE_WIDTH
    } );

    // Vertical layout of the 3 curves
    const iconNode = new VBox( {
      children: [ integralCurveNode, originalCurveNode, derivativeCurveNode ],
      spacing: 6
    } );
    return new ScreenIcon( iconNode, {
      fill: CalculusGrapherColors.screenBackgroundColorProperty
    } );
  }
};

calculusGrapher.register( 'CalculusGrapherScreenIconFactory', CalculusGrapherScreenIconFactory );
export default CalculusGrapherScreenIconFactory;