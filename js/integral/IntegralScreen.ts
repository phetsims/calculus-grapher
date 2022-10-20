// Copyright 2020-2022, University of Colorado Boulder

/**
 * The 'Integral Lab' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Brandon Li
 */

import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import calculusGrapher from '../calculusGrapher.js';
import CalculusGrapherStrings from '../CalculusGrapherStrings.js';
import CalculusGrapherColors from '../common/CalculusGrapherColors.js';
import IntegralModel from './model/IntegralModel.js';
import IntegralScreenView from './view/IntegralScreenView.js';
import { CalculusGrapherScreenViewOptions } from '../common/view/CalculusGrapherScreenView.js';
import optionize, { EmptySelfOptions } from '../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;
export type IntegralScreenOptions = SelfOptions & ScreenOptions;

export default class IntegralScreen extends Screen {

  public constructor( providedOptions: IntegralScreenOptions ) {

    const options = optionize<CalculusGrapherScreenViewOptions, SelfOptions, ScreenOptions>()( {}, providedOptions );

    const createModel = () => new IntegralModel( { tandem: options.tandem.createTandem( 'model' ) } );

    const createView = ( model: IntegralModel ) => new IntegralScreenView( model, { tandem: options.tandem.createTandem( 'view' ) } );

    super( createModel, createView, {
      name: CalculusGrapherStrings.screen.integralStringProperty,
      backgroundColorProperty: CalculusGrapherColors.screenBackgroundColorProperty,
      tandem: options.tandem
    } );
  }
}

calculusGrapher.register( 'IntegralScreen', IntegralScreen );
