// Copyright 2025, University of Colorado Boulder

/**
 * CurveHandleKeyboardHelpSection is the keyboard-help section that describes how to interact with curves.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import HotkeyData from '../../../../scenery/js/input/HotkeyData.js';
import calculusGrapher from '../../calculusGrapher.js';

//TODO https://github.com/phetsims/calculus-grapher/issues/346 i18n
const curveHandleStringProperty = new Property( 'Curve Handle' );
const keyboardHelpDialogLabelStringProperty = new Property( 'Toggle edit mode' );
const keyboardHelpDialogPDOMLabelStringProperty = new Property( 'Toggle between moving the point or editing the curve with Space or Enter' );

//TODO https://github.com/phetsims/calculus-grapher/issues/346 HOTKEY_DATA should live in keyboard drag listener
const HOTKEY_DATA = new HotkeyData( {
  keys: [ 'space', 'enter' ],
  repoName: calculusGrapher.name,
  keyboardHelpDialogLabelStringProperty: keyboardHelpDialogLabelStringProperty,
  keyboardHelpDialogPDOMLabelStringProperty: keyboardHelpDialogPDOMLabelStringProperty
} );

export default class CurveHandleKeyboardHelpSection extends KeyboardHelpSection {

  public constructor() {

    const rows = [

      // Toggle mode
      KeyboardHelpSectionRow.fromHotkeyData( HOTKEY_DATA )
    ];

    // 'Curves' title
    super( curveHandleStringProperty, rows, {
      textMaxWidth: 300,
      isDisposable: false
    } );
  }
}

calculusGrapher.register( 'CurveHandleKeyboardHelpSection', CurveHandleKeyboardHelpSection );