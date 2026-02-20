// Copyright 2022-2025, University of Colorado Boulder

/**
 * LabelColorIcon is an icon that consists of a label with a horizontal-colored line below it.
 * It is used on radio button to indicate a graph or curve, and its associated stroke color.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import AlignGroup from '../../../../scenery/js/layout/constraints/AlignGroup.js';
import AlignBox from '../../../../scenery/js/layout/nodes/AlignBox.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Line from '../../../../scenery/js/nodes/Line.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import TColor from '../../../../scenery/js/util/TColor.js';
import calculusGrapher from '../../calculusGrapher.js';

export class LabelColorIcon extends VBox {

  /**
   * @param labelNode
   * @param labelAlignGroup - to give labels the same effective size
   * @param stroke
   */
  public constructor( labelNode: Node, labelAlignGroup: AlignGroup, stroke: TColor ) {

    const alignBox = new AlignBox( labelNode, {
      group: labelAlignGroup
    } );

    // Horizontal line showing the color that is used to stroke graphType.
    const colorLine = new Line( 0, 0, 40, 0, {
      stroke: stroke,
      lineWidth: 3
    } );

    super( {
      children: [ alignBox, colorLine ],
      spacing: 7,
      sizable: false,
      align: 'center'
    } );
  }
}

calculusGrapher.register( 'LabelColorIcon', LabelColorIcon );