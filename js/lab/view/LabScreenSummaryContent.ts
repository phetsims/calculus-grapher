// Copyright 2025, University of Colorado Boulder

/**
 * LabScreenSummaryContent is the description screen summary for the 'Lab' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CalculusGrapherSymbols from '../../common/CalculusGrapherSymbols.js';

export default class LabScreenSummaryContent extends ScreenSummaryContent {

  public constructor() {

    super( {
      playAreaContent: CalculusGrapherFluent.a11y.labScreen.screenSummary.playArea.createProperty( {
        variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty
      } ),
      controlAreaContent: CalculusGrapherFluent.a11y.labScreen.screenSummary.controlAreaStringProperty,
      currentDetailsContent: CalculusGrapherFluent.a11y.labScreen.screenSummary.currentDetailsStringProperty,
      interactionHintContent: CalculusGrapherFluent.a11y.labScreen.screenSummary.interactionHintStringProperty
    } );
  }
}

calculusGrapher.register( 'LabScreenSummaryContent', LabScreenSummaryContent );