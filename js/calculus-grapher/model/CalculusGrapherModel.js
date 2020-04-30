// Copyright 2015-2020, University of Colorado Boulder

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

inherit( Object, CalculusGrapherModel, {
  /**
   * @public
   */
  reset: function() {
    // reset the properties of the model
  }
} );

export default CalculusGrapherModel;