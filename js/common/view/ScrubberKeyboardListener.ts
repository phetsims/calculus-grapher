// Copyright 2026, University of Colorado Boulder

/**
 * ScrubberKeyboardListener is the KeyboardListener for scrubbers (Reference Line, Tangent, Area Under Curve).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import TRangedProperty from '../../../../axon/js/TRangedProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import SceneryPhetFluent from '../../../../scenery-phet/js/SceneryPhetFluent.js';
import HotkeyData from '../../../../scenery/js/input/HotkeyData.js';
import type { OneKeyStroke } from '../../../../scenery/js/input/KeyDescriptor.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import sharedSoundPlayers from '../../../../tambo/js/sharedSoundPlayers.js';
import SoundClipPlayer from '../../../../tambo/js/sound-generators/SoundClipPlayer.js';
import generalBoundaryBoop_mp3 from '../../../../tambo/sounds/generalBoundaryBoop_mp3.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
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

export class ScrubberKeyboardListener extends KeyboardListener<OneKeyStroke[]> {

  private readonly scrubberNode: ScrubberNode;

  public static readonly HOME_HOTKEY_DATA = new HotkeyData( {
    keys: [ 'home' ],
    repoName: calculusGrapher.name,
    keyboardHelpDialogLabelStringProperty: SceneryPhetFluent.keyboardHelpDialog.jumpToMinimumStringProperty
  } );

  public static readonly END_HOTKEY_DATA = new HotkeyData( {
    keys: [ 'end' ],
    repoName: calculusGrapher.name,
    keyboardHelpDialogLabelStringProperty: SceneryPhetFluent.keyboardHelpDialog.jumpToMaximumStringProperty
  } );

  public constructor( scrubberNode: ScrubberNode,
                      xProperty: TRangedProperty,
                      positionProperty: Property<Vector2>,
                      tandem: Tandem ) {
    super( {
      tandem: tandem,
      keyStringProperties: HotkeyData.combineKeyStringProperties( [
        ScrubberKeyboardListener.HOME_HOTKEY_DATA,
        ScrubberKeyboardListener.END_HOTKEY_DATA
      ] ),

      fire: ( event, keysPressed, listener ) => {
        if ( keysPressed === 'home' ) {
          this.home( xProperty, positionProperty );
        }
        else if ( keysPressed === 'end' ) {
          this.end( xProperty, positionProperty );
        }
      }
    } );

    this.scrubberNode = scrubberNode;
  }

  /**
   * Handles the home key, which moves the scrubber to the minimum value.
   */
  private home( xProperty: TRangedProperty, positionProperty: Property<Vector2> ): void {

    // Set both xProperty and positionProperty so that drag listener stays in sync.
    xProperty.value = xProperty.range.min;
    positionProperty.value = new Vector2( xProperty.range.min, positionProperty.value.y );
    MIN_SOUND_PLAYER.play();
    this.scrubberNode.doAccessibleObjectResponse();
  }

  /**
   * Handles the end key, which moves the scrubber to the maximum value.
   */
  private end( xProperty: TRangedProperty, positionProperty: Property<Vector2> ): void {

    // Set both xProperty and positionProperty so that drag listener stays in sync.
    xProperty.value = xProperty.range.max;
    positionProperty.value = new Vector2( xProperty.range.max, positionProperty.value.y );
    MAX_SOUND_PLAYER.play();
    this.scrubberNode.doAccessibleObjectResponse();
  }
}
