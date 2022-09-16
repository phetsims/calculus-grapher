// Copyright 2020-2021, University of Colorado Boulder

/**
 * Top level model for the 'Integral Lab' screen.
 *
 * @author Brandon Li
 */

import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherModel from '../../common/model/CalculusGrapherModel.js';

class IntegralLabModel extends CalculusGrapherModel {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    super( options );
  }
}

calculusGrapher.register( 'IntegralLabModel', IntegralLabModel );
export default IntegralLabModel;
