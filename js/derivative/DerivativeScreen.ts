// Copyright 2020-2022, University of Colorado Boulder

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
import { CalculusGrapherScreenViewOptions } from '../common/view/CalculusGrapherScreenView.js';
import optionize, { EmptySelfOptions } from '../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;
export type DerivativeScreenOptions = SelfOptions & ScreenOptions;

export default class DerivativeScreen extends Screen {

  public constructor( providedOptions: DerivativeScreenOptions ) {

    const options = optionize<CalculusGrapherScreenViewOptions, SelfOptions, ScreenOptions>()( {}, providedOptions );

    const createModel = () => new DerivativeModel( { tandem: options.tandem.createTandem( 'model' ) } );

    const createView = ( model: DerivativeModel ) => new DerivativeScreenView( model, { tandem: options.tandem.createTandem( 'view' ) } );

    super( createModel, createView, {
      name: CalculusGrapherStrings.screen.derivativeStringProperty,
      backgroundColorProperty: CalculusGrapherColors.screenBackgroundColorProperty,
      tandem: options.tandem
    } );
  }
}

calculusGrapher.register( 'DerivativeScreen', DerivativeScreen );
