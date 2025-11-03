// Copyright 2025, University of Colorado Boulder

/**
 * IntegralScreenSummaryContent is the description screen summary for the 'Integral' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';

export default class IntegralScreenSummaryContent extends ScreenSummaryContent {

  public constructor() {

    super( {
      playAreaContent: CalculusGrapherStrings.a11y.integralScreen.screenSummary.playAreaStringProperty,
      controlAreaContent: CalculusGrapherStrings.a11y.integralScreen.screenSummary.controlAreaStringProperty,
      currentDetailsContent: CalculusGrapherStrings.a11y.integralScreen.screenSummary.currentDetailsStringProperty,
      interactionHintContent: CalculusGrapherStrings.a11y.integralScreen.screenSummary.interactionHintStringProperty
    } );
  }
}

calculusGrapher.register( 'IntegralScreenSummaryContent', IntegralScreenSummaryContent );