// Copyright 2022-2023, University of Colorado Boulder

/**
 * NotationControl is the control in the Preferences dialog for selecting the notation used for functions.
 * It is a labeled group of radio buttons.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { combineOptions } from '../../../../../phet-core/js/optionize.js';
import { HBox, Node, RichText, Text, TextOptions } from '../../../../../scenery/js/imports.js';
import AquaRadioButtonGroup, { AquaRadioButtonGroupItem } from '../../../../../sun/js/AquaRadioButtonGroup.js';
import calculusGrapher from '../../../calculusGrapher.js';
import CalculusGrapherStrings from '../../../CalculusGrapherStrings.js';
import StringUnionProperty from '../../../../../axon/js/StringUnionProperty.js';
import AquaRadioButton from '../../../../../sun/js/AquaRadioButton.js';
import TReadOnlyProperty from '../../../../../axon/js/TReadOnlyProperty.js';
import PreferencesDialog from '../../../../../joist/js/preferences/PreferencesDialog.js';
import { DerivativeNotation, DerivativeNotationValues } from '../../CalculusGrapherQueryParameters.js';
import GraphTypeLabelNode from '../GraphTypeLabelNode.js';
import GraphType from '../../model/GraphType.js';
import Tandem from '../../../../../tandem/js/Tandem.js';

export default class NotationControl extends HBox {

  private readonly disposeNotationControl: () => void;

  public constructor( derivativeNotationProperty: StringUnionProperty<DerivativeNotation>, tandem: Tandem ) {

    const labelText = new Text( CalculusGrapherStrings.notationStringProperty,
      combineOptions<TextOptions>( {}, PreferencesDialog.PANEL_SECTION_CONTENT_OPTIONS, {
        tandem: tandem.createTandem( 'labelText' )
      } ) );

    const radioButtonGroup = new NotationRadioButtonGroup( derivativeNotationProperty,
      tandem.createTandem( 'radioButtonGroup' ) );

    super( {
      children: [ labelText, radioButtonGroup ],
      align: 'top',
      spacing: 15
    } );

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
class NotationRadioButtonGroup extends AquaRadioButtonGroup<DerivativeNotation> {

  public constructor( derivativeNotationProperty: StringUnionProperty<DerivativeNotation>, tandem: Tandem ) {

    const items: AquaRadioButtonGroupItem<DerivativeNotation>[] = [
      {
        value: 'lagrange',
        createNode: tandem => createLabel( CalculusGrapherStrings.LagrangeStringProperty,
          new StringUnionProperty( 'lagrange', { validValues: DerivativeNotationValues } ), tandem ),
        tandemName: `lagrange${AquaRadioButton.TANDEM_NAME_SUFFIX}`
      },
      {
        value: 'leibniz',
        createNode: tandem => createLabel( CalculusGrapherStrings.LeibnizStringProperty,
          new StringUnionProperty( 'leibniz', { validValues: DerivativeNotationValues } ), tandem ),
        tandemName: `leibniz${AquaRadioButton.TANDEM_NAME_SUFFIX}`
      }
    ];

    super( derivativeNotationProperty, items, {
      orientation: 'vertical',
      spacing: 10,
      radioButtonOptions: {
        phetioVisiblePropertyInstrumented: false
      },
      phetioVisiblePropertyInstrumented: false,
      tandem: tandem
    } );
  }
}

/**
 * Creates the label for a radio button.
 */
function createLabel( derivedNotationStringProperty: TReadOnlyProperty<string>,
                      derivativeNotationProperty: StringUnionProperty<DerivativeNotation>,
                      tandem: Tandem ): Node {

  // Name of the notation
  const text = new RichText( derivedNotationStringProperty, {
    font: PreferencesDialog.CONTENT_FONT,
    tandem: tandem.createTandem( 'text' )
  } );

  // An example of the notation
  const exampleNode = new GraphTypeLabelNode( GraphType.DERIVATIVE, {
    derivativeNotationProperty: derivativeNotationProperty
  } );

  return new HBox( {
    children: [ text, exampleNode ],
    spacing: 15
  } );
}

calculusGrapher.register( 'NotationControl', NotationControl );
