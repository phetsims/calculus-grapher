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

  numericalLabelsEnabledProperty: new BooleanProperty( CalculusGrapherQueryParameters.numericalLabels, {
    tandem: Tandem.PREFERENCES.createTandem( 'numericalLabelsEnabledProperty' ),
    phetioDocumentation: 'shows numerical labels on graphs'
  } ),

  connectDiscontinuitiesProperty: new BooleanProperty( CalculusGrapherQueryParameters.connectDiscontinuities, {
    tandem: Tandem.PREFERENCES.createTandem( 'connectDiscontinuitiesProperty' ),
    phetioDocumentation: 'Whether to connect discontinuities with a dashed line (true) or leave a gap (false)'
  } )
};

calculusGrapher.register( 'CalculusGrapherPreferences', CalculusGrapherPreferences );
export default CalculusGrapherPreferences;
