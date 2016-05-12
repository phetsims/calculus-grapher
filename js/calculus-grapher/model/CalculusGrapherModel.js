// Copyright 2015, University of Colorado Boulder

/**
 *
 * @author 0
 */
define( function( require ) {
  'use strict';

  // modules
  var calculusGrapher = require( 'CALCULUS_GRAPHER/calculusGrapher' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );

  /**
   * @constructor
   */
  function CalculusGrapherModel() {

    PropertySet.call( this, {} );
  }

  calculusGrapher.register( 'CalculusGrapherModel', CalculusGrapherModel );

  return inherit( PropertySet, CalculusGrapherModel );
} );