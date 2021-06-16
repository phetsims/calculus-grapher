[object Promise]

/**
 * Colors for the 'Calculus Grapher' sim.
 *
 * @author Brandon Li
 */

import Color from '../../../scenery/js/util/Color.js';
import calculusGrapher from '../calculusGrapher.js';

const CalculusGrapherColors = {

  // General
  SCREEN_BACKGROUND: 'rgb( 240, 240, 240 )',

  // Panel-like Containers
  PANEL_STROKE: 'rgb( 190, 190, 190 )',
  PANEL_FILL: 'rgb( 240, 240, 240 )',

  // Curves
  ORIGINAL_CURVE_COLOR: Color.BLUE
};

calculusGrapher.register( 'CalculusGrapherColors', CalculusGrapherColors );
export default CalculusGrapherColors;