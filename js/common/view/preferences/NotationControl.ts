// Copyright 2022-2023, University of Colorado Boulder

/**
 * NotationControl is the control in the Preferences dialog for selecting the notation used for functions.
 * It is a labeled group of radio buttons.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { HBox, RichText, Text } from '../../../../../scenery/js/imports.js';
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
import CalculusGrapherConstants from '../../CalculusGrapherConstants.js';
import PreferencesControl from '../../../../../joist/js/preferences/PreferencesControl.js';

export default class NotationControl extends PreferencesControl {

  private readonly disposeNotationControl: () => void;

  public constructor( derivativeNotationProperty: StringUnionProperty<DerivativeNotation>, tandem: Tandem ) {

    const labelText = new Text( CalculusGrapherStrings.notationStringProperty, {
      font: CalculusGrapherConstants.PREFERENCES_LABEL_FONT,
      maxWidth: CalculusGrapherConstants.PREFERENCES_LABEL_MAX_WIDTH,
      tandem: tandem.createTandem( 'labelText' )
    } );

    const radioButtonGroup = new NotationRadioButtonGroup( derivativeNotationProperty,
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
        createNode: radioButtonTandem => new NotationRadioButtonLabel( CalculusGrapherStrings.lagrangeStringProperty,
          new StringUnionProperty( 'lagrange', { validValues: DerivativeNotationValues } ), radioButtonTandem ),
        tandemName: `lagrange${AquaRadioButton.TANDEM_NAME_SUFFIX}`
      },
      {
        value: 'leibniz',
        createNode: radioButtonTandem => new NotationRadioButtonLabel( CalculusGrapherStrings.leibnizStringProperty,
          new StringUnionProperty( 'leibniz', { validValues: DerivativeNotationValues } ), radioButtonTandem ),
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
 * Labels for the radio buttons.
 */
class NotationRadioButtonLabel extends HBox {

  private readonly disposeNotationRadioButtonLabel: () => void;

  public constructor( derivedNotationStringProperty: TReadOnlyProperty<string>,
                      derivativeNotationProperty: StringUnionProperty<DerivativeNotation>,
                      radioButtonTandem: Tandem ) {

    // Name of the notation
    const text = new RichText( derivedNotationStringProperty, {
      font: PreferencesDialog.CONTENT_FONT,
      maxWidth: 150,
      maxHeight: 25,
      tandem: radioButtonTandem.createTandem( 'text' )
    } );

    // An example of the notation
    const exampleNode = new GraphTypeLabelNode( GraphType.DERIVATIVE, {
      derivativeNotationProperty: derivativeNotationProperty
    } );

    const children = [ text, exampleNode ];

    super( {
      children: children,
      spacing: 15
    } );

    this.disposeNotationRadioButtonLabel = () => children.forEach( child => child.dispose() );
  }

  public override dispose(): void {
    this.disposeNotationRadioButtonLabel();
    super.dispose();
  }
}

calculusGrapher.register( 'NotationControl', NotationControl );
