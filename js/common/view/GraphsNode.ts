// Copyright 2022-2023, University of Colorado Boulder

/**
 * GraphsNode is responsible for all graphs, animation between 'graph sets', the reference line, scrubbers,
 * labeled lines, labeled points.  The origin (0,0) is at this.graphSetNode.leftTop, the upper-left corner
 * of the top GraphNode's ChartRectangle,
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherModel from '../model/CalculusGrapherModel.js';
import GraphNode from './GraphNode.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import { Node, NodeOptions, TColor } from '../../../../scenery/js/imports.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import OriginalGraphNode from './OriginalGraphNode.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import ReferenceLineNode from './ReferenceLineNode.js';
import TangentScrubber from '../model/TangentScrubber.js';
import AreaUnderCurveScrubber from '../model/AreaUnderCurveScrubber.js';
import AncillaryTool from '../model/AncillaryTool.js';
import GraphType from '../model/GraphType.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import LabeledLinesNode from './LabeledLinesNode.js';
import GraphSet from '../model/GraphSet.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import GraphSetsAnimator from './GraphSetsAnimator.js';
import CalculusGrapherPreferences from '../model/CalculusGrapherPreferences.js';
import CurvePoint from '../model/CurvePoint.js';
import AreaUnderCurveScrubberNode from './AreaUnderCurveScrubberNode.js';
import TangentScrubberNode from './TangentScrubberNode.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';

const GRAPH_NODE_Y_SPACING = 20; // vertical space between GraphNode instances, in view coordinates

type SelfOptions = EmptySelfOptions;

type GraphsNodeOptions = SelfOptions & StrictOmit<NodeOptions, 'children'> & PickRequired<NodeOptions, 'tandem'>;

export default class GraphsNode extends Node {

  // An OriginalGraphNode is always present, because the student interacts with curves in the graph.
  public readonly originalGraphNode: OriginalGraphNode;

  // These GraphNodes will be conditionally created, based on whether they appear in model.graphSets.
  private readonly integralGraphNode?: GraphNode;
  private readonly derivativeGraphNode?: GraphNode;
  private readonly secondDerivativeGraphNode?: GraphNode;

  // For iterating over all GraphNode instances
  private readonly graphNodes: GraphNode[];

  // The parent for all GraphNode instances that are part model.graphSetProperty.value
  private readonly graphSetNode: Node;

  // Height of the ChartRectangles, in view coordinates
  private readonly chartRectangleHeight: number;

  // A reference line that extends vertically through all graphs
  private readonly referenceLineNode: ReferenceLineNode;

  // Vertical lines that pass through all graphs and follow the x position of a scrubber
  private readonly scrubberNodesParent: Node;

  private readonly graphSetsAnimator: GraphSetsAnimator;

  public constructor( model: CalculusGrapherModel, providedOptions: GraphsNodeOptions ) {

    const options = optionize<GraphsNodeOptions, SelfOptions, NodeOptions>()( {

      // NodeOptions
      phetioVisiblePropertyInstrumented: false
    }, providedOptions );

    super();

    // The view height of the graph's chartRectangle, based on the number of visible graphs.
    this.chartRectangleHeight = CalculusGrapherConstants.SINGLE_CHART_RECTANGLE_HEIGHT / model.graphSetProperty.value.length;

    // OriginalGraphNode is always instrumented, because it should always be present.
    this.originalGraphNode = new OriginalGraphNode( model, {
      chartRectangleHeight: this.chartRectangleHeight,
      tandem: options.tandem.createTandem( 'originalGraphNode' )
    } );

    this.graphNodes = [ this.originalGraphNode ];

    // Conditionally create the GraphNodes for the derived curves, if they are in model.graphSets.
    if ( GraphSet.includes( model.graphSets, GraphType.INTEGRAL ) ) {
      this.integralGraphNode = new GraphNode( GraphType.INTEGRAL, model.integralCurve, model.gridVisibleProperty, {
        chartRectangleHeight: this.chartRectangleHeight,
        tandem: options.tandem.createTandem( 'integralGraphNode' )
      } );
      this.graphNodes.push( this.integralGraphNode );
    }

    if ( GraphSet.includes( model.graphSets, GraphType.DERIVATIVE ) ) {
      this.derivativeGraphNode = new GraphNode( GraphType.DERIVATIVE, model.derivativeCurve, model.gridVisibleProperty, {
        chartRectangleHeight: this.chartRectangleHeight,
        tandem: options.tandem.createTandem( 'derivativeGraphNode' )
      } );
      this.graphNodes.push( this.derivativeGraphNode );
    }

    if ( GraphSet.includes( model.graphSets, GraphType.SECOND_DERIVATIVE ) ) {
      this.secondDerivativeGraphNode = new GraphNode( GraphType.SECOND_DERIVATIVE, model.secondDerivativeCurve, model.gridVisibleProperty, {
        chartRectangleHeight: this.chartRectangleHeight,
        tandem: options.tandem.createTandem( 'secondDerivativeGraphNode' )
      } );
      this.graphNodes.push( this.secondDerivativeGraphNode );
    }

    this.graphSetNode = new Node();

    // graphSetsAnimator is only PhET-iO instrumented if we have more than one GraphSet. If there is only one
    // graphSet, then it exists to put that GraphSet in its correct position, and then it never changes.
    this.graphSetsAnimator = new GraphSetsAnimator(
      ( model.graphSets.length > 1 ) ? options.tandem.createTandem( 'graphSetsAnimator' ) : Tandem.OPT_OUT );

    // To display a different set of graphs, get the GraphsNode, handle their layout, and adjust the position
    // of the reference line and labeled lines.
    model.graphSetProperty.link( ( newGraphSet, oldGraphSet ) => {
      assert && assert( oldGraphSet === null || newGraphSet.length === oldGraphSet.length,
        'graph sets must have the same length' );

      // Interrupt any interactions that are in-progress.
      this.interruptSubtreeInput();

      // Get the GraphNode instances for the old and new GraphSets.
      const oldGraphNodes = oldGraphSet ? this.getGraphNodes( oldGraphSet ) : null;
      const newGraphNodes = this.getGraphNodes( newGraphSet );

      this.graphSetsAnimator.changeGraphSets( this.graphSetNode, oldGraphNodes, newGraphNodes,
        this.chartRectangleHeight, GRAPH_NODE_Y_SPACING );
    } );

    // Reference Line, length adjusted depending on whether values are visible.
    this.referenceLineNode = new ReferenceLineNode( model.referenceLine, this.originalGraphNode.chartTransform,
      options.tandem.createTandem( 'referenceLineNode' ) );
    CalculusGrapherPreferences.valuesVisibleProperty.link( () => {
      const top = this.getChartRectanglesTop() - ( CalculusGrapherPreferences.valuesVisibleProperty.value ? 10 : 0 );
      const bottom = this.getChartRectanglesBottom() + 26;  // long enough to avoid overlapping other scrubbers
      this.referenceLineNode.setLineTopAndBottom( top, bottom );
    } );

    // Labeled Lines
    const labeledLinesNode = new LabeledLinesNode( model.labeledLines, model.labeledLinesLinkableElement,
      this.originalGraphNode.chartTransform, {
        labeledLineOptions: {
          lineTop: this.getChartRectanglesTop() - 13,
          lineBottom: this.getChartRectanglesBottom()
        },
        tandem: options.tandem.createTandem( 'labeledLinesNode' )
      } );

    // Parent for optional scrubbers, to maintain rendering order.
    this.scrubberNodesParent = new Node();

    options.children = [ this.graphSetNode, this.scrubberNodesParent, labeledLinesNode, this.referenceLineNode ];

    this.mutate( options );

    this.addLinkedElement( model.graphSetProperty, {
      tandem: options.tandem.createTandem( model.graphSetProperty.tandem.name )
    } );
  }

  public reset(): void {
    this.graphNodes.forEach( graphNode => graphNode.reset() );
  }

  public step( dt: number ): void {
    this.graphSetsAnimator.step( dt );
  }

  /**
   * Gets the GraphNode instances that correspond to graphSet, in the same order as graphSet.
   */
  private getGraphNodes( graphSet: GraphSet ): GraphNode[] {
    return graphSet.graphTypes.map( graphType => {
      const graphNode = _.find( this.graphNodes, graphNode => graphNode.graphType === graphType )!;
      assert && assert( graphNode, `expected a GraphNode for graphType=${graphType}` );
      return graphNode;
    } );
  }

  /**
   * Gets the y coordinate of the top of the top-most ChartRectangle.
   */
  private getChartRectanglesTop(): number {
    return this.graphSetNode.y;
  }

  /**
   * Gets the y coordinate of the bottom of the bottom-most ChartRectangle.
   */
  private getChartRectanglesBottom(): number {
    const numberOfGraphNodes = this.graphSetNode.getChildrenCount();
    return this.getChartRectanglesTop() + ( numberOfGraphNodes * this.chartRectangleHeight ) +
           ( ( numberOfGraphNodes - 1 ) * GRAPH_NODE_Y_SPACING );
  }

  /**
   * Gets the offset of the EyeToggleButton from the left edge of the ChartRectangle. This is used for dynamic layout.
   * It is the same for all GraphNodes, so use the first one.
   */
  public getEyeToggleButtonXOffset(): number {
    return this.graphNodes[ 0 ].getEyeToggleButtonXOffset();
  }

  /**
   * Adds the tangent feature to this collection of graphs.
   */
  public addTangentView( tangentScrubber: TangentScrubber, predictEnabledProperty: TReadOnlyProperty<boolean> ): void {

    const derivativeGraphNode = this.derivativeGraphNode!;
    assert && assert( derivativeGraphNode );

    // Determines whether the tangent scrubber, tangent line, and associated points are visible on the graphs.
    const tangentVisibleProperty = new DerivedProperty(
      [ tangentScrubber.visibleProperty, predictEnabledProperty ],
      ( tangentScrubberVisible, predictEnabled ) => tangentScrubberVisible && !predictEnabled, {
        // No PhET-iO instrumentation because this is more complicated than is useful for clients.
      } );

    // Add the scrubber
    const tangentScrubberNode = new TangentScrubberNode( tangentScrubber, this.originalGraphNode.chartTransform, {
      lineTop: this.getChartRectanglesTop(),
      lineBottom: this.getChartRectanglesBottom(),
      visibleProperty: tangentVisibleProperty,
      tandem: this.tandem.createTandem( 'tangentScrubberNode' )
    } );
    this.scrubberNodesParent.addChild( tangentScrubberNode );

    // Add the double-headed tangent arrow at the tangent point on the original graph.
    this.originalGraphNode.addTangentArrowNode( tangentScrubber, tangentVisibleProperty );

    // Plot a point on the derivative graph, to show the point that corresponds to the slope of the tangent.
    this.addPlottedPoint( tangentScrubber, tangentVisibleProperty, derivativeGraphNode,
      tangentScrubber.derivativeCurvePointProperty, CalculusGrapherColors.derivativeCurveStrokeProperty,
      'tangentPointNode' );
  }

  /**
   * Adds the 'area under curve' feature to this collection of graphs.
   */
  public addAreaUnderCurveView( areaUnderCurveScrubber: AreaUnderCurveScrubber, predictEnabledProperty: TReadOnlyProperty<boolean> ): void {

    const integralGraphNode = this.integralGraphNode!;
    assert && assert( integralGraphNode );

    // Determines whether the area-under-curve scrubber, plot, and associated points are visible on the graphs.
    const areaUnderCurveVisibleProperty = new DerivedProperty(
      [ areaUnderCurveScrubber.visibleProperty, predictEnabledProperty ],
      ( tangentScrubberVisible, predictEnabled ) => tangentScrubberVisible && !predictEnabled, {
        // No PhET-iO instrumentation because this is more complicated than is useful for clients.
      } );

    // Add the scrubber
    const areaUnderCurveScrubberNode = new AreaUnderCurveScrubberNode( areaUnderCurveScrubber, this.originalGraphNode.chartTransform, {
      lineTop: this.getChartRectanglesTop(),
      lineBottom: this.getChartRectanglesBottom(),
      visibleProperty: areaUnderCurveVisibleProperty,
      tandem: this.tandem.createTandem( 'areaUnderCurveScrubberNode' )
    } );
    this.scrubberNodesParent.addChild( areaUnderCurveScrubberNode );

    // Add a plot of the area under the curve on the original graph.
    this.originalGraphNode.addAreaUnderCurvePlot( areaUnderCurveScrubber, areaUnderCurveVisibleProperty );

    // Plot a point on the integral graph, to show the point that corresponds to the area under the curve.
    this.addPlottedPoint( areaUnderCurveScrubber, areaUnderCurveVisibleProperty, integralGraphNode,
      areaUnderCurveScrubber.integralCurvePointProperty, CalculusGrapherColors.integralCurveStrokeProperty,
      'areaUnderCurvePointNode' );
  }

  /**
   * Adds a PlottedPoint to a specific graph.
   */
  private addPlottedPoint( ancillaryTool: AncillaryTool, visibleProperty: TReadOnlyProperty<boolean>,
                           graphNode: GraphNode, curvePointProperty: TReadOnlyProperty<CurvePoint>,
                           fill: TColor, tandemName: string ): void {
    const plottedPoint = graphNode.addPlottedPoint( curvePointProperty, fill, visibleProperty, tandemName );
    plottedPoint.addLinkedElement( ancillaryTool, {
      tandem: plottedPoint.tandem.createTandem( ancillaryTool.tandem.name )
    } );
  }
}

calculusGrapher.register( 'GraphsNode', GraphsNode );
