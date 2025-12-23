// Copyright 2025, University of Colorado Boulder

/**
 * CurveManipulatorKeyboardHelpSection is the keyboard-help section that describes how to interact with curves.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import HotkeyData from '../../../../scenery/js/input/HotkeyData.js';
import calculusGrapher from '../../calculusGrapher.js';

//TODO https://github.com/phetsims/calculus-grapher/issues/346 i18n
const curveHandleStringProperty = new Property( 'Curve Manipulator' );
const keyboardHelpDialogLabelStringProperty = new Property( 'Toggle between positioning manipulator<br>and modifying curve.' );

//TODO https://github.com/phetsims/calculus-grapher/issues/346 HOTKEY_DATA should live in keyboard drag listener
const HOTKEY_DATA = new HotkeyData( {
  keys: [ 'space', 'enter' ],
  repoName: calculusGrapher.name,
  keyboardHelpDialogLabelStringProperty: keyboardHelpDialogLabelStringProperty
} );

export default class CurveManipulatorKeyboardHelpSection extends KeyboardHelpSection {

  public constructor() {

    const rows = [

      // Toggle edit mode
      KeyboardHelpSectionRow.fromHotkeyData( HOTKEY_DATA )
    ];

    // 'Curve Handle' title
    super( curveHandleStringProperty, rows, {
      textMaxWidth: 300,
      isDisposable: false
    } );
  }
}

calculusGrapher.register( 'CurveManipulatorKeyboardHelpSection', CurveManipulatorKeyboardHelpSection );