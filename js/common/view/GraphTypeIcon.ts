// Copyright 2022, University of Colorado Boulder

/**
 * GraphTypeRadioButtonIcon is the icon for a GraphType that appears on a radio button.
 * It shows the formula and stroke color for the GraphType.
 *
 * @author Chris Malley (PixelZoom, Inc,)
 */

import { AlignBox, AlignGroup, Line, VBox } from '../../../../scenery/js/imports.js';
import { getGraphTypeStroke, GraphType } from '../model/GraphType.js';
import GraphTypeLabelNode from './GraphTypeLabelNode.js';
import calculusGrapher from '../../calculusGrapher.js';

export class GraphTypeRadioButtonIcon extends VBox {

  /**
   * @param graphType
   * @param labelAlignGroup - to give labels the same effective size
   */
  public constructor( graphType: GraphType, labelAlignGroup: AlignGroup ) {

    const labelNode = new AlignBox( new GraphTypeLabelNode( graphType ), {
      group: labelAlignGroup
    } );

    // Horizontal line showing the color that is used to stroke graphType.
    const colorLine = new Line( 0, 0, 40, 0, {
      stroke: getGraphTypeStroke( graphType ),
      lineWidth: 3
    } );

    super( {
      children: [ labelNode, colorLine ],
      spacing: 7,
      align: 'center'
    } );
  }
}

calculusGrapher.register( 'GraphTypeRadioButtonIcon', GraphTypeRadioButtonIcon );