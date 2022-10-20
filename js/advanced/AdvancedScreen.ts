// Copyright 2020-2022, University of Colorado Boulder

/**
 * The 'Advanced' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Brandon Li
 */

import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import calculusGrapher from '../calculusGrapher.js';
import CalculusGrapherStrings from '../CalculusGrapherStrings.js';
import CalculusGrapherColors from '../common/CalculusGrapherColors.js';
import AdvancedModel from './model/AdvancedModel.js';
import AdvancedScreenView from './view/AdvancedScreenView.js';
import { CalculusGrapherScreenViewOptions } from '../common/view/CalculusGrapherScreenView.js';
import optionize, { EmptySelfOptions } from '../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;
export type AdvancedScreenOptions = SelfOptions & ScreenOptions;

export default class AdvancedScreen extends Screen {

  public constructor( providedOptions: AdvancedScreenOptions ) {

    const options = optionize<CalculusGrapherScreenViewOptions, SelfOptions, ScreenOptions>()( {}, providedOptions );

    const createModel = () => new AdvancedModel( { tandem: options.tandem.createTandem( 'model' ) } );

    const createView = ( model: AdvancedModel ) => new AdvancedScreenView( model, { tandem: options.tandem.createTandem( 'view' ) } );

    super( createModel, createView, {
      name: CalculusGrapherStrings.screen.advancedStringProperty,
      backgroundColorProperty: CalculusGrapherColors.screenBackgroundColorProperty,
      tandem: options.tandem
    } );
  }
}

calculusGrapher.register( 'AdvancedScreen', AdvancedScreen );
