// Copyright 2015-2017, University of Colorado Boulder

/**
 *
 * @author 0
 */
define( function( require ) {
  'use strict';

  // modules
  var calculusGrapher = require( 'CALCULUS_GRAPHER/calculusGrapher' );
  var inherit = require( 'PHET_CORE/inherit' );

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