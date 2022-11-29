// Copyright 2022, University of Colorado Boulder

/**
 * OriginalGraphNode is the view representation of an Original Graph, which includes two curves,
 *  an
 *
 * @author Martin Veillette
 * @author Brandon Li
 */

import Property from '../../../../axon/js/Property.js';
import calculusGrapher from '../../calculusGrapher.js';
import TransformedCurveNode from './TransformedCurveNode.js';
import optionize, { combineOptions, EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import GraphNode, { GraphNodeOptions } from './GraphNode.js';
import { Node } from '../../../../scenery/js/imports.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import ArrowNode, { ArrowNodeOptions } from '../../../../scenery-phet/js/ArrowNode.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import TransformedCurve from '../model/TransformedCurve.js';
import CurveManipulationProperties from '../model/CurveManipulationProperties.js';
import { CurveNodeOptions } from './CurveNode.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';

type SelfOptions = EmptySelfOptions;

type OriginalGraphNodeOptions = SelfOptions & GraphNodeOptions;

export default class OriginalGraphNode extends GraphNode {

  private readonly upAndDownArrowVisibleProperty: BooleanProperty;

  public constructor( originalCurve: TransformedCurve,
                      predictCurve: TransformedCurve,
                      curveManipulationProperties: CurveManipulationProperties,
                      gridVisibleProperty: Property<boolean>,
                      graphHeightProperty: TReadOnlyProperty<number>,
                      labelNode: Node,
                      providedOptions: GraphNodeOptions ) {


    const options = optionize<OriginalGraphNodeOptions, SelfOptions, GraphNodeOptions>()( {

        createCurveNode: ( chartTransform: ChartTransform,
                           providedOptions?: CurveNodeOptions ) => new TransformedCurveNode( originalCurve,
          curveManipulationProperties, chartTransform, providedOptions ),
        curveNodeOptions: {
          tandem: providedOptions.tandem.createTandem( 'originalCurveNode' )
        },
        chartRectangleOptions: {
          fill: CalculusGrapherColors.originalChartBackgroundFillProperty,
          stroke: CalculusGrapherColors.originalChartBackgroundStrokeProperty,
          opacity: 1
        },
        plusMinusZoomButtonGroupOptions: {
          visibleProperty: new BooleanProperty( false )
        }
      },
      providedOptions
    );
    super( originalCurve, gridVisibleProperty, graphHeightProperty, labelNode, options );


    const predictCurveNode = new TransformedCurveNode( predictCurve, curveManipulationProperties, this.chartTransform,
      {
        tandem: providedOptions.tandem.createTandem( 'predictCurveNode' ),

        // temporary
        visible: false
      } );

    this.addChild( predictCurveNode );

    // set up and down arrow
    const centerX = CalculusGrapherConstants.CURVE_X_RANGE.getCenter();
    const tailX = this.chartTransform.modelToViewX( centerX );

    const downArrowTailY = 5;
    const downArrowTipY = CalculusGrapherConstants.ARROW_LENGTH + downArrowTailY;

    // property that track the visibility of the up and down arrow
    this.upAndDownArrowVisibleProperty = new BooleanProperty( true );

    // arrow options
    const arrowOptions = combineOptions<ArrowNodeOptions>( {
        fill: CalculusGrapherColors.arrowFillProperty,
        stroke: null,
        visibleProperty: this.upAndDownArrowVisibleProperty
      }, CalculusGrapherConstants.ARROW_NODE_OPTIONS
    );
    const downArrow = new ArrowNode( 0, downArrowTailY, 0, downArrowTipY, arrowOptions );
    const upArrow = new ArrowNode( 0, -downArrowTailY, 0, -downArrowTipY, arrowOptions );

    const upAndDownArrow = new Node( { children: [ upArrow, downArrow ], centerX: tailX } );

    // attach the up and down arrow to the curveNode to inherit its visibility.
    this.curveNode.addChild( upAndDownArrow );

    // set the visibility of up and down arrow to invisible if the curve has been touched once.
    originalCurve.curveChangedEmitter.addListener( () => {
      this.upAndDownArrowVisibleProperty.value = false;
    } );

    graphHeightProperty.link( height => {

      this.curveNode.dragBoundsProperty.value.setMaxY( height );

      // center the vertical position of the up and down arrow
      upAndDownArrow.centerY = this.chartTransform.modelToViewY( 0 );

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
    this.upAndDownArrowVisibleProperty.reset();
  }
}

calculusGrapher.register( 'OriginalGraphNode', OriginalGraphNode );
