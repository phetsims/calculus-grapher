// Copyright 2026, University of Colorado Boulder

/**
 * IntegralKeyboardHelpContent is the content for the keyboard-help dialog in the 'Integral' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CalculusGrapherKeyboardHelpContent from '../../common/view/CalculusGrapherKeyboardHelpContent.js';

export default class IntegralKeyboardHelpContent extends CalculusGrapherKeyboardHelpContent {

  public constructor() {
    super( CalculusGrapherFluent.keyboardHelp.areaUnderCurveToolOrReferenceLineStringProperty );
  }
}
