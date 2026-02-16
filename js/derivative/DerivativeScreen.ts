// Copyright 2020-2026, University of Colorado Boulder

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
import CalculusGrapherFluent from '../CalculusGrapherFluent.js';
import CalculusGrapherColors from '../common/CalculusGrapherColors.js';
import GraphSet from '../common/model/GraphSet.js';
import GraphType from '../common/model/GraphType.js';
import CalculusGrapherKeyboardHelpContent from '../common/view/CalculusGrapherKeyboardHelpContent.js';
import CalculusGrapherScreenIconFactory from '../common/view/CalculusGrapherScreenIconFactory.js';
import DerivativeModel from './model/DerivativeModel.js';
import DerivativeScreenView from './view/DerivativeScreenView.js';

export default class DerivativeScreen extends Screen<DerivativeModel, DerivativeScreenView> {

  public constructor( tandem: Tandem ) {

    const graphSets: GraphSet[] = [
      new GraphSet( [ GraphType.PRIMARY, GraphType.DERIVATIVE ] )
    ];

    const createModel = () => new DerivativeModel( {
      graphSets: graphSets,
      tandem: tandem.createTandem( 'model' )
    } );

    const createView = ( model: DerivativeModel ) => new DerivativeScreenView( model, {
      tandem: tandem.createTandem( 'view' )
    } );

    super( createModel, createView, {
      name: CalculusGrapherFluent.screen.derivativeStringProperty,
      backgroundColorProperty: CalculusGrapherColors.screenBackgroundColorProperty,
      homeScreenIcon: CalculusGrapherScreenIconFactory.createDerivativeScreenIcon(),
      createKeyboardHelpNode: () => new CalculusGrapherKeyboardHelpContent(),
      screenButtonsHelpText: CalculusGrapherFluent.a11y.screens.derivative.screenButtonsHelpTextStringProperty,
      tandem: tandem
    } );
  }
}

calculusGrapher.register( 'DerivativeScreen', DerivativeScreen );