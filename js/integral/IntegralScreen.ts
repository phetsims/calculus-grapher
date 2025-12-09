// Copyright 2020-2025, University of Colorado Boulder

/**
 * The 'Integral' screen.
 *
 * @author Brandon Li
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Screen from '../../../joist/js/Screen.js';
import Tandem from '../../../tandem/js/Tandem.js';
import calculusGrapher from '../calculusGrapher.js';
import CalculusGrapherFluent from '../CalculusGrapherFluent.js';
import CalculusGrapherColors from '../common/CalculusGrapherColors.js';
import CalculusGrapherPreferences from '../common/model/CalculusGrapherPreferences.js';
import GraphSet from '../common/model/GraphSet.js';
import GraphType from '../common/model/GraphType.js';
import CalculusGrapherKeyboardHelpContent from '../common/view/CalculusGrapherKeyboardHelpContent.js';
import CalculusGrapherScreenIconFactory from '../common/view/CalculusGrapherScreenIconFactory.js';
import IntegralModel from './model/IntegralModel.js';
import IntegralScreenView from './view/IntegralScreenView.js';

export default class IntegralScreen extends Screen<IntegralModel, IntegralScreenView> {

  public constructor( tandem: Tandem ) {

    const graphSets: GraphSet[] = [
      new GraphSet( [ GraphType.INTEGRAL, GraphType.ORIGINAL ] )
    ];

    const createModel = () => new IntegralModel( {
      graphSets: graphSets,
      tandem: tandem.createTandem( 'model' )
    } );

    const createView = ( model: IntegralModel ) => new IntegralScreenView( model, {
      tandem: tandem.createTandem( 'view' )
    } );

    super( createModel, createView, {
      name: CalculusGrapherFluent.screen.integralStringProperty,
      backgroundColorProperty: CalculusGrapherColors.screenBackgroundColorProperty,
      homeScreenIcon: CalculusGrapherScreenIconFactory.createIntegralScreenIcon(),
      createKeyboardHelpNode: () => new CalculusGrapherKeyboardHelpContent(),
      screenButtonsHelpText: CalculusGrapherFluent.a11y.integralScreen.screenButtonsHelpText.createProperty( {
        functionVariable: CalculusGrapherPreferences.functionVariableProperty
      } ),
      tandem: tandem
    } );
  }
}

calculusGrapher.register( 'IntegralScreen', IntegralScreen );