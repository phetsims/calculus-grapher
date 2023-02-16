// Copyright 2022-2023, University of Colorado Boulder

/**
 * PredictFeatureControl is the control in the Preferences dialog for setting whether the 'Predict' feature is
 * available in the user interface. It is a labeled on/off switch.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../../axon/js/Property.js';
import PreferencesControl from '../../../../../joist/js/preferences/PreferencesControl.js';
import { combineOptions } from '../../../../../phet-core/js/optionize.js';
import { Text } from '../../../../../scenery/js/imports.js';
import calculusGrapher from '../../../calculusGrapher.js';
import CalculusGrapherStrings from '../../../CalculusGrapherStrings.js';
import ToggleSwitch, { ToggleSwitchOptions } from '../../../../../sun/js/ToggleSwitch.js';
import PreferencesDialogConstants from '../../../../../joist/js/preferences/PreferencesDialogConstants.js';
import Tandem from '../../../../../tandem/js/Tandem.js';
import CalculusGrapherConstants from '../../CalculusGrapherConstants.js';

export default class PredictFeatureControl extends PreferencesControl {

  private readonly disposePredictFeatureControl: () => void;

  public constructor( predictFeatureEnabledProperty: Property<boolean>, tandem: Tandem ) {

    const labelText = new Text( CalculusGrapherStrings.predictPreferenceStringProperty, {
      font: CalculusGrapherConstants.PREFERENCES_LABEL_FONT,
      tandem: tandem.createTandem( 'labelText' )
    } );

    const toggleSwitch = new ToggleSwitch( predictFeatureEnabledProperty, false, true,
      combineOptions<ToggleSwitchOptions>( {}, PreferencesDialogConstants.TOGGLE_SWITCH_OPTIONS, {
        tandem: tandem.createTandem( 'toggleSwitch' ),
        phetioVisiblePropertyInstrumented: false
      } ) );

    super( {
      labelNode: labelText,
      controlNode: toggleSwitch,
      labelSpacing: 20,
      tandem: tandem
    } );

    this.disposePredictFeatureControl = () => {
      labelText.dispose();
      toggleSwitch.dispose();
    };
  }

  public override dispose(): void {
    this.disposePredictFeatureControl();
    super.dispose();
  }
}

calculusGrapher.register( 'PredictFeatureControl', PredictFeatureControl );
