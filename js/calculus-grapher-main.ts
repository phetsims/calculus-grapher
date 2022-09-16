// Copyright 2015-2022, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Brandon Li
 */

import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import CalculusGrapherStrings from './CalculusGrapherStrings.js';
import DerivativeLabScreen from './derivative-lab/DerivativeLabScreen.js';
import IntegralLabScreen from './integral-lab/IntegralLabScreen.js';
import IntroScreen from './intro/IntroScreen.js';
import { CreditsData } from '../../joist/js/CreditsNode.js';

const simCredits: CreditsData = {
  leadDesign: '',
  softwareDevelopment: '',
  team: '',
  qualityAssurance: '',
  graphicArts: '',
  soundDesign: '',
  thanks: ''
};

// Launch the 'Calculus Grapher' simulation.
simLauncher.launch( () => {

  const sim = new Sim( CalculusGrapherStrings[ 'calculus-grapher' ].titleStringProperty, [
    new IntroScreen( { tandem: Tandem.ROOT.createTandem( 'introScreen' ) } ),
    new IntegralLabScreen( { tandem: Tandem.ROOT.createTandem( 'integralLabScreen' ) } ),
    new DerivativeLabScreen( { tandem: Tandem.ROOT.createTandem( 'derivativeLabScreen' ) } )
  ], { credits: simCredits } );

  sim.start();
} );
