// Copyright 2022-2023, University of Colorado Boulder

/**
 * ScrubberNode is a cursor at the bottom of the graph.
 * Scrubbing can be done by dragging the cursor.
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { Line, Node, NodeOptions, TColor } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import AncillaryTool from '../model/AncillaryTool.js';
import XDragHandleNode from './XDragHandleNode.js';
import ShadedSphereNode from '../../../../scenery-phet/js/ShadedSphereNode.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';

type SelfOptions = {
  accumulationLineVisible?: boolean;
};

export type ScrubberNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem' | 'visibleProperty'>;

export default class ScrubberNode extends Node {

  public constructor( scrubber: AncillaryTool,
                      chartTransform: ChartTransform,
                      color: TColor,
                      providedOptions?: ScrubberNodeOptions ) {

    const options = optionize<ScrubberNodeOptions, SelfOptions, NodeOptions>()( {

      // SelfOptions
      accumulationLineVisible: false
    }, providedOptions );

    // Drag handle, for translating x
    const dragHandleNode = new XDragHandleNode( scrubber.xProperty, chartTransform, {
      yModel: chartTransform.modelYRange.min,
      mainColor: color,
      tandem: options.tandem.createTandem( 'dragHandleNode' )
    } );

    // Horizontal 'accumulation line' that extends from x=0 to the drag handle's position
    const accumulationLine = new Line( 0, 0, dragHandleNode.centerX, 0, {
      visible: options.accumulationLineVisible,
      stroke: color,
      lineWidth: 3,
      centerY: dragHandleNode.centerY
    } );

    options.children = [ accumulationLine, dragHandleNode ];

    super( options );

    // Resizes the horizontal line to match the drag handle's x position.
    dragHandleNode.boundsProperty.link( () => {
      accumulationLine.x2 = dragHandleNode.centerX;
    } );

    this.addLinkedElement( scrubber, {
      tandem: options.tandem.createTandem( scrubber.tandem.name )
    } );
  }

  /**
   * Creates an icon for a scrubber.
   */
  public static createIcon( color: TColor, radius = CalculusGrapherConstants.SCRUBBER_RADIUS ): Node {
    return new ShadedSphereNode( 2 * radius, {
      mainColor: color
    } );
  }
}

calculusGrapher.register( 'ScrubberNode', ScrubberNode );
