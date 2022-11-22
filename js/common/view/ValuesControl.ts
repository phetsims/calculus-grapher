// Copyright 2022, University of Colorado Boulder

/**
 * ValuesControl is the control in the Preferences dialog for setting whether numerical values are displayed
 * throughout the simulations. It is a labeled on/off switch.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import PreferencesToggleSwitch, { PreferencesToggleSwitchOptions } from '../../../../joist/js/preferences/PreferencesToggleSwitch.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import { Text, TextOptions } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import ToggleSwitch from '../../../../sun/js/ToggleSwitch.js';
import PreferencesDialogConstants from '../../../../joist/js/preferences/PreferencesDialogConstants.js';

type SelfOptions = {
  textOptions?: StrictOmit<TextOptions, 'tandem'>;
};

type ValuesControlOptions = SelfOptions & PickRequired<PreferencesToggleSwitchOptions, 'tandem'>;

export default class ValuesControl extends PreferencesToggleSwitch {

  private readonly disposeValuesControl: () => void;

  public constructor( valuesVisibleProperty: Property<boolean>, providedOptions: ValuesControlOptions ) {

    const options = optionize<ValuesControlOptions, StrictOmit<SelfOptions, 'textOptions'>, PreferencesToggleSwitchOptions>()( {

      // PreferencesToggleSwitchOptions
      labelSpacing: 10
    }, providedOptions );

    const labelText = new Text( CalculusGrapherStrings.valuesStringProperty, options.textOptions );
    options.labelNode = labelText;

    const toggleSwitch = new ToggleSwitch( valuesVisibleProperty, false, true, PreferencesDialogConstants.TOGGLE_SWITCH_OPTIONS );
    options.controlNode = toggleSwitch;

    super( options );

    this.addLinkedElement( valuesVisibleProperty, {
      tandem: options.tandem.createTandem( valuesVisibleProperty.tandem.name )
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