// Copyright 2025, University of Colorado Boulder

/**
 * DerivativeScreenSummaryContent is the description screen summary for the 'Derivative' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CalculusGrapherSymbols from '../../common/CalculusGrapherSymbols.js';

export default class DerivativeScreenSummaryContent extends ScreenSummaryContent {

  public constructor() {

    super( {
      playAreaContent: CalculusGrapherFluent.a11y.derivativeScreen.screenSummary.playArea.createProperty( {
        variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty
      } ),
      controlAreaContent: CalculusGrapherFluent.a11y.derivativeScreen.screenSummary.controlAreaStringProperty,
      currentDetailsContent: CalculusGrapherFluent.a11y.derivativeScreen.screenSummary.currentDetailsStringProperty,
      interactionHintContent: CalculusGrapherFluent.a11y.derivativeScreen.screenSummary.interactionHintStringProperty
    } );
  }
}

calculusGrapher.register( 'DerivativeScreenSummaryContent', DerivativeScreenSummaryContent );