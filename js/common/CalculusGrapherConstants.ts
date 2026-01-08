// Copyright 2020-2026, University of Colorado Boulder

/**
 * Constants used throughout this simulation.
 *
 * @author Brandon Li
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Range from '../../../dot/js/Range.js';
import RangeWithValue from '../../../dot/js/RangeWithValue.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import { PathBoundsMethod } from '../../../scenery/js/nodes/Path.js';
import Text from '../../../scenery/js/nodes/Text.js';
import { CheckboxOptions } from '../../../sun/js/Checkbox.js';
import calculusGrapher from '../calculusGrapher.js';

// CAREFUL: Although there was a deliberate effort to scale other quantities based on
// CURVE_X_RANGE, changing the CURVE_X_RANGE should lead to manual changes
// for the tick labels, tick marks, and lookup table for yZoomLevelProperty (GraphNode.Y_ZOOM_INFO).
const CURVE_X_RANGE = new Range( 0, 10 );

const CURVE_X_LENGTH = CURVE_X_RANGE.getLength();

// See CalculusGrapherConstants.TYPICAL_Y documentation below.
const TYPICAL_Y = 0.1 * CURVE_X_LENGTH;

// Typical area of original graph, used to set a scale of 'Net Signed Area' barometer
const TYPICAL_AREA = CURVE_X_LENGTH * TYPICAL_Y;

export default class CalculusGrapherConstants {

  private constructor() {
    // Not intended for instantiation.
  }

  // margins
  public static readonly SCREEN_VIEW_X_MARGIN = 25;
  public static readonly SCREEN_VIEW_Y_MARGIN = 10;
  public static readonly PANEL_X_MARGIN = 8;
  public static readonly PANEL_Y_MARGIN = 6;
  public static readonly GRAPH_X_MARGIN = 12;
  public static readonly GRAPH_Y_MARGIN = 10;

  // width of ChartRectangle for all GraphNode instances, in view coordinates
  public static readonly CHART_RECTANGLE_WIDTH = 612;

  // If we had a single GraphNode instance, this would be the height of its ChartRectangle, in view coordinates.
  public static readonly SINGLE_CHART_RECTANGLE_HEIGHT = 490;

  // range for curve x-axis
  public static readonly CURVE_X_RANGE = CURVE_X_RANGE;

  // A typical Y value: PARABOLA, and TRIANGLE are CurveManipulation modes that don't have an intrinsic width,
  // but a curvature and a slope. We use TYPICAL_Y as a roundabout way to assign a meaning to the curve width parameter:
  // the function has a width across the baseline, when the peak of the function is at TYPICAL_Y.
  public static readonly TYPICAL_Y = TYPICAL_Y;

  // range for barometers
  public static readonly SLOPE_OF_TANGENT_MODEL_RANGE = new Range( -8, 8 );
  public static readonly NET_SIGNED_AREA_MODEL_RANGE = new Range( -0.8 * TYPICAL_AREA, 0.8 * TYPICAL_AREA );

  // width of curve (in the same unit as x-Range) for curve manipulations
  public static readonly CURVE_MANIPULATION_WIDTH_RANGE = new RangeWithValue(
    0.1 * CURVE_X_LENGTH,
    0.5 * CURVE_X_LENGTH,
    0.20 * CURVE_X_LENGTH );

  // model height associated with curveManipulationDisplay
  public static readonly CURVE_MANIPULATION_Y_RANGE = new Range( -2, 2 );

  // maximum of undo actions (See https://github.com/phetsims/calculus-grapher/issues/64)
  public static readonly MAX_UNDO = 20;

  // fonts
  public static readonly GRAPH_LABEL_FONT = new PhetFont( 16 ); // wherever graph labels like f(x), f'(x), etc. appear
  public static readonly TICK_LABEL_FONT = new PhetFont( 8 ); // for tick labels on graphs
  public static readonly CONTROL_FONT = new PhetFont( 16 ); // for text on checkboxes, radio buttons, push buttons, etc.
  public static readonly ACCORDION_BOX_FONT = new PhetFont( 16 ); // for accordion box title and non-numerical text
  public static readonly ACCORDION_BOX_VALUE_FONT = new PhetFont( 12 ); // for numerical values in the Accordion box
  public static readonly LABELED_LINE_FONT = new PhetFont( 16 );
  public static readonly POINT_LABEL_FONT = new PhetFont( 16 );
  public static readonly PREFERENCES_LABEL_FONT = new PhetFont( {
    size: 16,
    weight: 'bold'
  } );
  public static readonly PREFERENCES_LABEL_MAX_WIDTH = 200;
  public static readonly PREFERENCES_DESCRIPTION_FONT = new PhetFont( 16 );

  public static readonly PREFERENCES_DESCRIPTION_LINE_WRAP = 325;

  public static readonly CHECKBOX_OPTIONS: CheckboxOptions = {
    boxWidth: new Text( 'A', { font: CalculusGrapherConstants.CONTROL_FONT } ).height,
    touchAreaXDilation: 6,
    touchAreaYDilation: 3,
    mouseAreaXDilation: 6,
    mouseAreaYDilation: 3
  };

  // for Panels and AccordionBoxes
  public static readonly CORNER_RADIUS = 5;

  // PhET-iO ONLY constants
  public static readonly NUMBER_OF_LABELED_LINES = 6;
  public static readonly NUMBER_OF_LABELED_POINTS = 6;

  // Because plots are typically clipped to the ChartRectangle, we do not care about their bounds.
  // So as a performance optimization, use 'none' for the boundsMethod where we're clipping to ChartRectangle.
  // See Path.setBoundsMethod and https://github.com/phetsims/calculus-grapher/issues/210
  public static readonly PLOT_BOUNDS_METHOD: PathBoundsMethod = 'none';

  // radius of scrubber handles
  public static readonly SCRUBBER_RADIUS = 9;

  // decimals places for values in interactive descriptions
  public static readonly X_DESCRIPTION_DECIMALS = 2;
  public static readonly Y_DESCRIPTION_DECIMALS = 2;
  public static readonly SLOPE_DESCRIPTION_DECIMALS = 2;
  public static readonly AREA_DESCRIPTION_DECIMALS = 2;
}

calculusGrapher.register( 'CalculusGrapherConstants', CalculusGrapherConstants );