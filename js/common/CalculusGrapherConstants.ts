// Copyright 2020-2022, University of Colorado Boulder

/**
 * Constants used in multiple locations within the 'Calculus Grapher' simulation. All fields are static.
 *
 * @author Brandon Li
 */

import Range from '../../../dot/js/Range.js';
import RangeWithValue from '../../../dot/js/RangeWithValue.js';
import { ArrowNodeOptions } from '../../../scenery-phet/js/ArrowNode.js';
import calculusGrapher from '../calculusGrapher.js';


const ARROW_NODE_OPTIONS: ArrowNodeOptions = {
  headWidth: 25,
  headHeight: 21,
  tailWidth: 12,
  fractionalHeadHeight: 0.5
};

const CalculusGrapherConstants = {

  GRAPH_VIEW_WIDTH: 700,

  // vertical height of the graph in model coordinates according to the number of graphs show on the screen
  GRAPH_VERTICAL_HEIGHT: [ 14 * 35, 7 * 35, 5 * 35, 3 * 35 ],

  // Ranges
  CURVE_X_RANGE: new Range( 0, 40 ),


  CURVE_MANIPULATION_WIDTH_RANGE: new RangeWithValue( 2, 20, 6 ),

  // zoom level ranges
  ZOOM_LEVEL_RANGE: new RangeWithValue( 1, 10, 5 ),


  // arrow
  ARROW_LENGTH: 50,
  ARROW_NODE_OPTIONS: ARROW_NODE_OPTIONS
};

calculusGrapher.register( 'CalculusGrapherConstants', CalculusGrapherConstants );
export default CalculusGrapherConstants;
