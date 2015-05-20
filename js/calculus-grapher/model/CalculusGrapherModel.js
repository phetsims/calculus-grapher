// Copyright 2002-2015, University of Colorado Boulder

/**
 *
 * @author 0
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );

  /**
   * @constructor
   */
  function CalculusGrapherModel() {

    PropertySet.call( this, {} );
  }

  return inherit( PropertySet, CalculusGrapherModel, {

    // Called by the animation loop. Optional, so if your model has no animation, you can omit this.
    step: function( dt ) {
      // Handle model animation here.
    }
  } );
} );