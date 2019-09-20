// Copyright 2015-2019, University of Colorado Boulder

/**
 *
 * @author 0
 */
define( require => {
  'use strict';

  // modules
  const calculusGrapher = require( 'CALCULUS_GRAPHER/calculusGrapher' );
  const inherit = require( 'PHET_CORE/inherit' );

  /**
   * @constructor
   */
  function CalculusGrapherModel() {

  }

  calculusGrapher.register( 'CalculusGrapherModel', CalculusGrapherModel );

  return inherit( Object, CalculusGrapherModel, {
    /**
     * @public
     */
    reset: function() {
      // reset the properties of the model
    }
  } );
} );