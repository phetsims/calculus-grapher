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
import { Line, Node, NodeOptions, TColor } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import AncillaryTool from '../model/AncillaryTool.js';
import XDragHandleNode from './XDragHandleNode.js';

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

    // drag handle, for translating x
    const dragHandleNode = new XDragHandleNode( scrubber.xProperty, chartTransform, {
      yModel: chartTransform.modelYRange.min,
      mainColor: color,
      tandem: options.tandem.createTandem( 'dragHandleNode' )
    } );

    // horizontal line that extends from x=0 to the drag handle's position
    const horizontalLine = new Line( 0, 0, dragHandleNode.centerX, 0, {
      stroke: color,
      lineWidth: 2,
      centerY: dragHandleNode.centerY
    } );

    options.children = [ horizontalLine, dragHandleNode ];

    super( options );

    // Resize the horizontal line to match the drag handle's x position.
    dragHandleNode.boundsProperty.link( () => {
      horizontalLine.x2 = dragHandleNode.centerX;
    } );

    this.addLinkedElement( scrubber, {
      tandem: options.tandem.createTandem( scrubber.tandem.name )
    } );
  }
}
calculusGrapher.register( 'ScrubberNode', ScrubberNode );
