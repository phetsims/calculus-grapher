// Copyright 2022-2023, University of Colorado Boulder

/**
 * ScrubberNode is a cursor at the bottom of the graph.
 * Scrubbing can be done by dragging the cursor.
 *
 * @author Martin Veillette
 */

import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import ShadedSphereNode from '../../../../scenery-phet/js/ShadedSphereNode.js';
import { DragListener, Line, Node, NodeOptions, TColor } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import AncillaryTool from '../model/AncillaryTool.js';

type SelfOptions = EmptySelfOptions;

export type ScrubberNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem' | 'visibleProperty'>;

export default class ScrubberNode extends Node {

  public constructor( scrubber: AncillaryTool,
                      chartTransform: ChartTransform,
                      color: TColor,
                      providedOptions?: ScrubberNodeOptions ) {

    const options = optionize<ScrubberNodeOptions, SelfOptions, NodeOptions>()( {
      // we're setting options.children below
    }, providedOptions );

    const yValue = chartTransform.modelToViewY( chartTransform.modelYRange.min );

    const sphere = new ShadedSphereNode( 18, {
      centerY: yValue,
      mainColor: color,
      cursor: 'pointer'
    } );

    // Add dragListener to sphere.
    sphere.addInputListener( new DragListener( {
      drag( event, listener ) {
        const modelX = chartTransform.viewToModelX( listener.modelPoint.x );
        scrubber.xProperty.value = chartTransform.modelXRange.constrainValue( modelX );
      },
      tandem: options.tandem.createTandem( 'dragListener' )
    } ) );

    // horizontal line
    const horizontalLine = new Line( {
      x1: chartTransform.viewToModelX( 0 ),
      x2: chartTransform.viewToModelX( scrubber.xProperty.value ),
      y1: yValue,
      y2: yValue,
      stroke: color,
      lineWidth: 2
    } );

    options.children = [ horizontalLine, sphere ];

    super( options );

    scrubber.xProperty.link( x => {
      sphere.x = chartTransform.modelToViewX( x );
      horizontalLine.x2 = sphere.x;
    } );

    this.addLinkedElement( scrubber, {
      tandem: options.tandem.createTandem( scrubber.tandem.name )
    } );
  }
}
calculusGrapher.register( 'ScrubberNode', ScrubberNode );
