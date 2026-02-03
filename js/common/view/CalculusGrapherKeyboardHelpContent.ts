// Copyright 2025, University of Colorado Boulder

/**
 * CalculusGrapherKeyboardHelpContent is the content for the keyboard-help dialog in all screens.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BasicActionsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/BasicActionsKeyboardHelpSection.js';
import TwoColumnKeyboardHelpContent from '../../../../scenery-phet/js/keyboard/help/TwoColumnKeyboardHelpContent.js';
import calculusGrapher from '../../calculusGrapher.js';
import CurveManipulatorKeyboardHelpSection from './CurveManipulatorKeyboardHelpSection.js';
import ExplorationToolControlsKeyboardHelpSection from './ExplorationToolControlsKeyboardHelpSection.js';

export default class CalculusGrapherKeyboardHelpContent extends TwoColumnKeyboardHelpContent {

  public constructor() {

    // Sections in the left column.
    const leftSections = [

      // Curve Manipulator
      new CurveManipulatorKeyboardHelpSection(),

      // Exploration Tool Controls
      new ExplorationToolControlsKeyboardHelpSection()
    ];

    // Sections in the right column.
    const rightSections = [

      // Basic Actions
      new BasicActionsKeyboardHelpSection( {
        withCheckboxContent: true
      } )
    ];

    super( leftSections, rightSections, {
      isDisposable: false
    } );
  }
}

calculusGrapher.register( 'CalculusGrapherKeyboardHelpContent', CalculusGrapherKeyboardHelpContent );