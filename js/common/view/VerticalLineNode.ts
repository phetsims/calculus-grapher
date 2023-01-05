// Copyright 2022-2023, University of Colorado Boulder

/**
 * VerticalLineNode is the view representation of vertical line that can spans multiple graphs.
 * The line has a label node located atop of the vertical line
 *
 * @author Martin Veillette
 */

import calculusGrapher from '../../calculusGrapher.js';
import optionize from '../../../../phet-core/js/optionize.js';
import { Line, LineOptions, Node, NodeOptions, Text } from '../../../../scenery/js/imports.js';
import BackgroundNode from '../../../../scenery-phet/js/BackgroundNode.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import AncillaryTool from '../model/AncillaryTool.js';
import StringProperty from '../../../../axon/js/StringProperty.js';

type SelfOptions = {
  lineOptions?: LineOptions;
  labelProperty: StringProperty;
};

type VerticalLineNodeOptions = SelfOptions & StrictOmit<NodeOptions, 'children'>;

export default class VerticalLineNode extends Node {

  private readonly verticalLine;

  public constructor( ancillaryTool: AncillaryTool,
                      chartTransform: ChartTransform,
                      providedOptions?: VerticalLineNodeOptions ) {

    const options = optionize<VerticalLineNodeOptions, SelfOptions, NodeOptions>()( {
      lineOptions: {
        stroke: 'black'
      }
    }, providedOptions );

    const xProperty = ancillaryTool.xProperty;

    //  initial y values are arbitrary, client is responsible for setting them using methods below
    const verticalLine = new Line( 0, 0, 0, -1, options.lineOptions );

    const textNode = new Text( options.labelProperty, {
      font: CalculusGrapherConstants.CONTROL_FONT,
      centerX: 0
    } );

    const labelNode = new BackgroundNode( textNode, {
      centerX: 0,
      bottom: verticalLine.top - 5,
      rectangleOptions: {
        cornerRadius: 3
      }
    } );

    // center x position if label changes
    options.labelProperty.link( () => {
      labelNode.centerX = 0;
    } );

    // set the children inside a layer , to more easily control their x position
    const verticalNodeLayer = new Node( {
      children: [ verticalLine, labelNode ],
      centerX: chartTransform.modelToViewX( xProperty.value )
    } );

    xProperty.link( x => {
      verticalNodeLayer.x = chartTransform.modelToViewX( x );
    } );

    options.children = [ verticalNodeLayer ];
    super( options );

    this.verticalLine = verticalLine;

    this.addLinkedElement( ancillaryTool, {
      tandem: options.tandem.createTandem( ancillaryTool.tandem.name )
    } );
  }

  // set Y top position in view coordinates
  public setLineTop( value: number ): void {
    this.verticalLine.setY2( value );
  }

  // set Y bottom position of line in view coordinates
  public setLineBottom( value: number ): void {
    this.verticalLine.setY1( value );
  }


}

calculusGrapher.register( 'VerticalLineNode', VerticalLineNode );
