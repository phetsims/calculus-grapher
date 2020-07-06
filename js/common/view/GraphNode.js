// Copyright 2020, University of Colorado Boulder

/**
 * @author Brandon Li
 */

import Property from '../../../../axon/js/Property.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import GridNode from '../../../../griddle/js/GridNode.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import calculusGrapher from '../../calculusGrapher.js';

class GraphNode extends Node {

  /**
   * @param {Object} [options]
   */
  constructor( bounds, gridVisibleProrperty, options ) {

    super( options );

    //----------------------------------------------------------------------------------------
    const viewBounds = new Bounds2( 0, 0, 30 * 20, 10 * 20 );

    const modelViewTransform = ModelViewTransform2.createSinglePointXYScaleMapping(
      Vector2.ZERO,
      viewBounds.leftCenter,
      20,
      -20
    );
    const background = new Rectangle( viewBounds, { fill: 'white' } );

    const gridNode = new GridNode( viewBounds.width, viewBounds.height, {
      minorHorizontalLineSpacing: 1,
      minorVerticalLineSpacing: 1,
      modelViewTransformProperty: new Property( modelViewTransform ),
      minorLineOptions: {
        lineWidth: 1,
        stroke: 'black'
      }
    } );
    // gridVisibleProrperty.linkAttribute( gridNode, 'visible' );



    const border = new Rectangle( viewBounds, {
      stroke: 'black',
      lineWidth: 1
    } );

    this.children = [
      background,
      gridNode,
      border
    ];
  }
}

calculusGrapher.register( 'GraphNode', GraphNode );
export default GraphNode;