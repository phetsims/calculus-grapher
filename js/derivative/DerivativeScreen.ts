// Copyright 2020-2023, University of Colorado Boulder

/**
 * The 'Derivative Lab' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Brandon Li
 */

import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import calculusGrapher from '../calculusGrapher.js';
import CalculusGrapherStrings from '../CalculusGrapherStrings.js';
import CalculusGrapherColors from '../common/CalculusGrapherColors.js';
import DerivativeModel from './model/DerivativeModel.js';
import DerivativeScreenView from './view/DerivativeScreenView.js';
import optionize, { EmptySelfOptions } from '../../../phet-core/js/optionize.js';
import GraphType, { GraphSet } from '../common/model/GraphType.js';
import CalculusGrapherScreenIcon from '../common/view/CalculusGrapherScreenIcon.js';

type SelfOptions = EmptySelfOptions;

type DerivativeScreenOptions = SelfOptions & ScreenOptions;

export default class DerivativeScreen extends Screen<DerivativeModel, DerivativeScreenView> {

  public constructor( providedOptions: DerivativeScreenOptions ) {

    const options = optionize<DerivativeScreenOptions, SelfOptions, ScreenOptions>()( {}, providedOptions );

    const graphSets: GraphSet[] = [
      [ GraphType.ORIGINAL, GraphType.DERIVATIVE ]
    ];

    const createModel = () => new DerivativeModel( {
      graphSets: graphSets,
      tandem: options.tandem.createTandem( 'model' )
    } );

    const createView = ( model: DerivativeModel ) => new DerivativeScreenView( model, {
      tandem: options.tandem.createTandem( 'view' )
    } );

    super( createModel, createView, {
      name: CalculusGrapherStrings.screen.derivativeStringProperty,
      backgroundColorProperty: CalculusGrapherColors.screenBackgroundColorProperty,
      homeScreenIcon: new CalculusGrapherScreenIcon( graphSets ),
      tandem: options.tandem
    } );
  }
}

calculusGrapher.register( 'DerivativeScreen', DerivativeScreen );
