// Copyright 2022, University of Colorado Boulder

/**
 * ValuesControl is the control in the Preferences dialog for setting whether numerical values are displayed
 * throughout the simulations. It is a labeled on/off switch.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import PreferencesToggleSwitch, { PreferencesToggleSwitchOptions } from '../../../../joist/js/preferences/PreferencesToggleSwitch.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { Font, Text } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import ToggleSwitch, { ToggleSwitchOptions } from '../../../../sun/js/ToggleSwitch.js';
import PreferencesDialogConstants from '../../../../joist/js/preferences/PreferencesDialogConstants.js';
import PreferencesDialog from '../../../../joist/js/preferences/PreferencesDialog.js';

type SelfOptions = {
  font?: Font;
};

type ValuesControlOptions = SelfOptions & PickRequired<PreferencesToggleSwitchOptions, 'tandem'>;

export default class ValuesControl extends PreferencesToggleSwitch {

  private readonly disposeValuesControl: () => void;

  public constructor( valuesVisibleProperty: Property<boolean>, providedOptions: ValuesControlOptions ) {

    const options = optionize<ValuesControlOptions, SelfOptions, PreferencesToggleSwitchOptions>()( {

      // SelfOptions
      font: PreferencesDialog.CONTENT_FONT,

      // PreferencesToggleSwitchOptions
      labelSpacing: 10
    }, providedOptions );

    const labelText = new Text( CalculusGrapherStrings.valuesStringProperty, {
      font: options.font
    } );
    options.labelNode = labelText;

    const toggleSwitch = new ToggleSwitch( valuesVisibleProperty, false, true,
      combineOptions<ToggleSwitchOptions>( {}, PreferencesDialogConstants.TOGGLE_SWITCH_OPTIONS, {
        tandem: options.tandem.createTandem( 'toggleSwitch' )
      } ) );
    options.controlNode = toggleSwitch;

    super( options );

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