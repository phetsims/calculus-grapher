// Copyright 2025, University of Colorado Boulder

/**
 * CurveManipulatorKeyboardHelpSection is the keyboard-help section that describes how to interact with curves.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import calculusGrapher from '../../calculusGrapher.js';
import CurveManipulator from './CurveManipulator.js';

//TODO https://github.com/phetsims/calculus-grapher/issues/346 i18n
const curveHandleStringProperty = new Property( 'Curve Manipulator' );

export default class CurveManipulatorKeyboardHelpSection extends KeyboardHelpSection {

  public constructor() {

    const rows = [

      // Toggle edit mode
      KeyboardHelpSectionRow.fromHotkeyData( CurveManipulator.HOTKEY_DATA )
    ];

    // 'Curve Handle' title
    super( curveHandleStringProperty, rows, {
      isDisposable: false,
      textMaxWidth: 300
    } );
  }
}

calculusGrapher.register( 'CurveManipulatorKeyboardHelpSection', CurveManipulatorKeyboardHelpSection );