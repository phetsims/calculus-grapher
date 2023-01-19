// Copyright 2022-2023, University of Colorado Boulder

/**
 * OriginalGraphNode is the view representation of an Original Graph, which includes two curves
 *  that can be user-manipulated as well as cueing arrows. OriginalGraphNode extends GraphNode.
 * The zoom Button of GraphNode is set to invisible for OriginalGraphNode
 *
 * @author Martin Veillette
 * @author Brandon Li
 */

import calculusGrapher from '../../calculusGrapher.js';
import TransformedCurveNode from './TransformedCurveNode.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import GraphNode, { GraphNodeOptions } from './GraphNode.js';
import { HBox, Node, Text } from '../../../../scenery/js/imports.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import CurveNode, { CurveNodeOptions } from './CurveNode.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import CalculusGrapherModel from '../model/CalculusGrapherModel.js';
import CalculusGrapherVisibleProperties from './CalculusGrapherVisibleProperties.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import GraphTypeLabelNode from './GraphTypeLabelNode.js';
import LabeledPointNode from './LabeledPointNode.js';

type SelfOptions = EmptySelfOptions;

type OriginalGraphNodeOptions = SelfOptions & GraphNodeOptions;

export default class OriginalGraphNode extends GraphNode {

  // node for the predict curve
  private readonly predictCurveNode: CurveNode;

  public constructor( model: CalculusGrapherModel,
                      visibleProperties: CalculusGrapherVisibleProperties,
                      graphHeightProperty: TReadOnlyProperty<number>,
                      providedOptions: GraphNodeOptions ) {

    // destructuring the calculus grapher model
    const { originalCurve, predictCurve, curveManipulationProperties, predictModeEnabledProperty } = model;

    // original curve is visible if not in predictMode or allOriginalCurveVisible is true
    const originalCurveNodeVisibilityProperty = new DerivedProperty( [ predictModeEnabledProperty, visibleProperties.allOriginalCurvesVisibleProperty ],
      ( predictModeEnabled, allOriginalCurvesVisible ) =>
        !predictModeEnabled || allOriginalCurvesVisible );

    const options = optionize<OriginalGraphNodeOptions, SelfOptions, GraphNodeOptions>()( {

        createCurveNode: ( chartTransform: ChartTransform,
                           providedOptions?: CurveNodeOptions ) => new TransformedCurveNode( originalCurve,
          curveManipulationProperties, chartTransform, providedOptions ),
        curveNodeOptions: {
          stroke: providedOptions.curveStroke,
          enabledProperty: DerivedProperty.not( predictModeEnabledProperty ),
          visibleProperty: originalCurveNodeVisibilityProperty,
          tandem: providedOptions.tandem.createTandem( 'originalCurveNode' )
        },
        chartRectangleOptions: {
          fill: CalculusGrapherColors.originalChartBackgroundFillProperty,
          stroke: CalculusGrapherColors.originalChartBackgroundStrokeProperty
        },
        plusMinusZoomButtonGroupOptions: {
          visible: false
        }
      },
      providedOptions );

    // Label that toggles between 'Predict f(x)' and 'f(x)'
    const labelNode = new HBox( {
      children: [
        new Text( CalculusGrapherStrings.predictStringProperty, {
          font: CalculusGrapherConstants.CONTROL_FONT,
          maxWidth: 100,
          visibleProperty: model.predictModeEnabledProperty
        } ),
        new GraphTypeLabelNode( 'original' ) ],
      spacing: 5
    } );

    super( originalCurve, visibleProperties.gridVisibleProperty, graphHeightProperty, labelNode, options );

    // create a predictCurveNode
    this.predictCurveNode = new TransformedCurveNode( predictCurve, curveManipulationProperties, this.chartTransform, {
      enabledProperty: predictModeEnabledProperty,
      visibleProperty: predictModeEnabledProperty,
      stroke: CalculusGrapherColors.predictCurveStrokeProperty,
      continuousLinePlotOptions: {
        lineWidth: 1.75
      },
      tandem: providedOptions.tandem.createTandem( 'predictCurveNode' )
    } );

    this.curveLayer.addChild( this.predictCurveNode );

    const showOriginalCurveCheckboxContent = new HBox( {
      children: [
        new Text( CalculusGrapherStrings.showStringProperty, {
          font: CalculusGrapherConstants.CONTROL_FONT,
          maxWidth: 100
        } ),
        new GraphTypeLabelNode( 'original' )
      ],
      spacing: 5
    } );

    const showOriginalCurveCheckbox = new Checkbox( visibleProperties.allOriginalCurvesVisibleProperty,
      showOriginalCurveCheckboxContent, {
        boxWidth: CalculusGrapherConstants.CHECKBOX_WIDTH,
        visibleProperty: predictModeEnabledProperty,
        tandem: providedOptions.tandem.createTandem( 'showOriginalCurveCheckbox' )
      } );
    this.addChild( showOriginalCurveCheckbox );

    // Upper-right corner of the chart
    showOriginalCurveCheckbox.boundsProperty.link( () => {
      showOriginalCurveCheckbox.top = 10;
      showOriginalCurveCheckbox.right = this.chartTransform.modelToViewX( CalculusGrapherConstants.CURVE_X_RANGE.getMax() ) - 10;
    } );

    graphHeightProperty.link( height => {

      // TODO : too much repetition
      this.curveNode.dragBoundsProperty.value.setMaxY( height );
      this.predictCurveNode.dragBoundsProperty.value.setMaxY( height );

      // TODO: find a way to update touch/mouse area without resorting to this: https://github.com/phetsims/calculus-grapher/issues/74
      this.setCurvePointerAreas();
    } );

    this.zoomLevelProperty.link( () => {

      // TODO: find a way to update touch/mouse area without resorting to this: https://github.com/phetsims/calculus-grapher/issues/74
      this.setCurvePointerAreas();
    } );

    // Labeled points
    const labeledPointsTandem = options.tandem.createTandem( 'labeledPoints' );
    const labeledPointNodes = model.labeledPoints.map( labeledPoint =>
      new LabeledPointNode( labeledPoint, this.chartTransform, model.predictModeEnabledProperty, {
        tandem: labeledPointsTandem.createTandem( `${labeledPoint.labelProperty.value}PointNode` )
      } ) );

    // Put LabeledPointNodes in their own layer, so they will not be clipped at x min/max.
    const labeledPointsLayer = new Node( {
      children: labeledPointNodes
    } );
    this.addChild( labeledPointsLayer );
  }

  public override reset(): void {
    super.reset();
    this.predictCurveNode.reset();
  }

  private setCurvePointerAreas(): void {
    this.curveNode.setPointerAreas();
    this.predictCurveNode.setPointerAreas();
  }
}

calculusGrapher.register( 'OriginalGraphNode', OriginalGraphNode );
