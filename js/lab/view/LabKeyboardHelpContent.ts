// Copyright 2026, University of Colorado Boulder

/**
 * LabKeyboardHelpContent is the content for the keyboard-help dialog in the 'Lab' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CalculusGrapherKeyboardHelpContent from '../../common/view/CalculusGrapherKeyboardHelpContent.js';

export default class LabKeyboardHelpContent extends CalculusGrapherKeyboardHelpContent {

  public constructor() {
    super( CalculusGrapherFluent.keyboardHelp.referenceLineStringProperty );
  }
}

calculusGrapher.register( 'LabKeyboardHelpContent', LabKeyboardHelpContent );