// Copyright 2025, University of Colorado Boulder

/**
 * AdvancedScreenSummaryContent is the description screen summary for the 'Advanced' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';

export default class AdvancedScreenSummaryContent extends ScreenSummaryContent {

  public constructor() {

    super( {
      playAreaContent: CalculusGrapherStrings.a11y.advancedScreen.screenSummary.playAreaStringProperty,
      controlAreaContent: CalculusGrapherStrings.a11y.advancedScreen.screenSummary.controlAreaStringProperty,
      currentDetailsContent: CalculusGrapherStrings.a11y.advancedScreen.screenSummary.currentDetailsStringProperty,
      interactionHintContent: CalculusGrapherStrings.a11y.advancedScreen.screenSummary.interactionHintStringProperty
    } );
  }
}

calculusGrapher.register( 'AdvancedScreenSummaryContent', AdvancedScreenSummaryContent );