// Copyright 2022-2023, University of Colorado Boulder

/**
 * LabeledLineNode is the view representation of a labeled line that spans multiple graphs.
 * The line has a label node located at the top of its vertical line.
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import calculusGrapher from '../../calculusGrapher.js';
import { Text } from '../../../../scenery/js/imports.js';
import BackgroundNode from '../../../../scenery-phet/js/BackgroundNode.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import LabeledLine from '../model/LabeledLine.js';
import LineToolNode from './LineToolNode.js';
import Multilink from '../../../../axon/js/Multilink.js';
import Tandem from '../../../../tandem/js/Tandem.js';

export default class LabeledLineNode extends LineToolNode {

  public constructor( labeledLine: LabeledLine, chartTransform: ChartTransform, tandem: Tandem ) {

    super( labeledLine.xProperty, chartTransform, {
      pickable: false, // optimization, see https://github.com/phetsims/calculus-grapher/issues/210
      lineStroke: labeledLine.lineColorProperty,
      lineDash: [ 4, 2 ],
      visibleProperty: labeledLine.visibleProperty,
      tandem: tandem
    } );

    const text = new Text( labeledLine.stringProperty, {
      font: CalculusGrapherConstants.LABELED_LINE_FONT,
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

    this.addLinkedElement( labeledLine, {
      tandem: tandem.createTandem( labeledLine.tandem.name )
    } );
  }
}

calculusGrapher.register( 'LabeledLineNode', LabeledLineNode );
