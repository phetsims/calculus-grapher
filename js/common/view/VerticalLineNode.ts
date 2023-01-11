// Copyright 2022-2023, University of Colorado Boulder

/**
 * VerticalLineNode is the view representation of vertical line that can spans multiple graphs.
 * The line has a label node located atop of the vertical line
 *
 * @author Martin Veillette
 */

import calculusGrapher from '../../calculusGrapher.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import { Color, ColorProperty, Line, Node, NodeOptions, NodeTranslationOptions, Text } from '../../../../scenery/js/imports.js';
import BackgroundNode from '../../../../scenery-phet/js/BackgroundNode.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import LabeledAncillaryTool from '../model/LabeledAncillaryTool.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';

type SelfOptions = EmptySelfOptions;

type VerticalLineNodeOptions = SelfOptions & NodeTranslationOptions & PickRequired<NodeOptions, 'tandem'>;

export default class VerticalLineNode extends Node {

  private readonly line;

  public constructor( verticalLine: LabeledAncillaryTool,
                      chartTransform: ChartTransform,
                      providedOptions: VerticalLineNodeOptions ) {

    const options = optionize<VerticalLineNodeOptions, SelfOptions, NodeOptions>()( {

      // NodeOptions
      visibleProperty: verticalLine.visibleProperty
    }, providedOptions );

    const xProperty = verticalLine.xProperty;

    // initial y values are arbitrary, client is responsible for setting them using methods below
    const line = new Line( 0, 0, 0, -1, {
      lineDash: [ 4, 2 ],

      // For PhET-iO
      stroke: new ColorProperty( Color.black, {
        tandem: options.tandem.createTandem( 'colorProperty' )
      } )
    } );

    const text = new Text( verticalLine.labelProperty, {
      font: CalculusGrapherConstants.CONTROL_FONT,
      maxWidth: 50,
      centerX: 0
    } );

    const labelNode = new BackgroundNode( text, {
      centerX: 0,
      bottom: line.top - 5,
      rectangleOptions: {
        cornerRadius: 3
      }
    } );

    // center x position if label changes
    verticalLine.labelProperty.link( () => {
      labelNode.centerX = 0;
    } );

    // set the children inside a layer , to more easily control their x position
    const verticalNodeLayer = new Node( {
      children: [ line, labelNode ],
      centerX: chartTransform.modelToViewX( xProperty.value )
    } );

    xProperty.link( x => {
      verticalNodeLayer.x = chartTransform.modelToViewX( x );
    } );

    options.children = [ verticalNodeLayer ];

    super( options );

    this.line = line;

    this.addLinkedElement( verticalLine, {
      tandem: options.tandem.createTandem( verticalLine.tandem.name )
    } );
  }

  // set Y top position in view coordinates
  public setLineTop( value: number ): void {
    this.line.setY2( value );
  }

  // set Y bottom position of line in view coordinates
  public setLineBottom( value: number ): void {
    this.line.setY1( value );
  }
}

calculusGrapher.register( 'VerticalLineNode', VerticalLineNode );
