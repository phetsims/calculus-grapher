// Copyright 2020-2022, University of Colorado Boulder
// @ts-nocheck
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
import { Node } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherConstants from '../../common/CalculusGrapherConstants.js';
import CurveNode from './CurveNode.js';
import OriginalCurveNode from './OriginalCurveNode.js';

class GraphNode extends Node {

  /**
   * @param {Curve} curve
   * @param {Bounds2} bounds
   * @param gridVisibleProperty
   * @param {boolean} original
   * @param {Object} [options]
   */
  constructor( curve, bounds, gridVisibleProperty, original, options ) {

    super( options );

    //----------------------------------------------------------------------------------------

    // TODO: this will need to be a Property, based on how many other curves are visible.
    const viewBounds = new Bounds2( 0, 0, 30 * 20, 10 * 20 );

    const modelViewTransform = ModelViewTransform2.createSinglePointXYScaleMapping(
      Vector2.ZERO,
      viewBounds.leftCenter,
      20,
      -20
    );

    const chartTransform = new ChartTransform( {
      viewWidth: 600,
      viewHeight: 200,
      modelXRange: CalculusGrapherConstants.CURVE_X_RANGE,
      modelYRange: new Range( -5, 5 )
    } );

    // grid lines
    const horizontalGridLines = new GridLineSet( chartTransform, Orientation.HORIZONTAL, 1, { stroke: 'lightGray' } );
    const verticalGridLines = new GridLineSet( chartTransform, Orientation.VERTICAL, 1, { stroke: 'lightGray' } );

    // Axes nodes are clipped in the chart
    const horizontalAxisLine = new AxisLine( chartTransform, Orientation.HORIZONTAL );
    const verticalAxisLine = new AxisLine( chartTransform, Orientation.VERTICAL );

    const gridNode = new Node( { children: [ horizontalGridLines, verticalGridLines ] } );

    let chartRectangle;
    if ( original ) {
      // gridVisibleProperty.linkAttribute( gridNode, 'visible' );
      // @public
      this.curveNode = new OriginalCurveNode( curve, new Property( modelViewTransform ), {
        pathOptions: {
          stroke: 'blue'
        }
      } );
      chartRectangle = new ChartRectangle( chartTransform, {
        fill: 'white',
        stroke: 'black'
      } );

    }
    else {
      // @public
      this.curveNode = new CurveNode( curve, new Property( modelViewTransform ), {
        pathOptions: {
          stroke: 'green'
        }
      } );
      chartRectangle = new ChartRectangle( chartTransform, {
        fill: 'white',
        opacity: 0.2,
        stroke: 'black'
      } );
    }

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
export default GraphNode;
