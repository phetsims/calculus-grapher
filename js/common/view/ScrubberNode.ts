// Copyright 2023, University of Colorado Boulder

//TODO https://github.com/phetsims/calculus-grapher/issues/207 rename AreaUnderCurveScrubberNode
/**
 * ScrubberNode is the base class for the view of ancillary tools that involve a vertical line.
 * This includes ReferenceLineNode and LabeledLineNode. It's responsible for the line, the x coordinate of the line,
 * and the line's y coordinates can be adjusted via setLineTopAndBottom.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Line, Node, NodeOptions, TColor } from '../../../../scenery/js/imports.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import optionize from '../../../../phet-core/js/optionize.js';
import calculusGrapher from '../../calculusGrapher.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import XDragHandleNode from './XDragHandleNode.js';
import Multilink from '../../../../axon/js/Multilink.js';
import AncillaryTool from '../model/AncillaryTool.js';

type SelfOptions = {
  handleColor?: TColor;
  lineStroke?: TColor;
  lineWidth?: number;
  lineDash?: number[];

  // see setLineTopAndBottom
  lineTop?: number;
  lineBottom?: number;
};

export type LineToolNodeOptions = SelfOptions &
  PickOptional<NodeOptions, 'pickable'> &
  PickRequired<NodeOptions, 'tandem' | 'visibleProperty'>;

export default class ScrubberNode extends Node {

  // vertical line displayed by the tool
  protected readonly line: Line;

  protected readonly handleNode: Node; //TODO https://github.com/phetsims/calculus-grapher/issues/207 delete this field

  protected constructor( ancillaryTool: AncillaryTool, chartTransform: ChartTransform,
                         providedOptions: LineToolNodeOptions ) {

    const options = optionize<LineToolNodeOptions, SelfOptions, NodeOptions>()( {

      // SelfOptions
      handleColor: 'black',
      lineStroke: 'black',
      lineWidth: 1,
      lineDash: [],
      lineTop: 0,
      lineBottom: 100
    }, providedOptions );

    // vertical line
    const line = new Line( 0, options.lineTop, 0, options.lineBottom, {
      stroke: options.lineStroke,
      lineWidth: options.lineWidth,
      lineDash: options.lineDash,
      pickable: false // optimization, see https://github.com/phetsims/calculus-grapher/issues/210
    } );

    // Draggable handle, for translating x
    const handleNode = new XDragHandleNode( ancillaryTool.xProperty, chartTransform, {
      yModel: chartTransform.modelYRange.min,
      mainColor: options.handleColor,
      tandem: options.tandem.createTandem( 'handleNode' )
    } );

    options.children = [ line, handleNode ];

    super( options );

    this.line = line;
    this.handleNode = handleNode;

    ancillaryTool.xProperty.link( x => {
      this.line.x = chartTransform.modelToViewX( x );
    } );

    // Keep the handle centered at the bottom of the line.
    Multilink.multilink( [ line.boundsProperty ], () => {
      handleNode.centerX = line.centerX;
      handleNode.top = line.bottom;
    } );

    this.addLinkedElement( ancillaryTool, {
      tandem: options.tandem.createTandem( ancillaryTool.tandem.name )
    } );
  }

  /**
   * Sets the top and bottom y coordinates of the line, in view coordinates.
   */
  public setLineTopAndBottom( yTop: number, yBottom: number ): void {
    this.line.setY1( yTop );
    this.line.setY2( yBottom );
  }
}

calculusGrapher.register( 'ScrubberNode', ScrubberNode );
