// Copyright 2023-2026, University of Colorado Boulder

/**
 * XDragHandleNode is a spherical drag handle for controlling the x-coordinate of something's position.
 * It's used by ReferenceLineNode and ScrubberNode for adjusting the x-coordinate of those ancillary tools.
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
import HotkeyData from '../../../../scenery/js/input/HotkeyData.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import TColor from '../../../../scenery/js/util/TColor.js';
import sharedSoundPlayers from '../../../../tambo/js/sharedSoundPlayers.js';
import SoundClipPlayer from '../../../../tambo/js/sound-generators/SoundClipPlayer.js';
import generalBoundaryBoop_mp3 from '../../../../tambo/sounds/generalBoundaryBoop_mp3.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import ScrubberNode from './ScrubberNode.js';

// Same as Slider min and max defaults.
const MAX_SOUND_PLAYER = sharedSoundPlayers.get( 'generalBoundaryBoop' );
const MIN_SOUND_PLAYER = new SoundClipPlayer( generalBoundaryBoop_mp3, {
  soundClipOptions: {
    initialOutputLevel: 0.2,
    initialPlaybackRate: 1 / Math.pow( 2, 1 / 6 ) // a major second lower
  },
  soundManagerOptions: { categoryName: 'user-interface' }
} );

type SelfOptions = {

  // Radius of the handle, in view coordinates
  radius?: number;

  // y-coordinate of the handle, in model coordinate frame
  yModel?: number;
};

type XDragHandleNodeOptions = SelfOptions &
  PickRequired<ShadedSphereNodeOptions, 'mainColor' | 'tandem' | 'phetioVisiblePropertyInstrumented' | 'accessibleName' | 'accessibleHelpText'>;

export default class XDragHandleNode extends InteractiveHighlighting( ShadedSphereNode ) {

  public static readonly HOTKEY_DATA = new HotkeyData( {
    keys: [ 'home', 'end' ],
    repoName: calculusGrapher.name,
    keyboardHelpDialogLabelStringProperty: CalculusGrapherFluent.curveManipulator.keyboardHelpLabelStringProperty
  } );

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
        dragSpeed: 300, // in view coordinates per second
        shiftDragSpeed: 75
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

    // Home/End keyboard listener to move the drag handle to min and max x-coordinates.
    this.addInputListener( new KeyboardListener( {
      tandem: options.tandem.createTandem( 'homeEndKeyboardListener' ),
      keyStringProperties: HotkeyData.combineKeyStringProperties( [ XDragHandleNode.HOTKEY_DATA ] ),

      // Set both xProperty and positionProperty so that drag listener stays in sync.
      fire: ( event, keysPressed, listener ) => {
        if ( keysPressed === 'home' ) {
          xProperty.value = xProperty.range.min;
          positionProperty.value = new Vector2( xProperty.range.min, positionProperty.value.y );
          MIN_SOUND_PLAYER.play();
        }
        else {
          xProperty.value = xProperty.range.max;
          positionProperty.value = new Vector2( xProperty.range.max, positionProperty.value.y );
          MAX_SOUND_PLAYER.play();
        }
      }
    } ) );
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