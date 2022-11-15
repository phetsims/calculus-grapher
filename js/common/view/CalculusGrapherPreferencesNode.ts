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

import { VBox, VBoxOptions } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import CalculusGrapherPreferences from '../model/CalculusGrapherPreferences.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import DiscontinuitiesControl from './DiscontinuitiesControl.js';
import PreferencesDialog from '../../../../joist/js/preferences/PreferencesDialog.js';
import ValuesControl from './ValuesControl.js';

type SelfOptions = EmptySelfOptions;

type CalculusGrapherPreferencesNodeOptions = SelfOptions & PickRequired<VBoxOptions, 'tandem'>;

export default class CalculusGrapherPreferencesNode extends VBox {

  // Disposes of things that are specific to this class.
  private readonly disposeCalculusGrapherPreferencesNode: () => void;

  public constructor( providedOptions: CalculusGrapherPreferencesNodeOptions ) {

    const options = optionize<CalculusGrapherPreferencesNodeOptions, SelfOptions, VBoxOptions>()( {

      // VBoxOptions
      align: 'left',
      spacing: 20,
      phetioVisiblePropertyInstrumented: false
    }, providedOptions );

    super( options );

    const valuesControl = new ValuesControl( CalculusGrapherPreferences.valuesVisibleProperty, {
      textOptions: {
        font: PreferencesDialog.CONTENT_FONT
      },
      tandem: options.tandem.createTandem( 'valuesControl' )
    } );

    const discontinuitiesControl = new DiscontinuitiesControl( CalculusGrapherPreferences.connectDiscontinuitiesProperty, {
      textOptions: {
        font: PreferencesDialog.CONTENT_FONT
      },
      tandem: options.tandem.createTandem( 'discontinuitiesControl' )
    } );

    this.children = [ valuesControl, discontinuitiesControl ];

    this.disposeCalculusGrapherPreferencesNode = (): void => {
      valuesControl.dispose();
      discontinuitiesControl.dispose();
    };
  }

  public override dispose(): void {
    this.disposeCalculusGrapherPreferencesNode();
    super.dispose();
  }
}

calculusGrapher.register( 'CalculusGrapherPreferencesNode', CalculusGrapherPreferencesNode );
