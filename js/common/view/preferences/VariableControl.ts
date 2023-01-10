// Copyright 2022-2023, University of Colorado Boulder

/**
 * VariableControl is the control in the Preferences dialog for selecting the variable used in functions.
 * It is a labeled group of radio buttons.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../../phet-core/js/types/PickRequired.js';
import { HBox, HBoxOptions, Node, RichText, Text } from '../../../../../scenery/js/imports.js';
import AquaRadioButtonGroup, { AquaRadioButtonGroupItem, AquaRadioButtonGroupOptions } from '../../../../../sun/js/AquaRadioButtonGroup.js';
import calculusGrapher from '../../../calculusGrapher.js';
import CalculusGrapherStrings from '../../../CalculusGrapherStrings.js';
import StringUnionProperty from '../../../../../axon/js/StringUnionProperty.js';
import AquaRadioButton from '../../../../../sun/js/AquaRadioButton.js';
import TReadOnlyProperty from '../../../../../axon/js/TReadOnlyProperty.js';
import PreferencesDialog from '../../../../../joist/js/preferences/PreferencesDialog.js';
import CalculusGrapherSymbols from '../../CalculusGrapherSymbols.js';
import { FunctionVariable } from '../../CalculusGrapherQueryParameters.js';
import StrictOmit from '../../../../../phet-core/js/types/StrictOmit.js';

type SelfOptions = EmptySelfOptions;

type VariableControlOptions = SelfOptions & PickRequired<HBoxOptions, 'tandem'> & StrictOmit<HBoxOptions, 'children'>;

export default class VariableControl extends HBox {

  private readonly disposeVariableControl: () => void;

  public constructor( functionVariableProperty: StringUnionProperty<FunctionVariable>,
                      providedOptions: VariableControlOptions ) {

    const options = optionize<VariableControlOptions, SelfOptions, HBoxOptions>()( {

      // HBoxOptions
      align: 'top',
      spacing: 15
    }, providedOptions );

    const labelText = new Text( CalculusGrapherStrings.variableStringProperty,
      PreferencesDialog.PANEL_SECTION_CONTENT_OPTIONS );

    const radioButtonGroup = new VariableRadioButtonGroup( functionVariableProperty, {
      tandem: options.tandem.createTandem( 'radioButtonGroup' )
    } );

    options.children = [ labelText, radioButtonGroup ];

    super( options );

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

type VariableRadioButtonGroupSelfOptions = EmptySelfOptions;

type VariableRadioButtonGroupOptions = SelfOptions & PickRequired<AquaRadioButtonGroupOptions, 'tandem'>;

class VariableRadioButtonGroup extends AquaRadioButtonGroup<FunctionVariable> {

  public constructor( functionVariableProperty: StringUnionProperty<FunctionVariable>,
                      providedOptions: VariableRadioButtonGroupOptions ) {

    const options = optionize<VariableRadioButtonGroupOptions, VariableRadioButtonGroupSelfOptions, AquaRadioButtonGroupOptions>()( {

      // AquaRadioButtonGroupOptions
      orientation: 'horizontal',
      spacing: 20
    }, providedOptions );

    const items: AquaRadioButtonGroupItem<FunctionVariable>[] = [
      {
        value: 'x',
        createNode: tandem => createLabel( CalculusGrapherSymbols.xStringProperty ),
        tandemName: `x${AquaRadioButton.TANDEM_NAME_SUFFIX}`
      },
      {
        value: 't',
        createNode: tandem => createLabel( CalculusGrapherSymbols.tStringProperty ),
        tandemName: `t${AquaRadioButton.TANDEM_NAME_SUFFIX}`
      }
    ];

    super( functionVariableProperty, items, options );
  }
}

/**
 * Creates the label for a radio button.
 */
function createLabel( functionVariableStringProperty: TReadOnlyProperty<string> ): Node {
  return new RichText( functionVariableStringProperty, {
    font: PreferencesDialog.CONTENT_FONT
  } );
}

calculusGrapher.register( 'VariableControl', VariableControl );
