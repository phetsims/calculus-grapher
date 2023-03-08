// Copyright 2022-2023, University of Colorado Boulder

/**
 * CalculusGrapherSimulationPreferencesNode is the user interface for sim-specific preferences, accessed via the
 * Simulation tab of the Preferences dialog. These preferences are global, and affect all screens.
 *
 * The Preferences dialog is created on demand by joist, using a PhetioCapsule. So this class must implement dispose,
 * and all children that have tandems or link to String Properties must be disposed.
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { VBox } from '../../../../../scenery/js/imports.js';
import calculusGrapher from '../../../calculusGrapher.js';
import CalculusGrapherPreferences from '../../model/CalculusGrapherPreferences.js';
import DiscontinuitiesControl from './DiscontinuitiesControl.js';
import ValuesControl from './ValuesControl.js';
import NotationControl from './NotationControl.js';
import VariableControl from './VariableControl.js';
import Tandem from '../../../../../tandem/js/Tandem.js';
import PredictControl from './PredictControl.js';

export default class CalculusGrapherSimulationPreferencesNode extends VBox {

  private readonly disposeCalculusGrapherPreferencesNode: () => void;

  public constructor( tandem: Tandem ) {

    // Controls in the order that they appear in the Simulation tab, from top-to-bottom.
    const controls = [

      // Variable
      new VariableControl( CalculusGrapherPreferences.functionVariableProperty,
        tandem.createTandem( 'variableControl' ) ),

      // Notation
      new NotationControl( CalculusGrapherPreferences.derivativeNotationProperty,
        tandem.createTandem( 'notationControl' ) ),

      // Discontinuities
      new DiscontinuitiesControl( CalculusGrapherPreferences.connectDiscontinuitiesProperty,
        tandem.createTandem( 'discontinuitiesControl' ) ),

      // Values
      new ValuesControl( CalculusGrapherPreferences.valuesVisibleProperty,
        tandem.createTandem( 'valuesControl' ) ),

      // Predict
      new PredictControl( CalculusGrapherPreferences.predictPreferenceEnabledProperty,
        tandem.createTandem( 'predictControl' ) )
    ];

    super( {
      children: controls,
      align: 'left',
      spacing: 30,
      phetioVisiblePropertyInstrumented: false,
      tandem: tandem
    } );

    this.disposeCalculusGrapherPreferencesNode = (): void => {
      controls.forEach( control => control.dispose() );
    };
  }

  public override dispose(): void {
    this.disposeCalculusGrapherPreferencesNode();
    super.dispose();
  }
}

calculusGrapher.register( 'CalculusGrapherSimulationPreferencesNode', CalculusGrapherSimulationPreferencesNode );
