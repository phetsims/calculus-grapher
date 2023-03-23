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
import { RichText, Text } from '../../../../../scenery/js/imports.js';
import calculusGrapher from '../../../calculusGrapher.js';
import CalculusGrapherStrings from '../../../CalculusGrapherStrings.js';
import ToggleSwitch, { ToggleSwitchOptions } from '../../../../../sun/js/ToggleSwitch.js';
import PreferencesDialogConstants from '../../../../../joist/js/preferences/PreferencesDialogConstants.js';
import Tandem from '../../../../../tandem/js/Tandem.js';
import CalculusGrapherConstants from '../../CalculusGrapherConstants.js';

export default class ValuesControl extends PreferencesControl {

  private readonly disposeValuesControl: () => void;

  public constructor( valuesVisibleProperty: Property<boolean>, tandem: Tandem ) {

    const labelText = new Text( CalculusGrapherStrings.valuesStringProperty, {
      font: CalculusGrapherConstants.PREFERENCES_LABEL_FONT,
      maxWidth: CalculusGrapherConstants.PREFERENCES_LABEL_MAX_WIDTH,
      tandem: tandem.createTandem( 'labelText' )
    } );

    const toggleSwitch = new ToggleSwitch( valuesVisibleProperty, false, true,
      combineOptions<ToggleSwitchOptions>( {}, PreferencesDialogConstants.TOGGLE_SWITCH_OPTIONS, {
        tandem: tandem.createTandem( 'toggleSwitch' ),
        phetioVisiblePropertyInstrumented: false
      } ) );

    const descriptionText = new RichText( CalculusGrapherStrings.valuesPreferenceDescriptionStringProperty, {
      lineWrap: CalculusGrapherConstants.PREFERENCES_DESCRIPTION_LINE_WRAP,
      maxHeight: 50,
      font: CalculusGrapherConstants.PREFERENCES_DESCRIPTION_FONT,
      tandem: tandem.createTandem( 'descriptionText' )
    } );

    super( {
      labelNode: labelText,
      controlNode: toggleSwitch,
      descriptionNode: descriptionText,
      labelSpacing: 20,
      tandem: tandem,
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    } );

    this.disposeValuesControl = () => {
      labelText.dispose();
      toggleSwitch.dispose();
      descriptionText.dispose();
    };
  }

  public override dispose(): void {
    this.disposeValuesControl();
    super.dispose();
  }
}

calculusGrapher.register( 'ValuesControl', ValuesControl );
