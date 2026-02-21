// Copyright 2025-2026, University of Colorado Boulder

/**
 * LabScreenSummaryContent is the screen summary for the 'Lab' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CalculusGrapherSymbols from '../../common/CalculusGrapherSymbols.js';
import CurveManipulationProperties from '../../common/model/CurveManipulationProperties.js';
import CalculusGrapherScreenSummaryContent from '../../common/view/description/CalculusGrapherScreenSummaryContent.js';
import GraphsNode from '../../common/view/GraphsNode.js';

export default class LabScreenSummaryContent extends CalculusGrapherScreenSummaryContent {

  public constructor( curveManipulationProperties: CurveManipulationProperties, graphsNode: GraphsNode ) {

    super( curveManipulationProperties, graphsNode, {
      playAreaContent: CalculusGrapherFluent.a11y.screens.lab.screenSummary.playArea.createProperty( {
        variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty
      } ),
      interactionHintContent: CalculusGrapherFluent.a11y.screens.lab.screenSummary.interactionHintStringProperty
    } );
  }
}

calculusGrapher.register( 'LabScreenSummaryContent', LabScreenSummaryContent );