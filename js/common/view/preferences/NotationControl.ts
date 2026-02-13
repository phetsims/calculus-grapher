// Copyright 2022-2026, University of Colorado Boulder

/**
 * NotationControl is the control in the Preferences dialog for selecting the notation used for functions.
 * It is a labeled group of radio buttons.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import StringUnionProperty from '../../../../../axon/js/StringUnionProperty.js';
import { TReadOnlyProperty } from '../../../../../axon/js/TReadOnlyProperty.js';
import PreferencesControl from '../../../../../joist/js/preferences/PreferencesControl.js';
import PreferencesDialogConstants from '../../../../../joist/js/preferences/PreferencesDialogConstants.js';
import HBox from '../../../../../scenery/js/layout/nodes/HBox.js';
import RichText from '../../../../../scenery/js/nodes/RichText.js';
import Text from '../../../../../scenery/js/nodes/Text.js';
import AquaRadioButtonGroup, { AquaRadioButtonGroupItem } from '../../../../../sun/js/AquaRadioButtonGroup.js';
import Tandem from '../../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../../calculusGrapher.js';
import CalculusGrapherFluent from '../../../CalculusGrapherFluent.js';
import CalculusGrapherConstants from '../../CalculusGrapherConstants.js';
import { DerivativeNotation, DerivativeNotationValues } from '../../CalculusGrapherQueryParameters.js';
import CalculusGrapherSymbols from '../../CalculusGrapherSymbols.js';
import GraphType from '../../model/GraphType.js';
import GraphTypeLabelNode from '../GraphTypeLabelNode.js';

const ACCESSIBLE_STRINGS = CalculusGrapherFluent.a11y.notationRadioButtonGroup;

export default class NotationControl extends PreferencesControl {

  public constructor( derivativeNotationProperty: StringUnionProperty<DerivativeNotation>, tandem: Tandem ) {

    const labelText = new Text( CalculusGrapherFluent.notationStringProperty, {
      font: CalculusGrapherConstants.PREFERENCES_LABEL_FONT,
      maxWidth: CalculusGrapherConstants.PREFERENCES_LABEL_MAX_WIDTH,
      tandem: tandem.createTandem( 'labelText' )
    } );

    const radioButtonGroup = new NotationRadioButtonGroup( derivativeNotationProperty,
      tandem.createTandem( 'radioButtonGroup' ) );

    super( {
      isDisposable: false,
      labelNode: labelText,
      controlNode: radioButtonGroup,
      labelSpacing: 20,
      tandem: tandem,
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    } );
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
        createNode: radioButtonTandem => new NotationRadioButtonLabel( CalculusGrapherFluent.lagrangeStringProperty,
          new StringUnionProperty( 'lagrange', { validValues: DerivativeNotationValues } ), radioButtonTandem ),
        tandemName: 'lagrangeRadioButton',
        options: {
          accessibleName: ACCESSIBLE_STRINGS.lagrangeRadioButton.accessibleName.createProperty( {
            variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty
          } ),
          accessibleHelpText: ACCESSIBLE_STRINGS.lagrangeRadioButton.accessibleHelpTextStringProperty
        }
      },
      {
        value: 'leibniz',
        createNode: radioButtonTandem => new NotationRadioButtonLabel( CalculusGrapherFluent.leibnizStringProperty,
          new StringUnionProperty( 'leibniz', { validValues: DerivativeNotationValues } ), radioButtonTandem ),
        tandemName: 'leibnizRadioButton',
        options: {
          accessibleName: ACCESSIBLE_STRINGS.leibnizRadioButton.accessibleName.createProperty( {
            variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty
          } ),
          accessibleHelpText: ACCESSIBLE_STRINGS.leibnizRadioButton.accessibleHelpText.createProperty( {
            variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty
          } )
        }
      }
    ];

    super( derivativeNotationProperty, items, {
      isDisposable: false,
      orientation: 'vertical',
      spacing: 10,
      radioButtonOptions: {
        phetioVisiblePropertyInstrumented: false
      },
      accessibleHelpText: ACCESSIBLE_STRINGS.accessibleHelpTextStringProperty,
      phetioVisiblePropertyInstrumented: false,
      tandem: tandem
    } );
  }
}

/**
 * Labels for the radio buttons.
 */
class NotationRadioButtonLabel extends HBox {

  public constructor( derivedNotationStringProperty: TReadOnlyProperty<string>,
                      derivativeNotationProperty: StringUnionProperty<DerivativeNotation>,
                      radioButtonTandem: Tandem ) {

    // Name of the notation
    const text = new RichText( derivedNotationStringProperty, {
      font: PreferencesDialogConstants.CONTENT_FONT,
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
      isDisposable: false,
      children: children,
      spacing: 15
    } );
  }
}

calculusGrapher.register( 'NotationControl', NotationControl );