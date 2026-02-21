// Copyright 2025-2026, University of Colorado Boulder

/**
 * AdvancedScreenSummaryContent is the screen summary for the 'Advanced' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CalculusGrapherSymbols from '../../common/CalculusGrapherSymbols.js';
import CurveManipulationProperties from '../../common/model/CurveManipulationProperties.js';
import CalculusGrapherScreenSummaryContent from '../../common/view/description/CalculusGrapherScreenSummaryContent.js';
import GraphsNode from '../../common/view/GraphsNode.js';

export default class AdvancedScreenSummaryContent extends CalculusGrapherScreenSummaryContent {

  public constructor( curveManipulationProperties: CurveManipulationProperties, graphsNode: GraphsNode ) {

    super( curveManipulationProperties, graphsNode, {
      playAreaContent: CalculusGrapherFluent.a11y.screens.advanced.screenSummary.playArea.createProperty( {
        variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty
      } ),
      interactionHintContent: CalculusGrapherFluent.a11y.screens.advanced.screenSummary.interactionHintStringProperty
    } );
  }
}

calculusGrapher.register( 'AdvancedScreenSummaryContent', AdvancedScreenSummaryContent );