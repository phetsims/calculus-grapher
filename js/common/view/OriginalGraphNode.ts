// Copyright 2022, University of Colorado Boulder

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
import Scrubber from './Scrubber.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import CurveNode, { CurveNodeOptions } from './CurveNode.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import CalculusGrapherModel from '../model/CalculusGrapherModel.js';
import CalculusGrapherVisibleProperties from './CalculusGrapherVisibleProperties.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import GraphTypeLabelNode from './GraphTypeLabelNode.js';
import ShadedAreaChart from './ShadedAreaChart.js';
import TangentArrowNode from './TangentArrowNode.js';

type SelfOptions = EmptySelfOptions;

type OriginalGraphNodeOptions = SelfOptions & GraphNodeOptions;

export default class OriginalGraphNode extends GraphNode {

  // node for the predict curve
  private readonly predictCurveNode: CurveNode;

  public constructor( model: CalculusGrapherModel,
                      visibleProperties: CalculusGrapherVisibleProperties,
                      graphHeightProperty: TReadOnlyProperty<number>,
                      labelNode: Node,
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
          stroke: CalculusGrapherColors.originalChartBackgroundStrokeProperty,
          opacity: 1
        },
        plusMinusZoomButtonGroupOptions: {
          visible: false
        }
      },
      providedOptions );

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
          font: CalculusGrapherConstants.CONTROL_FONT
        } ),
        new GraphTypeLabelNode( 'original' )
      ],
      spacing: 5
    } );

    const showOriginalCurveCheckbox = new Checkbox( visibleProperties.allOriginalCurvesVisibleProperty,
      showOriginalCurveCheckboxContent, {
        visibleProperty: predictModeEnabledProperty,
        tandem: providedOptions.tandem.createTandem( 'showOriginalCurveCheckbox' )
      } );
    this.addChild( showOriginalCurveCheckbox );

    // Upper-right corner of the chart
    showOriginalCurveCheckbox.boundsProperty.link( () => {
      showOriginalCurveCheckbox.top = 10;
      showOriginalCurveCheckbox.right = this.chartTransform.modelToViewX( CalculusGrapherConstants.CURVE_X_RANGE.getMax() ) - 10;
    } );

    const scrubber = new Scrubber( model.ancillaryTools.xCoordinateProperty, this.chartTransform, {
      visibleProperty: new DerivedProperty( [
        visibleProperties.areaUnderCurveVisibleProperty,
        visibleProperties.tangentVisibleProperty,
        model.predictModeEnabledProperty ], ( areaUnderCurve, tangent, predictModeEnabled ) =>
        ( areaUnderCurve || tangent ) && !predictModeEnabled ),
      lineOptions: {
        visibleProperty: visibleProperties.areaUnderCurveVisibleProperty
      },
      fill: new DerivedProperty( [ visibleProperties.areaUnderCurveVisibleProperty,
        visibleProperties.tangentVisibleProperty ], ( area, tangent ) => {
        if ( area ) {
          return CalculusGrapherColors.integralCurveStrokeProperty.value;
        }
        else if ( tangent ) {
          return CalculusGrapherColors.derivativeCurveStrokeProperty.value;
        }
        else {
          return null;
        }
      } ),
      tandem: options.tandem.createTandem( 'scrubber' )
    } );

    this.addChild( scrubber );

    const shadedAreaChart = new ShadedAreaChart(
      model.originalCurve,
      this.chartTransform,
      model.ancillaryTools.xCoordinateProperty, {
        upFill: new DerivedProperty(
          [ CalculusGrapherColors.integralCurveStrokeProperty ],
          color => color.brighterColor( 0.8 ) ),
        downFill: new DerivedProperty(
          [ CalculusGrapherColors.integralCurveStrokeProperty ],
          color => color.brighterColor( 0.6 ) ),
        visibleProperty: new DerivedProperty( [
          visibleProperties.areaUnderCurveVisibleProperty,
          model.predictModeEnabledProperty ], ( areaUnderCurve, predictModeEnabled ) =>
          areaUnderCurve && !predictModeEnabled )
      } );
    this.curveLayer.addChild( shadedAreaChart );
    shadedAreaChart.moveToBack();

    const tangentArrowsNode = new TangentArrowNode( model.ancillaryTools, this.chartTransform, {
      visibleProperty: new DerivedProperty( [
        visibleProperties.tangentVisibleProperty,
        model.predictModeEnabledProperty ], ( tangent, predictModeEnabled ) =>
        tangent && !predictModeEnabled )
    } );
    this.curveLayer.addChild( tangentArrowsNode );


    graphHeightProperty.link( height => {

      // TODO : too much repetition
      this.curveNode.dragBoundsProperty.value.setMaxY( height );
      this.predictCurveNode.dragBoundsProperty.value.setMaxY( height );

      // TODO: find a way to update touch/mouse area without resorting to this
      this.setCurvePointerAreas();
    } );

    this.zoomLevelProperty.link( () => {

      // TODO: find a way to update touch/mouse area without resorting to this
      this.setCurvePointerAreas();
    } );
  }

  /**
   * Reset all
   */
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
