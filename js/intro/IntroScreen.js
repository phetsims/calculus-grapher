// Copyright 2020, University of Colorado Boulder

/**
 * The 'Intro' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Brandon Li
 */

import Screen from '../../../joist/js/Screen.js';
import Tandem from '../../../tandem/js/Tandem.js';
import calculusGrapher from '../calculusGrapher.js';
import IntroModel from './model/IntroModel.js';
import IntroScreenView from './view/IntroScreenView.js';

class IntroScreen extends Screen {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {
    assert && assert( tandem instanceof Tandem, `invalid tandem: ${tandem}` );

    const createModel = () => new IntroModel( tandem.createTandem( 'introModel' ) );
    const createView = model => new IntroScreenView( model, tandem.createTandem( 'introScreenView' ) );

    super( createModel, createView, {
      name: 'Intro',
      tandem: tandem
    } );
  }
}

calculusGrapher.register( 'IntroScreen', IntroScreen );
export default IntroScreen;