// Copyright 2025-2026, University of Colorado Boulder

/**
 * AdvancedScreenSummaryContent is the screen summary for the 'Advanced' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CalculusGrapherSymbols from '../../common/CalculusGrapherSymbols.js';
import CalculusGrapherModel from '../../common/model/CalculusGrapherModel.js';
import CalculusGrapherScreenSummaryContent from '../../common/view/description/CalculusGrapherScreenSummaryContent.js';
import GraphsNode from '../../common/view/GraphsNode.js';

const SCREEN_SUMMARY_STRINGS = CalculusGrapherFluent.a11y.screen.advanced.screenSummary;

export default class AdvancedScreenSummaryContent extends CalculusGrapherScreenSummaryContent {

  public constructor( model: CalculusGrapherModel, graphsNode: GraphsNode ) {

    super( model, graphsNode, {
      playAreaContent: SCREEN_SUMMARY_STRINGS.playArea.createProperty( {
        variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty
      } ),
      interactionHintContent: SCREEN_SUMMARY_STRINGS.interactionHintStringProperty
    } );
  }
}

calculusGrapher.register( 'AdvancedScreenSummaryContent', AdvancedScreenSummaryContent );