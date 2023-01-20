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

// CAREFUL: Although there was a deliberate effort to scale other quantities based on
// CURVE_X_RANGE, changing the CURVE_X_RANGE should lead to changes for the tick labels and tick marks spacing as well
const CURVE_X_RANGE = new Range( 0, 50 );

const CURVE_X_LENGTH = CURVE_X_RANGE.getLength();

// See CalculusGrapherConstants.TYPICAL_Y documentation below.
const TYPICAL_Y = 0.1 * CURVE_X_LENGTH;

// typical area of original graph, used to set scale of 'Net Signed Area' barometer
const TYPICAL_AREA = CURVE_X_LENGTH * TYPICAL_Y;

const CalculusGrapherConstants = {

  GRAPH_VIEW_WIDTH: 612,

  // vertical height of the graph in view coordinates according to the number of graphs show on the screen
  GRAPH_VERTICAL_HEIGHT: [ 490, 245, 172, 123 ],

  // range for curve x-axis
  CURVE_X_RANGE: CURVE_X_RANGE,

  // a typical Y value: PARABOLA, and TRIANGLE are CurveManipulation modes that don't have an intrinsic width,
  // but a curvature and a slope. We use TYPICAL_Y as a roundabout way to assign a meaning to the curve width parameter:
  // the function has a width across the baseline, when the peak of the function is at TYPICAL_Y.
  TYPICAL_Y: TYPICAL_Y,

  // range for barometers
  SLOPE_OF_TANGENT_MODEL_RANGE: new Range( -10, 10 ),
  NET_SIGNED_AREA_MODEL_RANGE: new Range( -0.8 * TYPICAL_AREA, 0.8 * TYPICAL_AREA ),

  // spacing for gridlines and ticks for graphs (in model units)
  NOMINAL_GRID_LINE_SPACING: 1,
  NOMINAL_VERTICAL_TICK_MARK_SPACING: 0.5,
  NOMINAL_VERTICAL_TICK_LABEL_SPACING: 1,
  NOMINAL_HORIZONTAL_TICK_MARK_SPACING: 0.5,
  NOMINAL_HORIZONTAL_TICK_LABEL_SPACING: 1,

  // width of curve (in the same unit as x-Range) for curve manipulations
  CURVE_MANIPULATION_WIDTH_RANGE: new RangeWithValue(
    0.05 * CURVE_X_LENGTH,
    0.5 * CURVE_X_LENGTH,
    0.20 * CURVE_X_LENGTH ),

  // model height associated with curveManipulationDisplay (in the same unit as x-Range)
  CURVE_MANIPULATION_Y_RANGE: new Range( -0.25, TYPICAL_Y + 0.25 ),

  // zoom level ranges
  ZOOM_LEVEL_RANGE: new RangeWithValue( 1, 10, 5 ),

  // arrow
  ARROW_LENGTH: 50,
  CUEING_ARROW_NODE_OPTIONS: CUEING_ARROW_NODE_OPTIONS,

  // maximum of undo actions (See https://github.com/phetsims/calculus-grapher/issues/64)
  MAX_UNDO: 20,

  // fonts
  GRAPH_LABEL_FONT: new PhetFont( 16 ), // wherever graph labels like f(x), f'(x), etc. appear
  TICK_LABEL_FONT: new PhetFont( 8 ), // for tick labels on graphs
  CONTROL_FONT: CONTROL_FONT, // for text on checkboxes, radio buttons, push buttons, etc.
  ACCORDION_BOX_FONT: new PhetFont( 16 ), // for accordion box title and non-numerical text
  ACCORDION_BOX_VALUE_FONT: new PhetFont( 12 ), // for numerical values in Accordion box
  VERTICAL_LINE_FONT: new PhetFont( 16 ),
  POINT_LABEL_FONT: new PhetFont( 16 ),

  CHECKBOX_WIDTH: new Text( 'A', { font: CONTROL_FONT } ).height,

  // for Panels and AccordionBoxes
  CORNER_RADIUS: 5,

  // PhET-iO ONLY constants
  NUMBER_OF_VERTICAL_LINES: 6,
  NUMBER_OF_POINT_LABELS: 6
};

calculusGrapher.register( 'CalculusGrapherConstants', CalculusGrapherConstants );
export default CalculusGrapherConstants;
