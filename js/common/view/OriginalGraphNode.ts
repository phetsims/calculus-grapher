// Copyright 2022-2026, University of Colorado Boulder

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
import CalculusGrapherSymbols from '../CalculusGrapherSymbols.js';
import AreaUnderCurveScrubber from '../model/AreaUnderCurveScrubber.js';
import CalculusGrapherModel from '../model/CalculusGrapherModel.js';
import GraphType from '../model/GraphType.js';
import TangentScrubber from '../model/TangentScrubber.js';
import AreaUnderCurvePlot from './AreaUnderCurvePlot.js';
import CueingArrowsNode from './CueingArrowsNode.js';
import CurveManipulatorKeyboardCueNode from './CurveManipulatorKeyboardCueNode.js';
import CurveManipulatorNode from './CurveManipulatorNode.js';
import CurveNode from './CurveNode.js';
import OriginalGraphAccessibleListNode from './description/OriginalGraphAccessibleListNode.js';
import GraphNode, { GraphNodeOptions } from './GraphNode.js';
import GraphTypeLabelNode from './GraphTypeLabelNode.js';
import LabeledPointsNode from './LabeledPointsNode.js';
import ShowOriginalCurveCheckbox from './ShowOriginalCurveCheckbox.js';
import TangentArrowNode from './TangentArrowNode.js';

type SelfOptions = EmptySelfOptions;

type OriginalGraphNodeOptions = SelfOptions & PickRequired<GraphNodeOptions, 'chartRectangleHeight' | 'tandem'>;

export default class OriginalGraphNode extends GraphNode {

  // Node for the original curve f(x), which is interactive
  private readonly originalCurveNode: CurveNode;

  // Node for the predict curve, which is interactive
  private readonly predictCurveNode: CurveNode;

  // Indicates if the original curve is visible while in 'Predict' mode.
  // This Property is controlled by the 'Show f(x)' checkbox that is visible when the 'Predict' radio button is selected.
  private readonly _showOriginalCurveProperty: Property<boolean>;
  public readonly showOriginalCurveProperty: TReadOnlyProperty<boolean>;

  // Manipulators for original and predict curves.
  private readonly originalCurveManipulatorNode: CurveManipulatorNode;
  private readonly predictCurveManipulatorNode: CurveManipulatorNode;

  // For core description
  public readonly originalCurveVisibleProperty: TReadOnlyProperty<boolean>;
  public readonly predictCurveVisibleProperty: TReadOnlyProperty<boolean>;

  public constructor( model: CalculusGrapherModel, providedOptions: OriginalGraphNodeOptions ) {

    // Destructure fields from the model into local constants to improve readability.
    const {
      curveManipulationProperties,
      gridVisibleProperty,
      labeledPoints,
      labeledPointsLinkableElement,
      originalCurve,
      originalCurveManipulator,
      predictCurve,
      predictCurveManipulator,
      predictEnabledProperty,
      predictSelectedProperty
    } = model;

    const graphType = GraphType.ORIGINAL;

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

    const options = optionize<OriginalGraphNodeOptions, SelfOptions, GraphNodeOptions>()( {

      // GraphNodeOptions
      labelNode: labelNode,
      createCurveNode: false, // We'll be creating our own Node for model.originalCurve.

      // In addition to fill and stroke, make the chartRectangle interactive for accessibility.
      chartRectangleOptions: {
        cursor: 'pointer', // Press anywhere in the chartRectangle manipulate curve.
        fill: CalculusGrapherColors.originalChartBackgroundFillProperty,
        stroke: CalculusGrapherColors.originalChartBackgroundStrokeProperty
      },
      accessibleHeading: CalculusGrapherFluent.a11y.primaryGraphArea.accessibleHeadingStringProperty,
      accessibleListNode: new OriginalGraphAccessibleListNode( model.originalCurve, model.predictCurve,
        model.gridVisibleProperty ),
      eyeToggleButtonOptions: {
        accessibleNameOn: CalculusGrapherFluent.a11y.eyeToggleButton.accessibleNameOn.primaryStringProperty,
        accessibleNameOff: CalculusGrapherFluent.a11y.eyeToggleButton.accessibleNameOff.primaryStringProperty
      }
    }, providedOptions );

    super( graphType, originalCurve, gridVisibleProperty, options );

    this._showOriginalCurveProperty = new BooleanProperty( false, {
      tandem: providedOptions.tandem.createTandem( 'showOriginalCurveProperty' ),
      phetioDocumentation: 'Controls whether the original curve is visible while the Predict radio button is selected.' +
                           'The value of this Property can be changed by toggling showOriginalCurveCheckbox.',
      phetioFeatured: true
    } );
    this.showOriginalCurveProperty = this._showOriginalCurveProperty;

    // 'Show f(x)' checkbox, in upper-right corner of the chartRectangle
    const showOriginalCurveCheckbox = new ShowOriginalCurveCheckbox( this._showOriginalCurveProperty,
      predictEnabledProperty, options.tandem.createTandem( 'showOriginalCurveCheckbox' ) );
    showOriginalCurveCheckbox.boundsProperty.link( () => {
      showOriginalCurveCheckbox.right =
        this.chartTransform.modelToViewX( CalculusGrapherConstants.CURVE_X_RANGE.getMax() ) - CalculusGrapherConstants.GRAPH_X_MARGIN;
      showOriginalCurveCheckbox.top = CalculusGrapherConstants.GRAPH_Y_MARGIN;
    } );

    // Interactive f(x) 'original' curve
    const originalCurveNodeTandem = providedOptions.tandem.createTandem( 'originalCurveNode' );
    this.originalCurveNode = new CurveNode( originalCurve, this.chartTransform, {
      stroke: graphType.strokeProperty,
      discontinuousPointsFill: options.chartRectangleOptions.fill!,
      continuousLinePlotOptions: {
        lineWidth: 3 // see https://github.com/phetsims/calculus-grapher/issues/205
      },
      plotBoundsMethod: CalculusGrapherConstants.PLOT_BOUNDS_METHOD, // see https://github.com/phetsims/calculus-grapher/issues/210
      plotBounds: this.getChartRectangleBounds(), // see https://github.com/phetsims/calculus-grapher/issues/259
      visibleProperty: new DerivedProperty(
        [ predictEnabledProperty, this.showOriginalCurveProperty ],
        ( predictEnabled, showOriginalCurve ) => !predictEnabled || showOriginalCurve, {
          tandem: originalCurveNodeTandem.createTandem( 'visibleProperty' ),
          phetioValueType: BooleanIO
        } ),
      tandem: originalCurveNodeTandem,
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

    // Original curve manipulator
    this.originalCurveManipulatorNode = new CurveManipulatorNode(
      originalCurveManipulator,
      originalCurve,
      curveManipulationProperties.modeProperty,
      curveManipulationProperties.widthProperty,
      this.chartTransform,
      new DerivedProperty( [ predictSelectedProperty, this.originalCurveNode.inputEnabledProperty ],
        ( predictSelected, inputEnabled ) => !predictSelected && inputEnabled ),
      {
        // Child of originalCurveNode in PhET-iO tree.
        tandem: this.originalCurveNode.tandem.createTandem( 'manipulatorNode' ),
        accessibleName: CalculusGrapherFluent.a11y.primaryCurveManipulator.accessibleName.createProperty( {
          variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty
        } ),
        accessibleHelpText: CalculusGrapherFluent.a11y.primaryCurveManipulator.accessibleHelpText.createProperty( {
          variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty
        } )
      } );

    // Predict curve manipulator
    this.predictCurveManipulatorNode = new CurveManipulatorNode(
      predictCurveManipulator,
      predictCurve,
      curveManipulationProperties.modeProperty,
      curveManipulationProperties.widthProperty,
      this.chartTransform,
      DerivedProperty.and( [ predictSelectedProperty, this.predictCurveNode.inputEnabledProperty ] ),
      {
        // Child of predictCurveNode in PhET-iO tree.
        tandem: this.predictCurveNode.tandem.createTandem( 'manipulatorNode' ),
        accessibleName: CalculusGrapherFluent.a11y.predictCurveManipulator.accessibleNameStringProperty,
        accessibleHelpText: CalculusGrapherFluent.a11y.predictCurveManipulator.accessibleHelpText.createProperty( {
          variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty
        } )
      } );

    // Cueing arrows for the original and predict curve manipulators.
    const originalCueingArrowsNode = new CueingArrowsNode( this.originalCurveManipulatorNode, this.chartTransform, {
      // Child of originalCurveManipulatorNode in PhET-iO tree.
      tandem: this.originalCurveManipulatorNode.tandem.createTandem( 'cueingArrowsNode' ),
      phetioDocumentation: 'Cueing arrows for the original curve, visible until the user moves the curve manipulator.'
    } );
    const predictCueingArrowsNode = new CueingArrowsNode( this.predictCurveManipulatorNode, this.chartTransform, {
      // Child of predictCurveManipulatorNode in PhET-iO tree.
      tandem: this.predictCurveManipulatorNode.tandem.createTandem( 'cueingArrowsNode' ),
      phetioDocumentation: 'Cueing arrows for the predict curve, visible until the user moves the curve manipulator.'
    } );

    // Keyboard cues (popups) for toggling the manipulators between modes. Each manipulator has its own popup
    // because they have different colors, so it might not be obvious that they behave similarly.
    const originalKeyboardCueNode = new CurveManipulatorKeyboardCueNode( this.originalCurveManipulatorNode );
    const predictKeyboardCueNode = new CurveManipulatorKeyboardCueNode( this.predictCurveManipulatorNode );

    // Center the keyboard cues below their manipulators.
    const keyboardCueYOffset = 10;
    this.originalCurveManipulatorNode.boundsProperty.link( bounds => {
      originalKeyboardCueNode.centerX = bounds.centerX;
      originalKeyboardCueNode.top = bounds.bottom + keyboardCueYOffset;
    } );
    this.predictCurveManipulatorNode.boundsProperty.link( bounds => {
      predictKeyboardCueNode.centerX = bounds.centerX;
      predictKeyboardCueNode.top = bounds.bottom + keyboardCueYOffset;
    } );

    // Put everything related to curve manipulation in a layer to simplify controlling visibility.
    const manipulatorsLayer = new Node( {
      children: [
        this.originalCurveManipulatorNode,
        this.predictCurveManipulatorNode,
        originalCueingArrowsNode,
        predictCueingArrowsNode,
        originalKeyboardCueNode,
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
        CalculusGrapherColors.originalCurveStrokeProperty
      ], ( predictEnabled, predictCurveStroke, originalCurveStroke ) =>
        predictEnabled ? predictCurveStroke : originalCurveStroke )
    } );

    // Rendering order - see superclass GraphNode for additional children.
    this.curveLayer.addChild( this.originalCurveNode );
    this.curveLayer.addChild( this.predictCurveNode );
    this.addChild( highlightRectangle );
    highlightRectangle.moveToBack();
    this.addChild( labeledPointsNode );
    this.addChild( manipulatorsLayer );
    this.addChild( showOriginalCurveCheckbox );

    // Press anywhere in the chartRectangle to move curveManipulator and begin manipulating the curve at that point.
    this.chartRectangle.addInputListener( SoundDragListener.createForwardingListener( event => {
      if ( this.curveLayerVisibleProperty.value ) {
        if ( predictSelectedProperty.value ) {
          this.predictCurveManipulatorNode.forwardPressListenerEvent( event );
        }
        else {
          this.originalCurveManipulatorNode.forwardPressListenerEvent( event );
        }
      }
    } ) );

    // Adjust the cursor for chartRectangle based on what is currently editable.
    Multilink.lazyMultilink( [
      this.curveLayerVisibleProperty,
      predictSelectedProperty,
      this.predictCurveNode.inputEnabledProperty,
      this.originalCurveNode.inputEnabledProperty
    ], ( curveLayerVisible, predictSelected, predictInputEnabled, originalInputEnabled ) => {
      if ( curveLayerVisible && predictSelected && predictInputEnabled ) {
        // Predict curve can be edited.
        this.chartRectangle.cursor = 'pointer';
      }
      else if ( curveLayerVisible && !predictSelected && originalInputEnabled ) {
        // Original curve can be edited.
        this.chartRectangle.cursor = 'pointer';
      }
      else {
        // Nothing is editable.
        this.chartRectangle.cursor = 'default';
      }
    } );

    // Focus order
    affirm( !this.yZoomButtonGroup, 'OriginalGraphNode is not expected to have a yZoomButtonGroup.' );
    this.pdomOrder = [
      this.originalCurveManipulatorNode,
      this.predictCurveManipulatorNode,
      showOriginalCurveCheckbox,
      this.eyeToggleButton
    ];

    this.originalCurveVisibleProperty = new DerivedProperty( [
        this.curveLayerVisibleProperty,
        this.showOriginalCurveProperty,
        model.predictEnabledProperty
      ],
      ( originalCurveLayerVisible, showOriginalCurve, predictEnabled ) =>
        originalCurveLayerVisible && ( showOriginalCurve || !predictEnabled ) );

    this.predictCurveVisibleProperty = DerivedProperty.and( [ this.curveLayerVisibleProperty, model.predictEnabledProperty ] );
  }

  public override reset(): void {
    this.originalCurveNode.reset();
    this.predictCurveNode.reset();
    this._showOriginalCurveProperty.reset();
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