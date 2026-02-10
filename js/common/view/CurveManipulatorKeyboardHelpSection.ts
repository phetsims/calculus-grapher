// Copyright 2025-2026, University of Colorado Boulder

/**
 * CurveManipulatorKeyboardHelpSection is the keyboard-help section that describes how to interact with curves.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import SceneryPhetFluent from '../../../../scenery-phet/js/SceneryPhetFluent.js';
import KeyboardDragListener from '../../../../scenery/js/listeners/KeyboardDragListener.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CurveManipulatorKeyboardListener from './CurveManipulatorKeyboardListener.js';

export default class CurveManipulatorKeyboardHelpSection extends KeyboardHelpSection {

  public constructor() {

    const rows = [

      // Toggle edit mode
      KeyboardHelpSectionRow.fromHotkeyData( CurveManipulatorKeyboardListener.HOTKEY_DATA, {
        labelWithIconOptions: {
          labelOptions: {
            lineWrap: 200
          }
        }
      } ),

      // Move
      KeyboardHelpSectionRow.fromHotkeyData( KeyboardDragListener.MOVE_HOTKEY_DATA, {
        labelStringProperty: SceneryPhetFluent.keyboardHelpDialog.moveStringProperty
      } ),

      // Move slower
      KeyboardHelpSectionRow.fromHotkeyData( KeyboardDragListener.MOVE_SLOWER_HOTKEY_DATA, {
        labelStringProperty: SceneryPhetFluent.keyboardHelpDialog.moveSlowerStringProperty
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