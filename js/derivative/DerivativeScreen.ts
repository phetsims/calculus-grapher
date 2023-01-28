// Copyright 2020-2023, University of Colorado Boulder

/**
 * The 'Derivative Lab' screen.
 *
 * @author Brandon Li
 */

import Screen from '../../../joist/js/Screen.js';
import calculusGrapher from '../calculusGrapher.js';
import CalculusGrapherStrings from '../CalculusGrapherStrings.js';
import CalculusGrapherColors from '../common/CalculusGrapherColors.js';
import DerivativeModel from './model/DerivativeModel.js';
import DerivativeScreenView from './view/DerivativeScreenView.js';
import GraphType, { GraphSet } from '../common/model/GraphType.js';
import CalculusGrapherScreenIcon from '../common/view/CalculusGrapherScreenIcon.js';
import Tandem from '../../../tandem/js/Tandem.js';

export default class DerivativeScreen extends Screen<DerivativeModel, DerivativeScreenView> {

  public constructor( tandem: Tandem ) {

    const graphSets: GraphSet[] = [
      [ GraphType.ORIGINAL, GraphType.DERIVATIVE ]
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
      homeScreenIcon: new CalculusGrapherScreenIcon( graphSets ),
      tandem: tandem
    } );
  }
}

calculusGrapher.register( 'DerivativeScreen', DerivativeScreen );
