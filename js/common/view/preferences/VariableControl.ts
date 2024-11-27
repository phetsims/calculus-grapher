// Copyright 2022-2024, University of Colorado Boulder

/**
 * VariableControl is the control in the Preferences dialog for selecting the variable used in functions.
 * It is a labeled group of radio buttons.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import StringUnionProperty from '../../../../../axon/js/StringUnionProperty.js';
import TReadOnlyProperty from '../../../../../axon/js/TReadOnlyProperty.js';
import PreferencesControl from '../../../../../joist/js/preferences/PreferencesControl.js';
import PreferencesDialog from '../../../../../joist/js/preferences/PreferencesDialog.js';
import { RichText, Text } from '../../../../../scenery/js/imports.js';
import AquaRadioButtonGroup, { AquaRadioButtonGroupItem } from '../../../../../sun/js/AquaRadioButtonGroup.js';
import Tandem from '../../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../../calculusGrapher.js';
import CalculusGrapherStrings from '../../../CalculusGrapherStrings.js';
import CalculusGrapherConstants from '../../CalculusGrapherConstants.js';
import { FunctionVariable } from '../../CalculusGrapherQueryParameters.js';
import CalculusGrapherSymbols from '../../CalculusGrapherSymbols.js';

export default class VariableControl extends PreferencesControl {

  private readonly disposeVariableControl: () => void;

  public constructor( functionVariableProperty: StringUnionProperty<FunctionVariable>, tandem: Tandem ) {

    const labelText = new Text( CalculusGrapherStrings.variableStringProperty, {
      font: CalculusGrapherConstants.PREFERENCES_LABEL_FONT,
      maxWidth: CalculusGrapherConstants.PREFERENCES_LABEL_MAX_WIDTH,
      tandem: tandem.createTandem( 'labelText' )
    } );

    const radioButtonGroup = new VariableRadioButtonGroup( functionVariableProperty,
      tandem.createTandem( 'radioButtonGroup' ) );

    super( {
      labelNode: labelText,
      controlNode: radioButtonGroup,
      labelSpacing: 20,
      tandem: tandem,
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    } );

    this.disposeVariableControl = () => {
      labelText.dispose();
      radioButtonGroup.dispose();
    };
  }

  public override dispose(): void {
    this.disposeVariableControl();
    super.dispose();
  }
}

/**
 * The radio button group for this control.
 */
class VariableRadioButtonGroup extends AquaRadioButtonGroup<FunctionVariable> {

  public constructor( functionVariableProperty: StringUnionProperty<FunctionVariable>, tandem: Tandem ) {

    const items: AquaRadioButtonGroupItem<FunctionVariable>[] = [
      {
        value: 'x',
        createNode: radioButtonTandem => new VariableRadioButtonText( CalculusGrapherSymbols.xStringProperty, radioButtonTandem ),
        tandemName: 'xRadioButton'
      },
      {
        value: 't',
        createNode: radioButtonTandem => new VariableRadioButtonText( CalculusGrapherSymbols.tStringProperty, radioButtonTandem ),
        tandemName: 'tRadioButton'
      }
    ];

    super( functionVariableProperty, items, {
      orientation: 'horizontal',
      spacing: 20,
      radioButtonOptions: {
        phetioVisiblePropertyInstrumented: false
      },
      phetioVisiblePropertyInstrumented: false,
      tandem: tandem
    } );
  }
}

/**
 * Labels for the radio buttons.
 */
class VariableRadioButtonText extends RichText {

  public constructor( functionVariableStringProperty: TReadOnlyProperty<string>, radioButtonTandem: Tandem ) {
    super( functionVariableStringProperty, {
      font: PreferencesDialog.CONTENT_FONT,
      maxWidth: 100,
      tandem: radioButtonTandem.createTandem( 'text' )
    } );
  }
}

calculusGrapher.register( 'VariableControl', VariableControl );