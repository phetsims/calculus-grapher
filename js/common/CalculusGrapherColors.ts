// Copyright 2020-2023, University of Colorado Boulder

/**
 * Colors for the 'Calculus Grapher' sim.
 *
 * @author Brandon Li
 * @author Martin Veillette
 */

import { Color, ProfileColorProperty } from '../../../scenery/js/imports.js';
import calculusGrapher from '../calculusGrapher.js';
import Tandem from '../../../tandem/js/Tandem.js';

const tandem = Tandem.GLOBAL_VIEW.createTandem( 'colorProfile' );

const CalculusGrapherColors = {

  // Background color used for all screens
  screenBackgroundColorProperty: new ProfileColorProperty( calculusGrapher, 'screenBackgroundColor', {
    default: 'rgb( 243, 252, 254 )'
  } ),

  // Stroke for Panel-like Containers
  panelStrokeProperty: new ProfileColorProperty( calculusGrapher, 'panelStroke', {
    default: 'rgb( 190, 190, 190 )'
  } ),

  // Fill for Panel-like Containers
  panelFillProperty: new ProfileColorProperty( calculusGrapher, 'panelFill', {
    default: 'white'
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
    default: 'rgb( 228, 245, 250 )'
  } ),

  // Stroke for the background of all Graphs (besides Original)
  defaultChartBackgroundStrokeProperty: new ProfileColorProperty( calculusGrapher, 'defaultChartBackgroundStroke', {
    default: 'black'
  } ),

  // Stroke for the gridlines of graph
  gridlinesStrokeProperty: new ProfileColorProperty( calculusGrapher, 'gridlinesStroke', {
    default: 'lightgray'
  } ),

  // Stroke for the original curve
  originalCurveStrokeProperty: new ProfileColorProperty( calculusGrapher, 'originalCurveStroke', {
      default: Color.BLUE
    },
    {
      tandem: tandem.createTandem( 'originalCurveStrokeProperty' )
    } ),

  // Stroke for the original curve
  predictCurveStrokeProperty: new ProfileColorProperty( calculusGrapher, 'predictCurveStroke', {
      default: 'rgb(128, 128, 128)'
    },
    {
      tandem: tandem.createTandem( 'predictCurveStrokeProperty' )
    } ),

  // Stroke for integral curve
  integralCurveStrokeProperty: new ProfileColorProperty( calculusGrapher, 'integralCurveStroke', {
    default: 'rgb(0,146,69)'
  }, {
    tandem: tandem.createTandem( 'integralCurveStrokeProperty' )
  } ),

  // Stroke for derivative curve
  derivativeCurveStrokeProperty: new ProfileColorProperty( calculusGrapher, 'derivativeCurveStroke', {
      default: Color.RED
    },
    {
      tandem: tandem.createTandem( 'derivativeCurveStrokeProperty' )
    } ),

  // Stroke for second derivative curve
  secondDerivativeCurveStrokeProperty: new ProfileColorProperty( calculusGrapher, 'secondDerivativeCurveStroke', {
      default: 'rgb(102,45,145)'
    },
    {
      tandem: tandem.createTandem( 'secondDerivativeCurveStrokeProperty' )
    } ),

  // Fill for integral curve (when area is positive)
  integralPositiveFillProperty: new ProfileColorProperty( calculusGrapher, 'integralPositiveFill', {
    default: 'rgb(0,206,109)'
  }, {
    tandem: tandem.createTandem( 'integralPositiveFillProperty' )
  } ),

  // Fill for integral curve (when area is negative)
  integralNegativeFillProperty: new ProfileColorProperty( calculusGrapher, 'integralNegativeFill', {
    default: 'rgb(0,176,89)'
  }, {
    tandem: tandem.createTandem( 'integralNegativeFillProperty' )
  } ),

  // fill for up and down arrows on original graph
  arrowFillProperty: new ProfileColorProperty( calculusGrapher, 'arrowFillStroke', {
    default: Color.ORANGE
  } ),

  // the vertical reference line
  referenceLineStrokeProperty: new ProfileColorProperty( calculusGrapher, 'referenceLineStroke', {
    default: 'black'
  } ),

  // the handle (shaded sphere) for moving the reference line
  referenceLineHandleColorProperty: new ProfileColorProperty( calculusGrapher, 'referenceLineHandleColor', {
    default: 'blue'
  } )
};

calculusGrapher.register( 'CalculusGrapherColors', CalculusGrapherColors );
export default CalculusGrapherColors;
