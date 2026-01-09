// Copyright 2023-2026, University of Colorado Boulder

/**
 * XDragHandleNode is a spherical drag handle for controlling the x-coordinate of something's position.
 * It's used by ReferenceLineNode and ScrubberNode for adjusting the x-coordinate of those ancillary tools.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Shape from '../../../../kite/js/Shape.js';
import { optionize4 } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import AccessibleDraggableOptions from '../../../../scenery-phet/js/accessibility/grab-drag/AccessibleDraggableOptions.js';
import ShadedSphereNode, { ShadedSphereNodeOptions } from '../../../../scenery-phet/js/ShadedSphereNode.js';
import SoundRichDragListener from '../../../../scenery-phet/js/SoundRichDragListener.js';
import InteractiveHighlighting from '../../../../scenery/js/accessibility/voicing/InteractiveHighlighting.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import TColor from '../../../../scenery/js/util/TColor.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import ScrubberNode from './ScrubberNode.js';

type SelfOptions = {

  // Radius of the handle, in view coordinates
  radius?: number;

  // y-coordinate of the handle, in model coordinate frame
  yModel?: number;
};

type XDragHandleNodeOptions = SelfOptions &
  PickRequired<ShadedSphereNodeOptions, 'mainColor' | 'tandem' | 'phetioVisiblePropertyInstrumented' | 'accessibleName' | 'accessibleHelpText'>;

export default class XDragHandleNode extends InteractiveHighlighting( ShadedSphereNode ) {

  public constructor( xProperty: Property<number>,
                      chartTransform: ChartTransform,
                      scrubberNode: ScrubberNode,
                      providedOptions: XDragHandleNodeOptions ) {

    const options = optionize4<XDragHandleNodeOptions, SelfOptions, ShadedSphereNodeOptions>()(
      {}, AccessibleDraggableOptions, {

        // SelfOptions
        radius: CalculusGrapherConstants.SCRUBBER_RADIUS,
        yModel: 0,

        // ShadedSphereNodeOptions
        isDisposable: false,
        cursor: 'ew-resize'
      }, providedOptions );

    // If we have instrumented the handle's visibleProperty, we also want to feature it in Studio.
    // See https://github.com/phetsims/calculus-grapher/issues/281#event-8769439973
    if ( options.phetioVisiblePropertyInstrumented ) {
      options.visiblePropertyOptions = {
        phetioFeatured: true
      };
    }

    // y-coordinate position is fixed.
    options.y = chartTransform.modelToViewY( options.yModel );

    // Dilate the pointer areas a bit. See https://github.com/phetsims/calculus-grapher/issues/230
    options.touchArea = Shape.circle( 0, 0, options.radius + 5 );
    options.mouseArea = Shape.circle( 0, 0, options.radius + 2 );

    super( options.radius, options );

    // Initial position in view coordinates.
    const positionView = new Vector2( chartTransform.modelToViewX( xProperty.value ), this.y );

    // Drag bounds in view coordinates.
    const dragBoundsView = new Bounds2(
      chartTransform.modelToViewX( chartTransform.modelXRange.min ),
      chartTransform.modelToViewY( chartTransform.modelYRange.min ),
      chartTransform.modelToViewX( chartTransform.modelXRange.max ),
      chartTransform.modelToViewY( chartTransform.modelYRange.max )
    );

    // As the handle is dragged, change xProperty.
    this.addInputListener( new SoundRichDragListener( {
      positionProperty: new Property( positionView ),
      dragBoundsProperty: new Property( dragBoundsView ),
      drag: ( event, listener ) => {
        xProperty.value = chartTransform.viewToModelX( listener.modelPoint.x );
      },
      end: () => scrubberNode.doAccessibleObjectResponse(),
      keyboardDragListenerOptions: {
        dragSpeed: 300, // in view coordinates per second
        shiftDragSpeed: 75
      },
      tandem: options.tandem
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