// Copyright 2022-2023, University of Colorado Boulder

/**
 * NotationControl is the control in the Preferences dialog for selecting the notation used for functions.
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
import { DerivativeNotation, DerivativeNotationValues } from '../../CalculusGrapherQueryParameters.js';
import GraphTypeLabelNode from '../GraphTypeLabelNode.js';
import StrictOmit from '../../../../../phet-core/js/types/StrictOmit.js';

type SelfOptions = EmptySelfOptions;

type NotationControlOptions = SelfOptions & PickRequired<HBoxOptions, 'tandem'> & StrictOmit<HBoxOptions, 'children'>;

export default class NotationControl extends HBox {

  private readonly disposeNotationControl: () => void;

  public constructor( derivativeNotationProperty: StringUnionProperty<DerivativeNotation>,
                      providedOptions: NotationControlOptions ) {

    const options = optionize<NotationControlOptions, SelfOptions, HBoxOptions>()( {

      // HBoxOptions
      align: 'top',
      spacing: 15
    }, providedOptions );

    const labelText = new Text( CalculusGrapherStrings.notationStringProperty,
      PreferencesDialog.PANEL_SECTION_CONTENT_OPTIONS );

    const radioButtonGroup = new NotationRadioButtonGroup( derivativeNotationProperty, {
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

  public constructor( derivativeNotationProperty: StringUnionProperty<DerivativeNotation>,
                      providedOptions: NotationRadioButtonGroupOptions ) {

    const options = optionize<NotationRadioButtonGroupOptions, NotationRadioButtonGroupSelfOptions, AquaRadioButtonGroupOptions>()( {

      // AquaRadioButtonGroupOptions
      orientation: 'vertical',
      spacing: 10
    }, providedOptions );

    const items: AquaRadioButtonGroupItem<DerivativeNotation>[] = [
      {
        value: 'lagrange',
        createNode: () => createLabel( CalculusGrapherStrings.LagrangeStringProperty,
          new StringUnionProperty( 'lagrange', { validValues: DerivativeNotationValues } ) ),
        tandemName: `lagrange${AquaRadioButton.TANDEM_NAME_SUFFIX}`
      },
      {
        value: 'leibniz',
        createNode: () => createLabel( CalculusGrapherStrings.LeibnizStringProperty,
          new StringUnionProperty( 'leibniz', { validValues: DerivativeNotationValues } ) ),
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
                      derivativeNotationProperty: StringUnionProperty<DerivativeNotation> ): Node {

  // Name of the notation
  const text = new RichText( derivedNotationStringProperty, {
    font: PreferencesDialog.CONTENT_FONT
  } );

  // An example of the notation
  const exampleNode = new GraphTypeLabelNode( 'derivative', {
    derivativeNotationProperty: derivativeNotationProperty
  } );

  return new HBox( {
    children: [ text, exampleNode ],
    spacing: 15
  } );
}

calculusGrapher.register( 'NotationControl', NotationControl );
