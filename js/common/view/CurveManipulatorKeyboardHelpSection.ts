// Copyright 2025, University of Colorado Boulder

/**
 * CurveManipulatorKeyboardHelpSection is the keyboard-help section that describes how to interact with curves.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CurveManipulator from './CurveManipulator.js';

export default class CurveManipulatorKeyboardHelpSection extends KeyboardHelpSection {

  public constructor() {

    const rows = [

      // Toggle edit mode
      KeyboardHelpSectionRow.fromHotkeyData( CurveManipulator.HOTKEY_DATA, {
        labelWithIconOptions: {
          labelOptions: {
            lineWrap: 200
          }
        }
      } )
    ];

    // 'Curve Handle' title
    super( CalculusGrapherFluent.curveManipulator.keyboardHelpHeadingStringProperty, rows, {
      isDisposable: false,
      textMaxWidth: 300
    } );
  }
}

calculusGrapher.register( 'CurveManipulatorKeyboardHelpSection', CurveManipulatorKeyboardHelpSection );