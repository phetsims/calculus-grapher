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

const connectDiscontinuities: ConnectDiscontinuities = CalculusGrapherQueryParameters.connectDiscontinuities === 'noLine' ? 'noLine' : 'dashedLine';
export const derivationNotation: DerivativeNotation = CalculusGrapherQueryParameters.derivativeNotation === 'lagrange' ? 'lagrange' : 'leibniz';
export const functionVariable: FunctionVariable = CalculusGrapherQueryParameters.functionVariable === 'x' ? 'x' : 't';

const CalculusGrapherPreferences = {

  // Property for the 'Variable' preference
  functionVariableProperty: new StringUnionProperty( functionVariable, {
    validValues: FunctionVariableValues,
    tandem: Tandem.PREFERENCES.createTandem( 'functionVariableProperty' ),
    phetioFeatured: true,
    phetioDocumentation: 'the variable used in functions'
  } ),

  // Property for the 'Notation' preference
  derivativeNotationProperty: new StringUnionProperty( derivationNotation, {
    validValues: DerivativeNotationValues,
    tandem: Tandem.PREFERENCES.createTandem( 'derivativeNotationProperty' ),
    phetioFeatured: true,
    phetioDocumentation: 'the notation used for functions'
  } ),

  // Property for the 'Discontinuities' preference
  connectDiscontinuitiesProperty: new StringUnionProperty( connectDiscontinuities, {
    validValues: ConnectDiscontinuitiesValues,
    tandem: Tandem.PREFERENCES.createTandem( 'connectDiscontinuitiesProperty' ),
    phetioFeatured: true,
    phetioDocumentation: 'Whether to leave a gap between discontinuities, or connect them with a dashed line'
  } ),

  // Property for the 'Values' preference
  valuesVisibleProperty: new BooleanProperty( CalculusGrapherQueryParameters.valuesVisible, {
    tandem: Tandem.PREFERENCES.createTandem( 'valuesVisibleProperty' ),
    phetioFeatured: true,
    phetioDocumentation: 'Shows numerical values wherever they appear in the simulation'
  } ),

  // Property for the 'Predict' preference.
  // Note that this Preference is named predictPreferenceEnabledProperty to distinguish it from
  // CalculusGraphModel.predictEnabledProperty.
  predictPreferenceEnabledProperty: new BooleanProperty( CalculusGrapherQueryParameters.predict, {
    tandem: Tandem.PREFERENCES.createTandem( 'predictFeatureEnabledProperty' ),
    phetioFeatured: true,
    phetioDocumentation: 'Preference used to show/hide the Predict feature in the user interface'
  } ),

  // This preference does not have a control in the Preferences dialog. It is provided for PhET-iO clients.
  hasShowOriginalCurveCheckboxProperty: new BooleanProperty( CalculusGrapherQueryParameters.hasShowOriginalCurveCheckbox, {
    tandem: Tandem.PREFERENCES.createTandem( 'hasShowOriginalCurveCheckboxProperty' ),
    phetioFeatured: true,
    phetioDocumentation: 'Setting this to false will permanently hide the "Show f(x)" checkbox, which is ' +
                         'displayed on the f(x) graph when the Predict radio button is selected.'
  } )
};

calculusGrapher.register( 'CalculusGrapherPreferences', CalculusGrapherPreferences );
export default CalculusGrapherPreferences;
