// Copyright 2022-2025, University of Colorado Boulder

/**
 * LabeledLineNode is the view representation of a labeled line that spans multiple graphs.
 * The line has a label node located at the top of its vertical line.
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import optionize from '../../../../phet-core/js/optionize.js';
import BackgroundNode from '../../../../scenery-phet/js/BackgroundNode.js';
import Line from '../../../../scenery/js/nodes/Line.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Color from '../../../../scenery/js/util/Color.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import LabeledLine from '../model/LabeledLine.js';

type SelfOptions = {

// The top and bottom y-coordinates of the vertical line, in GraphsNode view coordinate frame.
  lineTop?: number;
  lineBottom?: number;
};

export type LabeledLineNodeOptions = SelfOptions;

export default class LabeledLineNode extends Node {

  private readonly line: Line;

  public constructor( labeledLine: LabeledLine, chartTransform: ChartTransform, providedOptions?: LabeledLineNodeOptions ) {

    const options = optionize<LabeledLineNodeOptions, SelfOptions, NodeOptions>()( {

      // SelfOptions
      lineTop: 0,
      lineBottom: 100,

      // NodeOptions
      isDisposable: false,
      pickable: false, // optimization, see https://github.com/phetsims/calculus-grapher/issues/210
      visibleProperty: labeledLine.visibleProperty
      // No PhET-iO instrumentation is desired, see https://github.com/phetsims/calculus-grapher/issues/198
    }, providedOptions );

    super( options );

    // vertical line
    const line = new Line( 0, options.lineTop, 0, options.lineBottom, {
      stroke: labeledLine.lineColorProperty,
      lineDash: [ 4, 2 ],
      pickable: false // optimization, see https://github.com/phetsims/calculus-grapher/issues/210
    } );
    this.addChild( line );
    this.line = line;

    const text = new Text( labeledLine.stringProperty, {
      font: CalculusGrapherConstants.LABELED_LINE_FONT,
      maxWidth: 50,
      centerX: 0
    } );

    const labelNode = new BackgroundNode( text, {
      xMargin: 4,
      yMargin: 2,
      rectangleOptions: {
        fill: 'white',
        stroke: Color.grayColor( 210 ),
        lineWidth: 0.5,
        cornerRadius: 3
      }
    } );
    this.addChild( labelNode );

    labeledLine.xProperty.link( x => {
      line.x = chartTransform.modelToViewX( x );
    } );

    Multilink.multilink( [ line.boundsProperty, labelNode.boundsProperty ], () => {
      labelNode.centerBottom = line.centerTop;
    } );
  }
}

calculusGrapher.register( 'LabeledLineNode', LabeledLineNode );