// Copyright 2022, University of Colorado Boulder

/**
 * GraphNode is the view representation of a Graph, which includes a curve, a chart ( grid and axes) and zoom buttons
 *
 * Primary responsibilities are:
 * - Create an associated CurveNode
 * - Create a zoomButtonGroup with an associated property
 * - Create AxisLines, GridLines and Rectangle Chart
 * - Create a Chart Transform
 * - Updating the model y Range of the graph based on the zoom level
 * - Toggling the visibility of the gridlines
 * - Set the height of the graph
 *
 * @author Martin Veillette
 * @author Brandon Li
 */

import Property from '../../../../axon/js/Property.js';
import calculusGrapher from '../../calculusGrapher.js';
import OriginalCurveNode, { OriginalCurveNodeOptions } from './OriginalCurveNode.js';
import optionize, { combineOptions, EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import OriginalCurve from '../model/OriginalCurve.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import GraphNode, { GraphNodeOptions } from './GraphNode.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import { Node } from '../../../../scenery/js/imports.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import ArrowNode, { ArrowNodeOptions } from '../../../../scenery-phet/js/ArrowNode.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';

type SelfOptions = EmptySelfOptions;

type OriginalGraphNodeOptions = SelfOptions & GraphNodeOptions;

export default class OriginalGraphNode extends GraphNode {

  private readonly upAndDownArrowVisibleProperty: BooleanProperty;


  public constructor( curve: OriginalCurve,
                      gridVisibleProperty: Property<boolean>,
                      graphHeightProperty: TReadOnlyProperty<number>,
                      labelNode: Node,
                      providedOptions: GraphNodeOptions ) {

    const options = optionize<OriginalGraphNodeOptions, SelfOptions, GraphNodeOptions>()( {

      chartRectangleOptions: {
        fill: CalculusGrapherColors.originalChartBackgroundFillProperty,
        stroke: CalculusGrapherColors.originalChartBackgroundStrokeProperty
      },
      curveNodeOptions: {
        tandem: providedOptions.tandem.createTandem( 'originalCurveNode' )
      },
      plusMinusZoomButtonGroupOptions: {
        visibleProperty: new BooleanProperty( false )
      }
    }, providedOptions );

    super( curve, gridVisibleProperty, graphHeightProperty, labelNode, options );

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
    this.graphContent.addChild( upAndDownArrow );

    // set the visibility of up and down arrow to invisible if the curve has been touched once.
    curve.curveChangedEmitter.addListener( () => {
      this.upAndDownArrowVisibleProperty.value = false;
    } );

    graphHeightProperty.link( height => {

      this.curveNode.dragBoundsProperty.value.setMaxY( height );

      // center the vertical position of the up and down arrow
      upAndDownArrow.centerY = this.chartTransform.modelToViewY( 0 );

      // TODO: find a way to update touch/mouse area without resorting to this
      this.curveNode.setPointerAreas();
    } );


    this.zoomLevelProperty.link( () => {

      // TODO: find a way to update touch/mouse area without resorting to this
      this.curveNode.setPointerAreas();
    } );


  }

  /**
   * Reset all
   */
  public override reset(): void {
    super.reset();
    this.upAndDownArrowVisibleProperty.reset();
  }

  public override getCurveNode( curve: OriginalCurve,
                                chartTransform: ChartTransform,
                                options: OriginalCurveNodeOptions ): OriginalCurveNode {

    return new OriginalCurveNode( curve, chartTransform, options );
  }
}

calculusGrapher.register( 'OriginalGraphNode', OriginalGraphNode );
