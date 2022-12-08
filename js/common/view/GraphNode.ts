// Copyright 2020-2022, University of Colorado Boulder

/**
 * GraphNode is the view representation of a Graph, which includes a curve, a chart ( grid and axes) and zoom buttons
 *
 * Primary responsibilities are:
 * - Create an associated CurveNode
 * - Create a zoomButtonGroup with an associated property
 * - Create an eye toggle button that control the visibility of curve
 * - Create AxisLines, GridLines and Rectangle Chart
 * - Create a Chart Transform
 * - Updating the model y Range of the graph based on the zoom level
 * - Toggling the visibility of the gridlines
 * - Set the height of the graph
 *
 * @author Martin Veillette
 * @author Brandon Li
 */

import AxisLine from '../../../../bamboo/js/AxisLine.js';
import ChartRectangle from '../../../../bamboo/js/ChartRectangle.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import GridLineSet from '../../../../bamboo/js/GridLineSet.js';
import TickLabelSet from '../../../../bamboo/js/TickLabelSet.js';
import TickMarkSet from '../../../../bamboo/js/TickMarkSet.js';
import Range from '../../../../dot/js/Range.js';
import Orientation from '../../../../phet-core/js/Orientation.js';
import { Node, NodeOptions, PathOptions, RectangleOptions, TColor, Text } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherConstants from '../../common/CalculusGrapherConstants.js';
import CurveNode, { CurveNodeOptions } from './CurveNode.js';
import Curve from '../model/Curve.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import PlusMinusZoomButtonGroup, { PlusMinusZoomButtonGroupOptions } from '../../../../scenery-phet/js/PlusMinusZoomButtonGroup.js';
import EyeToggleButton, { EyeToggleButtonOptions } from '../../../../scenery-phet/js/buttons/EyeToggleButton.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Utils from '../../../../dot/js/Utils.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';
import CalculusGrapherPreferences from '../model/CalculusGrapherPreferences.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';

type SelfOptions = {
  gridLineSetOptions?: PathOptions;
  chartRectangleOptions?: RectangleOptions;
  curveNodeOptions?: CurveNodeOptions;
  createCurveNode?: ( chartTransform: ChartTransform,
                      providedOptions?: CurveNodeOptions ) => CurveNode;
  plusMinusZoomButtonGroupOptions?: PlusMinusZoomButtonGroupOptions;
  eyeToggleButtonOptions?: EyeToggleButtonOptions;

  curveStroke: TColor;
};
export type GraphNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'>;

export default class GraphNode extends Node {

  protected readonly zoomLevelProperty: NumberProperty;

  // create a node layer to host all the curveNodes
  protected readonly curveLayer: Node;
  // create a curveNode associated with this graph
  protected readonly curveNode: CurveNode;
  // visibility of the layer hosting all the curveNodes
  private readonly curveLayerVisibleProperty: BooleanProperty;
  public readonly chartTransform: ChartTransform;

  public constructor( curve: Curve,
                      gridVisibleProperty: TReadOnlyProperty<boolean>,
                      graphHeightProperty: TReadOnlyProperty<number>,
                      labelNode: Node,
                      providedOptions: GraphNodeOptions ) {

    const options = optionize<GraphNodeOptions, SelfOptions, NodeOptions>()( {
      createCurveNode: ( chartTransform: ChartTransform,
                         providedOptions?: CurveNodeOptions ) => new CurveNode( curve, chartTransform, providedOptions ),
      gridLineSetOptions: {
        stroke: CalculusGrapherColors.gridlinesStrokeProperty
      },
      chartRectangleOptions: {
        fill: CalculusGrapherColors.defaultChartBackgroundFillProperty,
        stroke: CalculusGrapherColors.defaultChartBackgroundStrokeProperty,
        opacity: 0.4
      },
      curveNodeOptions: {
        stroke: providedOptions.curveStroke,
        tandem: providedOptions.tandem.createTandem( 'curveNode' )
      },
      plusMinusZoomButtonGroupOptions: {
        orientation: 'vertical',
        buttonOptions: {
          stroke: 'black'
        }
      },
      eyeToggleButtonOptions: {
        scale: 0.5
      }
    }, providedOptions );

    super( options );

    // chart transform for the graph, the Y range will be updated later
    this.chartTransform = new ChartTransform( {
      viewWidth: CalculusGrapherConstants.GRAPH_VIEW_WIDTH,
      viewHeight: graphHeightProperty.value,
      modelXRange: CalculusGrapherConstants.CURVE_X_RANGE
    } );

    // grid lines
    const horizontalGridLines = new GridLineSet( this.chartTransform, Orientation.HORIZONTAL, 1, options.gridLineSetOptions );
    const verticalGridLines = new GridLineSet( this.chartTransform, Orientation.VERTICAL, 1, options.gridLineSetOptions );

    // Axes nodes are clipped in the chart
    const horizontalAxisLine = new AxisLine( this.chartTransform, Orientation.HORIZONTAL );
    const verticalAxisLine = new AxisLine( this.chartTransform, Orientation.VERTICAL );

    const gridNode = new Node( {
      children: [ horizontalGridLines, verticalGridLines ],
      visibleProperty: gridVisibleProperty
    } );

    // zoom level
    this.zoomLevelProperty = new NumberProperty(
      CalculusGrapherConstants.ZOOM_LEVEL_RANGE.defaultValue, {
        range: CalculusGrapherConstants.ZOOM_LEVEL_RANGE,
        tandem: options.tandem.createTandem( 'zoomLevelProperty' )
      } );

    this.curveLayerVisibleProperty = new BooleanProperty( true,
      { tandem: options.tandem.createTandem( 'curveVisibleProperty' ) } );

    this.curveNode = options.createCurveNode( this.chartTransform,
      combineOptions<CurveNodeOptions>( {
          stroke: options.curveStroke
        },
        options.curveNodeOptions ) );

    this.curveLayer = new Node( {
      children: [ this.curveNode ],
      visibleProperty: this.curveLayerVisibleProperty
    } );

    // chart Rectangle for the graph
    const chartRectangle = new ChartRectangle( this.chartTransform, options.chartRectangleOptions );

    // create eye toggle button that controls the visibility of the curve
    const eyeToggleButton = new EyeToggleButton( this.curveLayerVisibleProperty,
      combineOptions<EyeToggleButtonOptions>( {
        baseColor: new DerivedProperty( [ this.curveLayerVisibleProperty ], visible => visible ? 'white' : PhetColorScheme.BUTTON_YELLOW ),
        bottom: chartRectangle.bottom,
        tandem: options.tandem.createTandem( 'eyeToggleButton' )
      }, options.eyeToggleButtonOptions ) );


    // zoom Button to the center left of the graph
    const zoomButtonGroup = new PlusMinusZoomButtonGroup( this.zoomLevelProperty,
      combineOptions<PlusMinusZoomButtonGroupOptions>( {
        centerY: chartRectangle.centerY,
        right: eyeToggleButton.right,
        tandem: options.tandem.createTandem( 'zoomButtonGroup' )
      }, options.plusMinusZoomButtonGroupOptions ) );

    const setLabelNodePosition = () => {
      labelNode.leftTop = chartRectangle.leftTop.addXY( 10, 5 );
    };

    graphHeightProperty.link( height => {
      this.chartTransform.setViewHeight( height );
      this.curveLayer.clipArea = chartRectangle.getShape();
      eyeToggleButton.bottom = chartRectangle.bottom;
      zoomButtonGroup.centerY = chartRectangle.centerY;
      setLabelNodePosition();
    } );

    labelNode.boundsProperty.link( setLabelNodePosition );

    // create horizontal numerical labels for ticks
    const horizontalTickLabelSet = new TickLabelSet( this.chartTransform, Orientation.HORIZONTAL, 2, {
      createLabel: ( value: number ) => new Text( Utils.toFixed( value, 0 ), { fontSize: 8 } )
    } );

    // create vertical numerical labels for ticks
    let verticalTickLabelSet = this.getVerticalTickLabelSet( 2 );

    // create horizontal and vertical mark ticks
    const horizontalTickMarkSet = new TickMarkSet( this.chartTransform, Orientation.HORIZONTAL, 2 );
    const verticalTickMarkSet = new TickMarkSet( this.chartTransform, Orientation.VERTICAL, 2, {
      value: CalculusGrapherConstants.CURVE_X_RANGE.min
    } );

    // factor associated with conversion between model and view along horizontal.
    const viewToModelFactor = this.chartTransform.getModelRange( Orientation.HORIZONTAL ).getLength() /
                              this.chartTransform.viewWidth;

    const tickSetNode = new Node( {
      children: [
        horizontalTickLabelSet,
        horizontalTickMarkSet,
        verticalTickMarkSet,
        verticalTickLabelSet
      ]
    } );

    const buttonSetNode = new Node( {
      children: [
        zoomButtonGroup,
        eyeToggleButton
      ]
    } );

    this.setChildren( [
      chartRectangle,
      gridNode,
      horizontalAxisLine,
      verticalAxisLine,
      tickSetNode,
      buttonSetNode,
      labelNode,
      this.curveLayer
    ] );

    // maintain isometry between x and y, (factor 1/2 because the y range goes from -maxY to maxY).
    const initialMaxY = 1 / 2 * viewToModelFactor * graphHeightProperty.value;

    this.zoomLevelProperty.link( zoomLevel => {

      // convert zoomLevel to a spacing value (between ticks).
      // we want 'nice' spacing:  ..., 0.01, 0.02, 0.05, 0.10, 0.20, 0.5, 1, 2, 5, 10, 20, 50, 100, ....
      const lookUpArray = [ 1, 2, 5 ];
      const arrayLength = lookUpArray.length;
      const zoomDefault = CalculusGrapherConstants.ZOOM_LEVEL_RANGE.defaultValue;
      const zoomDifference = -zoomLevel + zoomDefault;
      const zoomMultiples = Math.floor( zoomDifference / arrayLength ); // for multiples of 10
      const zoomModulo = ( zoomDifference - zoomMultiples * arrayLength ) % arrayLength; // result will be 0, 1 or 2

      // @ts-expect-error, complains about number being the index of an array
      const spacing = Math.pow( 10, zoomMultiples ) * lookUpArray[ [ zoomModulo ] ];

      const maxY = initialMaxY * spacing;

      // set new y range
      this.chartTransform.setModelYRange( new Range( -maxY, maxY ) );

      // change the vertical spacing of the ticks such that there are a constant number of them
      verticalTickMarkSet.setSpacing( spacing * 2 );

      // remove previous verticalTickLabelSet and dispose of it
      tickSetNode.removeChild( verticalTickLabelSet );
      verticalTickLabelSet.dispose();

      // create and add a new vertical tick label set with the appropriate label spacing
      verticalTickLabelSet = this.getVerticalTickLabelSet( spacing * 2 );
      tickSetNode.addChild( verticalTickLabelSet );

    } );

    CalculusGrapherPreferences.valuesVisibleProperty.link( valuesVisible => {
        tickSetNode.visible = valuesVisible;

        // find object immediately to the right of the buttons
        const rightNode = tickSetNode.visible ? tickSetNode : chartRectangle;
        buttonSetNode.right = rightNode.left - 20;
      }
    );

  }

  /**
   * Reset all
   */
  public reset(): void {
    this.zoomLevelProperty.reset();
    this.curveLayerVisibleProperty.reset();
    this.curveNode.reset();
  }

  /**
   * Returns a TickLabelSet that appear on the left hand side of the chart.
   * Responsible for determining the appropriate number of decimal places for the label
   *
   * @param spacing - the separation ( in model coordinates) of the labels
   */
  private getVerticalTickLabelSet( spacing: number ): TickLabelSet {

    // no more than three decimal places
    const decimalPlaces = Math.min( 3, Utils.numberOfDecimalPlaces( spacing ) );

    return new TickLabelSet( this.chartTransform, Orientation.VERTICAL, spacing,
      {
        value: CalculusGrapherConstants.CURVE_X_RANGE.min,
        createLabel: ( value: number ) =>
          new Text( Utils.toFixed( value, decimalPlaces ), { fontSize: 8 } ),
        positionLabel: ( label: Node, tickBounds: Bounds2 ) => {
          label.rightCenter = tickBounds.leftCenter.minusXY( 1, 0 );
          return label;
        }
      } );
  }
}

calculusGrapher.register( 'GraphNode', GraphNode );
