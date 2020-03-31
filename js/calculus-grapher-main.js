// Copyright 2015-2020, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author 0
 */

import Sim from '../../joist/js/Sim.js';
import SimLauncher from '../../joist/js/SimLauncher.js';
import calculusGrapherStrings from './calculusGrapherStrings.js';
import CalculusGrapherScreen from './calculus-grapher/CalculusGrapherScreen.js';

const calculusGrapherTitleString = calculusGrapherStrings[ 'calculus-grapher' ].title;

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