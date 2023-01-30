// Copyright 2022-2023, University of Colorado Boulder

/**
 * OriginalGraphNode is the view representation of an Original Graph, which includes two curves
 *  that can be user-manipulated as well as cueing arrows. OriginalGraphNode extends GraphNode.
 * The zoom Button of GraphNode is set to invisible for OriginalGraphNode
 *
 * @author Martin Veillette
 * @author Brandon Li
 * @author Chris Malley (PixelZoom, Inc.)
 */

import calculusGrapher from '../../calculusGrapher.js';
import TransformedCurveNode from './TransformedCurveNode.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import GraphNode, { GraphNodeOptions } from './GraphNode.js';
import { HBox, Rectangle, TColor, Text } from '../../../../scenery/js/imports.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import CalculusGrapherModel from '../model/CalculusGrapherModel.js';
import CalculusGrapherVisibleProperties from './CalculusGrapherVisibleProperties.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import GraphTypeLabelNode from './GraphTypeLabelNode.js';
import TangentScrubber from '../model/TangentScrubber.js';
import TangentArrowNode from './TangentArrowNode.js';
import AreaUnderCurveScrubber from '../model/AreaUnderCurveScrubber.js';
import AreaUnderCurvePlot from './AreaUnderCurvePlot.js';
import AncillaryTool from '../model/AncillaryTool.js';
import ScrubberNode from './ScrubberNode.js';
import GraphType from '../model/GraphType.js';
import ShowOriginalCurveCheckbox from './ShowOriginalCurveCheckbox.js';
import LabeledPointsNode from './LabeledPointsNode.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';

type SelfOptions = EmptySelfOptions;

type OriginalGraphNodeOptions = SelfOptions & PickRequired<GraphNodeOptions, 'graphHeight' | 'tandem'>;

export default class OriginalGraphNode extends GraphNode {

  // node for the predict curve
  private readonly predictCurveNode: TransformedCurveNode;

  public constructor( model: CalculusGrapherModel,
                      visibleProperties: CalculusGrapherVisibleProperties,
                      providedOptions: GraphNodeOptions ) {

    // Destructuring fields from model into local constants, to improve readability.
    const { originalCurve, predictCurve, curveManipulationProperties, predictModeEnabledProperty } = model;

    // Original curve is visible if not in predictMode or 'Show f(x)' checkbox is checked.
    const originalCurveNodeVisibilityProperty = new DerivedProperty(
      [ predictModeEnabledProperty, visibleProperties.showOriginalCurveProperty ],
      ( predictModeEnabled, showOriginalCurve ) => !predictModeEnabled || showOriginalCurve );

    const graphType = GraphType.ORIGINAL;

    // Label that toggles between 'Predict f(x)' and 'f(x)'
    const labelNodeTandem = providedOptions.tandem.createTandem( 'labelNode' );
    const labelNode = new HBox( {
      children: [
        new Text( CalculusGrapherStrings.predictStringProperty, {
          font: CalculusGrapherConstants.CONTROL_FONT,
          maxWidth: 100,
          visibleProperty: model.predictModeEnabledProperty, // show/hide 'Predict'
          tandem: labelNodeTandem.createTandem( 'predictText' )
        } ),
        new GraphTypeLabelNode( graphType )
      ],
      spacing: 5,
      tandem: labelNodeTandem
    } );

    const options = optionize<OriginalGraphNodeOptions, SelfOptions, GraphNodeOptions>()( {

      // GraphNodeOptions
      createCurveNode: ( chartTransform: ChartTransform ) =>
        new TransformedCurveNode( originalCurve, curveManipulationProperties, chartTransform, {
          stroke: graphType.strokeProperty,
          continuousLinePlotOptions: {
            lineWidth: 3 // see https://github.com/phetsims/calculus-grapher/issues/205
          },
          enabledProperty: DerivedProperty.not( predictModeEnabledProperty ),
          visibleProperty: originalCurveNodeVisibilityProperty,
          tandem: providedOptions.tandem.createTandem( 'originalCurveNode' )
        } ),
      chartRectangleOptions: {
        fill: CalculusGrapherColors.originalChartBackgroundFillProperty,
        stroke: CalculusGrapherColors.originalChartBackgroundStrokeProperty
      },
      hasYZoom: false,
      labelNode: labelNode
    }, providedOptions );

    super( graphType, originalCurve, visibleProperties.gridVisibleProperty, options );

    // Add a highlight around the chartRectangle, color coded to the curve that is interactive.
    // See https://github.com/phetsims/calculus-grapher/issues/204
    const highlightRectangle = new Rectangle( 0, 0, this.chartRectangle.width + 6, this.chartRectangle.height + 6, {
      center: this.chartRectangle.center,
      opacity: 0.25,
      fill: new DerivedProperty( [
        model.predictModeEnabledProperty,
        CalculusGrapherColors.predictCurveStrokeProperty,
        CalculusGrapherColors.originalCurveStrokeProperty
      ], ( predictModeEnabled, predictCurveStroke, originalCurveStroke ) =>
        predictModeEnabled ? predictCurveStroke : originalCurveStroke )
    } );
    this.addChild( highlightRectangle );
    highlightRectangle.moveToBack();

    // create a predictCurveNode
    this.predictCurveNode = new TransformedCurveNode( predictCurve, curveManipulationProperties, this.chartTransform, {
      enabledProperty: predictModeEnabledProperty,
      visibleProperty: predictModeEnabledProperty,
      stroke: CalculusGrapherColors.predictCurveStrokeProperty,
      tandem: providedOptions.tandem.createTandem( 'predictCurveNode' )
    } );
    this.curveLayer.addChild( this.predictCurveNode );

    const showOriginalCurveCheckbox = new ShowOriginalCurveCheckbox( visibleProperties.showOriginalCurveProperty, {
      visibleProperty: predictModeEnabledProperty,
      tandem: providedOptions.tandem.createTandem( 'showOriginalCurveCheckbox' )
    } );
    this.addChild( showOriginalCurveCheckbox );

    // Upper-right corner of the chart
    showOriginalCurveCheckbox.boundsProperty.link( () => {
      showOriginalCurveCheckbox.right =
        this.chartTransform.modelToViewX( CalculusGrapherConstants.CURVE_X_RANGE.getMax() ) - CalculusGrapherConstants.GRAPH_X_MARGIN;
      showOriginalCurveCheckbox.top = CalculusGrapherConstants.GRAPH_Y_MARGIN;
    } );

    // Labeled points
    const labeledPointsNode = new LabeledPointsNode( model.labeledPoints, model.labeledPointsLinkableElement,
      this.chartTransform, model.predictModeEnabledProperty, this.curveLayerVisibleProperty,
      options.tandem.createTandem( 'labeledPointsNode' )
    );
    this.addChild( labeledPointsNode );
  }

  public override reset(): void {
    super.reset();
    this.predictCurveNode.reset();
  }

  /**
   * Adds a scrubber to OriginalGraphNode.
   */
  public addScrubberNode( ancillaryTool: AncillaryTool, color: TColor,
                          visibleProperty: TReadOnlyProperty<boolean>, tandemName: string ): ScrubberNode {
    const scrubberNode = new ScrubberNode( ancillaryTool, this.chartTransform, color, {
      visibleProperty: visibleProperty,
      tandem: this.tandem.createTandem( tandemName )
    } );
    this.addChild( scrubberNode );
    return scrubberNode;
  }

  /**
   * Adds a double-headed tangent arrow to OriginalGraphNode.
   */
  public addTangentArrowNode( tangentScrubber: TangentScrubber, visibleProperty: TReadOnlyProperty<boolean> ): TangentArrowNode {
    const tangentArrowNode = new TangentArrowNode( tangentScrubber, this.chartTransform, {
      visibleProperty: visibleProperty,
      tandem: this.tandem.createTandem( 'tangentArrowNode' )
    } );
    this.curveLayer.addChild( tangentArrowNode );
    return tangentArrowNode;
  }

  /**
   * Adds a plot to OriginalGraphNode that shows the area under the curve.
   */
  public addAreaUnderCurvePlot( areaUnderCurveScrubber: AreaUnderCurveScrubber,
                                visibleProperty: TReadOnlyProperty<boolean> ): AreaUnderCurvePlot {
    const areaUnderCurvePlot = new AreaUnderCurvePlot( areaUnderCurveScrubber, this.curve, this.chartTransform,
      areaUnderCurveScrubber.xProperty, {
        visibleProperty: visibleProperty,
        tandem: this.tandem.createTandem( 'areaUnderCurvePlot' )
      } );
    this.curveLayer.addChild( areaUnderCurvePlot );
    areaUnderCurvePlot.moveToBack();
    return areaUnderCurvePlot;
  }
}

calculusGrapher.register( 'OriginalGraphNode', OriginalGraphNode );
