// Copyright 2025, University of Colorado Boulder

/**
 * DerivativeScreenSummaryContent is the description screen summary for the 'Derivative' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';

export default class DerivativeScreenSummaryContent extends ScreenSummaryContent {

  public constructor() {

    super( {
      playAreaContent: CalculusGrapherStrings.a11y.derivativeScreen.screenSummary.playAreaStringProperty,
      controlAreaContent: CalculusGrapherStrings.a11y.derivativeScreen.screenSummary.controlAreaStringProperty,
      currentDetailsContent: CalculusGrapherStrings.a11y.derivativeScreen.screenSummary.currentDetailsStringProperty,
      interactionHintContent: CalculusGrapherStrings.a11y.derivativeScreen.screenSummary.interactionHintStringProperty
    } );
  }
}

calculusGrapher.register( 'DerivativeScreenSummaryContent', DerivativeScreenSummaryContent );