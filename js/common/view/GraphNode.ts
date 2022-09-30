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
import { Node, NodeOptions } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherConstants from '../../common/CalculusGrapherConstants.js';
import CurveNode from './CurveNode.js';
import OriginalCurveNode from './OriginalCurveNode.js';
import Curve from '../model/Curve.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import OriginalCurve from '../model/OriginalCurve.js';
import Multilink from '../../../../axon/js/Multilink.js';

type SelfOptions = EmptySelfOptions;
type GraphNodeOptions = SelfOptions & NodeOptions;

export default class GraphNode extends Node {

  public readonly zoomLevelProperty: NumberProperty;

  public constructor( curve: Curve | OriginalCurve,
                      gridVisibleProperty: Property<boolean>,
                      initialMaxYProperty: Property<number>,
                      providedOptions: GraphNodeOptions ) {

    const options = optionize<GraphNodeOptions, SelfOptions, NodeOptions>()( {}, providedOptions );

    super( options );

    //----------------------------------------------------------------------------------------

    const chartTransform = new ChartTransform( {
      viewWidth: 700,
      modelXRange: CalculusGrapherConstants.CURVE_X_RANGE
    } );

    // grid lines
    const horizontalGridLines = new GridLineSet( chartTransform, Orientation.HORIZONTAL, 1, { stroke: 'lightGray' } );
    const verticalGridLines = new GridLineSet( chartTransform, Orientation.VERTICAL, 1, { stroke: 'lightGray' } );

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


    let chartRectangleOptions;
    let curveNode: CurveNode;
    if ( curve instanceof OriginalCurve ) {

      curveNode = new OriginalCurveNode( curve, chartTransform, {
        pathOptions: {
          stroke: 'blue'
        },
        tandem: options.tandem.createTandem( 'originalCurveNode' )
      } );

      chartRectangleOptions = {
        fill: 'white',
        stroke: 'black'
      };

    }
    else {

      curveNode = new CurveNode( curve, chartTransform, {
        pathOptions: {
          stroke: 'green'
        },
        tandem: options.tandem.createTandem( 'curveNode' )
      } );
      chartRectangleOptions = {
        fill: 'white',
        opacity: 0.2,
        stroke: 'black'
      };
    }


    // chart Rectangle for the graph
    const chartRectangle = new ChartRectangle( chartTransform, chartRectangleOptions );

    const getModelYRange = ( zoomLevel: number, initialMaxY: number ) => {
      const maxY = initialMaxY * Math.pow( 2, zoomLevel - CalculusGrapherConstants.ZOOM_LEVEL_RANGE.defaultValue );
      return new Range( -maxY, maxY );
    };

    Multilink.multilink( [ this.zoomLevelProperty, initialMaxYProperty ],
      ( zoomLevel, initialMaxY ) => {
        chartTransform.setModelYRange( getModelYRange( zoomLevel, initialMaxY ) );
        chartTransform.setViewHeight( initialMaxY * 35 );
      } );

    // add children to this node
    this.children = [
      chartRectangle,
      gridNode,
      horizontalAxisLine,
      verticalAxisLine,
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
