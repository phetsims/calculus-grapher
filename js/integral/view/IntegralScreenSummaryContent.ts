// Copyright 2025, University of Colorado Boulder

/**
 * IntegralScreenSummaryContent is the description screen summary for the 'Integral' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';

export default class IntegralScreenSummaryContent extends ScreenSummaryContent {

  public constructor() {

    super( {
      playAreaContent: CalculusGrapherFluent.a11y.integralScreen.screenSummary.playAreaStringProperty,
      controlAreaContent: CalculusGrapherFluent.a11y.integralScreen.screenSummary.controlAreaStringProperty,
      currentDetailsContent: CalculusGrapherFluent.a11y.integralScreen.screenSummary.currentDetailsStringProperty,
      interactionHintContent: CalculusGrapherFluent.a11y.integralScreen.screenSummary.interactionHintStringProperty
    } );
  }
}

calculusGrapher.register( 'IntegralScreenSummaryContent', IntegralScreenSummaryContent );