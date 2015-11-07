// Copyright 2015, University of Colorado Boulder

/**
 *
 * @author 0
 */
define( function( require ) {
  'use strict';

  // modules
  var CalculusGrapherModel = require( 'CALCULUS_GRAPHER/calculus-grapher/model/CalculusGrapherModel' );
  var CalculusGrapherScreenView = require( 'CALCULUS_GRAPHER/calculus-grapher/view/CalculusGrapherScreenView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var calculusGrapherTitleString = require( 'string!CALCULUS_GRAPHER/calculus-grapher.title' );

  /**
   * @constructor
   */
  function CalculusGrapherScreen() {

    //If this is a single-screen sim, then no icon is necessary.
    //If there are multiple screens, then the icon must be provided here.
    var icon = null;

    Screen.call( this, calculusGrapherTitleString, icon,
      function() { return new CalculusGrapherModel(); },
      function( model ) { return new CalculusGrapherScreenView( model ); },
      { backgroundColor: 'white' }
    );
  }

  return inherit( Screen, CalculusGrapherScreen );
} );