// Copyright 2025, University of Colorado Boulder

/**
 * CurveManipulatorKeyboardHelpSection is the keyboard-help section that describes how to interact with curves.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import KeyboardHelpIconFactory from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpIconFactory.js';
import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import SceneryPhetFluent from '../../../../scenery-phet/js/SceneryPhetFluent.js';
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
      KeyboardHelpSectionRow.labelWithIcon(
        SceneryPhetFluent.keyboardHelpDialog.moveStringProperty,
        KeyboardHelpIconFactory.arrowOrWasdKeysRowIcon(), {
          labelInnerContent: SceneryPhetFluent.a11y.keyboardHelpDialog.draggableItems.moveDescriptionStringProperty
        } ),

      // Move slower
      KeyboardHelpSectionRow.labelWithIconList(
        SceneryPhetFluent.keyboardHelpDialog.moveSlowerStringProperty, [
          KeyboardHelpIconFactory.shiftPlusIcon( KeyboardHelpIconFactory.arrowKeysRowIcon() ),
          KeyboardHelpIconFactory.shiftPlusIcon( KeyboardHelpIconFactory.wasdRowIcon() )
        ], {
          labelInnerContent: SceneryPhetFluent.a11y.keyboardHelpDialog.draggableItems.moveSlowerDescriptionStringProperty
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