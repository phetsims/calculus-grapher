// Copyright 2025-2026, University of Colorado Boulder

/**
 * CurveManipulatorKeyboardListener toggle keyboard manipulation of the curve on and off.
 * When keyboard manipulation is on, moving the manipulator also changes the curve.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import HotkeyData from '../../../../scenery/js/input/HotkeyData.js';
import type { OneKeyStroke } from '../../../../scenery/js/input/KeyDescriptor.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import sharedSoundPlayers from '../../../../tambo/js/sharedSoundPlayers.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CurveManipulator from '../model/CurveManipulator.js';
import CurveManipulatorDescriber from './description/CurveManipulatorDescriber.js';

export default class CurveManipulatorKeyboardListener extends KeyboardListener<OneKeyStroke[]> {

  public static readonly HOTKEY_DATA = new HotkeyData( {
    keys: [ 'space', 'enter' ],
    repoName: calculusGrapher.name,
    keyboardHelpDialogLabelStringProperty: CalculusGrapherFluent.curveManipulator.keyboardHelpLabelStringProperty
  } );

  public constructor( curveManipulator: CurveManipulator, describer: CurveManipulatorDescriber, tandem: Tandem ) {

    const keyboardModeProperty = curveManipulator.keyboardModeProperty;

    super( {
      tandem: tandem,
      keyStringProperties: HotkeyData.combineKeyStringProperties( [ CurveManipulatorKeyboardListener.HOTKEY_DATA ] ),

      // Toggle the keyboard mode of the curve manipulator.
      fire: () => {
        if ( keyboardModeProperty.value === 'grabbed' ) {
          keyboardModeProperty.value = 'released';
          sharedSoundPlayers.get( 'checkboxUnchecked' ).play();
        }
        else {
          keyboardModeProperty.value = 'grabbed';
          sharedSoundPlayers.get( 'checkboxChecked' ).play();
        }
        describer.addAccessibleObjectResponseGrabbedReleased();
      }
    } );
  }
}

calculusGrapher.register( 'CurveManipulatorKeyboardListener', CurveManipulatorKeyboardListener );