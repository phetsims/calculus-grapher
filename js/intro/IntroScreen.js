// Copyright 2020-2022, University of Colorado Boulder

/**
 * The 'Intro' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Brandon Li
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import Tandem from '../../../tandem/js/Tandem.js';
import calculusGrapher from '../calculusGrapher.js';
import CalculusGrapherStrings from '../CalculusGrapherStrings.js';
import CalculusGrapherColors from '../common/CalculusGrapherColors.js';
import IntroModel from './model/IntroModel.js';
import IntroScreenView from './view/IntroScreenView.js';

class IntroScreen extends Screen {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {
    assert && assert( tandem instanceof Tandem, `invalid tandem: ${tandem}` );

    const createModel = () => new IntroModel( tandem.createTandem( 'model' ) );
    const createView = model => new IntroScreenView( model, tandem.createTandem( 'view' ) );

    super( createModel, createView, {
      name: CalculusGrapherStrings.screen.introStringProperty,
      backgroundColorProperty: new Property( CalculusGrapherColors.SCREEN_BACKGROUND ),
      tandem: tandem
    } );
  }
}

calculusGrapher.register( 'IntroScreen', IntroScreen );
export default IntroScreen;