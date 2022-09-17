// Copyright 2020-2022, University of Colorado Boulder

/**
 * Constants used in multiple locations within the 'Calculus Grapher' simulation. All fields are static.
 *
 * @author Brandon Li
 */

import Range from '../../../dot/js/Range.js';
import RangeWithValue from '../../../dot/js/RangeWithValue.js';
import calculusGrapher from '../calculusGrapher.js';

const CalculusGrapherConstants = {

  // Ranges
  CURVE_X_RANGE: new Range( 0, 30 ),
  CURVE_MANIPULATION_WIDTH_RANGE: new RangeWithValue( 2, 20, 6 )

};

calculusGrapher.register( 'CalculusGrapherConstants', CalculusGrapherConstants );
export default CalculusGrapherConstants;
