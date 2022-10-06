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
import DerivativeLabModel from './model/DerivativeLabModel.js';
import DerivativeLabScreenView from './view/DerivativeLabScreenView.js';
import { CalculusGrapherScreenViewOptions } from '../common/view/CalculusGrapherScreenView.js';
import optionize, { EmptySelfOptions } from '../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;
export type DerivativeLabScreenOptions = SelfOptions & ScreenOptions;

export default class DerivativeLabScreen extends Screen {

  public constructor( providedOptions: DerivativeLabScreenOptions ) {

    const options = optionize<CalculusGrapherScreenViewOptions, SelfOptions, ScreenOptions>()( {}, providedOptions );

    const createModel = () => new DerivativeLabModel( { tandem: options.tandem.createTandem( 'model' ) } );

    const createView = ( model: DerivativeLabModel ) => new DerivativeLabScreenView( model, { tandem: options.tandem.createTandem( 'view' ) } );

    super( createModel, createView, {
      name: CalculusGrapherStrings.screen.derivativeLabStringProperty,
      backgroundColorProperty: CalculusGrapherColors.screenBackgroundColorProperty,
      tandem: options.tandem
    } );
  }
}

calculusGrapher.register( 'DerivativeLabScreen', DerivativeLabScreen );
