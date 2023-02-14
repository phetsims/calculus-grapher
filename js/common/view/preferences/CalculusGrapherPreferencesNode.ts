// Copyright 2022-2023, University of Colorado Boulder

/**
 * CalculusGrapherPreferencesNode is the user interface for sim-specific preferences, accessed via the Preferences dialog.
 * These preferences are global, and affect all screens.
 *
 * The Preferences dialog is created on demand by joist, using a PhetioCapsule. So CalculusGrapherPreferencesNode must
 * implement dispose, and all elements of CalculusGrapherPreferencesNode that have tandems must be disposed.
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

export default class CalculusGrapherPreferencesNode extends VBox {

  // Disposes of things that are specific to this class.
  private readonly disposeCalculusGrapherPreferencesNode: () => void;

  public constructor( tandem: Tandem ) {

    const discontinuitiesControl = new DiscontinuitiesControl( CalculusGrapherPreferences.connectDiscontinuitiesProperty,
      tandem.createTandem( 'discontinuitiesControl' ) );

    const notationControl = new NotationControl( CalculusGrapherPreferences.derivativeNotationProperty,
      tandem.createTandem( 'notationControl' ) );

    const variableControl = new VariableControl( CalculusGrapherPreferences.functionVariableProperty,
      tandem.createTandem( 'variableControl' ) );

    const valuesControl = new ValuesControl( CalculusGrapherPreferences.valuesVisibleProperty,
      tandem.createTandem( 'valuesControl' ) );

    super( {
      children: [ discontinuitiesControl, notationControl, variableControl, valuesControl ],
      align: 'left',
      spacing: 30,
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
