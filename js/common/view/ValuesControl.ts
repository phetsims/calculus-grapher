// Copyright 2022, University of Colorado Boulder

/**
 * ValuesControl is the control in the Preferences dialog for setting whether numerical values are displayed
 * throughout the simulations. It is a labeled on/off switch.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import PreferencesToggleSwitch from '../../../../joist/js/preferences/PreferencesToggleSwitch.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import { HBox, HBoxOptions, Text, TextOptions } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import ToggleSwitch, { ToggleSwitchOptions } from '../../../../sun/js/ToggleSwitch.js';
import PreferencesDialogConstants from '../../../../joist/js/preferences/PreferencesDialogConstants.js';

type SelfOptions = {
  textOptions?: StrictOmit<TextOptions, 'tandem'>;
};

type ValuesControlOptions = SelfOptions & PickRequired<HBoxOptions, 'tandem'>;

export default class ValuesControl extends HBox {

  private readonly disposeValuesControl: () => void;

  public constructor( valuesVisibleProperty: Property<boolean>, providedOptions: ValuesControlOptions ) {

    const options = optionize<ValuesControlOptions, StrictOmit<SelfOptions, 'textOptions'>, HBoxOptions>()( {

      // HBoxOptions
      spacing: 10
    }, providedOptions );

    const labelText = new Text( CalculusGrapherStrings.valuesStringProperty, combineOptions<TextOptions>( {
      tandem: options.tandem.createTandem( 'labelText' )
    }, options.textOptions ) );

    const toggleSwitch = new ToggleSwitch( valuesVisibleProperty, false, true, combineOptions<ToggleSwitchOptions>( {
      tandem: options.tandem.createTandem( 'toggleSwitch' )
    }, PreferencesDialogConstants.TOGGLE_SWITCH_OPTIONS ) );

    const preferencesControl = new PreferencesToggleSwitch( {
      labelNode: labelText,
      controlNode: toggleSwitch,
      tandem: options.tandem.createTandem( 'preferencesControl' )
    } );

    options.children = [ preferencesControl ];

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