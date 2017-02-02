// Copyright 2015, University of Colorado Boulder

/**
 *
 * @author 0
 */
define( function( require ) {
  'use strict';

  // modules
  var calculusGrapher = require( 'CALCULUS_GRAPHER/calculusGrapher' );
  var CalculusGrapherModel = require( 'CALCULUS_GRAPHER/calculus-grapher/model/CalculusGrapherModel' );
  var CalculusGrapherScreenView = require( 'CALCULUS_GRAPHER/calculus-grapher/view/CalculusGrapherScreenView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Screen = require( 'JOIST/Screen' );
  var Property = require( 'AXON/Property' );

  /**
   * @constructor
   */
  function CalculusGrapherScreen() {
    Screen.call( this,
      function() { return new CalculusGrapherModel(); },
      function( model ) { return new CalculusGrapherScreenView( model ); },
      { backgroundColorProperty: new Property( 'white' ) }
    );
  }

  calculusGrapher.register( 'CalculusGrapherScreen', CalculusGrapherScreen );

  return inherit( Screen, CalculusGrapherScreen );
} );
