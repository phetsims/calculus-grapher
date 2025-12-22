// Copyright 2025, University of Colorado Boulder

/**
 * CurveCursorKeyboardHelpSection is the keyboard-help section that describes how to interact with curves.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import HotkeyData from '../../../../scenery/js/input/HotkeyData.js';
import calculusGrapher from '../../calculusGrapher.js';

//TODO https://github.com/phetsims/calculus-grapher/issues/346 i18n
const curveHandleStringProperty = new Property( 'Curve Cursor' );
const keyboardHelpDialogLabelStringProperty = new Property( 'Toggle between moving the cursor<br>and manipulating the curve.' );

//TODO https://github.com/phetsims/calculus-grapher/issues/346 HOTKEY_DATA should live in keyboard drag listener
const HOTKEY_DATA = new HotkeyData( {
  keys: [ 'space', 'enter' ],
  repoName: calculusGrapher.name,
  keyboardHelpDialogLabelStringProperty: keyboardHelpDialogLabelStringProperty
} );

export default class CurveCursorKeyboardHelpSection extends KeyboardHelpSection {

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

calculusGrapher.register( 'CurveCursorKeyboardHelpSection', CurveCursorKeyboardHelpSection );