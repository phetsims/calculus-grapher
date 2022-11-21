// Copyright 2022, University of Colorado Boulder

/**
 * NotationControl is the control in the Preferences dialog for selecting the notation used for functions.
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
import { DerivativeNotation } from '../model/DerivativeNotation.js';
import StringEnumerationProperty from '../../../../axon/js/StringEnumerationProperty.js';
import AquaRadioButton from '../../../../sun/js/AquaRadioButton.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import PreferencesDialog from '../../../../joist/js/preferences/PreferencesDialog.js';
import { FunctionVariable } from '../model/FunctionVariable.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import CalculusGrapherSymbols from '../CalculusGrapherSymbols.js';

const FONT = PreferencesDialog.CONTENT_FONT;

type SelfOptions = {
  textOptions?: StrictOmit<TextOptions, 'tandem'>;
};

type NotationControlOptions = SelfOptions & PickRequired<HBoxOptions, 'tandem'>;

export default class NotationControl extends HBox {

  private readonly disposeNotationControl: () => void;

  public constructor( derivativeNotationProperty: StringEnumerationProperty<DerivativeNotation>,
                      functionVariableProperty: StringEnumerationProperty<FunctionVariable>,
                      providedOptions: NotationControlOptions ) {

    const options = optionize<NotationControlOptions, StrictOmit<SelfOptions, 'textOptions'>, HBoxOptions>()( {

      // HBoxOptions
      align: 'top',
      spacing: 15
    }, providedOptions );

    const labelText = new Text( CalculusGrapherStrings.notationStringProperty, combineOptions<TextOptions>( {
      font: FONT,
      tandem: options.tandem.createTandem( 'labelText' )
    }, options.textOptions ) );

    const radioButtonGroup = new NotationRadioButtonGroup( derivativeNotationProperty, functionVariableProperty, {
      tandem: options.tandem.createTandem( 'radioButtonGroup' )
    } );

    options.children = [ labelText, radioButtonGroup ];

    super( options );

    this.disposeNotationControl = () => {
      labelText.dispose();
      radioButtonGroup.dispose();
    };
  }

  public override dispose(): void {
    this.disposeNotationControl();
    super.dispose();
  }
}

/**
 * The radio button group for this control.
 */

type NotationRadioButtonGroupSelfOptions = EmptySelfOptions;

type NotationRadioButtonGroupOptions = SelfOptions & PickRequired<AquaRadioButtonGroupOptions, 'tandem'>;

class NotationRadioButtonGroup extends AquaRadioButtonGroup<DerivativeNotation> {

  public constructor( derivativeNotationProperty: StringEnumerationProperty<DerivativeNotation>,
                      functionVariableProperty: StringEnumerationProperty<FunctionVariable>,
                      providedOptions: NotationRadioButtonGroupOptions ) {

    const options = optionize<NotationRadioButtonGroupOptions, NotationRadioButtonGroupSelfOptions, AquaRadioButtonGroupOptions>()( {

      // AquaRadioButtonGroupOptions
      orientation: 'vertical',
      spacing: 10
    }, providedOptions );

    const items: AquaRadioButtonGroupItem<DerivativeNotation>[] = [
      {
        value: 'lagrange',
        createNode: tandem => createLabel( CalculusGrapherStrings.LagrangeStringProperty, functionVariableProperty ),
        tandemName: `lagrange${AquaRadioButton.TANDEM_NAME_SUFFIX}`
      },
      {
        value: 'leibniz',
        createNode: tandem => createLabel( CalculusGrapherStrings.LeibnizStringProperty, functionVariableProperty ),
        tandemName: `leibniz${AquaRadioButton.TANDEM_NAME_SUFFIX}`
      }
    ];

    super( derivativeNotationProperty, items, options );
  }
}

/**
 * Creates the label for a radio button.
 */
function createLabel( derivedNotationStringProperty: TReadOnlyProperty<string>,
                      functionVariableProperty: StringEnumerationProperty<FunctionVariable> ): Node {

  const functionVariableStringProperty = new DerivedProperty(
    [ functionVariableProperty, CalculusGrapherSymbols.xStringProperty, CalculusGrapherSymbols.tStringProperty ],
    ( functionVariable, xString, tString ) => ( functionVariable === 'x' ) ? xString : tString
  );

  const stringProperty = new PatternStringProperty( derivedNotationStringProperty, {
    variable: functionVariableStringProperty,
    f: CalculusGrapherSymbols.fStringProperty,
    d: CalculusGrapherSymbols.dStringProperty
  } );

  return new RichText( stringProperty, {
    font: FONT
  } );
}

calculusGrapher.register( 'NotationControl', NotationControl );