// Copyright 2022, University of Colorado Boulder

/**
 * NotationControl is the control in the Preferences dialog for selecting the notation used for functions.
 * It is a labeled group of radio buttons.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { HBox, HBoxOptions, Node, RichText, Text } from '../../../../scenery/js/imports.js';
import AquaRadioButtonGroup, { AquaRadioButtonGroupItem, AquaRadioButtonGroupOptions } from '../../../../sun/js/AquaRadioButtonGroup.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import StringEnumerationProperty from '../../../../axon/js/StringEnumerationProperty.js';
import AquaRadioButton from '../../../../sun/js/AquaRadioButton.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import PreferencesDialog from '../../../../joist/js/preferences/PreferencesDialog.js';
import { DerivativeNotation, DerivativeNotationValues, FunctionVariable } from '../CalculusGrapherQueryParameters.js';
import CurveLabelNode from './CurveLabelNode.js';

type SelfOptions = EmptySelfOptions;

type NotationControlOptions = SelfOptions & PickRequired<HBoxOptions, 'tandem'>;

export default class NotationControl extends HBox {

  private readonly disposeNotationControl: () => void;

  public constructor( derivativeNotationProperty: StringEnumerationProperty<DerivativeNotation>,
                      functionVariableProperty: StringEnumerationProperty<FunctionVariable>,
                      providedOptions: NotationControlOptions ) {

    const options = optionize<NotationControlOptions, SelfOptions, HBoxOptions>()( {

      // HBoxOptions
      align: 'top',
      spacing: 15
    }, providedOptions );

    const labelText = new Text( CalculusGrapherStrings.notationStringProperty, {
      font: PreferencesDialog.CONTENT_FONT
    } );

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
        createNode: tandem => createLabel( CalculusGrapherStrings.LagrangeStringProperty,
          new StringEnumerationProperty( 'lagrange', { validValues: DerivativeNotationValues } ),
          functionVariableProperty ),
        tandemName: `lagrange${AquaRadioButton.TANDEM_NAME_SUFFIX}`
      },
      {
        value: 'leibniz',
        createNode: tandem => createLabel( CalculusGrapherStrings.LeibnizStringProperty,
          new StringEnumerationProperty( 'leibniz', { validValues: DerivativeNotationValues } ),
          functionVariableProperty ),
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
                      derivativeNotationProperty: StringEnumerationProperty<DerivativeNotation>,
                      functionVariableProperty: StringEnumerationProperty<FunctionVariable> ): Node {

  const curveLabelNode = new CurveLabelNode( {
    graphType: 'derivative',
    derivativeNotationProperty: derivativeNotationProperty,
    functionVariableProperty: functionVariableProperty
  } );

  const text = new RichText( derivedNotationStringProperty, {
    font: PreferencesDialog.CONTENT_FONT
  } );

  return new HBox( {
    children: [ text, curveLabelNode ],
    spacing: 15
  } );
}

calculusGrapher.register( 'NotationControl', NotationControl );
