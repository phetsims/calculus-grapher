// Copyright 2020-2022, University of Colorado Boulder

/**
 * The 'Intro' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Brandon Li
 */

import Property from '../../../axon/js/Property.js';
import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import calculusGrapher from '../calculusGrapher.js';
import CalculusGrapherStrings from '../CalculusGrapherStrings.js';
import CalculusGrapherColors from '../common/CalculusGrapherColors.js';
import IntroModel from './model/IntroModel.js';
import IntroScreenView from './view/IntroScreenView.js';
import { CalculusGrapherScreenViewOptions } from '../common/view/CalculusGrapherScreenView.js';
import optionize, { EmptySelfOptions } from '../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;
export type IntroScreenOptions = SelfOptions & ScreenOptions;

export default class IntroScreen extends Screen {

  public constructor( providedOptions: IntroScreenOptions ) {

    const options = optionize<CalculusGrapherScreenViewOptions, SelfOptions, ScreenOptions>()( {}, providedOptions );

    // @ts-ignore
    const createModel = () => new IntroModel( { tandem: options.tandem.createTandem( 'model' ) } );

    // @ts-ignore
    const createView = model => new IntroScreenView( model, { tandem: options.tandem.createTandem( 'view' ) } );

    super( createModel, createView, {
      name: CalculusGrapherStrings.screen.introStringProperty,
      backgroundColorProperty: new Property( CalculusGrapherColors.SCREEN_BACKGROUND ),
      tandem: options.tandem
    } );
  }
}

calculusGrapher.register( 'IntroScreen', IntroScreen );
