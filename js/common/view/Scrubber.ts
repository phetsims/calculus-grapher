// Copyright 2022, University of Colorado Boulder

/**
 * Scrubber is a cursor at the bottom of the graph.
 * Scrubbing can be done by dragging the cursor.
 *
 * @author Martin Veillette
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Property from '../../../../axon/js/Property.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import ShadedSphereNode from '../../../../scenery-phet/js/ShadedSphereNode.js';
import { DragListener, Line, LineOptions, Node, NodeOptions, TColor } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';

type SelfOptions = {
  lineOptions?: LineOptions;
  fill?: TColor;
  sphereDiameter?: number;
};

export type ScrubberOptions = SelfOptions & StrictOmit<NodeOptions, 'children'>;

export default class Scrubber extends Node {

  public constructor( xCoordinateProperty: Property<number>,
                      chartTransform: ChartTransform,
                      providedOptions?: ScrubberOptions ) {

    const options = optionize<ScrubberOptions, SelfOptions, NodeOptions>()(
      {
        lineOptions: {
          visibleProperty: new BooleanProperty( true )
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
        xCoordinateProperty.value = chartTransform.modelXRange.constrainValue( modelX );
      },
      tandem: options.tandem.createTandem( 'dragListener' )
    } ) );

    // horizontal line, that visibility can be optionally be turned off
    const horizontalLine = new Line( combineOptions<LineOptions>( {
      x1: chartTransform.viewToModelX( 0 ),
      x2: chartTransform.viewToModelX( xCoordinateProperty.value ),
      y1: yValue,
      y2: yValue,
      stroke: options.fill
    }, options.lineOptions ) );

    xCoordinateProperty.link( xCoordinate => {

      sphere.centerX = chartTransform.modelToViewX( xCoordinate );
      horizontalLine.x2 = sphere.centerX;
    } );

    options.children = [ horizontalLine, sphere ];
    super( options );
  }
}
calculusGrapher.register( 'Scrubber', Scrubber );
