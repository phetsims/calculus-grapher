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
import OnOffSwitch from '../../../../sun/js/OnOffSwitch.js';

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

    // const title = new Text( CalculusGrapherStrings.showNumericalLabels, {
    //   font: PreferencesDialog.CONTENT_FONT
    // } );

    // Add switch to enable numerical labels on graphs
    const numericalLabelsEnabledSwitch = new OnOffSwitch( CalculusGrapherPreferences.numericalLabelsEnabledProperty, {
      tandem: options.tandem.createTandem( 'numericalLabelsEnabledSwitch' )
    } );

    this.children = [ numericalLabelsEnabledSwitch ];

    this.disposeCalculusGrapherPreferencesNode = (): void => {
      numericalLabelsEnabledSwitch.dispose();
    };
  }

  public override dispose(): void {
    this.disposeCalculusGrapherPreferencesNode();
    super.dispose();
  }
}

calculusGrapher.register( 'CalculusGrapherPreferencesNode', CalculusGrapherPreferencesNode );
