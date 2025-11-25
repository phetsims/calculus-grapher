// Copyright 2020-2025, University of Colorado Boulder

/**
 * Colors for the 'Calculus Grapher' sim.
 *
 * @author Brandon Li
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../axon/js/DerivedProperty.js';
import Color from '../../../scenery/js/util/Color.js';
import ProfileColorProperty from '../../../scenery/js/util/ProfileColorProperty.js';
import Tandem from '../../../tandem/js/Tandem.js';
import calculusGrapher from '../calculusGrapher.js';
import CalculusGrapherQueryParameters from './CalculusGrapherQueryParameters.js';

const tandem = Tandem.COLORS;

const SCREEN_BACKGROUND_COLOR = 'rgb( 243, 252, 254 )';

export default class CalculusGrapherColors {

  private constructor() {
    // Not intended for instantiation.
  }

  // Background color used for all screens
  public static readonly screenBackgroundColorProperty = new ProfileColorProperty( calculusGrapher, 'screenBackgroundColor', {
    default: SCREEN_BACKGROUND_COLOR
  } );

  // Stroke for Panel-like Containers
  public static readonly panelStrokeProperty = new ProfileColorProperty( calculusGrapher, 'panelStroke', {
    default: Color.grayColor( 190 )
  } );

  // Fill for Panel-like Containers
  public static readonly panelFillProperty = new ProfileColorProperty( calculusGrapher, 'panelFill', {
    default: 'white'
  } );

  // Fill for the background of the original Graph
  public static readonly originalChartBackgroundFillProperty = new ProfileColorProperty( calculusGrapher, 'originalChartBackgroundFill', {
    default: 'white'
  } );

  // Stroke for the background of Original Graph
  public static readonly originalChartBackgroundStrokeProperty = new ProfileColorProperty( calculusGrapher, 'originalChartBackgroundStroke', {
    default: 'black'
  } );

  // Fill for the background of all Graphs (besides Original)
  public static readonly defaultChartBackgroundFillProperty = new ProfileColorProperty( calculusGrapher, 'defaultChartBackgroundFill', {
    default: SCREEN_BACKGROUND_COLOR
  } );

  // Stroke for the background of all Graphs (besides Original)
  public static readonly defaultChartBackgroundStrokeProperty = new ProfileColorProperty( calculusGrapher, 'defaultChartBackgroundStroke', {
    default: 'rgba( 0, 0, 0, 0.4 )'
  } );

  // Stroke for the major gridlines of graph
  public static readonly majorGridlinesStrokeProperty = new ProfileColorProperty( calculusGrapher, 'majorGridlinesStroke', {
    default: Color.grayColor( 192 )
  } );

  // Stroke for the minor gridlines of graph
  public static readonly minorGridlinesStrokeProperty = new ProfileColorProperty( calculusGrapher, 'minorGridlinesStroke', {
    default: Color.grayColor( 230 )
  } );

  // Stroke for the original curve
  public static readonly originalCurveStrokeProperty = new ProfileColorProperty( calculusGrapher, 'originalCurveStroke', {
    default: Color.BLUE
  }, {
    tandem: tandem.createTandem( 'originalCurveStrokeProperty' )
  } );

  // Stroke for the predict curve
  public static readonly predictCurveStrokeProperty = new ProfileColorProperty( calculusGrapher, 'predictCurveStroke', {
    default: '#ff00cf'
  }, {
    tandem: tandem.createTandem( 'predictCurveStrokeProperty' )
  } );

  // Stroke for integral curve
  public static readonly integralCurveStrokeProperty = new ProfileColorProperty( calculusGrapher, 'integralCurveStroke', {
    default: '#00853E'
  }, {
    tandem: tandem.createTandem( 'integralCurveStrokeProperty' ),
    phetioDocumentation: 'Color for the integral curve and the "Area Under Curve" scrubber.'
  } );

  // Stroke for derivative curve
  public static readonly derivativeCurveStrokeProperty = new ProfileColorProperty( calculusGrapher, 'derivativeCurveStroke', {
    default: Color.RED
  }, {
    tandem: tandem.createTandem( 'derivativeCurveStrokeProperty' ),
    phetioDocumentation: 'Color for the derivative curve, the "Tangent" scrubber, and the bar in the "Slope of Tangent" accordion box.'
  } );

  // Stroke for the second derivative curve
  public static readonly secondDerivativeCurveStrokeProperty = new ProfileColorProperty( calculusGrapher, 'secondDerivativeCurveStroke', {
    default: 'rgb( 102, 45, 145 )'
  }, {
    tandem: tandem.createTandem( 'secondDerivativeCurveStrokeProperty' )
  } );

  // Fill for integral curve (when area is positive)
  public static readonly integralPositiveFillProperty = new DerivedProperty( [ CalculusGrapherColors.integralCurveStrokeProperty ],
    integralCurveStroke => integralCurveStroke.withAlpha( CalculusGrapherQueryParameters.positiveAlpha ), {
      tandem: tandem.createTandem( 'integralPositiveFillProperty' ),
      phetioValueType: Color.ColorIO,
      phetioDocumentation: 'Color for positive area in the integral graph, and the bar in the "Net Signed Area" accordion box.'
    } );

  // Fill for the integral curve (when area is negative)
  public static readonly integralNegativeFillProperty = new DerivedProperty( [ CalculusGrapherColors.integralCurveStrokeProperty ],
    integralCurveStroke => integralCurveStroke.withAlpha( CalculusGrapherQueryParameters.negativeAlpha ), {
      tandem: tandem.createTandem( 'integralNegativeFillProperty' ),
      phetioValueType: Color.ColorIO,
      phetioDocumentation: 'Color for negative area in the integral graph, and the bar in the "Net Signed Area" accordion box.'
    } );

  // fill for the cueing arrows on the original graph
  public static readonly cueingArrowsFillProperty = new ProfileColorProperty( calculusGrapher, 'cueingArrowsFill', {
    default: Color.ORANGE
  } );

  // the vertical reference line
  public static readonly referenceLineStrokeProperty = new ProfileColorProperty( calculusGrapher, 'referenceLineStroke', {
    default: 'black'
  }, {
    tandem: tandem.createTandem( 'referenceLineStrokeProperty' ),
    phetioDocumentation: 'Color of the vertical reference line',
    phetioValueType: Color.ColorIO
  } );

  // the handle (shaded sphere) for moving the reference line
  public static readonly referenceLineHandleColorProperty = new ProfileColorProperty( calculusGrapher, 'referenceLineHandleColor', {
    default: 'black'
  }, {
    tandem: tandem.createTandem( 'referenceLineHandleColorProperty' ),
    phetioDocumentation: 'Color of the handle for moving the reference line',
    phetioValueType: Color.ColorIO
  } );
}

calculusGrapher.register( 'CalculusGrapherColors', CalculusGrapherColors );