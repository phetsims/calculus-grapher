// Copyright 2022-2025, University of Colorado Boulder

/**
 * ValuesControl is the control in the Preferences dialog for setting whether numerical values are displayed
 * throughout the simulations. It is a labeled on/off switch.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../../axon/js/Property.js';
import PreferencesControl from '../../../../../joist/js/preferences/PreferencesControl.js';
import PreferencesDialogConstants from '../../../../../joist/js/preferences/PreferencesDialogConstants.js';
import { combineOptions } from '../../../../../phet-core/js/optionize.js';
import RichText from '../../../../../scenery/js/nodes/RichText.js';
import Text from '../../../../../scenery/js/nodes/Text.js';
import ToggleSwitch, { ToggleSwitchOptions } from '../../../../../sun/js/ToggleSwitch.js';
import Tandem from '../../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../../calculusGrapher.js';
import CalculusGrapherFluent from '../../../CalculusGrapherFluent.js';
import CalculusGrapherConstants from '../../CalculusGrapherConstants.js';

export default class ValuesControl extends PreferencesControl {

  private readonly disposeValuesControl: () => void;

  public constructor( valuesVisibleProperty: Property<boolean>, tandem: Tandem ) {

    const labelText = new Text( CalculusGrapherFluent.valuesStringProperty, {
      font: CalculusGrapherConstants.PREFERENCES_LABEL_FONT,
      maxWidth: CalculusGrapherConstants.PREFERENCES_LABEL_MAX_WIDTH,
      tandem: tandem.createTandem( 'labelText' )
    } );

    const toggleSwitch = new ToggleSwitch( valuesVisibleProperty, false, true,
      combineOptions<ToggleSwitchOptions>( {}, PreferencesDialogConstants.TOGGLE_SWITCH_OPTIONS, {
        tandem: tandem.createTandem( 'toggleSwitch' ),
        phetioVisiblePropertyInstrumented: false
      } ) );

    const descriptionText = new RichText( CalculusGrapherFluent.valuesPreferenceDescriptionStringProperty, {
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