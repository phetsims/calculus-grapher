// Copyright 2022-2023, University of Colorado Boulder

/**
 * ScrubberNode is a cursor at the bottom of the graph.
 * Scrubbing can be done by dragging the cursor.
 *
 * @author Martin Veillette
 */

import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import ShadedSphereNode from '../../../../scenery-phet/js/ShadedSphereNode.js';
import { DragListener, Line, LineOptions, Node, NodeOptions, TColor } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import AncillaryTool from '../model/AncillaryTool.js';

type SelfOptions = {
  lineOptions?: LineOptions;
  fill?: TColor;
  sphereDiameter?: number;
};

export type ScrubberNodeOptions = SelfOptions & StrictOmit<NodeOptions, 'children'>;

export default class ScrubberNode extends Node {

  public constructor( scrubber: AncillaryTool,
                      chartTransform: ChartTransform,
                      providedOptions?: ScrubberNodeOptions ) {

    const options = optionize<ScrubberNodeOptions, SelfOptions, NodeOptions>()(
      {
        lineOptions: {
          visible: true,
          lineWidth: 2
        },
        fill: 'red',
        sphereDiameter: 18
      }, providedOptions );

    const yValue = chartTransform.modelToViewY( chartTransform.modelYRange.min );

    const sphere = new ShadedSphereNode( options.sphereDiameter, {
      centerY: yValue,
      mainColor: options.fill
    } );

    // add dragListener to scrubber
    sphere.addInputListener( new DragListener( {
      drag( event, listener ) {

        // current modelPosition
        const modelX = chartTransform.viewToModelX( listener.modelPoint.x );
        scrubber.xProperty.value = chartTransform.modelXRange.constrainValue( modelX );
      },
      tandem: options.tandem.createTandem( 'dragListener' )
    } ) );

    // horizontal line, that visibility can be optionally be turned off
    const horizontalLine = new Line( combineOptions<LineOptions>( {
      x1: chartTransform.viewToModelX( 0 ),
      x2: chartTransform.viewToModelX( scrubber.xProperty.value ),
      y1: yValue,
      y2: yValue,
      stroke: options.fill
    }, options.lineOptions ) );

    scrubber.xProperty.link( x => {
      sphere.x = chartTransform.modelToViewX( x );
      horizontalLine.x2 = sphere.x;
    } );

    options.children = [ horizontalLine, sphere ];
    super( options );

    if ( scrubber.tandem !== Tandem.OPT_OUT ) {
      this.addLinkedElement( scrubber, {
        tandem: options.tandem.createTandem( scrubber.tandem.name )
      } );
    }
  }
}
calculusGrapher.register( 'ScrubberNode', ScrubberNode );
