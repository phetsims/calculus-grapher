// Copyright 2015-2020, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Brandon Li
 */

import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import calculusGrapherStrings from './calculusGrapherStrings.js';
import DerivativeLabScreen from './derivative-lab/DerivativeLabScreen.js';
import IntegralLabScreen from './integral-lab/IntegralLabScreen.js';
import IntroScreen from './intro/IntroScreen.js';

const simOptions = {
  credits: {
    leadDesign: '',
    softwareDevelopment: '',
    team: '',
    qualityAssurance: '',
    graphicArts: '',
    soundDesign: '',
    thanks: ''
  }
};

// Launch the 'Calculus Grapher' simulation.
simLauncher.launch( () => {

  const sim = new Sim( calculusGrapherStrings[ 'calculus-grapher' ].title, [
    new IntroScreen( Tandem.ROOT.createTandem( 'introScreen' ) ),
    new IntegralLabScreen( Tandem.ROOT.createTandem( 'integralLabScreen' ) ),
    new DerivativeLabScreen( Tandem.ROOT.createTandem( 'derivativeLabScreen' ) )
  ], simOptions );

  sim.start();
} );