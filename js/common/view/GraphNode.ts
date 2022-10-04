// Copyright 2020-2022, University of Colorado Boulder

/**
 * @author Brandon Li
 */

import Property from '../../../../axon/js/Property.js';
import AxisLine from '../../../../bamboo/js/AxisLine.js';
import ChartRectangle from '../../../../bamboo/js/ChartRectangle.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import GridLineSet from '../../../../bamboo/js/GridLineSet.js';
import Range from '../../../../dot/js/Range.js';
import Orientation from '../../../../phet-core/js/Orientation.js';
import { Node, NodeOptions, PathOptions } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherConstants from '../../common/CalculusGrapherConstants.js';
import CurveNode from './CurveNode.js';
import OriginalCurveNode from './OriginalCurveNode.js';
import Curve from '../model/Curve.js';
import optionize from '../../../../phet-core/js/optionize.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import OriginalCurve from '../model/OriginalCurve.js';
import Multilink from '../../../../axon/js/Multilink.js';
import PlusMinusZoomButtonGroup from '../../../../scenery-phet/js/PlusMinusZoomButtonGroup.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';

type SelfOptions = {
  gridLineSetOptions?: PathOptions;
};
type GraphNodeOptions = SelfOptions & NodeOptions;

export default class GraphNode extends Node {

  public readonly zoomLevelProperty: NumberProperty;

  public constructor( curve: Curve | OriginalCurve,
                      gridVisibleProperty: Property<boolean>,
                      initialMaxYProperty: TReadOnlyProperty<number>,
                      providedOptions: GraphNodeOptions ) {

    const options = optionize<GraphNodeOptions, SelfOptions, NodeOptions>()( {

      gridLineSetOptions: {
        stroke: CalculusGrapherColors.GRIDLINES_STROKE
      }

    }, providedOptions );

    super( options );

    //----------------------------------------------------------------------------------------

    // number of view coordinates for one horizontal model units
    const horizontalModelToViewFactor = CalculusGrapherConstants.GRAPH_VIEW_WIDTH / CalculusGrapherConstants.CURVE_X_RANGE.getLength();

    const chartTransform = new ChartTransform( {
      viewWidth: CalculusGrapherConstants.GRAPH_VIEW_WIDTH,
      modelXRange: CalculusGrapherConstants.CURVE_X_RANGE
    } );

    // grid lines
    const horizontalGridLines = new GridLineSet( chartTransform, Orientation.HORIZONTAL, 1, options.gridLineSetOptions );
    const verticalGridLines = new GridLineSet( chartTransform, Orientation.VERTICAL, 1, options.gridLineSetOptions );

    // Axes nodes are clipped in the chart
    const horizontalAxisLine = new AxisLine( chartTransform, Orientation.HORIZONTAL );
    const verticalAxisLine = new AxisLine( chartTransform, Orientation.VERTICAL );

    const gridNode = new Node( { children: [ horizontalGridLines, verticalGridLines ] } );

    // link visibility of the gridNode
    gridVisibleProperty.linkAttribute( gridNode, 'visible' );

    // zoom level
    this.zoomLevelProperty = new NumberProperty(
      CalculusGrapherConstants.ZOOM_LEVEL_RANGE.defaultValue, {
        range: CalculusGrapherConstants.ZOOM_LEVEL_RANGE,
        tandem: options.tandem.createTandem( 'zoomLevelProperty' )
      } );


    let curveNode: CurveNode;
    if ( curve instanceof OriginalCurve ) {

      curveNode = new OriginalCurveNode( curve, chartTransform, {
        linePlotOptions: {
          stroke: CalculusGrapherColors.ORIGINAL_CURVE_STROKE
        },
        tandem: options.tandem.createTandem( 'originalCurveNode' )
      } );

    }
    else {

      curveNode = new CurveNode( curve, chartTransform, {
        tandem: options.tandem.createTandem( 'curveNode' )
      } );
    }
    const chartRectangleOptions = curve instanceof OriginalCurve ? CalculusGrapherColors.ORIGINAL_CHART_BACKGROUND : CalculusGrapherColors.DEFAULT_CHART_BACKGROUND;

    // chart Rectangle for the graph
    const chartRectangle = new ChartRectangle( chartTransform, chartRectangleOptions );

    // zoom Button to the top left of the graph
    const zoomButtonGroup = new PlusMinusZoomButtonGroup( this.zoomLevelProperty.asRanged(), {
      orientation: 'vertical',
      right: chartRectangle.left - 10,
      top: chartRectangle.top,
      buttonOptions: {
        stroke: 'black'
      },
      tandem: options.tandem.createTandem( 'zoomButtonGroup' )
    } );

    const getModelYRange = ( zoomLevel: number, initialMaxY: number ) => {
      const maxY = initialMaxY * Math.pow( 2, -zoomLevel + CalculusGrapherConstants.ZOOM_LEVEL_RANGE.defaultValue );
      return new Range( -maxY, maxY );
    };


    Multilink.multilink( [ this.zoomLevelProperty, initialMaxYProperty ],
      ( zoomLevel, initialMaxY ) => {
        chartTransform.setModelYRange( getModelYRange( zoomLevel, initialMaxY ) );
        chartTransform.setViewHeight( 2 * initialMaxY * horizontalModelToViewFactor );
        curveNode.clipArea = chartRectangle.getShape();

        // TODO: find a way to update touch/mouse area without resorting to this
        curve.curveChangedEmitter.emit();
      } );


    // add children to this node
    this.children = [
      chartRectangle,
      gridNode,
      horizontalAxisLine,
      verticalAxisLine,
      zoomButtonGroup,
      curveNode
    ];
  }

  /**
   * Reset all
   */
  public reset(): void {
    this.zoomLevelProperty.reset();
  }
}

calculusGrapher.register( 'GraphNode', GraphNode );
