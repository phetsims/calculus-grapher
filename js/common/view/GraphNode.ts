// Copyright 2020-2022, University of Colorado Boulder

/**
 * @author Brandon Li
 */

import Property from '../../../../axon/js/Property.js';
import AxisLine from '../../../../bamboo/js/AxisLine.js';
import ChartRectangle from '../../../../bamboo/js/ChartRectangle.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import GridLineSet from '../../../../bamboo/js/GridLineSet.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Range from '../../../../dot/js/Range.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Orientation from '../../../../phet-core/js/Orientation.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { Node, NodeOptions } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherConstants from '../../common/CalculusGrapherConstants.js';
import CurveNode from './CurveNode.js';
import OriginalCurveNode from './OriginalCurveNode.js';
import Curve from '../model/Curve.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import OriginalCurve from '../model/OriginalCurve.js';

type SelfOptions = EmptySelfOptions;
type GraphNodeOptions = SelfOptions & NodeOptions;

export default class GraphNode extends Node {

  public readonly curveNode: CurveNode | OriginalCurveNode;

  public readonly zoomLevelProperty: NumberProperty;

  public constructor( curve: Curve | OriginalCurve,
                      gridVisibleProperty: Property<boolean>,
                      providedOptions: GraphNodeOptions ) {

    const options = optionize<GraphNodeOptions, SelfOptions, NodeOptions>()( {}, providedOptions );

    super( options );

    //----------------------------------------------------------------------------------------


    // TODO: this will need to be a Property, based on how many other curves are visible.
    const viewBounds = new Bounds2( 0, 0, 600, 200 );

    const chartTransform = new ChartTransform( {
      viewWidth: 600,
      viewHeight: 200,
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

    // tracks changes of modelViewTransform, initial value will be updated later
    const transformProperty = new Property( ModelViewTransform2.createIdentity() );

    // zoom level
    this.zoomLevelProperty = new NumberProperty(
      CalculusGrapherConstants.ZOOM_LEVEL_RANGE.defaultValue, {
        range: CalculusGrapherConstants.ZOOM_LEVEL_RANGE,
        tandem: options.tandem.createTandem( 'zoomLevelProperty' )
      } );


    let chartRectangleOptions;
    if ( curve instanceof OriginalCurve ) {

      this.curveNode = new OriginalCurveNode( curve, transformProperty, {
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

      this.curveNode = new CurveNode( curve, transformProperty, {
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

    const getModelYRange = ( zoomLevel: number ) => {
      const maxY = 5 * Math.pow( 2, zoomLevel - CalculusGrapherConstants.ZOOM_LEVEL_RANGE.defaultValue );
      return new Range( -maxY, maxY );
    };

    this.zoomLevelProperty.link( zoomLevel => {
      chartTransform.setModelYRange( getModelYRange( zoomLevel ) );

      // TODO: see #54
      const yScale = -20 / Math.pow( 2, zoomLevel - CalculusGrapherConstants.ZOOM_LEVEL_RANGE.defaultValue );
      transformProperty.value = ModelViewTransform2.createSinglePointXYScaleMapping(
        Vector2.ZERO,
        viewBounds.leftCenter,
        20,
        yScale
      );
    } );

    // add children to this node
    this.children = [
      chartRectangle,
      gridNode,
      horizontalAxisLine,
      verticalAxisLine,
      this.curveNode
    ];
  }
}

calculusGrapher.register( 'GraphNode', GraphNode );
