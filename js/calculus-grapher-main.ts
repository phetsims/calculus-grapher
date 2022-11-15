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
import DerivativeScreen from './derivative/DerivativeScreen.js';
import IntegralScreen from './integral/IntegralScreen.js';
import LabScreen from './lab/LabScreen.js';
import AdvancedScreen from './advanced/AdvancedScreen.js';
import { CreditsData } from '../../joist/js/CreditsNode.js';
import CalculusGrapherPreferencesNode from './common/view/CalculusGrapherPreferencesNode.js';
import PreferencesModel from '../../joist/js/preferences/PreferencesModel.js';
import CalculusGrapherPreferences from './common/model/CalculusGrapherPreferences.js';

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
    new DerivativeScreen( { tandem: Tandem.ROOT.createTandem( 'derivativeScreen' ) } ),
    new IntegralScreen( { tandem: Tandem.ROOT.createTandem( 'integralScreen' ) } ),
    new AdvancedScreen( { tandem: Tandem.ROOT.createTandem( 'advancedScreen' ) } ),
    new LabScreen( { tandem: Tandem.ROOT.createTandem( 'labScreen' ) } )
  ], {
    credits: simCredits,
    preferencesModel: new PreferencesModel( {
      simulationOptions: {
        customPreferences: [ {
          createContent: tandem => new CalculusGrapherPreferencesNode( {
            tandem: tandem.createTandem( 'simPreferences' )
          } ),
          modelLinkables: [
            { property: CalculusGrapherPreferences.valuesVisibleProperty }
          ]
        } ]
      }
    } )

  } );

  sim.start();
} );
