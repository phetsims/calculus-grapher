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
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import ShadedSphereNode, { ShadedSphereNodeOptions } from '../../../../scenery-phet/js/ShadedSphereNode.js';
import { DragListener, Node, TColor } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';

type SelfOptions = {

  // Radius of the handle, in view coordinates
  radius?: number;

  // y-coordinate of the handle, in model coordinate frame
  yModel?: number;
};

type XDragHandleNodeOptions = SelfOptions &
  PickRequired<ShadedSphereNodeOptions, 'mainColor' | 'tandem' | 'phetioVisiblePropertyInstrumented'>;

export default class XDragHandleNode extends ShadedSphereNode {

  public constructor( xProperty: Property<number>, chartTransform: ChartTransform, providedOptions: XDragHandleNodeOptions ) {

    const options = optionize<XDragHandleNodeOptions, SelfOptions, ShadedSphereNodeOptions>()( {

      // SelfOptions
      radius: CalculusGrapherConstants.SCRUBBER_RADIUS,
      yModel: 0,

      // ShadedSphereNodeOptions
      cursor: 'ew-resize'
    }, providedOptions );

    // If we have instrumented the handle's visibleProperty, we also want to feature it in Studio.
    // See https://github.com/phetsims/calculus-grapher/issues/281#event-8769439973
    if ( options.phetioVisiblePropertyInstrumented ) {
      options.visiblePropertyOptions = {
        phetioFeatured: true
      };
    }

    // y coordinate position is fixed.
    options.y = chartTransform.modelToViewY( options.yModel );

    // Dilate the pointer areas a bit. See https://github.com/phetsims/calculus-grapher/issues/230
    options.touchArea = Shape.circle( 0, 0, options.radius + 5 );
    options.mouseArea = Shape.circle( 0, 0, options.radius + 2 );

    super( options.radius, options );

    // As the handle is dragged, change xProperty.
    this.addInputListener( new DragListener( {
      drag: ( event, listener ) => {
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

  /**
   * Creates an icon for the drag handle.
   */
  public static createIcon( color: TColor, radius = CalculusGrapherConstants.SCRUBBER_RADIUS ): Node {
    return new ShadedSphereNode( 2 * radius, {
      mainColor: color
    } );
  }
}

calculusGrapher.register( 'XDragHandleNode', XDragHandleNode );
