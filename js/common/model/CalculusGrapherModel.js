// Copyright 2019-2020, University of Colorado Boulder

/**
 * Root class (to be subclassed) for the top-level model of every screen in the 'Calculus Grapher' simulation.
 *
 * @author Brandon Li
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';

class CalculusGrapherModel {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem, options ) {
    assert && assert( tandem instanceof Tandem, `invalid tandem: ${tandem}` );
  }
}

calculusGrapher.register( 'CalculusGrapherModel', CalculusGrapherModel );
export default CalculusGrapherModel;