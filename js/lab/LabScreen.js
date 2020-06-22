// Copyright 2020, University of Colorado Boulder

/**
 * The 'Lab' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Brandon Li
 */

import Screen from '../../../joist/js/Screen.js';
import Tandem from '../../../tandem/js/Tandem.js';
import calculusGrapher from '../calculusGrapher.js';
import LabModel from './model/LabModel.js';
import LabScreenView from './view/LabScreenView.js';

class LabScreen extends Screen {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {
    assert && assert( tandem instanceof Tandem, `invalid tandem: ${tandem}` );

    const createModel = () => new LabModel( tandem.createTandem( 'introModel' ) );
    const createView = model => new LabScreenView( model, tandem.createTandem( 'introScreenView' ) );

    super( createModel, createView, {
      name: 'Lab',
      tandem: tandem
    } );
  }
}

calculusGrapher.register( 'LabScreen', LabScreen );
export default LabScreen;