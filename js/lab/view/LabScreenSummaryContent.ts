// Copyright 2025, University of Colorado Boulder

/**
 * LabScreenSummaryContent is the description screen summary for the 'Lab' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';

export default class LabScreenSummaryContent extends ScreenSummaryContent {

  public constructor() {

    super( {
      playAreaContent: CalculusGrapherStrings.a11y.labScreen.screenSummary.playAreaStringProperty,
      controlAreaContent: CalculusGrapherStrings.a11y.labScreen.screenSummary.controlAreaStringProperty,
      currentDetailsContent: CalculusGrapherStrings.a11y.labScreen.screenSummary.currentDetailsStringProperty,
      interactionHintContent: CalculusGrapherStrings.a11y.labScreen.screenSummary.interactionHintStringProperty
    } );
  }
}

calculusGrapher.register( 'LabScreenSummaryContent', LabScreenSummaryContent );