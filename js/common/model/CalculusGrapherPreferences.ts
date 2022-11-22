// Copyright 2022, University of Colorado Boulder

/**
 * CalculusGrapherPreferences is the model for sim-specific preferences, accessed via the Preferences dialog.
 * These preferences are global, and affect all screens.
 *
 * @author Martin Veillette
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherQueryParameters, { ConnectDiscontinuities, ConnectDiscontinuitiesValues, DerivativeNotation, DerivativeNotationValues, FunctionVariable, FunctionVariableValues } from '../CalculusGrapherQueryParameters.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import StringEnumerationProperty from '../../../../axon/js/StringEnumerationProperty.js';

const connectDiscontinuities: ConnectDiscontinuities = CalculusGrapherQueryParameters.connectDiscontinuities === 'noLine' ? 'noLine' : 'dashedLine';
const derivationNotation: DerivativeNotation = CalculusGrapherQueryParameters.derivativeNotation === 'lagrange' ? 'lagrange' : 'leibniz';
const functionVariable: FunctionVariable = CalculusGrapherQueryParameters.functionVariable === 'x' ? 'x' : 't';

const CalculusGrapherPreferences = {

  valuesVisibleProperty: new BooleanProperty( CalculusGrapherQueryParameters.valuesVisible, {
    tandem: Tandem.PREFERENCES.createTandem( 'valuesVisibleProperty' ),
    phetioDocumentation: 'Shows numerical values wherever they appear in the simulation'
  } ),

  connectDiscontinuitiesProperty: new StringEnumerationProperty( connectDiscontinuities, {
    validValues: ConnectDiscontinuitiesValues,
    tandem: Tandem.PREFERENCES.createTandem( 'connectDiscontinuitiesProperty' ),
    phetioDocumentation: 'Whether to leave a gap between discontinuities, or connect them with a dashed line'
  } ),

  derivativeNotationProperty: new StringEnumerationProperty( derivationNotation, {
    validValues: DerivativeNotationValues,
    tandem: Tandem.PREFERENCES.createTandem( 'derivativeNotationProperty' ),
    phetioDocumentation: 'the notation used for functions'
  } ),

  functionVariableProperty: new StringEnumerationProperty( functionVariable, {
    validValues: FunctionVariableValues,
    tandem: Tandem.PREFERENCES.createTandem( 'functionVariableProperty' ),
    phetioDocumentation: 'the variable used in functions'
  } )
};

calculusGrapher.register( 'CalculusGrapherPreferences', CalculusGrapherPreferences );
export default CalculusGrapherPreferences;
