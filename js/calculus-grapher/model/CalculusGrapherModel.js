// Copyright 2015-2019, University of Colorado Boulder

/**
 *
 * @author 0
 */

import inherit from '../../../../phet-core/js/inherit.js';
import calculusGrapher from '../../calculusGrapher.js';

/**
 * @constructor
 */
function CalculusGrapherModel() {

}

calculusGrapher.register( 'CalculusGrapherModel', CalculusGrapherModel );

export default inherit( Object, CalculusGrapherModel, {
  /**
   * @public
   */
  reset: function() {
    // reset the properties of the model
  }
} );