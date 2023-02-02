// Copyright 2020-2023, University of Colorado Boulder

/**
 * GraphNode is the view representation of a Graph, which includes a curve, a chart ( grid and axes) and zoom buttons
 *
 * Primary responsibilities are:
 * - Create an associated CurveNode
 * - Create an optional zoomButtonGroup with an associated property
 * - Create an eye toggle button that control the visibility of curve
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

import AxisLine from '../../../../bamboo/js/AxisLine.js';
import ChartRectangle from '../../../../bamboo/js/ChartRectangle.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import GridLineSet from '../../../../bamboo/js/GridLineSet.js';
import TickLabelSet from '../../../../bamboo/js/TickLabelSet.js';
import TickMarkSet from '../../../../bamboo/js/TickMarkSet.js';
import Range from '../../../../dot/js/Range.js';
import Orientation from '../../../../phet-core/js/Orientation.js';
import { Node, NodeOptions, RectangleOptions, TColor, Text } from '../../../../scenery/js/imports.js';
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

const DEFAULT_ZOOM_LEVEL = 3;
const DEFAULT_MAX_Y = Y_ZOOM_INFO[ DEFAULT_ZOOM_LEVEL ].max;

type SelfOptions = {
  graphHeight: number;
  chartRectangleOptions?: RectangleOptions;
  createCurveNode?: ( chartTransform: ChartTransform ) => CurveNode;
  labelNode?: Node;
};

export type GraphNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'>;

export default class GraphNode extends Node {

  public readonly graphType: GraphType;
  public readonly chartTransform: ChartTransform;

  // The curve to be plotted
  protected readonly curve: Curve;

  // Node that plots the curve
  protected readonly curveNode: CurveNode;

  // Layer for plotting all curves and their decorations
  protected readonly curveLayer: Node;

  // Visibility of curveLayer
  protected readonly curveLayerVisibleProperty: BooleanProperty;

  // Optional Property for zooming the y-axis
  protected readonly yZoomLevelProperty?: NumberProperty;

  protected readonly chartRectangle: ChartRectangle;

  public constructor( graphType: GraphType,
                      curve: Curve,
                      gridVisibleProperty: TReadOnlyProperty<boolean>,
                      providedOptions: GraphNodeOptions ) {

    const options = optionize<GraphNodeOptions, StrictOmit<SelfOptions, 'labelNode'>, NodeOptions>()( {

      // SelfOptions
      createCurveNode: ( chartTransform: ChartTransform ) => new CurveNode( curve, chartTransform, {
        stroke: graphType.strokeProperty,
        tandem: providedOptions.tandem.createTandem( 'curveNode' )
      } ),
      chartRectangleOptions: {
        fill: CalculusGrapherColors.defaultChartBackgroundFillProperty,
        stroke: CalculusGrapherColors.defaultChartBackgroundStrokeProperty
      },

      // NodeOptions
      phetioVisiblePropertyInstrumented: false
    }, providedOptions );

    // If labelNode was not provided, create the default.
    const labelNode = options.labelNode || new GraphTypeLabelNode( graphType, {
      tandem: options.tandem.createTandem( 'labelNode' )
    } );

    super( options );

    this.graphType = graphType;
    this.curve = curve;

    // The original graph does not have the zoom feature for the y-axis.
    if ( graphType !== GraphType.ORIGINAL ) {
      this.yZoomLevelProperty = new NumberProperty( DEFAULT_ZOOM_LEVEL, {
        range: new Range( 0, Y_ZOOM_INFO.length - 1 ),
        tandem: options.tandem.createTandem( 'yZoomLevelProperty' )
      } );
    }

    // chart transform for the graph
    this.chartTransform = new ChartTransform( {
      viewWidth: CalculusGrapherConstants.GRAPH_VIEW_WIDTH,
      viewHeight: options.graphHeight,
      modelXRange: CalculusGrapherConstants.CURVE_X_RANGE,
      modelYRange: new Range( -DEFAULT_MAX_Y, DEFAULT_MAX_Y )
    } );

    this.chartRectangle = new ChartRectangle( this.chartTransform, options.chartRectangleOptions );

    this.curveNode = options.createCurveNode( this.chartTransform );

    this.curveLayerVisibleProperty = new BooleanProperty( true, {
      tandem: options.tandem.createTandem( 'curveVisibleProperty' )
    } );

    this.curveLayer = new Node( {
      children: [ this.curveNode ],
      clipArea: this.chartRectangle.getShape(),
      visibleProperty: this.curveLayerVisibleProperty
    } );

    // Major and minor grid lines, minor behind major.
    const xMajorGridLines = new GridLineSet( this.chartTransform, Orientation.HORIZONTAL, MAJOR_GRID_LINE_SPACING, MAJOR_GRID_LINE_OPTIONS );
    const yMajorGridLines = new GridLineSet( this.chartTransform, Orientation.VERTICAL, MAJOR_GRID_LINE_SPACING, MAJOR_GRID_LINE_OPTIONS );
    const xMinorGridLines = new GridLineSet( this.chartTransform, Orientation.HORIZONTAL, MINOR_GRID_LINE_SPACING, MINOR_GRID_LINE_OPTIONS );
    const yMinorGridLines = new GridLineSet( this.chartTransform, Orientation.VERTICAL, MINOR_GRID_LINE_SPACING, MINOR_GRID_LINE_OPTIONS );
    const gridNode = new Node( {
      children: [ xMinorGridLines, yMinorGridLines, xMajorGridLines, yMajorGridLines ],
      visibleProperty: gridVisibleProperty
    } );

    // Axes are clipped in the chart
    const horizontalAxisLine = new AxisLine( this.chartTransform, Orientation.HORIZONTAL );
    const verticalAxisLine = new AxisLine( this.chartTransform, Orientation.VERTICAL );

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
      visibleProperty: CalculusGrapherPreferences.valuesVisibleProperty
    } );

    // Create toggle button that controls the visibility of this.curveLayer.
    const eyeToggleButton = new EyeToggleButton( this.curveLayerVisibleProperty, {
      scale: 0.5,
      baseColor: new DerivedProperty( [ this.curveLayerVisibleProperty ],
        visible => visible ? 'white' : PhetColorScheme.BUTTON_YELLOW ),
      tandem: options.tandem.createTandem( 'eyeToggleButton' )
    } );

    // Create yZoomButtonGroup if we have a yZoomLevelProperty.
    const yZoomButtonGroup = this.yZoomLevelProperty ? new PlusMinusZoomButtonGroup( this.yZoomLevelProperty, {
      orientation: 'vertical',
      buttonOptions: {
        stroke: 'black'
      },
      tandem: options.tandem.createTandem( 'yZoomButtonGroup' )
    } ) : null;

    // labelNode in left-top corner of chartRectangle
    labelNode.boundsProperty.link( () => {
      labelNode.leftTop = this.chartRectangle.leftTop.addXY( CalculusGrapherConstants.GRAPH_X_MARGIN, CalculusGrapherConstants.GRAPH_Y_MARGIN );
    } );

    // Adjust button positions when the visibility of ticks changes.
    ticksParent.visibleProperty.link( ticksParentVisible => {
      const rightNode = ticksParentVisible ? ticksParent : this.chartRectangle;

      // eyeToggleButton at bottom-left of chart rectangle
      eyeToggleButton.rightBottom = rightNode.leftBottom.addXY( -BUTTON_SPACING, 0 );

      // yZoomButtonGroup at left-center of chart rectangle
      if ( yZoomButtonGroup ) {
        yZoomButtonGroup.rightCenter = rightNode.leftCenter.addXY( -BUTTON_SPACING, 0 );
      }
    } );

    const children = [
      this.chartRectangle,
      gridNode,
      horizontalAxisLine,
      verticalAxisLine,
      ticksParent,
      labelNode,
      this.curveLayer,
      eyeToggleButton
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
   * Reset all
   */
  public reset(): void {
    this.yZoomLevelProperty && this.yZoomLevelProperty.reset();
    this.curveLayerVisibleProperty.reset();
    this.curveNode.reset();
  }

  /**
   * Adds a PlottedPoint to this GraphNode.
   */
  public addPlottedPoint( xProperty: TReadOnlyProperty<number>, yProperty: TReadOnlyProperty<number>,
                          fill: TColor, visibleProperty: TReadOnlyProperty<boolean>,
                          tandemName: string ): PlottedPoint {
    const plottedPoint = new PlottedPoint( xProperty, yProperty, this.chartTransform, {
      visibleProperty: visibleProperty,
      fill: fill,
      tandem: this.tandem.createTandem( tandemName )
    } );
    this.curveLayer.addChild( plottedPoint );
    return plottedPoint;
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
