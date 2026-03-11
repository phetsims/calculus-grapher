// Copyright 2026, University of Colorado Boulder

/**
 * AdvancedKeyboardHelpContent is the content for the keyboard-help dialog in the 'Advanced' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CalculusGrapherKeyboardHelpContent from '../../common/view/CalculusGrapherKeyboardHelpContent.js';

export default class AdvancedKeyboardHelpContent extends CalculusGrapherKeyboardHelpContent {

  public constructor() {
    super( CalculusGrapherFluent.keyboardHelp.referenceLineStringProperty );
  }
}

calculusGrapher.register( 'AdvancedKeyboardHelpContent', AdvancedKeyboardHelpContent );