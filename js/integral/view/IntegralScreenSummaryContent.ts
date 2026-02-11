// Copyright 2025-2026, University of Colorado Boulder

/**
 * IntegralScreenSummaryContent is the screen summary for the 'Integral' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CalculusGrapherSymbols from '../../common/CalculusGrapherSymbols.js';
import CalculusGrapherModel from '../../common/model/CalculusGrapherModel.js';
import CalculusGrapherScreenSummaryContent from '../../common/view/description/CalculusGrapherScreenSummaryContent.js';
import GraphsNode from '../../common/view/GraphsNode.js';

export default class IntegralScreenSummaryContent extends CalculusGrapherScreenSummaryContent {

  public constructor( model: CalculusGrapherModel, graphsNode: GraphsNode ) {

    super( model, graphsNode, {
      playAreaContent: CalculusGrapherFluent.a11y.integralScreen.screenSummary.playArea.createProperty( {
        variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty
      } ),
      interactionHintContent: CalculusGrapherFluent.a11y.integralScreen.screenSummary.interactionHint.createProperty( {
        variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty
      } )
    } );
  }
}

calculusGrapher.register( 'IntegralScreenSummaryContent', IntegralScreenSummaryContent );