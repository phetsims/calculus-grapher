// Copyright 2020-2023, University of Colorado Boulder

/**
 * Constants used in multiple locations within the 'Calculus Grapher' simulation. All fields are static.
 *
 * @author Brandon Li
 */

import Range from '../../../dot/js/Range.js';
import RangeWithValue from '../../../dot/js/RangeWithValue.js';
import { ArrowNodeOptions } from '../../../scenery-phet/js/ArrowNode.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import calculusGrapher from '../calculusGrapher.js';
import { Text } from '../../../scenery/js/imports.js';

const CONTROL_FONT = new PhetFont( 16 ); // for text on checkboxes, radio buttons, push buttons, etc.
const CUEING_ARROW_NODE_OPTIONS: ArrowNodeOptions = {
  headWidth: 25,
  headHeight: 21,
  tailWidth: 12,
  fractionalHeadHeight: 0.5
};

const CalculusGrapherConstants = {

  GRAPH_VIEW_WIDTH: 612,

  // vertical height of the graph in model coordinates according to the number of graphs show on the screen
  GRAPH_VERTICAL_HEIGHT: [ 490, 245, 172, 123 ],

  // Ranges
  CURVE_X_RANGE: new Range( 0, 50 ),

  CURVE_MANIPULATION_WIDTH_RANGE: new RangeWithValue( 2, 20, 6 ),

  // zoom level ranges
  ZOOM_LEVEL_RANGE: new RangeWithValue( 1, 10, 5 ),

  // arrow
  ARROW_LENGTH: 50,
  CUEING_ARROW_NODE_OPTIONS: CUEING_ARROW_NODE_OPTIONS,

  // maximum of undo actions (See https://github.com/phetsims/calculus-grapher/issues/64)
  MAX_UNDO: 20,

  // fonts
  GRAPH_LABEL_FONT: new PhetFont( 16 ), // wherever graph labels like f(x), f'(x), etc. appear
  CONTROL_FONT: CONTROL_FONT, // for text on checkboxes, radio buttons, push buttons, etc.
  ACCORDION_BOX_TITLE_FONT: new PhetFont( 14 ), // for accordion box titles
  POINT_LABEL_FONT: new PhetFont( 10 ), // for point label

  CHECKBOX_WIDTH: new Text( 'A', { font: CONTROL_FONT } ).height,

  // PhET-io ONLY constants
  MAX_VERTICAL_LINES: 6,
  MAX_LABEL_POINTS: 6
};

calculusGrapher.register( 'CalculusGrapherConstants', CalculusGrapherConstants );
export default CalculusGrapherConstants;
