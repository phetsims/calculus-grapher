// Copyright 2022-2023, University of Colorado Boulder

/**
 * PredictControl is the control in the Preferences dialog for setting whether the 'Predict' feature is
 * available in the user interface. It is a labeled on/off switch.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../../axon/js/Property.js';
import PreferencesControl from '../../../../../joist/js/preferences/PreferencesControl.js';
import { combineOptions } from '../../../../../phet-core/js/optionize.js';
import { RichText, Text } from '../../../../../scenery/js/imports.js';
import calculusGrapher from '../../../calculusGrapher.js';
import CalculusGrapherStrings from '../../../CalculusGrapherStrings.js';
import ToggleSwitch, { ToggleSwitchOptions } from '../../../../../sun/js/ToggleSwitch.js';
import PreferencesDialogConstants from '../../../../../joist/js/preferences/PreferencesDialogConstants.js';
import Tandem from '../../../../../tandem/js/Tandem.js';
import CalculusGrapherConstants from '../../CalculusGrapherConstants.js';
import CalculusGrapherPreferences from '../../model/CalculusGrapherPreferences.js';
import PatternStringProperty from '../../../../../axon/js/PatternStringProperty.js';

export default class PredictControl extends PreferencesControl {

  private readonly disposePredictFeatureControl: () => void;

  public constructor( predictPreferenceEnabledProperty: Property<boolean>, tandem: Tandem ) {

    const labelText = new Text( CalculusGrapherStrings.predictPreferenceStringProperty, {
      font: CalculusGrapherConstants.PREFERENCES_LABEL_FONT,
      tandem: tandem.createTandem( 'labelText' )
    } );

    const toggleSwitch = new ToggleSwitch( predictPreferenceEnabledProperty, false, true,
      combineOptions<ToggleSwitchOptions>( {}, PreferencesDialogConstants.TOGGLE_SWITCH_OPTIONS, {
        tandem: tandem.createTandem( 'toggleSwitch' ),
        phetioVisiblePropertyInstrumented: false
      } ) );

    const descriptionStringProperty = new PatternStringProperty( CalculusGrapherStrings.predictPreferenceDescriptionStringProperty, {
      variable: CalculusGrapherPreferences.functionVariableProperty,
      tandem: tandem.createTandem( RichText.STRING_PROPERTY_TANDEM_NAME )
    } );
    const descriptionText = new RichText( descriptionStringProperty, {
      lineWrap: CalculusGrapherConstants.PREFERENCES_DESCRIPTION_LINE_WRAP,
      font: CalculusGrapherConstants.PREFERENCES_DESCRIPTION_FONT,
      tandem: tandem.createTandem( 'descriptionText' )
    } );

    super( {
      labelNode: labelText,
      controlNode: toggleSwitch,
      descriptionNode: descriptionText,
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

calculusGrapher.register( 'PredictControl', PredictControl );
