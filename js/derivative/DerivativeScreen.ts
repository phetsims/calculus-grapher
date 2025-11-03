// Copyright 2020-2025, University of Colorado Boulder

/**
 * The 'Derivative Lab' screen.
 *
 * @author Brandon Li
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Screen from '../../../joist/js/Screen.js';
import Tandem from '../../../tandem/js/Tandem.js';
import calculusGrapher from '../calculusGrapher.js';
import CalculusGrapherStrings from '../CalculusGrapherStrings.js';
import CalculusGrapherColors from '../common/CalculusGrapherColors.js';
import GraphSet from '../common/model/GraphSet.js';
import GraphType from '../common/model/GraphType.js';
import CalculusGrapherScreenIconFactory from '../common/view/CalculusGrapherScreenIconFactory.js';
import DerivativeModel from './model/DerivativeModel.js';
import DerivativeScreenView from './view/DerivativeScreenView.js';
import DerivativeKeyboardHelpContent from './view/DerivativeKeyboardHelpContent.js';

export default class DerivativeScreen extends Screen<DerivativeModel, DerivativeScreenView> {

  public constructor( tandem: Tandem ) {

    const graphSets: GraphSet[] = [
      new GraphSet( [ GraphType.ORIGINAL, GraphType.DERIVATIVE ] )
    ];

    const createModel = () => new DerivativeModel( {
      graphSets: graphSets,
      tandem: tandem.createTandem( 'model' )
    } );

    const createView = ( model: DerivativeModel ) => new DerivativeScreenView( model, {
      tandem: tandem.createTandem( 'view' )
    } );

    super( createModel, createView, {
      name: CalculusGrapherStrings.screen.derivativeStringProperty,
      backgroundColorProperty: CalculusGrapherColors.screenBackgroundColorProperty,
      homeScreenIcon: CalculusGrapherScreenIconFactory.createDerivativeScreenIcon(),
      createKeyboardHelpNode: () => new DerivativeKeyboardHelpContent(),
      screenButtonsHelpText: CalculusGrapherStrings.a11y.derivativeScreen.screenButtonsHelpTextStringProperty,
      tandem: tandem
    } );
  }
}

calculusGrapher.register( 'DerivativeScreen', DerivativeScreen );