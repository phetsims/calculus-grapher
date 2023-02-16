// Copyright 2022-2023, University of Colorado Boulder

/**
 * CalculusGrapherPreferences is the model for sim-specific preferences, accessed via the Preferences dialog.
 * These preferences are global, and affect all screens.
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherQueryParameters, { ConnectDiscontinuities, ConnectDiscontinuitiesValues, DerivativeNotation, DerivativeNotationValues, FunctionVariable, FunctionVariableValues } from '../CalculusGrapherQueryParameters.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';

//TODO QueryStringMachine needs a string union type
const connectDiscontinuities: ConnectDiscontinuities = CalculusGrapherQueryParameters.connectDiscontinuities === 'noLine' ? 'noLine' : 'dashedLine';
export const derivationNotation: DerivativeNotation = CalculusGrapherQueryParameters.derivativeNotation === 'lagrange' ? 'lagrange' : 'leibniz';
export const functionVariable: FunctionVariable = CalculusGrapherQueryParameters.functionVariable === 'x' ? 'x' : 't';

const CalculusGrapherPreferences = {

  connectDiscontinuitiesProperty: new StringUnionProperty( connectDiscontinuities, {
    validValues: ConnectDiscontinuitiesValues,
    tandem: Tandem.PREFERENCES.createTandem( 'connectDiscontinuitiesProperty' ),
    phetioDocumentation: 'Whether to leave a gap between discontinuities, or connect them with a dashed line'
  } ),

  derivativeNotationProperty: new StringUnionProperty( derivationNotation, {
    validValues: DerivativeNotationValues,
    tandem: Tandem.PREFERENCES.createTandem( 'derivativeNotationProperty' ),
    phetioDocumentation: 'the notation used for functions'
  } ),

  functionVariableProperty: new StringUnionProperty( functionVariable, {
    validValues: FunctionVariableValues,
    tandem: Tandem.PREFERENCES.createTandem( 'functionVariableProperty' ),
    phetioDocumentation: 'the variable used in functions'
  } ),

  valuesVisibleProperty: new BooleanProperty( CalculusGrapherQueryParameters.valuesVisible, {
    tandem: Tandem.PREFERENCES.createTandem( 'valuesVisibleProperty' ),
    phetioDocumentation: 'Shows numerical values wherever they appear in the simulation'
  } ),

  // Note that this Preference is named predictPreferenceEnabledProperty to distinguish it from
  // CalculusGraphModel.predictEnabledProperty.
  predictPreferenceEnabledProperty: new BooleanProperty( CalculusGrapherQueryParameters.predict, {
    tandem: Tandem.PREFERENCES.createTandem( 'predictFeatureEnabledProperty' ),
    phetioDocumentation: 'Preference used to show/hide the Predict feature in the user interface'
  } )
};

calculusGrapher.register( 'CalculusGrapherPreferences', CalculusGrapherPreferences );
export default CalculusGrapherPreferences;
