// Copyright 2026, University of Colorado Boulder

/**
 * ExplorationToolControlsKeyboardHelpSection is the keyboard-help section that describes how to interact with the
 * exploration tool controls (Reference Line, Tangent, Area Under Curve).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import SliderControlsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/SliderControlsKeyboardHelpSection.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';

export default class ExplorationToolControlsKeyboardHelpSection extends SliderControlsKeyboardHelpSection {

  public constructor() {
    super( {
      headingStringProperty: CalculusGrapherFluent.explorationToolControlsStringProperty,
      sliderStringProperty: CalculusGrapherFluent.toolStringProperty,
      includeLargerStepsRow: false
    } );
  }
}

calculusGrapher.register( 'ExplorationToolControlsKeyboardHelpSection', ExplorationToolControlsKeyboardHelpSection );