// Copyright 2020-2022, University of Colorado Boulder

/**
 * Colors for the 'Calculus Grapher' sim.
 *
 * @author Brandon Li
 */

import { Color } from '../../../scenery/js/imports.js';
import calculusGrapher from '../calculusGrapher.js';

const CalculusGrapherColors = {

  // General
  SCREEN_BACKGROUND: 'rgb( 240, 240, 240 )',

  // Panel-like Containers
  PANEL_STROKE: 'rgb( 190, 190, 190 )',
  PANEL_FILL: 'rgb( 240, 240, 240 )',

  // Graph
  ORIGINAL_CHART_BACKGROUND: {
    fill: 'white',
    stroke: 'black'
  },

  DEFAULT_CHART_BACKGROUND: {
    fill: 'rgb( 240, 240, 240 )',
    stroke: 'black'
  },

  GRIDLINES_STROKE: 'lightGray',

  // Curves
  ORIGINAL_CURVE_STROKE: Color.BLUE,
  DEFAULT_CURVE_STROKE: Color.RED

};

calculusGrapher.register( 'CalculusGrapherColors', CalculusGrapherColors );
export default CalculusGrapherColors;
