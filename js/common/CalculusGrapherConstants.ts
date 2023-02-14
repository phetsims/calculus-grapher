// Copyright 2020-2023, University of Colorado Boulder

/**
 * Constants used in multiple locations within the 'Calculus Grapher' simulation. All fields are static.
 *
 * @author Brandon Li
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Range from '../../../dot/js/Range.js';
import RangeWithValue from '../../../dot/js/RangeWithValue.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import calculusGrapher from '../calculusGrapher.js';
import { Text } from '../../../scenery/js/imports.js';
import { PathBoundsMethod } from '../../../scenery/js/imports.js';

const CONTROL_FONT = new PhetFont( 16 ); // for text on checkboxes, radio buttons, push buttons, etc.

// CAREFUL: Although there was a deliberate effort to scale other quantities based on
// CURVE_X_RANGE, changing the CURVE_X_RANGE should lead to manual changes
// for the tick labels, tick marks, and lookup table for yZoomLevelProperty (GraphNode.Y_ZOOM_INFO).
const CURVE_X_RANGE = new Range( 0, 10 );

const CURVE_X_LENGTH = CURVE_X_RANGE.getLength();

// See CalculusGrapherConstants.TYPICAL_Y documentation below.
const TYPICAL_Y = 0.1 * CURVE_X_LENGTH;

// typical area of original graph, used to set scale of 'Net Signed Area' barometer
const TYPICAL_AREA = CURVE_X_LENGTH * TYPICAL_Y;

// Because plots are typically clipped to the ChartRectangle, we do not care about their bounds.
// So as a performance optimization, use 'none' for the boundsMethod where we're clipping to ChartRectangle.
// See Path.setBoundsMethod and https://github.com/phetsims/calculus-grapher/issues/210
const PLOT_BOUNDS_METHOD: PathBoundsMethod = 'none';

const CalculusGrapherConstants = {

  // margins
  SCREEN_VIEW_X_MARGIN: 25,
  SCREEN_VIEW_Y_MARGIN: 10,
  PANEL_X_MARGIN: 8,
  PANEL_Y_MARGIN: 5,
  GRAPH_X_MARGIN: 15,
  GRAPH_Y_MARGIN: 10,

  // width of all graphs, regardless of how many we have
  GRAPH_VIEW_WIDTH: 612,

  // height if we have a single graph, in view coordinates
  SINGLE_GRAPH_HEIGHT: 490,

  // range for curve x-axis
  CURVE_X_RANGE: CURVE_X_RANGE,

  // a typical Y value: PARABOLA, and TRIANGLE are CurveManipulation modes that don't have an intrinsic width,
  // but a curvature and a slope. We use TYPICAL_Y as a roundabout way to assign a meaning to the curve width parameter:
  // the function has a width across the baseline, when the peak of the function is at TYPICAL_Y.
  TYPICAL_Y: TYPICAL_Y,

  // range for barometers
  SLOPE_OF_TANGENT_MODEL_RANGE: new Range( -8, 8 ),
  NET_SIGNED_AREA_MODEL_RANGE: new Range( -0.8 * TYPICAL_AREA, 0.8 * TYPICAL_AREA ),

  // width of curve (in the same unit as x-Range) for curve manipulations
  CURVE_MANIPULATION_WIDTH_RANGE: new RangeWithValue(
    0.1 * CURVE_X_LENGTH,
    0.5 * CURVE_X_LENGTH,
    0.20 * CURVE_X_LENGTH ),

  // model height associated with curveManipulationDisplay (in the same unit as x-Range)
  CURVE_MANIPULATION_Y_RANGE: new Range( -0.25, TYPICAL_Y + 0.25 ),

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
  PREFERENCES_LABEL_FONT: new PhetFont( {
    size: 16,
    weight: 'bold'
  } ),

  CHECKBOX_WIDTH: new Text( 'A', { font: CONTROL_FONT } ).height,

  // for Panels and AccordionBoxes
  CORNER_RADIUS: 5,

  // PhET-iO ONLY constants
  NUMBER_OF_VERTICAL_LINES: 6,
  NUMBER_OF_POINT_LABELS: 6,

  PLOT_BOUNDS_METHOD: PLOT_BOUNDS_METHOD
};

calculusGrapher.register( 'CalculusGrapherConstants', CalculusGrapherConstants );
export default CalculusGrapherConstants;
