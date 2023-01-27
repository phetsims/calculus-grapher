// Copyright 2022-2023, University of Colorado Boulder

/**
 * VerticalLineNode is the view representation of vertical line that can spans multiple graphs.
 * The line has a label node located atop of the vertical line
 *
 * @author Martin Veillette
 */

import calculusGrapher from '../../calculusGrapher.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import { Text } from '../../../../scenery/js/imports.js';
import BackgroundNode from '../../../../scenery-phet/js/BackgroundNode.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import VerticalLine from '../model/VerticalLine.js';
import LineToolNode, { LineToolNodeOptions } from './LineToolNode.js';
import Multilink from '../../../../axon/js/Multilink.js';

type SelfOptions = EmptySelfOptions;

type VerticalLineNodeOptions = SelfOptions & PickRequired<LineToolNodeOptions, 'tandem'>;

export default class VerticalLineNode extends LineToolNode {

  public constructor( verticalLine: VerticalLine,
                      chartTransform: ChartTransform,
                      providedOptions: VerticalLineNodeOptions ) {

    const options = optionize<VerticalLineNodeOptions, SelfOptions, LineToolNodeOptions>()( {

      // LineToolNodeOptions
      lineDash: [ 4, 2 ],
      visibleProperty: verticalLine.visibleProperty
    }, providedOptions );

    super( verticalLine.xProperty, chartTransform, verticalLine.lineColorProperty, options );

    const text = new Text( verticalLine.labelProperty, {
      font: CalculusGrapherConstants.VERTICAL_LINE_FONT,
      maxWidth: 50,
      centerX: 0,
      tandem: options.tandem.createTandem( 'text' )
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
      tandem: options.tandem.createTandem( verticalLine.tandem.name )
    } );
  }
}

calculusGrapher.register( 'VerticalLineNode', VerticalLineNode );
