// Copyright 2022-2023, University of Colorado Boulder

/**
 * Class for the all the graphs in the 'Calculus Grapher' simulation.
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
import CalculusGrapherVisibleProperties from './CalculusGrapherVisibleProperties.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import ReferenceLineNode from './ReferenceLineNode.js';
import TangentScrubber from '../model/TangentScrubber.js';
import AreaUnderCurveScrubber from '../model/AreaUnderCurveScrubber.js';
import AncillaryTool from '../model/AncillaryTool.js';
import GraphType from '../model/GraphType.js';
import Curve from '../model/Curve.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import VerticalLinesNode from './VerticalLinesNode.js';
import GraphSet from '../model/GraphSet.js';

// How much VerticalLines extend above and below the graphs
const VERTICAL_LINE_Y_EXTENT = 4;

type SelfOptions = EmptySelfOptions;

type GraphNodesOptions = SelfOptions & StrictOmit<NodeOptions, 'children'>;

export default class GraphsNode extends Node {

  // An OriginalGraphNode is always present, because the student interacts with curves in the graph.
  public readonly originalGraphNode: OriginalGraphNode;

  // These GraphNodes will be conditionally created, based on whether they appear in model.graphSets.
  private readonly integralGraphNode?: GraphNode;
  private readonly derivativeGraphNode?: GraphNode;
  private readonly secondDerivativeGraphNode?: GraphNode;

  // For iterating over all GraphNode instances
  private readonly graphNodes: GraphNode[];

  // Height of the graph in view coordinates
  private readonly graphHeight: number;

  public constructor( model: CalculusGrapherModel,
                      visibleProperties: CalculusGrapherVisibleProperties,
                      providedOptions?: GraphNodesOptions ) {

    const options = optionize<GraphNodesOptions, SelfOptions, NodeOptions>()( {

      // NodeOptions
      phetioVisiblePropertyInstrumented: false
    }, providedOptions );

    super();

    // Is the grid of each graph node visible
    const gridVisibleProperty = visibleProperties.gridVisibleProperty;

    // The (view) height of the graph based on the number of visible graphs.
    this.graphHeight = CalculusGrapherConstants.SINGLE_GRAPH_HEIGHT / model.graphSetProperty.value.length;

    // The subset of graphTypes that should be instrumented
    const subsetGraphTypes = GraphSet.getGraphTypes( model.graphSets );

    // Creates a GraphNode instance, and instruments it if its GraphType is included in graphSets.
    const createGraphNode = ( graphType: GraphType, curve: Curve ) => {
      assert && assert( graphType !== GraphType.ORIGINAL, 'does not support GraphType.ORIGINAL' );

      return new GraphNode( graphType, curve, gridVisibleProperty, {
        graphHeight: this.graphHeight,
        tandem: subsetGraphTypes.includes( graphType ) ?
                options.tandem.createTandem( `${graphType.tandemNamePrefix}GraphNode` ) :
                Tandem.OPT_OUT
      } );
    };

    // Order is important in this array. It determines the top-to-bottom order that the graphs will be displayed.
    this.graphNodes = [];

    // Conditionally create the GraphNodes for the derived curves.
    if ( GraphSet.includes( model.graphSets, GraphType.INTEGRAL ) ) {
      this.integralGraphNode = createGraphNode( GraphType.INTEGRAL, model.integralCurve );
      this.graphNodes.push( this.integralGraphNode );
    }

    // OriginalGraphNode is always instrumented, because it should always be present.
    this.originalGraphNode = new OriginalGraphNode( model, visibleProperties, {
      graphHeight: this.graphHeight,
      tandem: options.tandem.createTandem( 'originalGraphNode' )
    } );
    this.graphNodes.push( this.originalGraphNode );

    if ( GraphSet.includes( model.graphSets, GraphType.DERIVATIVE ) ) {
      this.derivativeGraphNode = createGraphNode( GraphType.DERIVATIVE, model.derivativeCurve );
      this.graphNodes.push( this.derivativeGraphNode );
    }
    if ( GraphSet.includes( model.graphSets, GraphType.SECOND_DERIVATIVE ) ) {
      this.secondDerivativeGraphNode = createGraphNode( GraphType.SECOND_DERIVATIVE, model.secondDerivativeCurve );
      this.graphNodes.push( this.secondDerivativeGraphNode );
    }

    const referenceLineNode = new ReferenceLineNode( model.referenceLine, this.originalGraphNode.chartTransform,
      options.tandem.createTandem( 'referenceLineNode' ) );

    // Vertical lines
    const verticalLinesNode = new VerticalLinesNode( model.verticalLines, model.verticalLinesLinkableElement,
      this.originalGraphNode.chartTransform, options.tandem.createTandem( 'verticalLinesNode' ) );

    const graphSetNode = new Node();

    // To display a different set of graphs, get the GraphsNode, handle their layout, and adjust the position
    // of the reference line and vertical lines.
    model.graphSetProperty.link( graphSet => {

      // Gets the GraphNode instances that correspond to graphSet.
      const graphNodes = this.graphNodes.filter( graphNode => graphSet.includes( graphNode.graphType ) );
      assert && assert( graphNodes.length > 0 );
      graphSetNode.setChildren( graphNodes );

      // Layout
      this.updateLayout( graphNodes );

      // Resizes vertical ReferenceLineNode - a bit more at the bottom if the bottom graph is the original graph,
      // so that the drag handle does not overlap scrubber.
      const yOffset = ( graphNodes[ graphNodes.length - 1 ] instanceof OriginalGraphNode ) ? 4 : 0;
      referenceLineNode.setLineTopAndBottom( graphSetNode.top - VERTICAL_LINE_Y_EXTENT, graphSetNode.bottom + VERTICAL_LINE_Y_EXTENT + yOffset );

      // Resizes vertical VerticalLineNodes - same extent at top and bottom.
      verticalLinesNode.verticalLineNodes.forEach( verticalLineNode => {
        verticalLineNode.setLineTopAndBottom( graphSetNode.top - VERTICAL_LINE_Y_EXTENT, graphSetNode.bottom + VERTICAL_LINE_Y_EXTENT );
      } );
    } );

    options.children = [ graphSetNode, verticalLinesNode, referenceLineNode ];

    this.mutate( options );

    this.addLinkedElement( model.graphSetProperty, {
      tandem: options.tandem.createTandem( model.graphSetProperty.tandem.name )
    } );
  }

  public reset(): void {
    this.graphNodes.forEach( graphNode => graphNode.reset() );
  }

  /**
   * Decorates the appropriate graphs for the tangent feature.
   */
  public addTangentView( tangentScrubber: TangentScrubber, visibleProperty: TReadOnlyProperty<boolean> ): void {

    // Adds a scrubber to the original graph, for moving the x location of tangentScrubber.
    this.originalGraphNode.addScrubberNode( tangentScrubber, tangentScrubber.colorProperty, visibleProperty, 'tangentScrubberNode' );

    // Adds the double-headed tangent arrow at the tangent point on the original graph.
    this.originalGraphNode.addTangentArrowNode( tangentScrubber, visibleProperty );

    // Plots a point on each graph that will stay in sync with tangentScrubber.
    this.addPlottedPoints( tangentScrubber, visibleProperty, 'tangentPoint' );
  }

  /**
   * Decorates the appropriate graphs for the 'area under curve' feature.
   */
  public addAreaUnderCurveView( areaUnderCurveScrubber: AreaUnderCurveScrubber, visibleProperty: TReadOnlyProperty<boolean> ): void {

    // Adds a scrubber on the original graph, for moving the x location of areaUnderCurveScrubber.
    this.originalGraphNode.addScrubberNode( areaUnderCurveScrubber, areaUnderCurveScrubber.colorProperty, visibleProperty,
      'areaUnderCurveScrubberNode' );

    // Adds a plot of the area under the curve on the original graph.
    this.originalGraphNode.addAreaUnderCurvePlot( areaUnderCurveScrubber, visibleProperty );

    // Plots a point on each graph that will stay in sync with areaUnderCurveScrubber.
    this.addPlottedPoints( areaUnderCurveScrubber, visibleProperty, 'areaUnderCurvePoint' );
  }

  // Updates the location of all graph Nodes
  private updateLayout( graphNodes: GraphNode[] ): void {
    graphNodes[ 0 ].x = 0;
    graphNodes[ 0 ].y = 0;
    const ySpacing = ( graphNodes.length < 4 ) ? 20 : 12; // more graphs requires less spacing
    for ( let i = 1; i < graphNodes.length; i++ ) {
      graphNodes[ i ].x = graphNodes[ i - 1 ].x;
      graphNodes[ i ].y = graphNodes[ i - 1 ].y + this.graphHeight + ySpacing;
    }
  }

  /**
   * Adds a PlottedPoint to each graph.
   */
  private addPlottedPoints( ancillaryTool: AncillaryTool, visibleProperty: TReadOnlyProperty<boolean>, tandemName: string ): void {

    this.addPlottedPoint( ancillaryTool, visibleProperty, tandemName, this.originalGraphNode, ancillaryTool.yOriginalProperty, CalculusGrapherColors.originalCurveStrokeProperty );

    this.integralGraphNode &&
    this.addPlottedPoint( ancillaryTool, visibleProperty, tandemName, this.integralGraphNode, ancillaryTool.yIntegralProperty, CalculusGrapherColors.integralCurveStrokeProperty );

    this.derivativeGraphNode &&
    this.addPlottedPoint( ancillaryTool, visibleProperty, tandemName, this.derivativeGraphNode, ancillaryTool.yDerivativeProperty, CalculusGrapherColors.derivativeCurveStrokeProperty );

    this.secondDerivativeGraphNode &&
    this.addPlottedPoint( ancillaryTool, visibleProperty, tandemName, this.secondDerivativeGraphNode, ancillaryTool.ySecondDerivativeProperty, CalculusGrapherColors.secondDerivativeCurveStrokeProperty );
  }

  /**
   * Adds a PlottedPoint to one graph.
   */
  private addPlottedPoint( ancillaryTool: AncillaryTool, visibleProperty: TReadOnlyProperty<boolean>, tandemName: string,
                           graphNode: GraphNode, yProperty: TReadOnlyProperty<number>, fill: TColor ): void {
    const plottedPoint = graphNode.addPlottedPoint( ancillaryTool.xProperty, yProperty, fill, visibleProperty, tandemName );
    plottedPoint.addLinkedElement( ancillaryTool, {
      tandem: plottedPoint.tandem.createTandem( ancillaryTool.tandem.name )
    } );
  }
}

calculusGrapher.register( 'GraphsNode', GraphsNode );
