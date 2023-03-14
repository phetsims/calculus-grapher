// Copyright 2020-2023, University of Colorado Boulder

/**
 * Colors for the 'Calculus Grapher' sim.
 *
 * @author Brandon Li
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Color, ProfileColorProperty } from '../../../scenery/js/imports.js';
import calculusGrapher from '../calculusGrapher.js';
import Tandem from '../../../tandem/js/Tandem.js';
import DerivedProperty from '../../../axon/js/DerivedProperty.js';
import CalculusGrapherQueryParameters from './CalculusGrapherQueryParameters.js';

const tandem = Tandem.GLOBAL_VIEW.createTandem( 'colorProfile' );

const SCREEN_BACKGROUND_COLOR = 'rgb( 243, 252, 254 )';

const integralCurveStrokeProperty = new ProfileColorProperty( calculusGrapher, 'integralCurveStroke', {
  default: '#00853E'
}, {
  tandem: tandem.createTandem( 'integralCurveStrokeProperty' )
} );

const CalculusGrapherColors = {

  // Background color used for all screens
  screenBackgroundColorProperty: new ProfileColorProperty( calculusGrapher, 'screenBackgroundColor', {
    default: SCREEN_BACKGROUND_COLOR
  } ),

  // Stroke for Panel-like Containers
  panelStrokeProperty: new ProfileColorProperty( calculusGrapher, 'panelStroke', {
    default: Color.grayColor( 190 )
  } ),

  // Fill for Panel-like Containers
  panelFillProperty: new ProfileColorProperty( calculusGrapher, 'panelFill', {
    default: 'white'
  } ),

  // Fill for the background of the original Graph
  originalChartBackgroundFillProperty: new ProfileColorProperty( calculusGrapher, 'originalChartBackgroundFill', {
    default: 'white'
  } ),

  // Stroke for the background of Original Graph
  originalChartBackgroundStrokeProperty: new ProfileColorProperty( calculusGrapher, 'originalChartBackgroundStroke', {
    default: 'black'
  } ),

  // Fill for the background of all Graphs (besides Original)
  defaultChartBackgroundFillProperty: new ProfileColorProperty( calculusGrapher, 'defaultChartBackgroundFill', {
    default: SCREEN_BACKGROUND_COLOR
  } ),

  // Stroke for the background of all Graphs (besides Original)
  defaultChartBackgroundStrokeProperty: new ProfileColorProperty( calculusGrapher, 'defaultChartBackgroundStroke', {
    default: 'rgba( 0, 0, 0, 0.4 )'
  } ),

  // Stroke for the major gridlines of graph
  majorGridlinesStrokeProperty: new ProfileColorProperty( calculusGrapher, 'majorGridlinesStroke', {
    default: Color.grayColor( 192 )
  } ),

  // Stroke for the minor gridlines of graph
  minorGridlinesStrokeProperty: new ProfileColorProperty( calculusGrapher, 'minorGridlinesStroke', {
    default: Color.grayColor( 230 )
  } ),

  // Stroke for the original curve
  originalCurveStrokeProperty: new ProfileColorProperty( calculusGrapher, 'originalCurveStroke', {
    default: Color.BLUE
  }, {
    tandem: tandem.createTandem( 'originalCurveStrokeProperty' )
  } ),

  // Stroke for the predict curve
  predictCurveStrokeProperty: new ProfileColorProperty( calculusGrapher, 'predictCurveStroke', {
    default: '#ff00cf'
  }, {
    tandem: tandem.createTandem( 'predictCurveStrokeProperty' )
  } ),

  // Stroke for integral curve
  integralCurveStrokeProperty: integralCurveStrokeProperty,

  // Stroke for derivative curve
  derivativeCurveStrokeProperty: new ProfileColorProperty( calculusGrapher, 'derivativeCurveStroke', {
    default: Color.RED
  }, {
    tandem: tandem.createTandem( 'derivativeCurveStrokeProperty' )
  } ),

  // Stroke for the second derivative curve
  secondDerivativeCurveStrokeProperty: new ProfileColorProperty( calculusGrapher, 'secondDerivativeCurveStroke', {
    default: 'rgb( 102, 45, 145 )'
  }, {
    tandem: tandem.createTandem( 'secondDerivativeCurveStrokeProperty' )
  } ),

  // Fill for integral curve (when area is positive)
  integralPositiveFillProperty: new DerivedProperty( [ integralCurveStrokeProperty ],
    integralCurveStroke => integralCurveStroke.withAlpha( CalculusGrapherQueryParameters.positiveAlpha ), {
      tandem: tandem.createTandem( 'integralPositiveFillProperty' ),
      phetioValueType: Color.ColorIO,
      phetioDocumentation: 'Color for positive area in the "Net Signed Area" accordion box.'
    } ),

  // Fill for the integral curve (when area is negative)
  integralNegativeFillProperty: new DerivedProperty( [ integralCurveStrokeProperty ],
    integralCurveStroke => integralCurveStroke.withAlpha( CalculusGrapherQueryParameters.negativeAlpha ), {
      tandem: tandem.createTandem( 'integralNegativeFillProperty' ),
      phetioValueType: Color.ColorIO,
      phetioDocumentation: 'Color for negative area in the "Net Signed Area" accordion box.'
    } ),

  // fill for the cueing arrows on the original graph
  cueingArrowsFillProperty: new ProfileColorProperty( calculusGrapher, 'cueingArrowsFill', {
    default: Color.ORANGE
  } ),

  // the vertical reference line
  referenceLineStrokeProperty: new ProfileColorProperty( calculusGrapher, 'referenceLineStroke', {
    default: 'black'
  }, {
    tandem: tandem.createTandem( 'referenceLineStrokeProperty' ),
    phetioValueType: Color.ColorIO
  } ),

  // the handle (shaded sphere) for moving the reference line
  referenceLineHandleColorProperty: new ProfileColorProperty( calculusGrapher, 'referenceLineHandleColor', {
    default: 'blue'
  }, {
    tandem: tandem.createTandem( 'referenceLineHandleColorProperty' ),
    phetioValueType: Color.ColorIO
  } )
};

calculusGrapher.register( 'CalculusGrapherColors', CalculusGrapherColors );
export default CalculusGrapherColors;
