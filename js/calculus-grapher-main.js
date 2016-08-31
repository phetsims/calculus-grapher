// Copyright 2015, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author 0
 */
define( function( require ) {
  'use strict';

  // modules
  var CalculusGrapherScreen = require( 'CALCULUS_GRAPHER/calculus-grapher/CalculusGrapherScreen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );

  // strings
  var calculusGrapherTitleString = require( 'string!CALCULUS_GRAPHER/calculus-grapher.title' );

  var simOptions = {
    credits: {
      //TODO fill in proper credits, all of these fields are optional, see joist.AboutDialog
      leadDesign: '',
      softwareDevelopment: '',
      team: '',
      qualityAssurance: '',
      graphicArts: '',
      thanks: ''
    }
  };

  SimLauncher.launch( function() {
    var sim = new Sim( calculusGrapherTitleString, [ new CalculusGrapherScreen() ], simOptions );
    sim.start();
  } );
} );