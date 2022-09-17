// Copyright 2020-2022, University of Colorado Boulder

/**
 * Top level model for the 'Intro' screen.
 *
 * @author Brandon Li
 */

import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherModel from '../../common/model/CalculusGrapherModel.js';

class IntroModel extends CalculusGrapherModel {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    super( options );
  }
}

calculusGrapher.register( 'IntroModel', IntroModel );
export default IntroModel;
