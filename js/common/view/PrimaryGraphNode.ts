// Copyright 2022-2026, University of Colorado Boulder

/**
 * PrimaryGraphNode is the view representation of a Primary Graph, which includes two curves
 *  that can be user-manipulated as well as cueing arrows.
 * Labeled Points (only visible/accessible through PhET-IO) are also added to this graph
 * PrimaryGraphNode extends GraphNode.
 * However, the zoom Button of GraphNode is set to be invisible in the PrimaryGraphNode
 *
 * The public methods of PrimaryGraphNode allow a client to add
 * - a ScrubberNode
 * - a TangentArrowNode
 * - an AreaUnderCurvePlot
 *
 * The decision to use the names 'original curve' and 'original graph' is documented in
 * https://github.com/phetsims/calculus-grapher/issues/119.
 * The decision to rename to 'primary curve' and 'primary graph' is documented in
 * https://github.com/phetsims/calculus-grapher/issues/378.
 *
 * @author Martin Veillette
 * @author Brandon Li
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import Property from '../../../../axon/js/Property.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import SoundDragListener from '../../../../scenery-phet/js/SoundDragListener.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
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
import CueingArrowsNode from './CueingArrowsNode.js';
import CurveManipulatorKeyboardCueNode from './CurveManipulatorKeyboardCueNode.js';
import CurveManipulatorNode from './CurveManipulatorNode.js';
import CurveNode from './CurveNode.js';
import PrimaryGraphAccessibleListNode from './description/PrimaryGraphAccessibleListNode.js';
import GraphNode, { GraphNodeOptions } from './GraphNode.js';
import GraphTypeLabelNode from './GraphTypeLabelNode.js';
import LabeledPointsNode from './LabeledPointsNode.js';
import ShowPrimaryCurveCheckbox from './ShowPrimaryCurveCheckbox.js';
import TangentArrowNode from './TangentArrowNode.js';

type SelfOptions = EmptySelfOptions;

type PrimaryGraphNodeOptions = SelfOptions & PickRequired<GraphNodeOptions, 'chartRectangleHeight' | 'tandem'>;

export default class PrimaryGraphNode extends GraphNode {

  // Node for the primary curve f(x), which is interactive
  private readonly primaryCurveNode: CurveNode;

  // Node for the predict curve, which is interactive
  private readonly predictCurveNode: CurveNode;

  // Indicates if the primary curve is visible while in 'Predict' mode.
  // This Property is controlled by the 'Show f(x)' checkbox that is visible when the 'Predict' radio button is selected.
  private readonly _showPrimaryCurveProperty: Property<boolean>;
  public readonly showPrimaryCurveProperty: TReadOnlyProperty<boolean>;

  // Manipulators for primary and predict curves.
  private readonly primaryCurveManipulator: CurveManipulatorNode;
  private readonly predictCurveManipulatorNode: CurveManipulatorNode;

  // For core description
  public readonly primaryCurveVisibleProperty: TReadOnlyProperty<boolean>;
  public readonly predictCurveVisibleProperty: TReadOnlyProperty<boolean>;

  public constructor( model: CalculusGrapherModel, providedOptions: PrimaryGraphNodeOptions ) {

    // Destructure fields from the model into local constants to improve readability.
    const {
      curveManipulationProperties,
      gridVisibleProperty,
      labeledPoints,
      labeledPointsLinkableElement,
      primaryCurve,
      primaryCurveManipulator,
      predictCurve,
      predictCurveManipulator,
      predictEnabledProperty
    } = model;

    const graphType = GraphType.PRIMARY;

    // Label that toggles between 'Predict f(x)' and 'f(x)'
    const labelNodeTandem = providedOptions.tandem.createTandem( 'labelNode' );
    const labelNode = new HBox( {
      children: [
        new Text( CalculusGrapherFluent.predictStringProperty, {
          font: CalculusGrapherConstants.CONTROL_FONT,
          maxWidth: 100,
          visibleProperty: predictEnabledProperty, // show/hide 'Predict'
          tandem: labelNodeTandem.createTandem( 'predictText' ),
          phetioDocumentation: 'Label that appears in the upper-left corner of the graph. Doubles as the graph name and the label for the vertical axis.'
        } ),
        new GraphTypeLabelNode( graphType )
      ],
      spacing: 5,
      tandem: labelNodeTandem
    } );

    const options = optionize<PrimaryGraphNodeOptions, SelfOptions, GraphNodeOptions>()( {

      // GraphNodeOptions
      labelNode: labelNode,
      createCurveNode: false, // We'll be creating our own Node for model.primaryCurve.

      // In addition to fill and stroke, make the chartRectangle interactive for accessibility.
      chartRectangleOptions: {
        cursor: 'pointer', // Press anywhere in the chartRectangle manipulate curve.
        fill: CalculusGrapherColors.primaryGraphBackgroundFillProperty,
        stroke: CalculusGrapherColors.primaryGraphBackgroundStrokeProperty
      },
      accessibleHeading: CalculusGrapherFluent.a11y.graphArea.primary.accessibleHeadingStringProperty,
      curveVisibilityToggleButtonOptions: {
        accessibleNameOn: CalculusGrapherFluent.a11y.curveVisibilityToggleButton.accessibleNameOn.primaryStringProperty,
        accessibleNameOff: CalculusGrapherFluent.a11y.curveVisibilityToggleButton.accessibleNameOff.primaryStringProperty
      }
    }, providedOptions );

    super( graphType, primaryCurve, gridVisibleProperty, options );

    this._showPrimaryCurveProperty = new BooleanProperty( false, {
      tandem: providedOptions.tandem.createTandem( 'showPrimaryCurveProperty' ),
      phetioDocumentation: 'Controls whether the primary curve is visible while the Predict radio button is selected.' +
                           'The value of this Property can be changed by toggling showPrimaryCurveCheckbox.',
      phetioFeatured: true
    } );
    this.showPrimaryCurveProperty = this._showPrimaryCurveProperty;

    // 'Show f(x)' checkbox, in upper-right corner of the chartRectangle
    const showPrimaryCurveCheckbox = new ShowPrimaryCurveCheckbox( this._showPrimaryCurveProperty,
      predictEnabledProperty, options.tandem.createTandem( 'showPrimaryCurveCheckbox' ) );
    showPrimaryCurveCheckbox.boundsProperty.link( () => {
      showPrimaryCurveCheckbox.right =
        this.chartTransform.modelToViewX( CalculusGrapherConstants.CURVE_X_RANGE.getMax() ) - CalculusGrapherConstants.GRAPH_X_MARGIN;
      showPrimaryCurveCheckbox.top = CalculusGrapherConstants.GRAPH_Y_MARGIN;
    } );

    // Interactive f(x) 'primary' curve
    const primaryCurveNodeTandem = providedOptions.tandem.createTandem( 'primaryCurveNode' );
    this.primaryCurveNode = new CurveNode( primaryCurve, this.chartTransform, {
      stroke: graphType.strokeProperty,
      discontinuousPointsFill: options.chartRectangleOptions.fill!,
      continuousLinePlotOptions: {
        lineWidth: 3 // see https://github.com/phetsims/calculus-grapher/issues/205
      },
      plotBoundsMethod: CalculusGrapherConstants.PLOT_BOUNDS_METHOD, // see https://github.com/phetsims/calculus-grapher/issues/210
      plotBounds: this.getChartRectangleBounds(), // see https://github.com/phetsims/calculus-grapher/issues/259
      visibleProperty: new DerivedProperty(
        [ predictEnabledProperty, this.showPrimaryCurveProperty ],
        ( predictEnabled, showPrimaryCurve ) => !predictEnabled || showPrimaryCurve, {
          tandem: primaryCurveNodeTandem.createTandem( 'visibleProperty' ),
          phetioValueType: BooleanIO
        } ),
      tandem: primaryCurveNodeTandem,
      phetioInputEnabledPropertyInstrumented: true
    } );

    // Interactive 'Predict' curve
    this.predictCurveNode = new CurveNode( predictCurve, this.chartTransform, {
      stroke: CalculusGrapherColors.predictCurveStrokeProperty,
      discontinuousPointsFill: options.chartRectangleOptions.fill!,
      plotBoundsMethod: CalculusGrapherConstants.PLOT_BOUNDS_METHOD, // see https://github.com/phetsims/calculus-grapher/issues/210
      plotBounds: this.getChartRectangleBounds(), // see https://github.com/phetsims/calculus-grapher/issues/259
      visibleProperty: predictEnabledProperty,
      tandem: options.tandem.createTandem( 'predictCurveNode' ),
      phetioInputEnabledPropertyInstrumented: true
    } );

    // Primary curve manipulator
    this.primaryCurveManipulator = new CurveManipulatorNode(
      primaryCurveManipulator,
      primaryCurve,
      curveManipulationProperties.curveManipulationTypeProperty,
      curveManipulationProperties.widthProperty,
      this.chartTransform,
      new DerivedProperty( [ predictEnabledProperty, this.primaryCurveNode.inputEnabledProperty ],
        ( predictEnabled, inputEnabled ) => !predictEnabled && inputEnabled ),
      {
        // Child of primaryCurveNode in PhET-iO tree.
        tandem: this.primaryCurveNode.tandem.createTandem( 'manipulatorNode' ),
        accessibleName: CalculusGrapherFluent.a11y.curveManipulator.primary.accessibleNameStringProperty,
        accessibleHelpText: CalculusGrapherFluent.a11y.curveManipulator.primary.accessibleHelpTextStringProperty
      } );

    // Predict curve manipulator
    this.predictCurveManipulatorNode = new CurveManipulatorNode(
      predictCurveManipulator,
      predictCurve,
      curveManipulationProperties.curveManipulationTypeProperty,
      curveManipulationProperties.widthProperty,
      this.chartTransform,
      DerivedProperty.and( [ predictEnabledProperty, this.predictCurveNode.inputEnabledProperty ] ),
      {
        // Child of predictCurveNode in PhET-iO tree.
        tandem: this.predictCurveNode.tandem.createTandem( 'manipulatorNode' ),
        accessibleName: CalculusGrapherFluent.a11y.curveManipulator.predict.accessibleNameStringProperty,
        accessibleHelpText: CalculusGrapherFluent.a11y.curveManipulator.predict.accessibleHelpTextStringProperty
      } );

    // Cueing arrows for the primary and predict curve manipulators.
    const primaryCueingArrowsNode = new CueingArrowsNode( this.primaryCurveManipulator, this.chartTransform, {
      // Child of primaryCurveManipulatorNode in PhET-iO tree.
      tandem: this.primaryCurveManipulator.tandem.createTandem( 'cueingArrowsNode' ),
      phetioDocumentation: 'Cueing arrows for the primary curve, visible until the user moves the curve manipulator.'
    } );
    const predictCueingArrowsNode = new CueingArrowsNode( this.predictCurveManipulatorNode, this.chartTransform, {
      // Child of predictCurveManipulatorNode in PhET-iO tree.
      tandem: this.predictCurveManipulatorNode.tandem.createTandem( 'cueingArrowsNode' ),
      phetioDocumentation: 'Cueing arrows for the predict curve, visible until the user moves the curve manipulator.'
    } );

    // Keyboard cues (popups) for toggling the manipulators between modes. Each manipulator has its own popup
    // because they have different colors, so it might not be obvious that they behave similarly.
    const primaryKeyboardCueNode = new CurveManipulatorKeyboardCueNode( this.primaryCurveManipulator );
    const predictKeyboardCueNode = new CurveManipulatorKeyboardCueNode( this.predictCurveManipulatorNode );

    // Center the keyboard cues below their manipulators.
    const keyboardCueYOffset = 10;
    this.primaryCurveManipulator.boundsProperty.link( bounds => {
      primaryKeyboardCueNode.centerX = bounds.centerX;
      primaryKeyboardCueNode.top = bounds.bottom + keyboardCueYOffset;
    } );
    this.predictCurveManipulatorNode.boundsProperty.link( bounds => {
      predictKeyboardCueNode.centerX = bounds.centerX;
      predictKeyboardCueNode.top = bounds.bottom + keyboardCueYOffset;
    } );

    // Put everything related to curve manipulation in a layer to simplify controlling visibility.
    const manipulatorsLayer = new Node( {
      children: [
        this.primaryCurveManipulator,
        this.predictCurveManipulatorNode,
        primaryCueingArrowsNode,
        predictCueingArrowsNode,
        primaryKeyboardCueNode,
        predictKeyboardCueNode
      ],
      visibleProperty: this.curveLayerVisibleProperty
    } );

    // Labeled points
    const labeledPointsNode = new LabeledPointsNode( labeledPoints, labeledPointsLinkableElement,
      this.chartTransform, predictEnabledProperty, this.curveLayerVisibleProperty,
      options.tandem.createTandem( 'labeledPointsNode' )
    );

    // Add a highlight around the chartRectangle, color coded to the curve that is interactive.
    // See https://github.com/phetsims/calculus-grapher/issues/204
    const highlightRectangle = new Rectangle( 0, 0, this.chartRectangle.width + 6, this.chartRectangle.height + 6, {
      center: this.chartRectangle.center,
      opacity: 0.25,
      visibleProperty: this.curveLayerVisibleProperty,
      fill: new DerivedProperty( [
        predictEnabledProperty,
        CalculusGrapherColors.predictCurveStrokeProperty,
        CalculusGrapherColors.primaryCurveStrokeProperty
      ], ( predictEnabled, predictCurveStroke, primaryCurveStroke ) =>
        predictEnabled ? predictCurveStroke : primaryCurveStroke )
    } );

    // Rendering order - see superclass GraphNode for additional children.
    this.curveLayer.addChild( this.primaryCurveNode );
    this.curveLayer.addChild( this.predictCurveNode );
    this.addChild( highlightRectangle );
    highlightRectangle.moveToBack();
    this.addChild( labeledPointsNode );
    this.addChild( manipulatorsLayer );
    this.addChild( showPrimaryCurveCheckbox );

    // Press anywhere in the chartRectangle to move curveManipulator and begin manipulating the curve at that point.
    this.chartRectangle.addInputListener( SoundDragListener.createForwardingListener( event => {
      if ( this.curveLayerVisibleProperty.value ) {
        if ( predictEnabledProperty.value ) {
          this.predictCurveManipulatorNode.forwardPressListenerEvent( event );
        }
        else {
          this.primaryCurveManipulator.forwardPressListenerEvent( event );
        }
      }
    } ) );

    // Adjust the cursor for chartRectangle based on what is currently editable.
    Multilink.lazyMultilink( [
      this.curveLayerVisibleProperty,
      predictEnabledProperty,
      this.predictCurveNode.inputEnabledProperty,
      this.primaryCurveNode.inputEnabledProperty
    ], ( curveLayerVisible, predictEnabled, predictInputEnabled, primaryInputEnabled ) => {
      if ( curveLayerVisible && predictEnabled && predictInputEnabled ) {
        // Predict curve can be edited.
        this.chartRectangle.cursor = 'pointer';
      }
      else if ( curveLayerVisible && !predictEnabled && primaryInputEnabled ) {
        // Primary curve can be edited.
        this.chartRectangle.cursor = 'pointer';
      }
      else {
        // Nothing is editable.
        this.chartRectangle.cursor = 'default';
      }
    } );

    this.primaryCurveVisibleProperty = new DerivedProperty( [
        this.curveLayerVisibleProperty,
        this.showPrimaryCurveProperty,
        model.predictEnabledProperty
      ],
      ( primaryCurveLayerVisible, showPrimaryCurve, predictEnabled ) =>
        primaryCurveLayerVisible && ( showPrimaryCurve || !predictEnabled ) );

    this.predictCurveVisibleProperty = DerivedProperty.and( [ this.curveLayerVisibleProperty, model.predictEnabledProperty ] );

    // Add AccessibleListNode to describe the graph.
    const accessibleListNode = new PrimaryGraphAccessibleListNode( model.primaryCurve, model.predictCurve,
      this.primaryCurveVisibleProperty, this.predictCurveVisibleProperty,
      model.predictEnabledProperty, model.gridVisibleProperty );
    this.addChild( accessibleListNode );

    // Focus order
    affirm( !this.yZoomButtonGroup, 'PrimaryGraphNode is not expected to have a yZoomButtonGroup.' );
    this.pdomOrder = [
      accessibleListNode,
      this.primaryCurveManipulator,
      this.predictCurveManipulatorNode,
      showPrimaryCurveCheckbox,
      this.curveVisibilityToggleButton
    ];
  }

  public override reset(): void {
    this.primaryCurveNode.reset();
    this.predictCurveNode.reset();
    this._showPrimaryCurveProperty.reset();
    super.reset();
  }

  /**
   * Adds a double-headed tangent arrow to PrimaryGraphNode.
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
   * Adds a plot to PrimaryGraphNode that shows the area under the curve.
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

calculusGrapher.register( 'PrimaryGraphNode', PrimaryGraphNode );