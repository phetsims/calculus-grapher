// Copyright 2022-2023, University of Colorado Boulder

/**
 * OriginalGraphNode is the view representation of an Original Graph, which includes two curves
 *  that can be user-manipulated as well as cueing arrows.
 * Labeled Points (only visible/accessible through PhET-IO) are also added to this graph
 * OriginalGraphNode extends GraphNode.
 * However, the zoom Button of GraphNode is set to be invisible in the OriginalGraphNode
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
import { DragListener, HBox, PressedDragListener, Rectangle, Text, TPaint } from '../../../../scenery/js/imports.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import CalculusGrapherModel from '../model/CalculusGrapherModel.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import GraphTypeLabelNode from './GraphTypeLabelNode.js';
import TangentScrubber from '../model/TangentScrubber.js';
import TangentArrowNode from './TangentArrowNode.js';
import AreaUnderCurveScrubber from '../model/AreaUnderCurveScrubber.js';
import AreaUnderCurvePlot from './AreaUnderCurvePlot.js';
import GraphType from '../model/GraphType.js';
import ShowOriginalCurveCheckbox from './ShowOriginalCurveCheckbox.js';
import LabeledPointsNode from './LabeledPointsNode.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import Property from '../../../../axon/js/Property.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';

type SelfOptions = EmptySelfOptions;

type OriginalGraphNodeOptions = SelfOptions & PickRequired<GraphNodeOptions, 'chartRectangleHeight' | 'tandem'>;

export default class OriginalGraphNode extends GraphNode {

  // Node for the predict curve
  private readonly predictCurveNode: TransformedCurveNode;

  // Indicates if the original curve is visible while in 'Predict' mode.
  // This Property is controlled by the 'Show f(x)' checkbox that is visible when the 'Predict' radio button is selected.
  private readonly showOriginalCurveProperty: Property<boolean>;

  public constructor( model: CalculusGrapherModel, providedOptions: GraphNodeOptions ) {

    // Destructuring fields from the model into local constants, to improve readability.
    const { originalCurve, predictCurve, curveManipulationProperties, predictEnabledProperty } = model;

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

    const showOriginalCurveProperty = new BooleanProperty( false, {
      tandem: providedOptions.tandem.createTandem( 'showOriginalCurveProperty' ),
      phetioDocumentation: 'Controls whether the original curve is visible while the Predict radio button is selected.' +
                           'The value of this Property can be changed by toggling showOriginalCurveCheckbox.'
    } );

    // Creates PhET-iO element 'graphsNode.originalCurveNode'
    const originalCurveNodeTandem = providedOptions.tandem.createTandem( 'originalCurveNode' );
    const createOriginalCurveNode = ( chartTransform: ChartTransform, chartRectangleFill: TPaint, plotBounds: Bounds2 ) =>
      new TransformedCurveNode( originalCurve, curveManipulationProperties, chartTransform, {
        plotBoundsMethod: CalculusGrapherConstants.PLOT_BOUNDS_METHOD, // see https://github.com/phetsims/calculus-grapher/issues/210
        plotBounds: plotBounds, // see https://github.com/phetsims/calculus-grapher/issues/259
        stroke: graphType.strokeProperty,
        discontinuousPointsScatterPlotOptions: {
          fill: chartRectangleFill
        },
        continuousLinePlotOptions: {
          lineWidth: 3 // see https://github.com/phetsims/calculus-grapher/issues/205
        },
        isInteractiveProperty: DerivedProperty.not( predictEnabledProperty ),
        visibleProperty: new DerivedProperty(
          [ predictEnabledProperty, showOriginalCurveProperty ],
          ( predictEnabled, showOriginalCurve ) => !predictEnabled || showOriginalCurve, {
            tandem: originalCurveNodeTandem.createTandem( 'visibleProperty' ),
            phetioValueType: BooleanIO
          } ),
        tandem: originalCurveNodeTandem,

        // originalCurveNode does not have an input listener, but we want to allow PhET-iO clients to use
        // originalCurveNode.inputEnabledProperty to control originalGraphNode.inputEnabledProperty (see derivation below).
        // See https://github.com/phetsims/calculus-grapher/issues/240
        phetioInputEnabledPropertyInstrumented: true
      } );

    const options = optionize<OriginalGraphNodeOptions, SelfOptions, GraphNodeOptions>()( {

      // GraphNodeOptions
      createCurveNode: createOriginalCurveNode,
      chartRectangleOptions: {
        fill: CalculusGrapherColors.originalChartBackgroundFillProperty,
        stroke: CalculusGrapherColors.originalChartBackgroundStrokeProperty
      },
      labelNode: labelNode
    }, providedOptions );

    super( graphType, originalCurve, model.gridVisibleProperty, options );

    // We need to know that this.curveNode is of type TransformedCurveNode, as created by createCurveNode above.
    const originalCurveNode = this.curveNode as TransformedCurveNode;
    assert && assert( originalCurveNode instanceof TransformedCurveNode ); // eslint-disable-line no-simple-type-checking-assertions

    // Allow PhET-iO clients to use originalCurveNode.inputEnabledProperty to enabled/disable interactivity.
    // No not instrument. See https://github.com/phetsims/calculus-grapher/issues/240
    this.inputEnabledProperty = DerivedProperty.or( [ predictEnabledProperty, originalCurveNode.inputEnabledProperty ] );

    this.showOriginalCurveProperty = showOriginalCurveProperty;

    // Add a highlight around the chartRectangle, color coded to the curve that is interactive.
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

    // Create a predictCurveNode
    this.predictCurveNode = new TransformedCurveNode( predictCurve, curveManipulationProperties, this.chartTransform, {
      plotBoundsMethod: CalculusGrapherConstants.PLOT_BOUNDS_METHOD, // see https://github.com/phetsims/calculus-grapher/issues/210
      plotBounds: this.getChartBounds(), // see https://github.com/phetsims/calculus-grapher/issues/259
      isInteractiveProperty: predictEnabledProperty,
      visibleProperty: predictEnabledProperty,
      stroke: CalculusGrapherColors.predictCurveStrokeProperty,
      tandem: options.tandem.createTandem( 'predictCurveNode' )
    } );
    this.curveLayer.addChild( this.predictCurveNode );

    const showOriginalCurveCheckbox = new ShowOriginalCurveCheckbox( showOriginalCurveProperty,
      model.predictEnabledProperty, options.tandem.createTandem( 'showOriginalCurveCheckbox' ) );
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

    const interactiveCurveNodeProperty = new DerivedProperty( [ model.predictEnabledProperty ],
      predictEnabled => predictEnabled ? this.predictCurveNode : originalCurveNode
    );

    // Variables to keep track of old model positions associated with the dragListener.
    // Set them to null as no drag event has occurred yet.
    let penultimatePosition: Vector2 | null = null;
    let antepenultimatePosition: Vector2 | null = null;

    // Update whichever curve is currently interactive.
    const updateCurve = ( listener: PressedDragListener ): void => {

      // This listener 'field' is actually an ES5 getter that allocates a Vector2, so call it only once.
      const modelPoint = listener.modelPoint;

      // Current modelPosition
      const modelPosition = this.chartTransform.viewToModelPosition( modelPoint );

      // Update curve based on mode and width
      interactiveCurveNodeProperty.value.transformedCurve.manipulateCurve(
        curveManipulationProperties.mode,
        curveManipulationProperties.width,
        modelPosition,
        penultimatePosition,
        antepenultimatePosition );

      // Update (model) antepenultimatePosition and penultimatePosition
      antepenultimatePosition = penultimatePosition;
      penultimatePosition = modelPosition;
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

        // Set the previous last positions to null, since it is a new drag.
        antepenultimatePosition = null;
        penultimatePosition = null;
        updateCurve( listener );
      },
      drag: ( event, listener ) => updateCurve( listener ),
      tandem: options.tandem.createTandem( 'dragListener' )
    } ) );
  }

  public override reset(): void {
    this.predictCurveNode.reset();
    this.showOriginalCurveProperty.reset();
    super.reset();
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
