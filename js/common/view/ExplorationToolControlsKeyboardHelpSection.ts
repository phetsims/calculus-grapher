// Copyright 2026, University of Colorado Boulder

/**
 * // TODO REVIEW: All over in the documentation and code these are called Ancilliary Tools, not Exploration Tools.
 *      Consider renaming or relating the two names in this doc. https://github.com/phetsims/calculus-grapher/issues/366
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

// TODO REVIEW: Only left and right arrows are listed but you can also move with A and D.
//  Either update the HotkeyData, the KeyboardListener, or document why A and D are not included here. https://github.com/phetsims/calculus-grapher/issues/366
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

    super( CalculusGrapherFluent.keyboardHelp.explorationToolsStringProperty, rows, {
      isDisposable: false,
      textMaxWidth: 300
    } );
  }
}

calculusGrapher.register( 'ExplorationToolControlsKeyboardHelpSection', ExplorationToolControlsKeyboardHelpSection );