// Copyright 2023-2026, University of Colorado Boulder

/**
 * ScrubberHandleNode is a spherical drag handle for scrubbers, dragged horizontally to adjust the x-coordinate.
 * Use by Reference Line, Tangent, and Area Under Curve scrubbers.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import TRangedProperty from '../../../../axon/js/TRangedProperty.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Shape from '../../../../kite/js/Shape.js';
import { optionize4 } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import AccessibleDraggableOptions from '../../../../scenery-phet/js/accessibility/grab-drag/AccessibleDraggableOptions.js';
import ShadedSphereNode, { ShadedSphereNodeOptions } from '../../../../scenery-phet/js/ShadedSphereNode.js';
import SoundRichDragListener from '../../../../scenery-phet/js/SoundRichDragListener.js';
import InteractiveHighlighting from '../../../../scenery/js/accessibility/voicing/InteractiveHighlighting.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import TColor from '../../../../scenery/js/util/TColor.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import { ScrubberKeyboardListener } from './ScrubberKeyboardListener.js';
import ScrubberNode from './ScrubberNode.js';

type SelfOptions = {

  // Radius of the handle, in view coordinates
  radius?: number;

  // y-coordinate of the handle, in model coordinate frame
  yModel?: number;
};

type XDragHandleNodeOptions = SelfOptions &
  PickRequired<ShadedSphereNodeOptions, 'mainColor' | 'tandem' | 'phetioVisiblePropertyInstrumented' | 'accessibleName' | 'accessibleHelpText'>;

export default class ScrubberHandleNode extends InteractiveHighlighting( ShadedSphereNode ) {

  public constructor( xProperty: TRangedProperty,
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

    // Initial position in model coordinates.
    const positionProperty = new Property( new Vector2( xProperty.value, chartTransform.viewToModelY( this.y ) ) );

    // Drag bounds in model coordinates.
    const dragBoundsProperty = new Property( new Bounds2(
      chartTransform.modelXRange.min, chartTransform.modelYRange.min,
      chartTransform.modelXRange.max, chartTransform.modelYRange.max ) );

    // As the handle is dragged, change xProperty.
    this.addInputListener( new SoundRichDragListener( {

      // Synthesize a ModelViewTransform2 from the ChartTransform.
      transform: ModelViewTransform2.createOffsetXYScaleMapping(
        new Vector2( 0, chartTransform.viewHeight / 2 ), // offset of the origin in view coordinates
        chartTransform.viewWidth / chartTransform.modelXRange.getLength(), // xScale, model to view
        -( chartTransform.viewHeight / chartTransform.modelYRange.getLength() ) // yScale, model to view
      ),

      positionProperty: positionProperty,
      dragBoundsProperty: dragBoundsProperty,

      keyboardDragListenerOptions: {
        dragDelta: chartTransform.modelToViewDeltaX( 0.1 ),
        shiftDragDelta: chartTransform.modelToViewDeltaX( 0.01 ),
        moveOnHoldInterval: 50
      },

      drag: ( event, listener ) => {
        xProperty.value = positionProperty.value.x;
      },

      end: () => scrubberNode.doAccessibleObjectResponse(),

      tandem: options.tandem
    } ) );

    // As xProperty changes, translate this Node.
    xProperty.link( x => {
      this.x = chartTransform.modelToViewX( x );
    } );

    // Keyboard listener for keyboard shortcuts.
    this.addInputListener( new ScrubberKeyboardListener( scrubberNode, xProperty, positionProperty,
      options.tandem.createTandem( 'keyboardListener' ) ) );
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

calculusGrapher.register( 'ScrubberHandleNode', ScrubberHandleNode );