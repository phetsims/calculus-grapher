// Copyright 2022, University of Colorado Boulder

/**
 * ReferenceLineNode is the view representation of a user controlled vertical line that spans multiple graphs.
 *
 * @author Martin Veillette
 */

import Property from '../../../../axon/js/Property.js';
import calculusGrapher from '../../calculusGrapher.js';
import optionize from '../../../../phet-core/js/optionize.js';
import { Circle, CircleOptions, DragListener, Line, LineOptions, Node, NodeOptions } from '../../../../scenery/js/imports.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';

type SelfOptions = {
  lineOptions?: LineOptions;
  circleOptions?: CircleOptions;
};

type ReferenceLineNodeOptions = SelfOptions & NodeOptions;

export default class ReferenceLineNode extends Node {

  private readonly verticalLine;
  private readonly circle;

  public constructor( xCoordinateProperty: Property<number>,
                      referenceLineVisibleProperty: Property<boolean>,
                      chartTransform: ChartTransform,
                      providedOptions?: ReferenceLineNodeOptions ) {

    const options = optionize<ReferenceLineNodeOptions, SelfOptions, NodeOptions>()( {
      lineOptions: { stroke: 'black' },
      circleOptions: { radius: 9, fill: 'grey', stroke: 'black' }
    }, providedOptions );

    super( options );

    this.circle = new Circle( options.circleOptions );

    // values will be updated later
    this.verticalLine = new Line( 0, 0, 0, -1, options.lineOptions );

    this.addChild( this.verticalLine );
    this.addChild( this.circle );


    // add dragListener
    this.addInputListener( new DragListener( {
      drag( event, listener ) {

        // current modelPosition
        const modelX = chartTransform.viewToModelX( listener.modelPoint.x );
        xCoordinateProperty.value = chartTransform.modelXRange.constrainValue( modelX );
      },
      tandem: options.tandem.createTandem( 'dragListener' )
    } ) );

    xCoordinateProperty.link( xCoordinate => {
      this.centerX = chartTransform.modelToViewX( xCoordinate );
    } );

    referenceLineVisibleProperty.linkAttribute( this, 'visible' );
  }

  // set Y top position in view coordinates
  public setLineTop( value: number ): void {
    this.verticalLine.setY2( value );
  }

  // set Y bottom position of line in view coordinates
  public setLineBottom( value: number ): void {
    this.verticalLine.setY1( value );
    this.circle.setCenterY( value );
  }
}

calculusGrapher.register( 'ReferenceLineNode', ReferenceLineNode );
