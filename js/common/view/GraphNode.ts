// Copyright 2020-2023, University of Colorado Boulder

/**
 * GraphNode is the view representation of a Graph, which includes a curve, a chart (grid and axes) and zoom buttons.
 * The origin (0,0) is the upper-left corner of the ChartRectangle, this.chartRectangle.leftTop.
 *
 * Primary responsibilities are:
 * - Create an associated CurveNode
 * - Create an optional zoomButtonGroup with an associated property
 * - Create an eye toggle button that controls the visibility of curve
 * - Create AxisLines, GridLines and Rectangle Chart
 * - Create a Chart Transform
 * - Updating the model y Range of the graph based on the zoom level
 * - Toggling the visibility of the gridlines
 * - Set the height of the graph
 *
 * @author Martin Veillette
 * @author Brandon Li
 * @author Chris Malley (PixelZoom, Inc.)
 */

import AxisArrowNode, { AxisArrowNodeOptions } from '../../../../bamboo/js/AxisArrowNode.js';
import ChartRectangle, { ChartRectangleOptions } from '../../../../bamboo/js/ChartRectangle.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import GridLineSet from '../../../../bamboo/js/GridLineSet.js';
import TickLabelSet from '../../../../bamboo/js/TickLabelSet.js';
import TickMarkSet from '../../../../bamboo/js/TickMarkSet.js';
import Range from '../../../../dot/js/Range.js';
import Orientation from '../../../../phet-core/js/Orientation.js';
import { Node, NodeOptions, TColor, Text } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherConstants from '../../common/CalculusGrapherConstants.js';
import CurveNode from './CurveNode.js';
import Curve from '../model/Curve.js';
import optionize from '../../../../phet-core/js/optionize.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import PlusMinusZoomButtonGroup from '../../../../scenery-phet/js/PlusMinusZoomButtonGroup.js';
import EyeToggleButton from '../../../../scenery-phet/js/buttons/EyeToggleButton.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Utils from '../../../../dot/js/Utils.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';
import CalculusGrapherPreferences from '../model/CalculusGrapherPreferences.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import PlottedPoint from './PlottedPoint.js';
import GraphType from '../model/GraphType.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import GraphTypeLabelNode from './GraphTypeLabelNode.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import CurvePoint from '../model/CurvePoint.js';

const MAJOR_GRID_LINE_SPACING = 1;
const MINOR_GRID_LINE_SPACING = 0.25;
const MAJOR_GRID_LINE_OPTIONS = {
  stroke: CalculusGrapherColors.majorGridlinesStrokeProperty
};
const MINOR_GRID_LINE_OPTIONS = {
  stroke: CalculusGrapherColors.minorGridlinesStrokeProperty,
  lineWidth: 0.5
};
const BUTTON_SPACING = 14; // space between buttons and tick labels or chartRectangle

// Lookup table for zoomLevelProperty
type ZoomInfo = {
  max: number; // axis range will be [-max,max], in model coordinates
  tickSpacing: number; // tick spacing in model coordinates
};
const Y_ZOOM_INFO: ZoomInfo[] = [
  { max: 20, tickSpacing: 10 },
  { max: 10, tickSpacing: 5 },
  { max: 4, tickSpacing: 2 },
  { max: 2, tickSpacing: 1 },
  { max: 1, tickSpacing: 0.5 },
  { max: 0.5, tickSpacing: 0.25 }
];
assert && assert( _.every( Y_ZOOM_INFO, zoomInfo => zoomInfo.tickSpacing <= zoomInfo.max ),
  'tickSpacing must be <= max' );
assert && assert( _.every( Y_ZOOM_INFO, ( zoomInfo, index, Y_ZOOM_INFO ) =>
  ( index === 0 || Y_ZOOM_INFO[ index - 1 ].max > zoomInfo.max ) ), 'must be sorted by descending max' );

const DEFAULT_ZOOM_LEVEL = 3; // default value for yZoomLevelProperty
const DEFAULT_MAX_Y = Y_ZOOM_INFO[ DEFAULT_ZOOM_LEVEL ].max; // default y-range (symmetrical) of the ChartTransform

type SelfOptions = {

  // height of the ChartRectangle, in view coordinates
  chartRectangleHeight: number;

  // options to the bamboo ChartRectangle
  chartRectangleOptions?: PickOptional<ChartRectangleOptions, 'fill' | 'stroke'>;

  // Whether to create a CurveNode for the provided Curve.
  createCurveNode?: boolean;

  // label that appears in the upper-left corner of the graph
  labelNode?: Node;
};

export type GraphNodeOptions = SelfOptions &
  PickOptional<NodeOptions, 'inputEnabledProperty'> &
  PickRequired<NodeOptions, 'tandem'>;

export default class GraphNode extends Node {

  // The type of graph that this GraphNode renders
  public readonly graphType: GraphType;

  // bamboo model-view transform
  public readonly chartTransform: ChartTransform;

  // Outer rectangle of the chart
  protected readonly chartRectangle: ChartRectangle;

  // The model curve to be plotted
  protected readonly curve: Curve;

  // Optional Node that plots the provided Curve, see SelfOptions.createCurveNode
  private readonly curveNode?: CurveNode;

  // Layer that contains the plots for any curves, optional tangent line and point (for Derivative screen),
  // and optional area-under-curve plot and point (for Integral screen).
  protected readonly curveLayer: Node;

  // Visibility of curveLayer
  protected readonly curveLayerVisibleProperty: BooleanProperty;

  // Optional Property for zooming the y-axis
  private readonly yZoomLevelProperty?: NumberProperty;

  private readonly eyeToggleButton: Node;

  public constructor( graphType: GraphType,
                      curve: Curve,
                      gridVisibleProperty: TReadOnlyProperty<boolean>,
                      providedOptions: GraphNodeOptions ) {

    const options = optionize<GraphNodeOptions, StrictOmit<SelfOptions, 'labelNode'>, NodeOptions>()( {

      // SelfOptions
      createCurveNode: true,
      chartRectangleOptions: {
        fill: CalculusGrapherColors.defaultChartBackgroundFillProperty,
        stroke: CalculusGrapherColors.defaultChartBackgroundStrokeProperty
      },

      // NodeOptions
      phetioVisiblePropertyInstrumented: false
    }, providedOptions );

    // If labelNode was not provided, create the default.
    const labelNode = options.labelNode || new GraphTypeLabelNode( graphType, {
      pickable: false,
      tandem: options.tandem.createTandem( 'labelNode' )
    } );

    super( options );

    this.graphType = graphType;
    this.curve = curve;

    // The original graph does not have the zoom feature for the y-axis. If you'd like to add the zoom feature
    // to the original graph in the future, remove the if-statement that surrounds this block.
    if ( graphType !== GraphType.ORIGINAL ) {
      this.yZoomLevelProperty = new NumberProperty( DEFAULT_ZOOM_LEVEL, {
        range: new Range( 0, Y_ZOOM_INFO.length - 1 ),
        tandem: options.tandem.createTandem( 'yZoomLevelProperty' )
      } );
    }

    // chart transform for the graph
    this.chartTransform = new ChartTransform( {
      viewWidth: CalculusGrapherConstants.CHART_RECTANGLE_WIDTH,
      viewHeight: options.chartRectangleHeight,
      modelXRange: CalculusGrapherConstants.CURVE_X_RANGE,
      modelYRange: new Range( -DEFAULT_MAX_Y, DEFAULT_MAX_Y )
    } );

    this.chartRectangle = new ChartRectangle( this.chartTransform, options.chartRectangleOptions );

    // Create CurveNode for the provided Curve.
    if ( options.createCurveNode ) {
      this.curveNode = new CurveNode( curve, this.chartTransform, {
        stroke: graphType.strokeProperty,
        discontinuousPointsFill: options.chartRectangleOptions.fill!,
        plotBoundsMethod: CalculusGrapherConstants.PLOT_BOUNDS_METHOD, // see https://github.com/phetsims/calculus-grapher/issues/210
        plotBounds: this.getChartRectangleBounds(), // see https://github.com/phetsims/calculus-grapher/issues/259
        tandem: providedOptions.tandem.createTandem( 'curveNode' )
      } );
    }

    this.curveLayerVisibleProperty = new BooleanProperty( true, {
      tandem: options.tandem.createTandem( 'curveLayerVisibleProperty' ),
      phetioFeatured: true,
      phetioDocumentation: 'Controls whether the graph\'s curve layer is visible. The curve layer contains the plots ' +
                           'for any curves, optional tangent line and point, and optional area-under-curve plot and point. ' +
                           'The value of this Property can be toggled by pressing eyeToggleButton.'
    } );

    const curveLayerChildren = [];
    this.curveNode && curveLayerChildren.push( this.curveNode );
    this.curveLayer = new Node( {
      children: curveLayerChildren,
      clipArea: this.chartRectangle.getShape(),
      visibleProperty: this.curveLayerVisibleProperty,
      pickable: false // optimization, https://github.com/phetsims/calculus-grapher/issues/210
    } );

    // Major and minor grid lines, minor behind major.
    const xMajorGridLines = new GridLineSet( this.chartTransform, Orientation.HORIZONTAL, MAJOR_GRID_LINE_SPACING, MAJOR_GRID_LINE_OPTIONS );
    const yMajorGridLines = new GridLineSet( this.chartTransform, Orientation.VERTICAL, MAJOR_GRID_LINE_SPACING, MAJOR_GRID_LINE_OPTIONS );
    const xMinorGridLines = new GridLineSet( this.chartTransform, Orientation.HORIZONTAL, MINOR_GRID_LINE_SPACING, MINOR_GRID_LINE_OPTIONS );
    const yMinorGridLines = new GridLineSet( this.chartTransform, Orientation.VERTICAL, MINOR_GRID_LINE_SPACING, MINOR_GRID_LINE_OPTIONS );
    const gridNode = new Node( {
      children: [ xMinorGridLines, yMinorGridLines, xMajorGridLines, yMajorGridLines ],
      visibleProperty: gridVisibleProperty,
      pickable: false // optimization, https://github.com/phetsims/calculus-grapher/issues/210
    } );

    // Axes with arrow heads pointing in the positive direction only.
    // See https://github.com/phetsims/calculus-grapher/issues/253
    const axisArrowNodeOptions: AxisArrowNodeOptions = {
      doubleHead: false,
      extension: 0,
      stroke: null
    };
    const xAxis = new AxisArrowNode( this.chartTransform, Orientation.HORIZONTAL, axisArrowNodeOptions );
    const yAxis = new AxisArrowNode( this.chartTransform, Orientation.VERTICAL, axisArrowNodeOptions );
    const axesParent = new Node( {
      children: [ xAxis, yAxis ],
      pickable: false // optimization, https://github.com/phetsims/calculus-grapher/issues/210
    } );

    // x-axis tick marks and labels
    const xSkipCoordinates = [ 0 ];
    const xTickMarkSet = new TickMarkSet( this.chartTransform, Orientation.HORIZONTAL, MAJOR_GRID_LINE_SPACING, {
      skipCoordinates: xSkipCoordinates
    } );
    const xTickLabelSet = new TickLabelSet( this.chartTransform, Orientation.HORIZONTAL, MAJOR_GRID_LINE_SPACING, {
      skipCoordinates: xSkipCoordinates,
      createLabel: ( value: number ) => new Text( Utils.toFixed( value, 0 ), {
        font: CalculusGrapherConstants.TICK_LABEL_FONT
        // No PhET-iO instrumentation is desired.
      } )
    } );

    // y-axis tick marks and labels
    const yTickMarkSet = new TickMarkSet( this.chartTransform, Orientation.VERTICAL, MAJOR_GRID_LINE_SPACING );
    let yTickLabelSet = createYTickLabelSet( MAJOR_GRID_LINE_SPACING, this.chartTransform );

    const ticksParent = new Node( {
      children: [ xTickLabelSet, xTickMarkSet, yTickMarkSet, yTickLabelSet ],
      visibleProperty: CalculusGrapherPreferences.valuesVisibleProperty,
      pickable: false // optimization, see https://github.com/phetsims/calculus-grapher/issues/210
    } );

    // Create toggle button that controls the visibility of this.curveLayer.
    this.eyeToggleButton = new EyeToggleButton( this.curveLayerVisibleProperty, {
      scale: 0.5,
      baseColor: new DerivedProperty( [ this.curveLayerVisibleProperty ],
        visible => visible ? 'white' : PhetColorScheme.BUTTON_YELLOW ),
      touchAreaXDilation: 8,
      touchAreaYDilation: 8,
      tandem: options.tandem.createTandem( 'eyeToggleButton' )
    } );

    // Create yZoomButtonGroup if we have a yZoomLevelProperty.
    const yZoomButtonGroup = this.yZoomLevelProperty ? new PlusMinusZoomButtonGroup( this.yZoomLevelProperty, {
      orientation: 'vertical',
      buttonOptions: {
        stroke: 'black'
      },
      touchAreaXDilation: 6,
      touchAreaYDilation: 3,
      tandem: options.tandem.createTandem( 'yZoomButtonGroup' ),
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    } ) : null;

    // labelNode in left-top corner of chartRectangle
    labelNode.boundsProperty.link( () => {
      labelNode.leftTop = this.chartRectangle.leftTop.addXY( CalculusGrapherConstants.GRAPH_X_MARGIN, CalculusGrapherConstants.GRAPH_Y_MARGIN );
    } );

    // Adjust button positions when the visibility of ticks changes.
    ticksParent.visibleProperty.link( ticksParentVisible => {
      const rightNode = ticksParentVisible ? ticksParent : this.chartRectangle;

      // EyeToggleButton at bottom-left of chart rectangle
      this.eyeToggleButton.right = rightNode.left - BUTTON_SPACING;
      this.eyeToggleButton.bottom = this.chartRectangle.bottom;

      // yZoomButtonGroup at left-center of chart rectangle
      if ( yZoomButtonGroup ) {
        yZoomButtonGroup.right = rightNode.left - BUTTON_SPACING;
        yZoomButtonGroup.centerY = this.chartRectangle.centerY;
      }
    } );

    const children = [
      this.chartRectangle,
      gridNode,
      axesParent,
      ticksParent,
      labelNode,
      this.curveLayer,
      this.eyeToggleButton
    ];
    yZoomButtonGroup && children.push( yZoomButtonGroup );
    this.children = children;

    // If we have a yZoomLevelProperty, respond to changes.
    this.yZoomLevelProperty && this.yZoomLevelProperty.link( zoomLevel => {

      // Remove previous yTickLabelSet and dispose of it
      ticksParent.removeChild( yTickLabelSet );
      yTickLabelSet.dispose();

      // Look up the new y-axis range and tick spacing.
      const maxY = Y_ZOOM_INFO[ zoomLevel ].max;
      const tickSpacing = Y_ZOOM_INFO[ zoomLevel ].tickSpacing;

      // Adjust the chartTransform
      this.chartTransform.setModelYRange( new Range( -maxY, maxY ) );

      // Change the vertical spacing of the tick marks and labels.
      yTickMarkSet.setSpacing( tickSpacing );
      yTickLabelSet = createYTickLabelSet( tickSpacing, this.chartTransform );
      ticksParent.addChild( yTickLabelSet );

      // Hide the y-axis minor grid lines if they get too close together.
      yMinorGridLines.visible = ( Math.abs( this.chartTransform.modelToViewDeltaY( MINOR_GRID_LINE_SPACING ) ) > 5 );
    } );
  }

  /**
   * Resets all
   */
  public reset(): void {
    this.yZoomLevelProperty && this.yZoomLevelProperty.reset();
    this.curveLayerVisibleProperty.reset();
    this.curveNode && this.curveNode.reset();
  }

  /**
   * Adds a PlottedPoint to this GraphNode.
   */
  public addPlottedPoint( curvePointProperty: TReadOnlyProperty<CurvePoint>,
                          fill: TColor, visibleProperty: TReadOnlyProperty<boolean>,
                          tandemName: string ): PlottedPoint {
    const plottedPoint = new PlottedPoint( curvePointProperty, this.chartTransform, {
      visibleProperty: visibleProperty,
      fill: fill,
      tandem: this.tandem.createTandem( tandemName )
    } );
    this.curveLayer.addChild( plottedPoint );
    return plottedPoint;
  }

  /**
   * Gets the offset of the EyeToggleButton from the left edge of the ChartRectangle. This is used for dynamic layout.
   */
  public getEyeToggleButtonXOffset(): number {
    return this.eyeToggleButton.x - this.x;
  }

  protected getChartRectangleBounds(): Bounds2 {
    return this.chartRectangle.getShape().bounds;
  }
}

/**
 * Creates a TickLabelSet for the y-axis.
 */
function createYTickLabelSet( spacing: number, chartTransform: ChartTransform ): TickLabelSet {

  // No more than three decimal places
  const decimalPlaces = Math.min( 3, Utils.numberOfDecimalPlaces( spacing ) );

  return new TickLabelSet( chartTransform, Orientation.VERTICAL, spacing, {

    // Display zero without decimal places.
    createLabel: ( value: number ) => {
      const valueString = ( value === 0 ) ? '0' : Utils.toFixed( value, decimalPlaces );
      return new Text( valueString, {
        font: CalculusGrapherConstants.TICK_LABEL_FONT
        // No PhET-iO instrumentation is desired.
      } );
    },

    // Position the label to left of its associated tick mark, with a bit of space.
    positionLabel: ( label: Node, tickBounds: Bounds2 ) => {
      label.rightCenter = tickBounds.leftCenter.minusXY( 1, 0 );
      return label;
    }
  } );
}

calculusGrapher.register( 'GraphNode', GraphNode );
