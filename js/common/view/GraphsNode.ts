// Copyright 2022-2023, University of Colorado Boulder

/**
 * Class for the all the graphs in the 'Calculus Grapher' simulation.
 *
 * @author Martin Veillette
 */

import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherModel from '../model/CalculusGrapherModel.js';
import GraphNode from './GraphNode.js';
import optionize from '../../../../phet-core/js/optionize.js';
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
import GraphType, { GraphSet } from '../model/GraphType.js';
import Curve from '../model/Curve.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import VerticalLinesNode from './VerticalLinesNode.js';

// How much VerticalLines extend above and below the graphs
const VERTICAL_LINE_Y_EXTENT = 4;

type SelfOptions = {
  graphSets: GraphSet[];
};

type GraphNodesOptions = SelfOptions & StrictOmit<NodeOptions, 'children'>;

export default class GraphNodes extends Node {

  public readonly originalGraphNode: OriginalGraphNode;
  public readonly integralGraphNode: GraphNode;
  public readonly derivativeGraphNode: GraphNode;
  public readonly secondDerivativeGraphNode: GraphNode;

  // for iterating over all GraphNode instances
  private readonly graphNodes: GraphNode[];

  public constructor( model: CalculusGrapherModel,
                      graphSetProperty: TReadOnlyProperty<GraphSet>,
                      visibleProperties: CalculusGrapherVisibleProperties,
                      providedOptions?: GraphNodesOptions ) {

    const options = optionize<GraphNodesOptions, SelfOptions, NodeOptions>()( {

      // NodeOptions
      phetioVisiblePropertyInstrumented: false
    }, providedOptions );

    super();

    // is the grid of each graph node visible
    const gridVisibleProperty = visibleProperties.gridVisibleProperty;

    // determine the (view) height of the graph based on the number of visible graphs.
    const graphHeight = CalculusGrapherConstants.SINGLE_GRAPH_HEIGHT / graphSetProperty.value.length;

    // the subset of graphTypes that should be instrumented
    const subsetGraphTypes = options.graphSets.flat();

    // Creates a GraphNode instance, and instruments it if its GraphType is included in graphSets.
    function createGraphNode( graphType: GraphType, curve: Curve ): GraphNode {
      assert && assert( graphType !== GraphType.ORIGINAL, 'does not support GraphType.ORIGINAL' );

      return new GraphNode( graphType, curve, gridVisibleProperty, {
        graphHeight: graphHeight,
        tandem: subsetGraphTypes.includes( graphType ) ?
                options.tandem.createTandem( `${graphType.tandemNamePrefix}GraphNode` ) :
                Tandem.OPT_OUT
      } );
    }

    this.integralGraphNode = createGraphNode( GraphType.INTEGRAL, model.integralCurve );
    this.derivativeGraphNode = createGraphNode( GraphType.DERIVATIVE, model.derivativeCurve );
    this.secondDerivativeGraphNode = createGraphNode( GraphType.SECOND_DERIVATIVE, model.secondDerivativeCurve );

    // originalGraphNode is always instrumented, because it should always be present.
    this.originalGraphNode = new OriginalGraphNode( model, visibleProperties, {
      graphHeight: graphHeight,
      tandem: options.tandem.createTandem( 'originalGraphNode' )
    } );

    this.graphNodes = [ this.integralGraphNode, this.originalGraphNode, this.derivativeGraphNode, this.secondDerivativeGraphNode ];

    const referenceLineNode = new ReferenceLineNode( model.referenceLine, this.originalGraphNode.chartTransform, {
      tandem: options.tandem.createTandem( 'referenceLineNode' )
    } );

    // Vertical lines
    const verticalLinesNode = new VerticalLinesNode( model.verticalLines, model.verticalLinesLinkableElement,
      this.originalGraphNode.chartTransform, options.tandem.createTandem( 'verticalLinesNode' ) );

    const graphSetNode = new Node();

    // To display a different set of graphs, get the GraphNodes, handle their layout, and adjust the position
    // of the reference line and vertical lines.
    graphSetProperty.link( graphSet => {

      // Get the GraphNode instances that correspond to graphSet.
      const content = this.graphNodes.filter( graphNode => graphSet.includes( graphNode.graphType ) );
      assert && assert( content.length > 0 );
      graphSetNode.setChildren( content );

      // Layout
      content[ 0 ].x = 0;
      content[ 0 ].y = 0;
      const ySpacing = ( graphSet.length < 4 ) ? 20 : 12; // more graphs requires less spacing
      for ( let i = 1; i < content.length; i++ ) {
        content[ i ].x = content[ i - 1 ].x;
        content[ i ].y = content[ i - 1 ].y + graphHeight + ySpacing;
      }

      // Resize vertical ReferenceLineNode - a bit more at the bottom if the bottom graph is the original graph,
      // so that the drag handle does not overlap scrubber.
      const yOffset = ( content[ content.length - 1 ] instanceof OriginalGraphNode ) ? 4 : 0;
      referenceLineNode.setLineTopAndBottom( graphSetNode.top - VERTICAL_LINE_Y_EXTENT, graphSetNode.bottom + VERTICAL_LINE_Y_EXTENT + yOffset );

      // Resize vertical VerticalLineNodes - same extent at top and bottom.
      verticalLinesNode.verticalLineNodes.forEach( verticalLineNode => {
        verticalLineNode.setLineTopAndBottom( graphSetNode.top - VERTICAL_LINE_Y_EXTENT, graphSetNode.bottom + VERTICAL_LINE_Y_EXTENT );
      } );
    } );

    options.children = [ graphSetNode, verticalLinesNode, referenceLineNode ];

    this.mutate( options );
  }

  public reset(): void {
    this.integralGraphNode.reset();
    this.originalGraphNode.reset();
    this.derivativeGraphNode.reset();
    this.secondDerivativeGraphNode.reset();
  }

  /**
   * Decorates the appropriate graphs for the tangent feature.
   */
  public addTangentView( tangentScrubber: TangentScrubber, visibleProperty: TReadOnlyProperty<boolean> ): void {

    // Add a scrubber to the original graph, for moving the x location of tangentScrubber.
    this.originalGraphNode.addScrubberNode( tangentScrubber, tangentScrubber.colorProperty, visibleProperty, 'tangentScrubberNode' );

    // Add the double-headed tangent arrow at the tangent point on the original graph.
    this.originalGraphNode.addTangentArrowNode( tangentScrubber, visibleProperty );

    // Plot a point on each graph that will stay in sync with tangentScrubber.
    this.addPlottedPoints( tangentScrubber, visibleProperty, 'tangentPoint' );
  }

  /**
   * Decorates the appropriate graphs for the 'area under curve' feature.
   */
  public addAreaUnderCurveView( areaUnderCurveScrubber: AreaUnderCurveScrubber, visibleProperty: TReadOnlyProperty<boolean> ): void {

    // Add a scrubber on the original graph, for moving the x location of areaUnderCurveScrubber.
    this.originalGraphNode.addScrubberNode( areaUnderCurveScrubber, areaUnderCurveScrubber.colorProperty, visibleProperty,
      'areaUnderCurveScrubberNode' );

    // Add a plot of the area under the curve on the original graph.
    this.originalGraphNode.addAreaUnderCurvePlot( areaUnderCurveScrubber, visibleProperty );

    // Plot a point on each graph that will stay in sync with areaUnderCurveScrubber.
    this.addPlottedPoints( areaUnderCurveScrubber, visibleProperty, 'areaUnderCurvePoint' );
  }

  /**
   * Adds a PlottedPoint to each graph.
   */
  private addPlottedPoints( ancillaryTool: AncillaryTool, visibleProperty: TReadOnlyProperty<boolean>, tandemName: string ): void {
    this.addPlottedPoint( ancillaryTool, visibleProperty, tandemName, this.integralGraphNode, ancillaryTool.yIntegralProperty, CalculusGrapherColors.integralCurveStrokeProperty );
    this.addPlottedPoint( ancillaryTool, visibleProperty, tandemName, this.originalGraphNode, ancillaryTool.yOriginalProperty, CalculusGrapherColors.originalCurveStrokeProperty );
    this.addPlottedPoint( ancillaryTool, visibleProperty, tandemName, this.derivativeGraphNode, ancillaryTool.yDerivativeProperty, CalculusGrapherColors.derivativeCurveStrokeProperty );
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

calculusGrapher.register( 'GraphNodes', GraphNodes );
