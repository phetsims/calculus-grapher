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

  return inherit( PropertySet, CalculusGrapherModel );
} );