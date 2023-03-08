// Copyright 2023, University of Colorado Boulder

/**
 * CalculusGrapherScreenIconFactory is a collection of factory methods for creating ScreenIcons.
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

const CURVE_WIDTH = 50; // width of the curves in each icon
const LINE_WIDTH = 2; // lineWidth value for Paths

// Gaussian
function createOriginalShape( curveHeight = 10 ): Shape {

  const bellWidth = 0.8 * CURVE_WIDTH;
  const xStart = ( CURVE_WIDTH - bellWidth ) / 2;
  const xEnd = CURVE_WIDTH - xStart;

  // Gaussian coefficients, see https://en.wikipedia.org/wiki/Gaussian_function
  const a = curveHeight;
  const b = xStart + bellWidth / 2;
  const c = 6; // standard deviation

  const shape = new Shape().moveTo( 0, 0 ).lineTo( xStart, 0 );
  for ( let x = xStart; x < xEnd; x++ ) {
    const y = a * Math.exp( -Math.pow( x - b, 2 ) / ( 2 * c * c ) );
    shape.lineTo( x, -y ); // flip the sign for scenery view coordinate frame
  }
  shape.lineTo( CURVE_WIDTH, 0 );

  return shape;
}

// Sigmoid, integral of Gaussian
function createIntegralShape( curveHeight = 10 ): Shape {

  const sigmoidWidth = CURVE_WIDTH;
  const xStart = 0;
  const xEnd = CURVE_WIDTH;

  const a = curveHeight;
  const b = 0.03 * sigmoidWidth;

  const shape = new Shape();
  for ( let x = xStart; x < xEnd; x++ ) {
    const y = a / ( 1 + Math.exp( -( x - CURVE_WIDTH / 2 ) / b ) );
    shape.lineTo( x, -y ); // flip the sign for scenery view coordinate frame
  }

  return shape;
}

// Derivative of Gaussian
function createDerivativeShape( curveHeight = 10 ): Shape {

  const bellWidth = 0.8 * CURVE_WIDTH;
  const xStart = ( CURVE_WIDTH - bellWidth ) / 2;
  const xEnd = CURVE_WIDTH - xStart;

  // Gaussian coefficients, see https://en.wikipedia.org/wiki/Gaussian_function
  const a = curveHeight;
  const b = xStart + bellWidth / 2;
  const c = 6; // standard deviation

  const shape = new Shape().moveTo( 0, 0 ).lineTo( xStart, 0 );
  for ( let x = xStart; x < xEnd; x++ ) {
    const y = a * Math.exp( -Math.pow( x - b, 2 ) / ( 2 * c * c ) ) * ( b - x );
    shape.lineTo( x, -y ); // flip the sign for scenery view coordinate frame
  }
  shape.lineTo( CURVE_WIDTH, 0 );

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
    const curveNode = new Path( createDerivativeShape( 2.5 ), {
      stroke: CalculusGrapherColors.derivativeCurveStrokeProperty,
      lineWidth: LINE_WIDTH
    } );

    // Math expression above the curve
    const iconNode = new VBox( {
      children: [ expressionNode, curveNode ],
      spacing: 4
    } );

    return new ScreenIcon( iconNode, {
      fill: CalculusGrapherColors.screenBackgroundColorProperty,
      maxIconWidthProportion: 0.85
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
      fill: CalculusGrapherColors.screenBackgroundColorProperty,
      maxIconWidthProportion: 0.85
    } );
  },

  /**
   * Creates the ScreenIcon for the 'Advanced' screen.
   */
  createAdvancedScreenIcon(): ScreenIcon {

    const triangleWidth = CURVE_WIDTH;
    const triangleHeight = 12;
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
      spacing: 5
    } );

    return new ScreenIcon( iconNode, {
      fill: CalculusGrapherColors.screenBackgroundColorProperty
    } );
  },

  /**
   * Creates the ScreenIcon for the 'Lab' screen.
   */
  createLabScreenIcon(): ScreenIcon {

    const curveHeight = 15;

    // 3 curves, as in the Lab screen
    const integralCurveNode = new Path( createIntegralShape( curveHeight ), {
      stroke: CalculusGrapherColors.integralCurveStrokeProperty,
      lineWidth: LINE_WIDTH
    } );

    const originalCurveNode = new Path( createOriginalShape( curveHeight ), {
      stroke: CalculusGrapherColors.originalCurveStrokeProperty,
      lineWidth: LINE_WIDTH
    } );

    const derivativeCurveNode = new Path( createDerivativeShape( 0.25 * curveHeight ), {
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