// Copyright 2023, University of Colorado Boulder

/**
 * XDragHandleNode is a spherical drag handle for controlling the x coordinate of something's position.
 * It's used by ReferenceLineNode and ScrubberNode for adjusting the x coordinate of those ancillary tools.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import { Shape } from '../../../../kite/js/imports.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import ShadedSphereNode, { ShadedSphereNodeOptions } from '../../../../scenery-phet/js/ShadedSphereNode.js';
import { DragListener } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';

type SelfOptions = {
  radius?: number;
  yModel?: number; // y coordinate, in model coordinate frame
};

type XDragHandleNodeOptions = SelfOptions &
  PickOptional<ShadedSphereNodeOptions, 'mainColor'> &
  PickRequired<ShadedSphereNodeOptions, 'tandem'>;

export default class XDragHandleNode extends ShadedSphereNode {

  public constructor( xProperty: Property<number>, chartTransform: ChartTransform, providedOptions: XDragHandleNodeOptions ) {

    const options = optionize<XDragHandleNodeOptions, SelfOptions, ShadedSphereNodeOptions>()( {

      // SelfOptions
      radius: 9,
      yModel: 0,

      // ShadedSphereNodeOptions
      cursor: 'pointer',
      phetioVisiblePropertyInstrumented: false
    }, providedOptions );

    // y coordinate position is fixed.
    options.y = chartTransform.modelToViewY( options.yModel );

    // Dilate the touch area a bit.
    options.touchArea = Shape.circle( 0, 0, options.radius + 5 );

    super( options.radius, options );

    // As the handle is dragged, change xProperty.
    this.addInputListener( new DragListener( {
      drag( event, listener ) {
        const xModel = chartTransform.viewToModelX( listener.modelPoint.x );
        xProperty.value = chartTransform.modelXRange.constrainValue( xModel );
      },
      tandem: options.tandem.createTandem( 'dragListener' )
    } ) );

    // As xProperty changes, translate this Node.
    xProperty.link( x => {
      this.x = chartTransform.modelToViewX( x );
    } );
  }
}

calculusGrapher.register( 'XDragHandleNode', XDragHandleNode );