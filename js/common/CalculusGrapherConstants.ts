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

  GRAPH_VIEW_WIDTH: 700,

  // Ranges
  CURVE_X_RANGE: new Range( 0, 40 ),

  // vertical height of the graph in model coordinates according to the number of graphs show on the screen
  INITIAL_MAX_Y: [ 14, 7, 5, 3 ],

  CURVE_MANIPULATION_WIDTH_RANGE: new RangeWithValue( 2, 20, 6 ),

  // zoom level ranges
  ZOOM_LEVEL_RANGE: new RangeWithValue( 1, 10, 5 )

};

calculusGrapher.register( 'CalculusGrapherConstants', CalculusGrapherConstants );
export default CalculusGrapherConstants;
