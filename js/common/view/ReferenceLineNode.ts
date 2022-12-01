// Copyright 2022, University of Colorado Boulder

/**
 * ReferenceLineNode is the view representation of a user controlled vertical line that spans multiple graphs.
 *
 * @author Martin Veillette
 */

import Property from '../../../../axon/js/Property.js';
import calculusGrapher from '../../calculusGrapher.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import { DragListener, Line, LineOptions, Node, NodeOptions } from '../../../../scenery/js/imports.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import ShadedSphereNode, { ShadedSphereNodeOptions } from '../../../../scenery-phet/js/ShadedSphereNode.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';

type SelfOptions = {
  lineOptions?: LineOptions;
  sphereOptions?: ShadedSphereNodeOptions;
  sphereDiameter?: number;
};

type ReferenceLineNodeOptions = SelfOptions & NodeOptions;

export default class ReferenceLineNode extends Node {

  private readonly verticalLine;
  private readonly sphere;

  public constructor( xCoordinateProperty: Property<number>,
                      referenceLineVisibleProperty: TReadOnlyProperty<boolean>,
                      chartTransform: ChartTransform,
                      providedOptions?: ReferenceLineNodeOptions ) {

    const options = optionize<ReferenceLineNodeOptions, SelfOptions, NodeOptions>()( {
      lineOptions: {
        stroke: 'black'
      },
      sphereOptions: { mainColor: 'blue' },
      sphereDiameter: 18
    }, providedOptions );

    const sphere = new ShadedSphereNode( options.sphereDiameter, options.sphereOptions );

    // values will be updated later
    const verticalLine = new Line( 0, 0, 0, -1, options.lineOptions );

    const cursorNode = new Node( {
      children: [ verticalLine, sphere ],
      centerX: chartTransform.modelToViewX( xCoordinateProperty.value )
    } );

    // add dragListener
    cursorNode.addInputListener( new DragListener( {
      drag( event, listener ) {

        // current modelPosition
        const modelX = chartTransform.viewToModelX( listener.modelPoint.x );
        xCoordinateProperty.value = chartTransform.modelXRange.constrainValue( modelX );
      },
      tandem: options.tandem.createTandem( 'dragListener' )
    } ) );

    xCoordinateProperty.link( xCoordinate => {

      cursorNode.centerX = chartTransform.modelToViewX( xCoordinate );
    } );

    referenceLineVisibleProperty.linkAttribute( cursorNode, 'visible' );

    super( combineOptions<NodeOptions>( { children: [ cursorNode ] }, options ) );

    this.verticalLine = verticalLine;
    this.sphere = sphere;
  }

  // set Y top position in view coordinates
  public setLineTop( value: number ): void {
    this.verticalLine.setY2( value );
  }

  // set Y bottom position of line in view coordinates
  public setLineBottom( value: number ): void {
    this.verticalLine.setY1( value );
    this.sphere.setCenterY( value );
  }

  /**
   * Returns an icon for a ReferenceLine
   */
  public static getIcon( providedOptions?: ReferenceLineNodeOptions ): Node {

    const options = optionize<ReferenceLineNodeOptions, SelfOptions, NodeOptions>()( {
      lineOptions: {
        stroke: 'black',
        y2: -15
      },
      sphereOptions: { mainColor: 'blue' },
      sphereDiameter: 8
    }, providedOptions );

    const sphere = new ShadedSphereNode( options.sphereDiameter, options.sphereOptions );

    const verticalLine = new Line( options.lineOptions );

    options.children = [ verticalLine, sphere ];

    return new Node( options );
  }
}

calculusGrapher.register( 'ReferenceLineNode', ReferenceLineNode );
