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
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import CueingArrowsNode from './CueingArrowsNode.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import { CurveNodeOptions } from './CurveNode.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import CalculusGrapherModel from '../model/CalculusGrapherModel.js';
import CalculusGrapherVisibleProperties from './CalculusGrapherVisibleProperties.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import CurveLabelNode from './CurveLabelNode.js';

type SelfOptions = EmptySelfOptions;

type OriginalGraphNodeOptions = SelfOptions & GraphNodeOptions;

export default class OriginalGraphNode extends GraphNode {

  // property that tracks the visibility of the cueingArrows
  private readonly cueingArrowsNodeVisibleProperty: BooleanProperty;

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
          enabledProperty: predictModeEnabledProperty.notProperty,
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
    const predictCurveNode = new TransformedCurveNode( predictCurve, curveManipulationProperties, this.chartTransform, {
      enabledProperty: predictModeEnabledProperty,
      visibleProperty: predictModeEnabledProperty,
      continuousLinePlotOptions: {
        stroke: CalculusGrapherColors.predictCurveStrokeProperty,
        lineWidth: 1.75
      },
      tandem: providedOptions.tandem.createTandem( 'predictCurveNode' )
    } );

    this.curveLayer.addChild( predictCurveNode );

    this.cueingArrowsNodeVisibleProperty = new BooleanProperty( true, {
      tandem: providedOptions.tandem.createTandem( 'cueingArrowsNodeVisibleProperty' )
    } );

    // xPosition for cueing arrows in model coordinate
    const centerX = CalculusGrapherConstants.CURVE_X_RANGE.getCenter();

    // create cueing arrows, y position will be set later
    const cueingArrowsNode = new CueingArrowsNode( {
      centerX: this.chartTransform.modelToViewX( centerX ),
      visibleProperty: this.cueingArrowsNodeVisibleProperty,
      tandem: providedOptions.tandem.createTandem( 'cueingArrowsNode' )
    } );

    // attach the cueingArrowsNode to the original curve node to inherit its visibility.
    this.curveNode.addChild( cueingArrowsNode );

    // set the visibility of cueingArrowsNode  to invisible if the curve has been touched once.
    originalCurve.curveChangedEmitter.addListener( () => {
      this.cueingArrowsNodeVisibleProperty.value = false;
    } );


    const showOriginalCurveCheckboxContent = new HBox( {
      children: [
        new Text( CalculusGrapherStrings.showStringProperty ),
        new CurveLabelNode( { graphType: 'original' } )
      ],
      spacing: 10
    } );

    const showOriginalCurveCheckbox = new Checkbox( visibleProperties.allOriginalCurvesVisibleProperty,
      showOriginalCurveCheckboxContent, {
        visibleProperty: predictModeEnabledProperty,
        top: 10,
        right: this.chartTransform.modelToViewX( CalculusGrapherConstants.CURVE_X_RANGE.getMax() ) - 10,
        tandem: providedOptions.tandem.createTandem( 'showOriginalCurveCheckbox' )
      } );

    this.addChild( showOriginalCurveCheckbox );

    graphHeightProperty.link( height => {

      // TODO : too much repetition
      this.curveNode.dragBoundsProperty.value.setMaxY( height );
      predictCurveNode.dragBoundsProperty.value.setMaxY( height );

      // center the vertical position of the cueingArrows
      cueingArrowsNode.centerY = this.chartTransform.modelToViewY( 0 );

      // TODO: find a way to update touch/mouse area without resorting to this
      this.curveNode.setPointerAreas();
      predictCurveNode.setPointerAreas();
    } );

    this.zoomLevelProperty.link( () => {

      // TODO: find a way to update touch/mouse area without resorting to this
      this.curveNode.setPointerAreas();
      predictCurveNode.setPointerAreas();
    } );
  }

  /**
   * Reset all
   */
  public override reset(): void {
    super.reset();
    this.cueingArrowsNodeVisibleProperty.reset();
  }
}

calculusGrapher.register( 'OriginalGraphNode', OriginalGraphNode );
