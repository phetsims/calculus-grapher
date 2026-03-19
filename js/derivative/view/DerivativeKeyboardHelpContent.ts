// Copyright 2026, University of Colorado Boulder

/**
 * DerivativeKeyboardHelpContent is the content for the keyboard-help dialog in the 'Derivative' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CalculusGrapherKeyboardHelpContent from '../../common/view/CalculusGrapherKeyboardHelpContent.js';

export default class DerivativeKeyboardHelpContent extends CalculusGrapherKeyboardHelpContent {

  public constructor() {
    super( CalculusGrapherFluent.keyboardHelp.tangentToolOrReferenceLineStringProperty );
  }
}
