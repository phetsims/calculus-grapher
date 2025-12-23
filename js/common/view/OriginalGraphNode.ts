// Copyright 2022-2025, University of Colorado Boulder

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
 * The decision to use the names 'original curve' and 'original graph' is documented in
 * https://github.com/phetsims/calculus-grapher/issues/119
 *
 * @author Martin Veillette
 * @author Brandon Li
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import StringProperty from '../../../../axon/js/StringProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import KeyboardCueNode from '../../../../scenery-phet/js/accessibility/nodes/KeyboardCueNode.js';
import TextKeyNode from '../../../../scenery-phet/js/keyboard/TextKeyNode.js';
import SoundDragListener from '../../../../scenery-phet/js/SoundDragListener.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import AreaUnderCurveScrubber from '../model/AreaUnderCurveScrubber.js';
import CalculusGrapherModel from '../model/CalculusGrapherModel.js';
import GraphType from '../model/GraphType.js';
import TangentScrubber from '../model/TangentScrubber.js';
import AreaUnderCurvePlot from './AreaUnderCurvePlot.js';
import CurveDragListener from './CurveDragListener.js';
import CurveManipulator from './CurveManipulator.js';
import GraphNode, { GraphNodeOptions } from './GraphNode.js';
import GraphTypeLabelNode from './GraphTypeLabelNode.js';
import LabeledPointsNode from './LabeledPointsNode.js';
import ShowOriginalCurveCheckbox from './ShowOriginalCurveCheckbox.js';
import TangentArrowNode from './TangentArrowNode.js';
import TransformedCurveNode from './TransformedCurveNode.js';

type SelfOptions = EmptySelfOptions;

type OriginalGraphNodeOptions = SelfOptions & PickRequired<GraphNodeOptions, 'chartRectangleHeight' | 'tandem'>;

export default class OriginalGraphNode extends GraphNode {

  // Node for the original curve f(x), which is interactive
  private readonly originalCurveNode: TransformedCurveNode;

  // Node for the predict curve, which is interactive
  private readonly predictCurveNode: TransformedCurveNode;

  // Indicates if the original curve is visible while in 'Predict' mode.
  // This Property is controlled by the 'Show f(x)' checkbox that is visible when the 'Predict' radio button is selected.
  private readonly showOriginalCurveProperty: Property<boolean>;

  // Draggable that is used to manipulate the curve.
  private readonly curveManipulator: CurveManipulator;

  public constructor( model: CalculusGrapherModel, providedOptions: OriginalGraphNodeOptions ) {

    // Destructuring fields from the model into local constants, to improve readability.
    const { originalCurve, predictCurve, curveManipulationProperties, predictEnabledProperty } = model;

    const graphType = GraphType.ORIGINAL;

    // Label that toggles between 'Predict f(x)' and 'f(x)'
    const labelNodeTandem = providedOptions.tandem.createTandem( 'labelNode' );
    const labelNode = new HBox( {
      children: [
        new Text( CalculusGrapherFluent.predictStringProperty, {
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
      labelNode: labelNode,
      createCurveNode: false, // We'll be creating our own Node for model.originalCurve.

      // In addition to fill and stroke, make the chartRectangle interactive for accessibility.
      chartRectangleOptions: {
        fill: CalculusGrapherColors.originalChartBackgroundFillProperty,
        stroke: CalculusGrapherColors.originalChartBackgroundStrokeProperty
      },
      accessibleHeading: CalculusGrapherFluent.a11y.originalGraph.accessibleHeadingStringProperty,
      accessibleParagraph: CalculusGrapherFluent.a11y.originalGraph.accessibleParagraphStringProperty
    }, providedOptions );

    super( graphType, originalCurve, model.gridVisibleProperty, options );

    this.showOriginalCurveProperty = new BooleanProperty( false, {
      tandem: providedOptions.tandem.createTandem( 'showOriginalCurveProperty' ),
      phetioDocumentation: 'Controls whether the original curve is visible while the Predict radio button is selected.' +
                           'The value of this Property can be changed by toggling showOriginalCurveCheckbox.',
      phetioFeatured: true
    } );

    // Interactive f(x) 'original' curve
    const originalCurveNodeTandem = providedOptions.tandem.createTandem( 'originalCurveNode' );
    this.originalCurveNode = new TransformedCurveNode( originalCurve, curveManipulationProperties, this.chartTransform, {
      stroke: graphType.strokeProperty,
      discontinuousPointsFill: options.chartRectangleOptions.fill!,
      continuousLinePlotOptions: {
        lineWidth: 3 // see https://github.com/phetsims/calculus-grapher/issues/205
      },
      plotBoundsMethod: CalculusGrapherConstants.PLOT_BOUNDS_METHOD, // see https://github.com/phetsims/calculus-grapher/issues/210
      plotBounds: this.getChartRectangleBounds(), // see https://github.com/phetsims/calculus-grapher/issues/259
      isInteractiveProperty: DerivedProperty.not( predictEnabledProperty ),
      visibleProperty: new DerivedProperty(
        [ predictEnabledProperty, this.showOriginalCurveProperty ],
        ( predictEnabled, showOriginalCurve ) => !predictEnabled || showOriginalCurve, {
          tandem: originalCurveNodeTandem.createTandem( 'visibleProperty' ),
          phetioValueType: BooleanIO
        } ),
      tandem: originalCurveNodeTandem,

      // originalCurveNode does not have an input listener, but we want to allow PhET-iO clients to use
      // originalCurveNode.inputEnabledProperty to control chartRectangle.inputEnabledProperty (see derivation below).
      // See https://github.com/phetsims/calculus-grapher/issues/240
      phetioInputEnabledPropertyInstrumented: true
    } );

    // Interactive 'Predict' curve
    this.predictCurveNode = new TransformedCurveNode( predictCurve, curveManipulationProperties, this.chartTransform, {
      stroke: CalculusGrapherColors.predictCurveStrokeProperty,
      discontinuousPointsFill: options.chartRectangleOptions.fill!,
      plotBoundsMethod: CalculusGrapherConstants.PLOT_BOUNDS_METHOD, // see https://github.com/phetsims/calculus-grapher/issues/210
      plotBounds: this.getChartRectangleBounds(), // see https://github.com/phetsims/calculus-grapher/issues/259
      isInteractiveProperty: predictEnabledProperty,
      visibleProperty: predictEnabledProperty,
      tandem: options.tandem.createTandem( 'predictCurveNode' )
    } );

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

    // Curve manipulator
    this.curveManipulator = new CurveManipulator( originalCurve, predictCurve, model.predictSelectedProperty,
      this.chartTransform, options.tandem.createTandem( 'curveManipulator' ) );

    //TODO https://github.com/phetsims/calculus-grapher/issues/125 Hide after curveManipulator has been moved with keyboard.
    const cueIsVisibleProperty = new DerivedProperty( [ this.curveManipulator.focusedProperty ], focused => focused );

    // Cue for toggling curve manipulator between modes.
    const curveManipulatorCueNode = new KeyboardCueNode( {
      createKeyNode: TextKeyNode.space,
      //TODO https://github.com/phetsims/calculus-grapher/issues/125 i18n
      stringProperty: new StringProperty( 'to toggle mode' ),
      visibleProperty: cueIsVisibleProperty
    } );
    this.curveManipulator.boundsProperty.link( bounds => {
      curveManipulatorCueNode.centerX = bounds.centerX;
      curveManipulatorCueNode.top = bounds.bottom + 10;
    } );

    // 'Show f(x)' checkbox, in upper-right corner of the chartRectangle
    const showOriginalCurveCheckbox = new ShowOriginalCurveCheckbox( this.showOriginalCurveProperty,
      model.predictEnabledProperty, options.tandem.createTandem( 'showOriginalCurveCheckbox' ) );
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

    // Rendering order - see superclass GraphNode for additional children.
    this.curveLayer.addChild( this.originalCurveNode );
    this.curveLayer.addChild( this.predictCurveNode );
    this.addChild( highlightRectangle );
    highlightRectangle.moveToBack();
    this.addChild( this.curveManipulator );
    this.addChild( curveManipulatorCueNode );
    this.addChild( labeledPointsNode );
    this.addChild( showOriginalCurveCheckbox );

    // Which of the CurveNode instances is currently interactive
    const interactiveCurveNodeProperty = new DerivedProperty( [ model.predictEnabledProperty ],
      predictEnabled => predictEnabled ? this.predictCurveNode : this.originalCurveNode
    );

    //TODO https://github.com/phetsims/calculus-grapher/issues/125 Make CurveManipulator responsible for adding CurveDragListener.
    //TODO https://github.com/phetsims/calculus-grapher/issues/125 dragListener and keyboardDragListener tandems should be relocated to child elements of curveManipulator.
    // Pointer and keyboard support for moving curveManipulator and manipulating the curve.
    const curveDragListener = new CurveDragListener(
      this.curveManipulator,
      interactiveCurveNodeProperty,
      this.chartTransform,
      curveManipulationProperties.modeProperty,
      curveManipulationProperties.widthProperty,
      options.tandem // CurveDragListener will create tandem.dragListener and tandem.keyboardDragListener.
    );
    this.curveManipulator.addInputListener( curveDragListener );

    // Press anywhere in the chartRectangle to move curveManipulator and begin manipulating the curve at that point.
    this.chartRectangle.cursor = 'pointer';
    //TODO https://github.com/phetsims/calculus-grapher/issues/125 createForwardingListener has no PhET-iO support.
    this.chartRectangle.addInputListener( SoundDragListener.createForwardingListener( event => curveDragListener.dragListener.press( event ) ) );

    // This allows PhET-iO clients to use originalCurveNode.inputEnabledProperty to enabled/disable interactivity,
    // and prevents manipulation of the curves when they are hidden using the eyeToggleButton.
    // See https://github.com/phetsims/calculus-grapher/issues/240 and https://github.com/phetsims/calculus-grapher/issues/272.
    // Do not instrument.
    this.chartRectangle.setInputEnabledProperty( new DerivedProperty(
      [ this.originalCurveNode.inputEnabledProperty, predictEnabledProperty, this.curveLayerVisibleProperty ],
      ( originalCurveNodeInputEnabled, predictEnabled, curveLayerVisible ) =>
        ( originalCurveNodeInputEnabled || predictEnabled ) && curveLayerVisible
    ) );

    // Focus order
    affirm( !this.yZoomButtonGroup, 'OriginalGraphNode is not expected to have a yZoomButtonGroup.' );
    this.pdomOrder = [
      this.curveManipulator,
      showOriginalCurveCheckbox,
      this.eyeToggleButton
    ];
  }

  public override reset(): void {
    this.originalCurveNode.reset();
    this.predictCurveNode.reset();
    this.showOriginalCurveProperty.reset();
    this.curveManipulator.reset();
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