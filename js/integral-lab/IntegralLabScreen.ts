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
import IntegralLabModel from './model/IntegralLabModel.js';
import IntegralLabScreenView from './view/IntegralLabScreenView.js';
import { CalculusGrapherScreenViewOptions } from '../common/view/CalculusGrapherScreenView.js';
import optionize, { EmptySelfOptions } from '../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;
export type IntegralLabScreenOptions = SelfOptions & ScreenOptions;

export default class IntegralLabScreen extends Screen {

  public constructor( providedOptions: IntegralLabScreenOptions ) {

    const options = optionize<CalculusGrapherScreenViewOptions, SelfOptions, ScreenOptions>()( {}, providedOptions );

    const createModel = () => new IntegralLabModel( { tandem: options.tandem.createTandem( 'model' ) } );

    const createView = ( model: IntegralLabModel ) => new IntegralLabScreenView( model, { tandem: options.tandem.createTandem( 'view' ) } );

    super( createModel, createView, {
      name: CalculusGrapherStrings.screen.integralLabStringProperty,
      backgroundColorProperty: CalculusGrapherColors.screenBackgroundColorProperty,
      tandem: options.tandem
    } );
  }
}

calculusGrapher.register( 'IntegralLabScreen', IntegralLabScreen );
