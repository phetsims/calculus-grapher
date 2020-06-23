// Copyright 2019-2020, University of Colorado Boulder

/**
 * @author Brandon Li
 */

import GridNode from '../../../../griddle/js/GridNode.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';

class GraphNode extends Node {

  /**
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Object} [options]
   */
  constructor( bounds, modelViewTransform, options ) {

    super( options );

    //----------------------------------------------------------------------------------------

    const viewBounds = modelViewTransform.modelToViewBounds( bounds );

    const background = new Rectangle( viewBounds, { fill: 'white' } );


    const gridNode = new GridNode( bounds.width, bounds.height, {
      majorHorizontalLineSpacing: 5,
      majorVerticalLineSpacing: 5,
      minorHorizontalLineSpacing: 1,
      minorVerticalLineSpacing: 1,
      majorLineOptions: {
        lineWidth: 1,
        stroke: '#CCCCCC'
      },
      minorLineOptions: {
        lineWidth: 1,
        stroke: 'grey'
      },
      center: viewBounds.center
    } );


    const border = new Rectangle( viewBounds, {
      stroke: CalculusGrapherColors.GRID_BORDER_COLOR,
      lineWidth: 3
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