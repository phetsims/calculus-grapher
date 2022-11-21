// Copyright 2022, University of Colorado Boulder

/**
 * VariableControl is the control in the Preferences dialog for selecting the variable used in functions.
 * It is a labeled group of radio buttons.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { combineOptions, EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import { HBox, HBoxOptions, Node, RichText, Text, TextOptions } from '../../../../scenery/js/imports.js';
import AquaRadioButtonGroup, { AquaRadioButtonGroupItem, AquaRadioButtonGroupOptions } from '../../../../sun/js/AquaRadioButtonGroup.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import StringEnumerationProperty from '../../../../axon/js/StringEnumerationProperty.js';
import AquaRadioButton from '../../../../sun/js/AquaRadioButton.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import PreferencesDialog from '../../../../joist/js/preferences/PreferencesDialog.js';
import { FunctionVariable } from '../model/FunctionVariable.js';
import CalculusGrapherSymbols from '../CalculusGrapherSymbols.js';

const FONT = PreferencesDialog.CONTENT_FONT;

type SelfOptions = {
  textOptions?: StrictOmit<TextOptions, 'tandem'>;
};

type VariableControlOptions = SelfOptions & PickRequired<HBoxOptions, 'tandem'>;

export default class VariableControl extends HBox {

  private readonly disposeVariableControl: () => void;

  public constructor( functionVariableProperty: StringEnumerationProperty<FunctionVariable>,
                      providedOptions: VariableControlOptions ) {

    const options = optionize<VariableControlOptions, StrictOmit<SelfOptions, 'textOptions'>, HBoxOptions>()( {

      // HBoxOptions
      align: 'top',
      spacing: 15
    }, providedOptions );

    const labelText = new Text( CalculusGrapherStrings.variableStringProperty, combineOptions<TextOptions>( {
      font: FONT,
      tandem: options.tandem.createTandem( 'labelText' )
    }, options.textOptions ) );

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

  public constructor( functionVariableProperty: StringEnumerationProperty<FunctionVariable>,
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
    font: FONT
  } );
}

calculusGrapher.register( 'VariableControl', VariableControl );