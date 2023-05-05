// Copyright 2015-2023, University of Colorado Boulder

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
import CalculusGrapherSimulationPreferencesNode from './common/view/preferences/CalculusGrapherSimulationPreferencesNode.js';
import PreferencesModel from '../../joist/js/preferences/PreferencesModel.js';
import CalculusGrapherPreferences from './common/model/CalculusGrapherPreferences.js';

const credits: CreditsData = {
  leadDesign: 'Amanda McGarry',
  softwareDevelopment: 'Martin Veillette, Chris Malley (PixelZoom, Inc.), Brandon Li',
  team: 'Catherine Carter, Michael Dubson, Ariel Paul, Kathy Perkins',
  qualityAssurance: 'Jaron Droder, Emily Miller, Liam Mulhall, Nancy Salpepi, Kathryn Woessner'
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
        createContent: tandem => new CalculusGrapherSimulationPreferencesNode( tandem.createTandem( 'content' ) ),
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
    preferencesModel: preferencesModel,
    phetioDesigned: true
  } );

  sim.start();
} );
