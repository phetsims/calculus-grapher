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
import { AlignBox, AlignGroup, Circle, Line, Node, Path, VBox } from '../../../../scenery/js/imports.js';
import { Shape } from '../../../../kite/js/imports.js';

const EXPRESSION_ALIGN_GROUP = new AlignGroup(); // To give all math expressions the same effective size
const CURVE_WIDTH = 50; // width of the curves in each icon
const LINE_WIDTH = 2; // lineWidth value for Paths

const CalculusGrapherScreenIconFactory = {

  /**
   * Creates the ScreenIcon for the 'Derivative' screen.
   */
  createDerivativeScreenIcon(): ScreenIcon {

    // Derivative math expression, the form of which changes based on 'Variable' and 'Notation' preferences
    const expressionNode = new AlignBox( new GraphTypeLabelNode( GraphType.DERIVATIVE ), {
      group: EXPRESSION_ALIGN_GROUP
    } );

    // A sample curve, rendered with the color of the derivative curve
    const curveNode = new Line( 0, 0, CURVE_WIDTH, 0, {
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
    const expressionNode = new AlignBox( new GraphTypeLabelNode( GraphType.INTEGRAL ), {
      group: EXPRESSION_ALIGN_GROUP
    } );

    // A sample curve, rendered with the color of the integral curve.
    const curveNode = new Line( 0, 0, CURVE_WIDTH, 0, {
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

    // Triangle curve, rendered with the color of the original curve
    const triangleShape = new Shape()
      .moveTo( 0, 0 )
      .lineTo( triangleWidth / 2, -triangleHeight )
      .lineTo( triangleWidth, 0 );
    const trianglePath = new Path( triangleShape, {
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
    const derivativeNode = new Node( {
      children: [ leftLine, rightLine, leftDiscontinuityPoint, rightDiscontinuityPoint ]
    } );

    // Original curve above the derivative curve
    const iconNode = new VBox( {
      children: [ trianglePath, derivativeNode ],
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

    // 3 curves, as in the Lab screen
    const originalCurveNode = new Line( 0, 0, CURVE_WIDTH, 0, {
      stroke: CalculusGrapherColors.originalCurveStrokeProperty,
      lineWidth: LINE_WIDTH
    } );
    const derivativeCurveNode = new Line( 0, 0, CURVE_WIDTH, 0, {
      stroke: CalculusGrapherColors.derivativeCurveStrokeProperty,
      lineWidth: LINE_WIDTH
    } );
    const secondDerivativeCurveNode = new Line( 0, 0, CURVE_WIDTH, 0, {
      stroke: CalculusGrapherColors.secondDerivativeCurveStrokeProperty,
      lineWidth: LINE_WIDTH
    } );

    // Vertical layout of the 3 curves
    const iconNode = new VBox( {
      children: [ originalCurveNode, derivativeCurveNode, secondDerivativeCurveNode ],
      spacing: 6
    } );
    return new ScreenIcon( iconNode, {
      fill: CalculusGrapherColors.screenBackgroundColorProperty
    } );
  }
};

calculusGrapher.register( 'CalculusGrapherScreenIconFactory', CalculusGrapherScreenIconFactory );
export default CalculusGrapherScreenIconFactory;