// Copyright 2022-2023, University of Colorado Boulder

/**
 * VerticalLineNode is the view representation of vertical line that can spans multiple graphs.
 * The line has a label node located atop of the vertical line
 *
 * @author Martin Veillette
 */

import calculusGrapher from '../../calculusGrapher.js';
import { Text } from '../../../../scenery/js/imports.js';
import BackgroundNode from '../../../../scenery-phet/js/BackgroundNode.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import VerticalLine from '../model/VerticalLine.js';
import LineToolNode from './LineToolNode.js';
import Multilink from '../../../../axon/js/Multilink.js';
import Tandem from '../../../../tandem/js/Tandem.js';

export default class VerticalLineNode extends LineToolNode {

  public constructor( verticalLine: VerticalLine, chartTransform: ChartTransform, tandem: Tandem ) {

    super( verticalLine.xProperty, chartTransform, verticalLine.lineColorProperty, {
      lineDash: [ 4, 2 ],
      visibleProperty: verticalLine.visibleProperty,
      tandem: tandem
    } );

    const text = new Text( verticalLine.labelProperty, {
      font: CalculusGrapherConstants.VERTICAL_LINE_FONT,
      maxWidth: 50,
      centerX: 0,
      tandem: tandem.createTandem( 'text' )
    } );

    const labelNode = new BackgroundNode( text, {
      rectangleOptions: {
        cornerRadius: 3
      },
      phetioVisiblePropertyInstrumented: false
    } );
    this.addChild( labelNode );

    Multilink.multilink( [ this.line.boundsProperty, labelNode.boundsProperty ], () => {
      labelNode.centerBottom = this.line.centerTop;
    } );

    this.addLinkedElement( verticalLine, {
      tandem: tandem.createTandem( verticalLine.tandem.name )
    } );
  }
}

calculusGrapher.register( 'VerticalLineNode', VerticalLineNode );
