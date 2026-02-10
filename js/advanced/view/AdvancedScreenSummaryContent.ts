// Copyright 2025, University of Colorado Boulder

/**
 * AdvancedScreenSummaryContent is the description screen summary for the 'Advanced' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CalculusGrapherSymbols from '../../common/CalculusGrapherSymbols.js';

export default class AdvancedScreenSummaryContent extends ScreenSummaryContent {

  public constructor() {

    super( {
      playAreaContent: CalculusGrapherFluent.a11y.advancedScreen.screenSummary.playArea.createProperty( {
        variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty
      } ),
      controlAreaContent: CalculusGrapherFluent.a11y.advancedScreen.screenSummary.controlAreaStringProperty,
      currentDetailsContent: CalculusGrapherFluent.a11y.advancedScreen.screenSummary.currentDetailsStringProperty,
      interactionHintContent: CalculusGrapherFluent.a11y.advancedScreen.screenSummary.interactionHintStringProperty
    } );
  }
}

calculusGrapher.register( 'AdvancedScreenSummaryContent', AdvancedScreenSummaryContent );