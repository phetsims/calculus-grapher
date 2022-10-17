// Copyright 2020-2022, University of Colorado Boulder

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
import AxisLine from '../../../../bamboo/js/AxisLine.js';
import ChartRectangle from '../../../../bamboo/js/ChartRectangle.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import GridLineSet from '../../../../bamboo/js/GridLineSet.js';
import TickLabelSet from '../../../../bamboo/js/TickLabelSet.js';
import TickMarkSet from '../../../../bamboo/js/TickMarkSet.js';
import Range from '../../../../dot/js/Range.js';
import Orientation from '../../../../phet-core/js/Orientation.js';
import { Node, NodeOptions, PathOptions, RectangleOptions, Text } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherConstants from '../../common/CalculusGrapherConstants.js';
import CurveNode, { CurveNodeOptions } from './CurveNode.js';
import Curve from '../model/Curve.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import PlusMinusZoomButtonGroup, { PlusMinusZoomButtonGroupOptions } from '../../../../scenery-phet/js/PlusMinusZoomButtonGroup.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Utils from '../../../../dot/js/Utils.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import CalculusGrapherQueryParameters from '../CalculusGrapherQueryParameters.js';

type SelfOptions = {
  gridLineSetOptions?: PathOptions;
  chartRectangleOptions?: RectangleOptions;
  curveNodeOptions?: CurveNodeOptions;
  plusMinusZoomButtonGroupOptions?: PlusMinusZoomButtonGroupOptions;
};
export type GraphNodeOptions = SelfOptions & PickRequired<NodeOptions, 'visibleProperty' | 'tandem'>;

export default class GraphNode extends Node {

  public readonly zoomLevelProperty: NumberProperty;
  protected readonly chartTransform: ChartTransform;
  public curveNode: CurveNode;

  public constructor( curve: Curve,
                      gridVisibleProperty: Property<boolean>,
                      graphHeightProperty: TReadOnlyProperty<number>,
                      labelNode: Node,
                      providedOptions: GraphNodeOptions ) {


    const options = optionize<GraphNodeOptions, SelfOptions, NodeOptions>()( {

      gridLineSetOptions: {
        stroke: CalculusGrapherColors.gridlinesStrokeProperty
      },
      chartRectangleOptions: {
        fill: CalculusGrapherColors.defaultChartBackgroundFillProperty,
        stroke: CalculusGrapherColors.defaultChartBackgroundStrokeProperty,
        opacity: 0.4
      },
      curveNodeOptions: {
        tandem: providedOptions.tandem.createTandem( 'curveNode' )
      },
      plusMinusZoomButtonGroupOptions: {
        visibleProperty: new BooleanProperty( true ),
        orientation: 'vertical',
        buttonOptions: {
          stroke: 'black'
        }
      }
    }, providedOptions );

    super( options );

    // chart transform for the graph, the height and Y range will be updated later
    this.chartTransform = new ChartTransform( {
      viewWidth: CalculusGrapherConstants.GRAPH_VIEW_WIDTH,
      modelXRange: CalculusGrapherConstants.CURVE_X_RANGE
    } );

    // grid lines
    const horizontalGridLines = new GridLineSet( this.chartTransform, Orientation.HORIZONTAL, 1, options.gridLineSetOptions );
    const verticalGridLines = new GridLineSet( this.chartTransform, Orientation.VERTICAL, 1, options.gridLineSetOptions );


    // Axes nodes are clipped in the chart
    const horizontalAxisLine = new AxisLine( this.chartTransform, Orientation.HORIZONTAL );
    const verticalAxisLine = new AxisLine( this.chartTransform, Orientation.VERTICAL );

    const gridNode = new Node( { children: [ horizontalGridLines, verticalGridLines ] } );

    // link visibility of the gridNode
    gridVisibleProperty.linkAttribute( gridNode, 'visible' );

    // zoom level
    this.zoomLevelProperty = new NumberProperty(
      CalculusGrapherConstants.ZOOM_LEVEL_RANGE.defaultValue, {
        range: CalculusGrapherConstants.ZOOM_LEVEL_RANGE,
        tandem: options.tandem.createTandem( 'zoomLevelProperty' )
      } );

    // curve associated with this graph
    this.curveNode = this.getCurveNode( curve, this.chartTransform, options.curveNodeOptions );

    // chart Rectangle for the graph
    const chartRectangle = new ChartRectangle( this.chartTransform, options.chartRectangleOptions );

    // zoom Button to the top left of the graph
    const zoomButtonGroup = new PlusMinusZoomButtonGroup( this.zoomLevelProperty.asRanged(),
      combineOptions<PlusMinusZoomButtonGroupOptions>( {
        right: chartRectangle.left - 10,
        top: chartRectangle.top,
        tandem: options.tandem.createTandem( 'zoomButtonGroup' )
      }, options.plusMinusZoomButtonGroupOptions ) );

    const getModelYRange = ( zoomLevel: number ): Range => {

      //TODO replace the constant 5
      const maxY = 5 * Math.pow( 2, -zoomLevel + CalculusGrapherConstants.ZOOM_LEVEL_RANGE.defaultValue );
      return new Range( -maxY, maxY );
    };


    this.zoomLevelProperty.link( zoomLevel => {
      this.chartTransform.setModelYRange( getModelYRange( zoomLevel ) );
    } );

    graphHeightProperty.link( height => {
      this.chartTransform.setViewHeight( height );
      this.curveNode.clipArea = chartRectangle.getShape();
    } );

    labelNode.leftTop = chartRectangle.leftTop.addXY( 10, 5 );

    // add children to this node
    this.children = [
      gridNode,
      chartRectangle,
      horizontalAxisLine,
      verticalAxisLine,
      zoomButtonGroup,
      labelNode,
      this.curveNode
    ];


    // add tick and numerical labels if true
    if ( CalculusGrapherQueryParameters.numericalLabels ) {

      // create horizontal and vertical numerical labels for ticks
      const horizontalTickLabelSet = new TickLabelSet( this.chartTransform, Orientation.HORIZONTAL, 2, {
        createLabel: ( value: number ) => new Text( Utils.toFixed( value, 0 ), { fontSize: 8 } )
      } );
      const verticalTickLabelSet = new TickLabelSet( this.chartTransform, Orientation.VERTICAL, 1,
        {
          value: CalculusGrapherConstants.CURVE_X_RANGE.max,
          createLabel: ( value: number ) => new Text( Utils.toFixed( value, 2 ), { fontSize: 8 } ),
          positionLabel: ( label: Node, tickBounds: Bounds2 ) => {
            label.leftCenter = tickBounds.rightCenter.plusXY( 1, 0 );
            return label;
          }
        } );

      // create horizontal and vertical mark ticks
      const horizontalTickMarkSet = new TickMarkSet( this.chartTransform, Orientation.HORIZONTAL, 2 );
      const verticalTickMarkSet = new TickMarkSet( this.chartTransform, Orientation.VERTICAL, 1, {
        value: CalculusGrapherConstants.CURVE_X_RANGE.max
      } );


      // change the vertical spacing of the ticks such that there are a constant number of them
      this.zoomLevelProperty.link( zoomLevel => {
        const spacing = Math.pow( 2, -zoomLevel + CalculusGrapherConstants.ZOOM_LEVEL_RANGE.defaultValue );
        verticalTickMarkSet.setSpacing( spacing );
        verticalTickLabelSet.setSpacing( spacing );
      } );

      // add children to this node
      this.addChild( horizontalTickMarkSet );
      this.addChild( horizontalTickLabelSet );
      this.addChild( verticalTickMarkSet );
      this.addChild( verticalTickLabelSet );
    }
  }

  /**
   * Reset all
   */
  public reset(): void {
    this.zoomLevelProperty.reset();
  }

  public getCurveNode( curve: Curve, chartTransform: ChartTransform, options: CurveNodeOptions ): CurveNode {

    return new CurveNode( curve, chartTransform, options );
  }
}

calculusGrapher.register( 'GraphNode', GraphNode );
