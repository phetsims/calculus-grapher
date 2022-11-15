// Copyright 2022, University of Colorado Boulder

/**
 * CalculusGrapherPreferences is the model for sim-specific preferences, accessed via the Preferences dialog.
 * These preferences are global, and affect all screens.
 *
 * @author Martin Veillette
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherQueryParameters from '../CalculusGrapherQueryParameters.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';

const CalculusGrapherPreferences = {

  valuesVisibleProperty: new BooleanProperty( CalculusGrapherQueryParameters.valuesVisible, {
    tandem: Tandem.PREFERENCES.createTandem( 'valuesVisibleProperty' ),
    phetioDocumentation: 'Shows numerical values wherever they appear in the simulation'
  } ),

  connectDiscontinuitiesProperty: new BooleanProperty( CalculusGrapherQueryParameters.connectDiscontinuities, {
    tandem: Tandem.PREFERENCES.createTandem( 'connectDiscontinuitiesProperty' ),
    phetioDocumentation: 'Whether to connect discontinuities with a dashed line (true) or leave a gap (false)'
  } )
};

calculusGrapher.register( 'CalculusGrapherPreferences', CalculusGrapherPreferences );
export default CalculusGrapherPreferences;
