// Copyright 2026, University of Colorado Boulder

/**
 * ExplorationToolControlsKeyboardHelpSection is the keyboard-help section that describes how to interact with the
 * exploration tools (Reference Line, Tangent, Area Under Curve).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import SceneryPhetFluent from '../../../../scenery-phet/js/SceneryPhetFluent.js';
import HotkeyData from '../../../../scenery/js/input/HotkeyData.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';

// Specify HotkeyData for each KeyboardHelpSectionRow, so that we can use KeyboardHelpSectionRow.fromHotkeyData
// which creates both the visual interface and core description.

const MOVE_HOTKEY_DATA = new HotkeyData( {
  keys: [ 'arrowLeft', 'arrowRight' ],
  repoName: calculusGrapher.name,
  keyboardHelpDialogLabelStringProperty: SceneryPhetFluent.keyboardHelpDialog.moveStringProperty
} );

const MOVE_SLOWER_HOTKEY_DATA = new HotkeyData( {
  keys: [ 'shift+arrowLeft', 'shift+arrowRight' ],
  repoName: calculusGrapher.name,
  keyboardHelpDialogLabelStringProperty: SceneryPhetFluent.keyboardHelpDialog.moveSlowerStringProperty
} );

const HOME_HOTKEY_DATA = new HotkeyData( {
  keys: [ 'home' ],
  repoName: calculusGrapher.name,
  keyboardHelpDialogLabelStringProperty: SceneryPhetFluent.keyboardHelpDialog.jumpToMinimumStringProperty
} );

const END_HOTKEY_DATA = new HotkeyData( {
  keys: [ 'end' ],
  repoName: calculusGrapher.name,
  keyboardHelpDialogLabelStringProperty: SceneryPhetFluent.keyboardHelpDialog.jumpToMaximumStringProperty
} );

export default class ExplorationToolControlsKeyboardHelpSection extends KeyboardHelpSection {

  public constructor() {

    const rows = [

      // Move
      KeyboardHelpSectionRow.fromHotkeyData( MOVE_HOTKEY_DATA ),

      // Move slower
      KeyboardHelpSectionRow.fromHotkeyData( MOVE_SLOWER_HOTKEY_DATA ),

      // Jump to minimum
      KeyboardHelpSectionRow.fromHotkeyData( HOME_HOTKEY_DATA ),

      // Jump to maximum
      KeyboardHelpSectionRow.fromHotkeyData( END_HOTKEY_DATA )
    ];

    super( CalculusGrapherFluent.explorationToolControlsStringProperty, rows, {
      isDisposable: false,
      textMaxWidth: 300
    } );
  }
}

calculusGrapher.register( 'ExplorationToolControlsKeyboardHelpSection', ExplorationToolControlsKeyboardHelpSection );