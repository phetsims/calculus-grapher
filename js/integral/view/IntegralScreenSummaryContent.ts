// Copyright 2025, University of Colorado Boulder

/**
 * IntegralScreenSummaryContent is the description screen summary for the 'Integral' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CalculusGrapherSymbols from '../../common/CalculusGrapherSymbols.js';

export default class IntegralScreenSummaryContent extends ScreenSummaryContent {

  public constructor() {

    super( {
      playAreaContent: CalculusGrapherFluent.a11y.integralScreen.screenSummary.playArea.createProperty( {
        variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty
      } ),
      controlAreaContent: CalculusGrapherFluent.a11y.allScreens.screenSummary.controlAreaStringProperty,
      currentDetailsContent: new Property( 'TODO.currentDetails' ), //TODO https://github.com/phetsims/calculus-grapher/issues/343
      interactionHintContent: CalculusGrapherFluent.a11y.integralScreen.screenSummary.interactionHint.createProperty( {
        variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty
      } )
    } );
  }
}

calculusGrapher.register( 'IntegralScreenSummaryContent', IntegralScreenSummaryContent );