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

// Because tools are implemented using scenery DragListener, A and D keys also behave like arrowLeft and arrowRight,
// respectively. But it was a conscious design decision to NOT specify them here because the keyboard help would be
// very odd and potentially confusing -- WASD is a well-known convention, but AD is not. And while it would be
// nice to support the full set of arrow and WASD keys, that proved to be complicated with the existing DragListener
// implementation, so we decided against it. We also considered reimplementing the tools as subclasses of AccessibleSlider
// so that all arrow keys and WASD keys would then be supported. But that would involve major changes to the PhET-iO API,
// and major migration problems, so again we decided against it.
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