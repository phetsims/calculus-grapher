// Copyright 2023, University of Colorado Boulder

/**
 * LineToolNode is the base class for the view of ancillary tools that involve a vertical line.
 * This includes ReferenceLineNode and VerticalLineNode.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Line, LineOptions, Node, NodeOptions, TColor } from '../../../../scenery/js/imports.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import optionize from '../../../../phet-core/js/optionize.js';
import calculusGrapher from '../../calculusGrapher.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';

type SelfOptions = {
  lineTop?: number;  // see setLineTop
  lineBottom?: number; // see setLineBottom
} & PickOptional<LineOptions, 'lineDash' | 'stroke'>;

export type LineToolNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem' | 'visibleProperty'>;

export default class LineToolNode extends Node {

  protected readonly line; // a vertical line

  protected constructor( xProperty: TReadOnlyProperty<number>, chartTransform: ChartTransform, lineStroke: TColor,
                         providedOptions: LineToolNodeOptions ) {

    const options = optionize<LineToolNodeOptions, SelfOptions, NodeOptions>()( {

      // SelfOptions
      lineTop: 0,
      lineBottom: 100,
      lineDash: [],
      stroke: 'black'
    }, providedOptions );

    const line = new Line( 0, 0, options.lineTop, options.lineBottom, {
      lineDash: options.lineDash,
      stroke: options.stroke
    } );

    options.children = [ line ];

    super( options );

    this.line = line;

    xProperty.link( x => {
      this.line.x = chartTransform.modelToViewX( x );
    } );
  }

  /**
   * Sets the top and bottom y coordinates of the line, in view coordinates.
   */
  public setLineTopAndBottom( yTop: number, yBottom: number ): void {
    this.line.setY2( yTop );
    this.line.setY1( yBottom );
  }
}

calculusGrapher.register( 'LineToolNode', LineToolNode );