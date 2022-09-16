// Copyright 2020-2021, University of Colorado Boulder

/**
 * Top level model for the 'Derivative Lab' screen.
 *
 * @author Brandon Li
 */

import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherModel from '../../common/model/CalculusGrapherModel.js';

class DerivativeLabModel extends CalculusGrapherModel {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    super( options );
  }
}

calculusGrapher.register( 'DerivativeLabModel', DerivativeLabModel );
export default DerivativeLabModel;
