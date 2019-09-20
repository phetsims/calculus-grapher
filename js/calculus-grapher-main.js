// Copyright 2015-2019, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author 0
 */
define( require => {
  'use strict';

  // modules
  const CalculusGrapherScreen = require( 'CALCULUS_GRAPHER/calculus-grapher/CalculusGrapherScreen' );
  const Sim = require( 'JOIST/Sim' );
  const SimLauncher = require( 'JOIST/SimLauncher' );

  // strings
  const calculusGrapherTitleString = require( 'string!CALCULUS_GRAPHER/calculus-grapher.title' );

  const simOptions = {
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
    const sim = new Sim( calculusGrapherTitleString, [ new CalculusGrapherScreen() ], simOptions );
    sim.start();
  } );
} );