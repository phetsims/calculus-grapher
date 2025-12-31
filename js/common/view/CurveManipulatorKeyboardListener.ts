// Copyright 2025, University of Colorado Boulder

/**
 * CurveManipulatorKeyboardListener switches the curve manipulator between modes, which determines whether
 * moving the manipulator changes the curve or not.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import HotkeyData from '../../../../scenery/js/input/HotkeyData.js';
import type { OneKeyStroke } from '../../../../scenery/js/input/KeyDescriptor.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import sharedSoundPlayers from '../../../../tambo/js/sharedSoundPlayers.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';

export default class CurveManipulatorKeyboardListener extends KeyboardListener<OneKeyStroke[]> {

  public static readonly HOTKEY_DATA = new HotkeyData( {
    keys: [ 'space', 'enter' ],
    repoName: calculusGrapher.name,
    keyboardHelpDialogLabelStringProperty: CalculusGrapherFluent.curveManipulator.keyboardHelpLabelStringProperty
  } );

  public constructor( isChangingCurveProperty: Property<boolean>, tandem: Tandem ) {
    super( {
      tandem: tandem,
      keyStringProperties: HotkeyData.combineKeyStringProperties( [ CurveManipulatorKeyboardListener.HOTKEY_DATA ] ),
      fire: ( event, keysPressed ) => {
        if ( isChangingCurveProperty.value ) {
          isChangingCurveProperty.value = false;
          sharedSoundPlayers.get( 'checkboxUnchecked' ).play();
        }
        else {
          isChangingCurveProperty.value = true;
          sharedSoundPlayers.get( 'checkboxChecked' ).play();
        }
      }
    } );
  }
}

calculusGrapher.register( 'CurveManipulatorKeyboardListener', CurveManipulatorKeyboardListener );