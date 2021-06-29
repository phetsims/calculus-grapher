// Copyright 2020-2021, University of Colorado Boulder

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
import CurveNode from './CurveNode.js';
import OriginalCurveNode from './OriginalCurveNode.js';

class GraphNode extends Node {

  /**
   * @param {Object} [options]
   */
  constructor( curve, bounds, gridVisibleProrperty, original, options ) {

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

    const gridNode = new GridNode( viewBounds.width, viewBounds.height, {
      minorHorizontalLineSpacing: 1,
      minorVerticalLineSpacing: 1,
      modelViewTransformProperty: new Property( modelViewTransform ),
      minorLineOptions: {
        lineWidth: 1,
        stroke: 'black'
      }
    } );

    let background;
    if ( original ) {
      // gridVisibleProrperty.linkAttribute( gridNode, 'visible' );
      // @public
      this.curveNode = new OriginalCurveNode( curve, new Property( modelViewTransform ), {
        pathOptions: {
          stroke: 'blue'
        }
      } );
      background = new Rectangle( viewBounds, { fill: 'white' } );
    }
    else {
      // @public
      this.curveNode = new CurveNode( curve, new Property( modelViewTransform ), {
        pathOptions: {
          stroke: 'green'
        }
      } );
      background = new Rectangle( viewBounds, { fill: 'white', opacity: 0.2 } );
    }

    const border = new Rectangle( viewBounds, {
      stroke: 'black',
      lineWidth: 1
    } );

    this.children = [
      background,
      gridNode,
      border,
      this.curveNode
    ];
  }
}

calculusGrapher.register( 'GraphNode', GraphNode );
export default GraphNode;