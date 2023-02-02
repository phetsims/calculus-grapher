// Copyright 2022-2023, University of Colorado Boulder

/**
 * OriginalGraphNode is the view representation of an Original Graph, which includes two curves
 *  that can be user-manipulated as well as cueing arrows.
 * Labeled Points (only visible/accessible through PhET-IO) are also added to this graph
 * OriginalGraphNode extends GraphNode.
 * However, the zoom Button of GraphNode is set to invisible for OriginalGraphNode
 *
 * The public methods of OriginalGraphNode allow a client to add
 * - a ScrubberNode
 * - a TangentArrowNode
 * - an AreaUnderCurvePlot
 *
 * @author Martin Veillette
 * @author Brandon Li
 * @author Chris Malley (PixelZoom, Inc.)
 */

import calculusGrapher from '../../calculusGrapher.js';
import TransformedCurveNode from './TransformedCurveNode.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import GraphNode, { GraphNodeOptions } from './GraphNode.js';
import { DragListener, HBox, PressedDragListener, Rectangle, TColor, Text } from '../../../../scenery/js/imports.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import CalculusGrapherModel from '../model/CalculusGrapherModel.js';
import CalculusGrapherVisibleProperties from './CalculusGrapherVisibleProperties.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import GraphTypeLabelNode from './GraphTypeLabelNode.js';
import TangentScrubber from '../model/TangentScrubber.js';
import TangentArrowNode from './TangentArrowNode.js';
import AreaUnderCurveScrubber from '../model/AreaUnderCurveScrubber.js';
import AreaUnderCurvePlot from './AreaUnderCurvePlot.js';
import AncillaryTool from '../model/AncillaryTool.js';
import ScrubberNode from './ScrubberNode.js';
import GraphType from '../model/GraphType.js';
import ShowOriginalCurveCheckbox from './ShowOriginalCurveCheckbox.js';
import LabeledPointsNode from './LabeledPointsNode.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import Property from '../../../../axon/js/Property.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';

type SelfOptions = EmptySelfOptions;

type OriginalGraphNodeOptions = SelfOptions & PickRequired<GraphNodeOptions, 'graphHeight' | 'tandem'>;

export default class OriginalGraphNode extends GraphNode {

  // Node for the predict curve
  private readonly predictCurveNode: TransformedCurveNode;

  public constructor( model: CalculusGrapherModel,
                      visibleProperties: CalculusGrapherVisibleProperties,
                      providedOptions: GraphNodeOptions ) {

    // Destructuring fields from model into local constants, to improve readability.
    const { originalCurve, predictCurve, curveManipulationProperties, predictEnabledProperty } = model;

    // Original curve is visible if not in predictMode or 'Show f(x)' checkbox is checked.
    const originalCurveNodeVisibilityProperty = new DerivedProperty(
      [ predictEnabledProperty, visibleProperties.showOriginalCurveProperty ],
      ( predictEnabled, showOriginalCurve ) => !predictEnabled || showOriginalCurve );

    const graphType = GraphType.ORIGINAL;

    // Label that toggles between 'Predict f(x)' and 'f(x)'
    const labelNodeTandem = providedOptions.tandem.createTandem( 'labelNode' );
    const labelNode = new HBox( {
      children: [
        new Text( CalculusGrapherStrings.predictStringProperty, {
          font: CalculusGrapherConstants.CONTROL_FONT,
          maxWidth: 100,
          visibleProperty: model.predictEnabledProperty, // show/hide 'Predict'
          tandem: labelNodeTandem.createTandem( 'predictText' )
        } ),
        new GraphTypeLabelNode( graphType )
      ],
      spacing: 5,
      tandem: labelNodeTandem
    } );

    const options = optionize<OriginalGraphNodeOptions, SelfOptions, GraphNodeOptions>()( {

      // GraphNodeOptions
      createCurveNode: ( chartTransform: ChartTransform ) =>
        new TransformedCurveNode( originalCurve, curveManipulationProperties, chartTransform, {
          stroke: graphType.strokeProperty,
          continuousLinePlotOptions: {
            lineWidth: 3 // see https://github.com/phetsims/calculus-grapher/issues/205
          },
          enabledProperty: DerivedProperty.not( predictEnabledProperty ),
          visibleProperty: originalCurveNodeVisibilityProperty,
          tandem: providedOptions.tandem.createTandem( 'originalCurveNode' )
        } ),
      chartRectangleOptions: {
        fill: CalculusGrapherColors.originalChartBackgroundFillProperty,
        stroke: CalculusGrapherColors.originalChartBackgroundStrokeProperty
      },
      labelNode: labelNode
    }, providedOptions );

    super( graphType, originalCurve, visibleProperties.gridVisibleProperty, options );

    // Adds a highlight around the chartRectangle, color coded to the curve that is interactive.
    // See https://github.com/phetsims/calculus-grapher/issues/204
    const highlightRectangle = new Rectangle( 0, 0, this.chartRectangle.width + 6, this.chartRectangle.height + 6, {
      center: this.chartRectangle.center,
      opacity: 0.25,
      visibleProperty: this.curveLayerVisibleProperty,
      fill: new DerivedProperty( [
        model.predictEnabledProperty,
        CalculusGrapherColors.predictCurveStrokeProperty,
        CalculusGrapherColors.originalCurveStrokeProperty
      ], ( predictEnabled, predictCurveStroke, originalCurveStroke ) =>
        predictEnabled ? predictCurveStroke : originalCurveStroke )
    } );
    this.addChild( highlightRectangle );
    highlightRectangle.moveToBack();

    // Creates a predictCurveNode
    this.predictCurveNode = new TransformedCurveNode( predictCurve, curveManipulationProperties, this.chartTransform, {
      enabledProperty: predictEnabledProperty,
      visibleProperty: predictEnabledProperty,
      stroke: CalculusGrapherColors.predictCurveStrokeProperty,
      tandem: providedOptions.tandem.createTandem( 'predictCurveNode' )
    } );
    this.curveLayer.addChild( this.predictCurveNode );

    const showOriginalCurveCheckbox = new ShowOriginalCurveCheckbox( visibleProperties.showOriginalCurveProperty, {
      visibleProperty: predictEnabledProperty,
      tandem: providedOptions.tandem.createTandem( 'showOriginalCurveCheckbox' )
    } );
    this.addChild( showOriginalCurveCheckbox );

    // Upper-right corner of the chart
    showOriginalCurveCheckbox.boundsProperty.link( () => {
      showOriginalCurveCheckbox.right =
        this.chartTransform.modelToViewX( CalculusGrapherConstants.CURVE_X_RANGE.getMax() ) - CalculusGrapherConstants.GRAPH_X_MARGIN;
      showOriginalCurveCheckbox.top = CalculusGrapherConstants.GRAPH_Y_MARGIN;
    } );

    // Labeled points
    const labeledPointsNode = new LabeledPointsNode( model.labeledPoints, model.labeledPointsLinkableElement,
      this.chartTransform, model.predictEnabledProperty, this.curveLayerVisibleProperty,
      options.tandem.createTandem( 'labeledPointsNode' )
    );
    this.addChild( labeledPointsNode );

    // We need to know that this.curveNode is of type TransformedCurveNode, as created by createCurveNode above.
    const originalCurveNode = this.curveNode as TransformedCurveNode;
    assert && assert( originalCurveNode instanceof TransformedCurveNode ); // eslint-disable-line no-simple-type-checking-assertions

    const interactiveCurveNodeProperty = new DerivedProperty( [ model.predictEnabledProperty ],
      predictEnabled => predictEnabled ? this.predictCurveNode : originalCurveNode
    );

    // Update whichever curve is currently interactive.
    let penultimatePosition: Vector2;
    let antepenultimatePosition: Vector2 | null = null;
    const updateCurve = ( listener: PressedDragListener ): void => {

      // current modelPosition
      const modelPosition = this.chartTransform.viewToModelPosition( listener.modelPoint );

      // previous (model) position the drag
      penultimatePosition = this.chartTransform.viewToModelPosition( listener.modelPoint.minus( listener.modelDelta ) );

      // update curve based on mode and width
      interactiveCurveNodeProperty.value.transformedCurve.manipulateCurve(
        curveManipulationProperties.mode,
        curveManipulationProperties.width,
        modelPosition,
        penultimatePosition,
        antepenultimatePosition );

      // update antepenultimatePosition
      antepenultimatePosition = penultimatePosition;
    };

    // Instead of having a DragListener on each TransformedCurveNode, we have a single DragListener on the chartRectangle.
    // This saves us the costly operation of creating pointer areas that match the Shapes of the curves.  And it allows
    // the user to modify a curve by doing a 'pointer down' anywhere in the chartRectangle.
    // See https://github.com/phetsims/calculus-grapher/issues/210 and https://github.com/phetsims/calculus-grapher/issues/74.
    this.chartRectangle.cursor = 'pointer';
    this.chartRectangle.addInputListener( new DragListener( {
      dragBoundsProperty: new Property( new Bounds2( 0, 0, this.chartTransform.viewWidth, this.chartTransform.viewHeight ) ),
      applyOffset: false,
      start: ( event, listener ) => {

        // Save the current values of the Points for the next undoToLastSave call.
        // This must be called once at the start of dragging (and not on each micro drag-position change).
        interactiveCurveNodeProperty.value.transformedCurve.saveCurrentPoints();

        // set the second to last position to null, since it is a new drag.
        antepenultimatePosition = null;
        updateCurve( listener );
      },
      drag: ( event, listener ) => updateCurve( listener ),
      tandem: options.tandem.createTandem( 'dragListener' )
    } ) );
  }

  public override reset(): void {
    super.reset();
    this.predictCurveNode.reset();
  }

  /**
   * Adds a scrubber to OriginalGraphNode.
   */
  public addScrubberNode( ancillaryTool: AncillaryTool, color: TColor,
                          visibleProperty: TReadOnlyProperty<boolean>, tandemName: string ): ScrubberNode {
    const scrubberNode = new ScrubberNode( ancillaryTool, this.chartTransform, color, {
      visibleProperty: visibleProperty,
      tandem: this.tandem.createTandem( tandemName )
    } );
    this.addChild( scrubberNode );
    return scrubberNode;
  }

  /**
   * Adds a double-headed tangent arrow to OriginalGraphNode.
   */
  public addTangentArrowNode( tangentScrubber: TangentScrubber, visibleProperty: TReadOnlyProperty<boolean> ): TangentArrowNode {
    const tangentArrowNode = new TangentArrowNode( tangentScrubber, this.chartTransform, {
      visibleProperty: visibleProperty,
      tandem: this.tandem.createTandem( 'tangentArrowNode' )
    } );
    this.curveLayer.addChild( tangentArrowNode );
    return tangentArrowNode;
  }

  /**
   * Adds a plot to OriginalGraphNode that shows the area under the curve.
   */
  public addAreaUnderCurvePlot( areaUnderCurveScrubber: AreaUnderCurveScrubber,
                                visibleProperty: TReadOnlyProperty<boolean> ): AreaUnderCurvePlot {
    const areaUnderCurvePlot = new AreaUnderCurvePlot( areaUnderCurveScrubber, this.curve, this.chartTransform,
      areaUnderCurveScrubber.xProperty, {
        visibleProperty: visibleProperty,
        tandem: this.tandem.createTandem( 'areaUnderCurvePlot' )
      } );
    this.curveLayer.addChild( areaUnderCurvePlot );
    areaUnderCurvePlot.moveToBack();
    return areaUnderCurvePlot;
  }
}

calculusGrapher.register( 'OriginalGraphNode', OriginalGraphNode );
