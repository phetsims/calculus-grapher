// Copyright 2022-2024, University of Colorado Boulder

/**
 * CalculusGrapherPreferences is the model for sim-specific preferences, accessed via the Preferences dialog.
 * These preferences are global, and affect all screens.
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherQueryParameters, { ConnectDiscontinuities, ConnectDiscontinuitiesValues, DerivativeNotation, DerivativeNotationValues, FunctionVariable, FunctionVariableValues } from '../CalculusGrapherQueryParameters.js';

export default class CalculusGrapherPreferences {

  private constructor() {
    // Not intended for instantiation.
  }
  
  // Property for the 'Variable' preference
  public static readonly functionVariableProperty = new StringUnionProperty( CalculusGrapherQueryParameters.functionVariable as FunctionVariable, {
    validValues: FunctionVariableValues,
    tandem: Tandem.PREFERENCES.createTandem( 'functionVariableProperty' ),
    phetioFeatured: true,
    phetioDocumentation: 'the variable used in functions'
  } );

  // Property for the 'Notation' preference
  public static readonly derivativeNotationProperty = new StringUnionProperty( CalculusGrapherQueryParameters.derivativeNotation as DerivativeNotation, {
    validValues: DerivativeNotationValues,
    tandem: Tandem.PREFERENCES.createTandem( 'derivativeNotationProperty' ),
    phetioFeatured: true,
    phetioDocumentation: 'the notation used for functions'
  } );

  // Property for the 'Discontinuities' preference
  public static readonly connectDiscontinuitiesProperty = new StringUnionProperty( CalculusGrapherQueryParameters.connectDiscontinuities as ConnectDiscontinuities, {
    validValues: ConnectDiscontinuitiesValues,
    tandem: Tandem.PREFERENCES.createTandem( 'connectDiscontinuitiesProperty' ),
    phetioFeatured: true,
    phetioDocumentation: 'Whether to leave a gap between discontinuities, or connect them with a dashed line'
  } );

  // Property for the 'Values' preference
  public static readonly valuesVisibleProperty = new BooleanProperty( CalculusGrapherQueryParameters.valuesVisible, {
    tandem: Tandem.PREFERENCES.createTandem( 'valuesVisibleProperty' ),
    phetioFeatured: true,
    phetioDocumentation: 'Shows numerical values wherever they appear in the simulation'
  } );

  // Property for the 'Predict' preference. Note that this Preference is named predictFeatureEnabledProperty to
  // distinguish it from CalculusGraphModel.predictEnabledProperty.
  public static readonly predictFeatureEnabledProperty = new BooleanProperty( CalculusGrapherQueryParameters.predict, {
    tandem: Tandem.PREFERENCES.createTandem( 'predictFeatureEnabledProperty' ),
    phetioFeatured: true,
    phetioDocumentation: 'Preference used to show/hide the Predict feature in the user interface'
  } );

  // This preference does not have a control in the Preferences dialog. It is provided for PhET-iO clients.
  public static readonly hasShowOriginalCurveCheckboxProperty = new BooleanProperty( CalculusGrapherQueryParameters.hasShowOriginalCurveCheckbox, {
    tandem: Tandem.PREFERENCES.createTandem( 'hasShowOriginalCurveCheckboxProperty' ),
    phetioFeatured: true,
    phetioDocumentation: 'Setting this to false will permanently hide the "Show f(x)" checkbox, which is ' +
                         'displayed on the f(x) graph when the Predict radio button is selected.'
  } );
}

calculusGrapher.register( 'CalculusGrapherPreferences', CalculusGrapherPreferences );