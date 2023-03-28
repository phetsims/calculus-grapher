// Copyright 2023, University of Colorado Boulder

/**
 * ScrubberNode is the base class for the view of scrubbers. It includes a shaded sphere 'handle' for dragging the
 * scrubber to modify its x position, and a vertical line that extends through all graphs.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Line, Node, NodeOptions, TColor, VBox } from '../../../../scenery/js/imports.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import optionize from '../../../../phet-core/js/optionize.js';
import calculusGrapher from '../../calculusGrapher.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import XDragHandleNode from './XDragHandleNode.js';
import AncillaryTool from '../model/AncillaryTool.js';

type SelfOptions = {
  handleColor?: TColor; // color of the scrubber's handle
  lineStroke?: TColor; // color used to stroke the vertical line
  lineWidth?: number; // width of the vertical line
  lineDash?: number[]; // line dash for the vertical line, [] is a solid line

  // The top and bottom y-coordinates of the vertical line, in GraphsNode view coordinate frame.
  lineTop?: number;
  lineBottom?: number;

  // Whether to instrument handleNode.visibleProperty
  // See https://github.com/phetsims/calculus-grapher/issues/281#issuecomment-1472217525
  phetioHandleNodeVisiblePropertyInstrumented?: boolean;
};

export type ScrubberNodeOptions = SelfOptions &
  PickOptional<NodeOptions, 'pickable'> &
  PickRequired<NodeOptions, 'tandem' | 'visibleProperty'>;

export default class ScrubberNode extends Node {

  // vertical line displayed by the scrubber
  protected readonly line: Line;

  // spherical handle for dragging the scrubber
  protected readonly handleNode: Node;

  protected constructor( scrubber: AncillaryTool, chartTransform: ChartTransform,
                         providedOptions: ScrubberNodeOptions ) {

    const options = optionize<ScrubberNodeOptions, SelfOptions, NodeOptions>()( {

      // SelfOptions
      handleColor: 'black',
      lineStroke: 'black',
      lineWidth: 1,
      lineDash: [ 6, 6 ],
      lineTop: 0,
      lineBottom: 100,
      phetioHandleNodeVisiblePropertyInstrumented: true
    }, providedOptions );

    // vertical line
    const line = new Line( 0, options.lineTop, 0, options.lineBottom, {
      stroke: options.lineStroke,
      lineWidth: options.lineWidth,
      lineDash: options.lineDash,
      pickable: false // optimization, see https://github.com/phetsims/calculus-grapher/issues/210
    } );

    // Draggable handle, for translating x
    const handleNode = new XDragHandleNode( scrubber.xProperty, chartTransform, {
      yModel: chartTransform.modelYRange.min,
      mainColor: options.handleColor,
      tandem: options.tandem.createTandem( 'handleNode' ),
      phetioVisiblePropertyInstrumented: options.phetioHandleNodeVisiblePropertyInstrumented
    } );

    options.children = [ line, handleNode ];

    super( options );

    this.line = line;
    this.handleNode = handleNode;

    scrubber.xProperty.link( x => {
      this.line.x = chartTransform.modelToViewX( x );
    } );

    // Keep the handle centered at the bottom of the line.
    line.boundsProperty.link( () => {
      handleNode.centerX = line.centerX;
      handleNode.centerY = line.bottom;
    } );

    this.addLinkedElement( scrubber, {
      tandem: options.tandem.createTandem( scrubber.tandem.name )
    } );
  }

  /**
   * Sets the top and bottom y coordinates of the line, in GraphsNode view coordinate frame.
   */
  public setLineTopAndBottom( yTop: number, yBottom: number ): void {
    this.line.setY1( yTop );
    this.line.setY2( yBottom );
  }

  /**
   * Creates an icon for a scrubber.
   */
  public static createIcon( handleColor: TColor, lineStroke?: TColor ): Node {

    const line = new Line( 0, 0, 0, 11, {
      stroke: lineStroke ? lineStroke : handleColor
    } );

    const handleIcon = XDragHandleNode.createIcon( handleColor );

    return new VBox( {
      children: [ line, handleIcon ]
    } );
  }
}

calculusGrapher.register( 'ScrubberNode', ScrubberNode );
