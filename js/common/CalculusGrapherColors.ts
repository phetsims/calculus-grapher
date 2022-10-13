// Copyright 2020-2022, University of Colorado Boulder

/**
 * Colors for the 'Calculus Grapher' sim.
 *
 * @author Brandon Li
 * @Martin Veillette
 */

import { Color, ProfileColorProperty } from '../../../scenery/js/imports.js';
import calculusGrapher from '../calculusGrapher.js';

const CalculusGrapherColors = {

  // Background color used for all screens
  screenBackgroundColorProperty: new ProfileColorProperty( calculusGrapher, 'screenBackgroundColor', {
    default: 'rgb( 240, 240, 240 )'
  } ),

  // Stroke for Panel-like Containers
  panelStrokeProperty: new ProfileColorProperty( calculusGrapher, 'panelStroke', {
    default: 'rgb( 190, 190, 190 )'
  } ),

  // Fill for Panel-like Containers
  panelFillProperty: new ProfileColorProperty( calculusGrapher, 'panelFill', {
    default: 'rgb( 240, 240, 240 )'
  } ),

  // Fill for the background of Original Graph
  originalChartBackgroundFillProperty: new ProfileColorProperty( calculusGrapher, 'originalChartBackgroundFill', {
    default: 'white'
  } ),

  // Stroke for the background of Original Graph
  originalChartBackgroundStrokeProperty: new ProfileColorProperty( calculusGrapher, 'originalChartBackgroundStroke', {
    default: 'black'
  } ),

  // Fill for the background of all Graphs (besides Original)
  defaultChartBackgroundFillProperty: new ProfileColorProperty( calculusGrapher, 'defaultChartBackgroundFill', {
    default: 'rgb( 240, 240, 240 )'
  } ),

  // Stroke for the background of all Graphs (besides Original)
  defaultChartBackgroundStrokeProperty: new ProfileColorProperty( calculusGrapher, 'defaultChartBackgroundStroke', {
    default: 'black'
  } ),

  // Stroke for the gridlines of graph
  gridlinesStrokeProperty: new ProfileColorProperty( calculusGrapher, 'gridlinesStroke', {
    default: 'lightGray'
  } ),

  // Stroke for the original curve
  originalCurveStrokeProperty: new ProfileColorProperty( calculusGrapher, 'originalCurveStroke', {
    default: Color.BLUE
  } ),

  // Stroke for all curves (besides original)
  defaultCurveStrokeProperty: new ProfileColorProperty( calculusGrapher, 'defaultCurveStroke', {
    default: Color.RED
  } ),

  // fill for up and down arrows on original graph
  arrowFillProperty: new ProfileColorProperty( calculusGrapher, 'arrowFillStroke', {
    default: Color.ORANGE
  } )
};

calculusGrapher.register( 'CalculusGrapherColors', CalculusGrapherColors );
export default CalculusGrapherColors;
