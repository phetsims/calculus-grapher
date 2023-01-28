// Copyright 2022, University of Colorado Boulder

/**
 * CalculusGrapherPreferencesNode is the user interface for sim-specific preferences, accessed via the Preferences dialog.
 * These preferences are global, and affect all screens.
 *
 * The Preferences dialog is created on demand by joist, using a PhetioCapsule. So CalculusGrapherPreferencesNode must
 * implement dispose, and all elements of CalculusGrapherPreferencesNode that have tandems must be disposed.
 *
 * @author Martin Veillette
 */

import { VBox } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherPreferences from '../model/CalculusGrapherPreferences.js';
import DiscontinuitiesControl from './preferences/DiscontinuitiesControl.js';
import ValuesControl from './preferences/ValuesControl.js';
import NotationControl from './preferences/NotationControl.js';
import VariableControl from './preferences/VariableControl.js';
import Tandem from '../../../../tandem/js/Tandem.js';

export default class CalculusGrapherPreferencesNode extends VBox {

  // Disposes of things that are specific to this class.
  private readonly disposeCalculusGrapherPreferencesNode: () => void;

  public constructor( tandem: Tandem ) {

    const valuesControl = new ValuesControl( CalculusGrapherPreferences.valuesVisibleProperty,
      tandem.createTandem( 'valuesControl' ) );

    const discontinuitiesControl = new DiscontinuitiesControl( CalculusGrapherPreferences.connectDiscontinuitiesProperty,
      tandem.createTandem( 'discontinuitiesControl' ) );

    const notationControl = new NotationControl( CalculusGrapherPreferences.derivativeNotationProperty,
      tandem.createTandem( 'notationControl' ) );

    const variableControl = new VariableControl( CalculusGrapherPreferences.functionVariableProperty,
      tandem.createTandem( 'variableControl' ) );

    super( {
      children: [ valuesControl, discontinuitiesControl, notationControl, variableControl ],
      align: 'left',
      spacing: 20,
      phetioVisiblePropertyInstrumented: false,
      tandem: tandem
    } );

    this.disposeCalculusGrapherPreferencesNode = (): void => {
      valuesControl.dispose();
      discontinuitiesControl.dispose();
      notationControl.dispose();
      variableControl.dispose();
    };
  }

  public override dispose(): void {
    this.disposeCalculusGrapherPreferencesNode();
    super.dispose();
  }
}

calculusGrapher.register( 'CalculusGrapherPreferencesNode', CalculusGrapherPreferencesNode );
