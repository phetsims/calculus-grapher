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
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import { ChartRectangleOptions } from '../../../../bamboo/js/ChartRectangle.js';
import optionize, { combineOptions, EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import AccessibleInteractiveOptions from '../../../../scenery-phet/js/accessibility/AccessibleInteractiveOptions.js';
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
      chartRectangleOptions: combineOptions<ChartRectangleOptions>( {}, AccessibleInteractiveOptions, {
        fill: CalculusGrapherColors.originalChartBackgroundFillProperty,
        stroke: CalculusGrapherColors.originalChartBackgroundStrokeProperty
      } ),
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
    this.curveLayer.addChild( this.originalCurveNode );

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
    this.curveLayer.addChild( this.predictCurveNode );

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

    // 'Show f(x)' checkbox, in upper-right corner of the chartRectangle
    const showOriginalCurveCheckbox = new ShowOriginalCurveCheckbox( this.showOriginalCurveProperty,
      model.predictEnabledProperty, options.tandem.createTandem( 'showOriginalCurveCheckbox' ) );
    this.addChild( showOriginalCurveCheckbox );
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

    // Which of the CurveNode instances is currently interactive
    const interactiveCurveNodeProperty = new DerivedProperty( [ model.predictEnabledProperty ],
      predictEnabled => predictEnabled ? this.predictCurveNode : this.originalCurveNode
    );

    // A single DragListener on the entire chartRectangle. Press anywhere in the chartRectangle to modify the curve.
    this.chartRectangle.cursor = 'pointer';
    this.chartRectangle.addInputListener( new CurveDragListener( interactiveCurveNodeProperty, this.chartTransform,
      curveManipulationProperties.modeProperty, curveManipulationProperties.widthProperty,
      options.tandem.createTandem( 'dragListener' ) ) );

    // This allows PhET-iO clients to use originalCurveNode.inputEnabledProperty to enabled/disable interactivity,
    // and prevents manipulation of the curves when they are hidden using the eyeToggleButton.
    // See https://github.com/phetsims/calculus-grapher/issues/240 and https://github.com/phetsims/calculus-grapher/issues/272.
    // Do not instrument.
    this.chartRectangle.setInputEnabledProperty( new DerivedProperty(
      [ this.originalCurveNode.inputEnabledProperty, predictEnabledProperty, this.curveLayerVisibleProperty ],
      ( originalCurveNodeInputEnabled, predictEnabled, curveLayerVisible ) =>
        ( originalCurveNodeInputEnabled || predictEnabled ) && curveLayerVisible
    ) );
  }

  public override reset(): void {
    this.originalCurveNode.reset();
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