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

const credits: CreditsData = {
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

  const screens = [
    new DerivativeScreen( Tandem.ROOT.createTandem( 'derivativeScreen' ) ),
    new IntegralScreen( Tandem.ROOT.createTandem( 'integralScreen' ) ),
    new AdvancedScreen( Tandem.ROOT.createTandem( 'advancedScreen' ) ),
    new LabScreen( Tandem.ROOT.createTandem( 'labScreen' ) )
  ];

  const preferencesModel = new PreferencesModel( {
    simulationOptions: {
      customPreferences: [ {
        createContent: tandem => new CalculusGrapherPreferencesNode( tandem.createTandem( 'simPreferences' ) ),
        modelLinkables: [
          { property: CalculusGrapherPreferences.valuesVisibleProperty },
          { property: CalculusGrapherPreferences.connectDiscontinuitiesProperty },
          { property: CalculusGrapherPreferences.derivativeNotationProperty },
          { property: CalculusGrapherPreferences.functionVariableProperty }
        ]
      } ]
    }
  } );

  const sim = new Sim( CalculusGrapherStrings[ 'calculus-grapher' ].titleStringProperty, screens, {
    credits: credits,
    preferencesModel: preferencesModel
  } );

  sim.start();
} );
