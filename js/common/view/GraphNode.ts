// Copyright 2020-2026, University of Colorado Boulder

/**
 * GraphNode is the base class view for a Graph, which includes a curve, a chart (grid and axes) and zoom buttons.
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

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import AxisArrowNode, { AxisArrowNodeOptions } from '../../../../bamboo/js/AxisArrowNode.js';
import ChartRectangle, { ChartRectangleOptions } from '../../../../bamboo/js/ChartRectangle.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import GridLineSet from '../../../../bamboo/js/GridLineSet.js';
import TickLabelSet from '../../../../bamboo/js/TickLabelSet.js';
import TickMarkSet from '../../../../bamboo/js/TickMarkSet.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Range from '../../../../dot/js/Range.js';
import { numberOfDecimalPlaces } from '../../../../dot/js/util/numberOfDecimalPlaces.js';
import { toFixed } from '../../../../dot/js/util/toFixed.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import Orientation from '../../../../phet-core/js/Orientation.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import TColor from '../../../../scenery/js/util/TColor.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherConstants from '../../common/CalculusGrapherConstants.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import CalculusGrapherSymbols from '../CalculusGrapherSymbols.js';
import CalculusGrapherPreferences from '../model/CalculusGrapherPreferences.js';
import Curve from '../model/Curve.js';
import CurvePoint from '../model/CurvePoint.js';
import GraphType from '../model/GraphType.js';
import CurveNode from './CurveNode.js';
import CurveVisibilityToggleButton, { CurveVisibilityToggleButtonOptions } from './CurveVisibilityToggleButton.js';
import GraphTypeLabelNode from './GraphTypeLabelNode.js';
import PlottedPoint from './PlottedPoint.js';
import YZoomButtonGroup, { YZoomButtonGroupOptions } from './YZoomButtonGroup.js';

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
affirm( _.every( Y_ZOOM_INFO, zoomInfo => zoomInfo.tickSpacing <= zoomInfo.max ), 'tickSpacing must be <= max' );
affirm( _.every( Y_ZOOM_INFO, ( zoomInfo, index, Y_ZOOM_INFO ) =>
  ( index === 0 || Y_ZOOM_INFO[ index - 1 ].max > zoomInfo.max ) ), 'must be sorted by descending max' );

const DEFAULT_ZOOM_LEVEL = 3; // default value for yZoomLevelProperty
const DEFAULT_MAX_Y = Y_ZOOM_INFO[ DEFAULT_ZOOM_LEVEL ].max; // default y-range (symmetrical) of the ChartTransform

type SelfOptions = {

  // height of the ChartRectangle, in view coordinates
  chartRectangleHeight: number;

  // options to the bamboo ChartRectangle
  chartRectangleOptions?: PickOptional<ChartRectangleOptions, 'fill' | 'stroke' | 'cursor'>;

  // Whether to create a CurveNode for the provided Curve.
  createCurveNode?: boolean;

  // Label that appears in the upper-left corner of the graph. Doubles as the graph name and the label for the vertical axis.
  labelNode?: Node;

  // Propagated to curveVisibilityToggleButton.
  curveVisibilityToggleButtonOptions?: StrictOmit<CurveVisibilityToggleButtonOptions, 'tandem'>;

  // Propagated to yZoomButtonGroup.
  yZoomButtonGroupOptions?: PickRequired<YZoomButtonGroupOptions, 'zoomInButtonOptions' | 'zoomOutButtonOptions'>;
};

export type GraphNodeOptions = SelfOptions &
  PickOptional<NodeOptions, 'inputEnabledProperty'> &
  PickRequired<NodeOptions, 'tandem' | 'accessibleHeading'>;

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
  private readonly _curveLayerVisibleProperty: BooleanProperty;
  public readonly curveLayerVisibleProperty: TReadOnlyProperty<boolean>;

  // Optional Property for zooming the y-axis
  private readonly yZoomLevelProperty?: NumberProperty;

  // For setting pdomOrder in subclasses.
  protected readonly yZoomButtonGroup?: Node;
  protected readonly curveVisibilityToggleButton: Node;

  protected constructor( graphType: GraphType,
                         curve: Curve,
                         gridVisibleProperty: TReadOnlyProperty<boolean>,
                         providedOptions: GraphNodeOptions ) {

    const options = optionize<GraphNodeOptions, StrictOmit<SelfOptions, 'labelNode' | 'curveVisibilityToggleButtonOptions' | 'yZoomButtonGroupOptions'>, NodeOptions>()( {

      // SelfOptions
      createCurveNode: true,
      chartRectangleOptions: {
        fill: CalculusGrapherColors.defaultChartBackgroundFillProperty,
        stroke: CalculusGrapherColors.defaultChartBackgroundStrokeProperty
      },

      // NodeOptions
      isDisposable: false,
      phetioVisiblePropertyInstrumented: false
    }, providedOptions );

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

    this._curveLayerVisibleProperty = new BooleanProperty( true, {
      tandem: options.tandem.createTandem( 'curveLayerVisibleProperty' ),
      phetioFeatured: true,
      phetioDocumentation: 'Controls whether the graph\'s curve layer is visible. The curve layer contains the plots ' +
                           'for any curves, optional tangent line and point, and optional area-under-curve plot and point. ' +
                           'The value of this Property can be toggled by pressing curveVisibilityToggleButton.'
    } );
    this.curveLayerVisibleProperty = this._curveLayerVisibleProperty;

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
      createLabel: ( value: number ) => new Text( toFixed( value, 0 ), {
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
    this.curveVisibilityToggleButton = new CurveVisibilityToggleButton( this._curveLayerVisibleProperty,
      combineOptions<CurveVisibilityToggleButtonOptions>( {
        tandem: options.tandem.createTandem( 'curveVisibilityToggleButton' )
      }, options.curveVisibilityToggleButtonOptions ) );

    // Optional zoom buttons for the y-axis.
    if ( this.yZoomLevelProperty ) {
      affirm( options.yZoomButtonGroupOptions, 'yZoomButtonGroupOptions is required if yZoomLevelProperty is provided' );

      this.yZoomButtonGroup = new YZoomButtonGroup( this.yZoomLevelProperty, Y_ZOOM_INFO.map( zoomInfo => zoomInfo.max ),
        combineOptions<YZoomButtonGroupOptions>( {
          tandem: options.tandem.createTandem( 'yZoomButtonGroup' )
        }, options.yZoomButtonGroupOptions ) );
    }

    // Adjust button positions when the visibility of ticks changes.
    ticksParent.visibleProperty.link( ticksParentVisible => {
      const rightNode = ticksParentVisible ? ticksParent : this.chartRectangle;

      // EyeToggleButton at bottom-left of chart rectangle
      this.curveVisibilityToggleButton.right = rightNode.left - BUTTON_SPACING;
      this.curveVisibilityToggleButton.bottom = this.chartRectangle.bottom;

      // yZoomButtonGroup at left-center of chart rectangle
      if ( this.yZoomButtonGroup ) {
        this.yZoomButtonGroup.right = rightNode.left - BUTTON_SPACING;
        this.yZoomButtonGroup.centerY = this.chartRectangle.centerY;
      }
    } );

    // Vertical (y-axis) label that also serves as the graph name.
    const labelNode = options.labelNode || new GraphTypeLabelNode( graphType, {
      pickable: false,
      tandem: options.tandem.createTandem( 'labelNode' ),
      phetioDocumentation: 'Label that appears in the upper-left corner of the graph. Doubles as the graph name and the label for the vertical axis.'
    } );
    labelNode.boundsProperty.link( () => {
      labelNode.leftTop = this.chartRectangle.leftTop.addXY( CalculusGrapherConstants.GRAPH_X_MARGIN, CalculusGrapherConstants.GRAPH_Y_MARGIN );
    } );

    // Horizonal (x-axis or t-axis) label.
    const horizontalAxisText = new RichText( CalculusGrapherSymbols.visualVariableSymbolProperty, {
      font: CalculusGrapherConstants.GRAPH_LABEL_FONT,
      maxWidth: 100,
      tandem: options.tandem.createTandem( 'horizontalAxisText' ),
      phetioDocumentation: 'Label that appears on the horizontal axis.',
      phetioVisiblePropertyInstrumented: true
    } );
    horizontalAxisText.boundsProperty.link( () => {
      horizontalAxisText.rightTop = this.chartRectangle.rightCenter.addXY( -CalculusGrapherConstants.GRAPH_X_MARGIN, 10 );
    } );

    const children = [
      this.chartRectangle,
      gridNode,
      axesParent,
      ticksParent,
      horizontalAxisText,
      labelNode,
      this.curveLayer,
      this.curveVisibilityToggleButton
    ];
    this.yZoomButtonGroup && children.push( this.yZoomButtonGroup );
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
    this._curveLayerVisibleProperty.reset();
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
   * Gets the offset of the CurveVisibilityToggleButton from the left edge of the ChartRectangle.
   * This is used for dynamic layout.
   */
  public getCurveVisibilityToggleButtonXOffset(): number {
    return this.curveVisibilityToggleButton.x - this.x;
  }

  /**
   * Gets the bounds of the ChartRectangle. This addresses https://github.com/phetsims/calculus-grapher/issues/259.
   */
  protected getChartRectangleBounds(): Bounds2 {
    return this.chartRectangle.getShape().bounds;
  }
}

/**
 * Creates a TickLabelSet for the y-axis.
 */
function createYTickLabelSet( spacing: number, chartTransform: ChartTransform ): TickLabelSet {

  // No more than three decimal places
  const decimalPlaces = Math.min( 3, numberOfDecimalPlaces( spacing ) );

  return new TickLabelSet( chartTransform, Orientation.VERTICAL, spacing, {

    // Display zero without decimal places.
    createLabel: ( value: number ) => {
      const valueString = ( value === 0 ) ? '0' : toFixed( value, decimalPlaces );
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