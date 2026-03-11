// Copyright 2025-2026, University of Colorado Boulder

/**
 * CalculusGrapherKeyboardHelpContent is the content for the keyboard-help dialog in all screens.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import BasicActionsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/BasicActionsKeyboardHelpSection.js';
import TwoColumnKeyboardHelpContent from '../../../../scenery-phet/js/keyboard/help/TwoColumnKeyboardHelpContent.js';
import calculusGrapher from '../../calculusGrapher.js';
import CurveManipulatorKeyboardHelpSection from './CurveManipulatorKeyboardHelpSection.js';
import ExplorationToolsKeyboardHelpSection from './ExplorationToolsKeyboardHelpSection.js';

export default class CalculusGrapherKeyboardHelpContent extends TwoColumnKeyboardHelpContent {

  public constructor( explorationToolsTitleStringProperty: TReadOnlyProperty<string> ) {

    // Sections in the left column.
    const leftSections = [

      // Curve Manipulator
      new CurveManipulatorKeyboardHelpSection(),

      // Exploration Tools
      new ExplorationToolsKeyboardHelpSection( explorationToolsTitleStringProperty )
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