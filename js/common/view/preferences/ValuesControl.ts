// Copyright 2022-2023, University of Colorado Boulder

/**
 * ValuesControl is the control in the Preferences dialog for setting whether numerical values are displayed
 * throughout the simulations. It is a labeled on/off switch.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../../axon/js/Property.js';
import PreferencesControl from '../../../../../joist/js/preferences/PreferencesControl.js';
import { combineOptions } from '../../../../../phet-core/js/optionize.js';
import { Text, TextOptions } from '../../../../../scenery/js/imports.js';
import calculusGrapher from '../../../calculusGrapher.js';
import CalculusGrapherStrings from '../../../CalculusGrapherStrings.js';
import ToggleSwitch, { ToggleSwitchOptions } from '../../../../../sun/js/ToggleSwitch.js';
import PreferencesDialogConstants from '../../../../../joist/js/preferences/PreferencesDialogConstants.js';
import PreferencesDialog from '../../../../../joist/js/preferences/PreferencesDialog.js';
import Tandem from '../../../../../tandem/js/Tandem.js';

export default class ValuesControl extends PreferencesControl {

  private readonly disposeValuesControl: () => void;

  public constructor( valuesVisibleProperty: Property<boolean>, tandem: Tandem ) {

    const labelText = new Text( CalculusGrapherStrings.valuesStringProperty,
      combineOptions<TextOptions>( {}, PreferencesDialog.PANEL_SECTION_CONTENT_OPTIONS, {
        tandem: tandem.createTandem( 'labelText' )
      } ) );

    const toggleSwitch = new ToggleSwitch( valuesVisibleProperty, false, true,
      combineOptions<ToggleSwitchOptions>( {}, PreferencesDialogConstants.TOGGLE_SWITCH_OPTIONS, {
        tandem: tandem.createTandem( 'toggleSwitch' ),
        phetioVisiblePropertyInstrumented: false
      } ) );

    super( {
      labelNode: labelText,
      controlNode: toggleSwitch,
      labelSpacing: 10,
      tandem: tandem
    } );

    this.disposeValuesControl = () => {
      labelText.dispose();
      toggleSwitch.dispose();
    };
  }

  public override dispose(): void {
    this.disposeValuesControl();
    super.dispose();
  }
}

calculusGrapher.register( 'ValuesControl', ValuesControl );
