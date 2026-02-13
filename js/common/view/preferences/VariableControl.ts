// Copyright 2022-2026, University of Colorado Boulder

/**
 * VariableControl is the control in the Preferences dialog for selecting the variable used in functions.
 * It is a labeled group of radio buttons.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import StringUnionProperty from '../../../../../axon/js/StringUnionProperty.js';
import { TReadOnlyProperty } from '../../../../../axon/js/TReadOnlyProperty.js';
import PreferencesControl from '../../../../../joist/js/preferences/PreferencesControl.js';
import PreferencesDialogConstants from '../../../../../joist/js/preferences/PreferencesDialogConstants.js';
import RichText from '../../../../../scenery/js/nodes/RichText.js';
import Text from '../../../../../scenery/js/nodes/Text.js';
import AquaRadioButtonGroup, { AquaRadioButtonGroupItem } from '../../../../../sun/js/AquaRadioButtonGroup.js';
import Tandem from '../../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../../calculusGrapher.js';
import CalculusGrapherFluent from '../../../CalculusGrapherFluent.js';
import CalculusGrapherConstants from '../../CalculusGrapherConstants.js';
import { FunctionVariable } from '../../CalculusGrapherQueryParameters.js';
import CalculusGrapherSymbols from '../../CalculusGrapherSymbols.js';

const ACCESSIBLE_STRINGS = CalculusGrapherFluent.a11y.variableRadioButtonGroup;

export default class VariableControl extends PreferencesControl {

  public constructor( functionVariableProperty: StringUnionProperty<FunctionVariable>, tandem: Tandem ) {

    const labelText = new Text( CalculusGrapherFluent.variableStringProperty, {
      font: CalculusGrapherConstants.PREFERENCES_LABEL_FONT,
      maxWidth: CalculusGrapherConstants.PREFERENCES_LABEL_MAX_WIDTH,
      tandem: tandem.createTandem( 'labelText' )
    } );

    const radioButtonGroup = new VariableRadioButtonGroup( functionVariableProperty,
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
class VariableRadioButtonGroup extends AquaRadioButtonGroup<FunctionVariable> {

  public constructor( functionVariableProperty: StringUnionProperty<FunctionVariable>, tandem: Tandem ) {

    const items: AquaRadioButtonGroupItem<FunctionVariable>[] = [
      {
        value: 'x',
        createNode: radioButtonTandem => new VariableRadioButtonText( CalculusGrapherSymbols.xStringProperty, radioButtonTandem ),
        tandemName: 'xRadioButton',
        options: {
          accessibleName: CalculusGrapherFluent.symbol.xStringProperty,
          accessibleHelpText: ACCESSIBLE_STRINGS.xRadioButton.accessibleHelpTextStringProperty
        }
      },
      {
        value: 't',
        createNode: radioButtonTandem => new VariableRadioButtonText( CalculusGrapherSymbols.tStringProperty, radioButtonTandem ),
        tandemName: 'tRadioButton',
        options: {
          accessibleName: CalculusGrapherFluent.symbol.tStringProperty,
          accessibleHelpText: ACCESSIBLE_STRINGS.tRadioButton.accessibleHelpTextStringProperty
        }
      }
    ];

    super( functionVariableProperty, items, {
      isDisposable: false,
      orientation: 'horizontal',
      spacing: 20,
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
class VariableRadioButtonText extends RichText {

  public constructor( functionVariableStringProperty: TReadOnlyProperty<string>, radioButtonTandem: Tandem ) {
    super( functionVariableStringProperty, {
      isDisposable: false,
      font: PreferencesDialogConstants.CONTENT_FONT,
      maxWidth: 100,
      tandem: radioButtonTandem.createTandem( 'text' )
    } );
  }
}

calculusGrapher.register( 'VariableControl', VariableControl );