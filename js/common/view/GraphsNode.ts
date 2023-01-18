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
import { Node, NodeOptions } from '../../../../scenery/js/imports.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import OriginalGraphNode from './OriginalGraphNode.js';
import GraphTypeLabelNode from './GraphTypeLabelNode.js';
import VerticalLineNode from './VerticalLineNode.js';
import { getGraphTypeStrokeProperty, GraphSet, GraphType, GraphTypeValues } from '../model/GraphType.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import CalculusGrapherVisibleProperties from './CalculusGrapherVisibleProperties.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import ReferenceLineNode from './ReferenceLineNode.js';
import TangentScrubber from '../model/TangentScrubber.js';
import AreaUnderCurveTool from '../model/AreaUnderCurveTool.js';
import AncillaryTool from '../model/AncillaryTool.js';

type SelfOptions = {
  graphSets: GraphSet[];
};

type GraphNodesOptions = SelfOptions & StrictOmit<NodeOptions, 'children'>;

export default class GraphNodes extends Node {

  public originalGraphNode: OriginalGraphNode;
  public integralGraphNode: GraphNode;
  public derivativeGraphNode: GraphNode;
  public secondDerivativeGraphNode: GraphNode;

  public constructor( model: CalculusGrapherModel,
                      graphSetProperty: TReadOnlyProperty<GraphSet>,
                      visibleProperties: CalculusGrapherVisibleProperties,
                      providedOptions?: GraphNodesOptions ) {

    const options = optionize<GraphNodesOptions, SelfOptions, NodeOptions>()( {
      // empty optionize because we're setting options.children below
    }, providedOptions );

    super();

    // is the grid of each graph node visible
    const gridVisibleProperty = visibleProperties.gridVisibleProperty;

    // determine the (view) height of the graph based on the number of visible graphs.
    const graphHeightProperty = new DerivedProperty( [ graphSetProperty ], graphsSelected => {
      const numberOfVisibleGraphs = graphsSelected.length;
      return CalculusGrapherConstants.GRAPH_VERTICAL_HEIGHT[ numberOfVisibleGraphs - 1 ];
    } );

    // the subset of graphTypes that should be instrumented
    const subsetGraphTypes = options.graphSets.flat();

    function createGraphNode( graphType: GraphType ): GraphNode {
      assert && assert( graphType !== 'original', 'cant handle original' );

      return new GraphNode( model.getCurve( graphType ),
        gridVisibleProperty,
        graphHeightProperty,
        new GraphTypeLabelNode( graphType ),
        {
          graphType: 'integral',
          curveStroke: getGraphTypeStrokeProperty( graphType ),
          tandem: subsetGraphTypes.includes( graphType ) ? options.tandem.createTandem( `${graphType}GraphNode` ) : Tandem.OPT_OUT
        } );
    }

    this.integralGraphNode = createGraphNode( 'integral' );
    this.derivativeGraphNode = createGraphNode( 'derivative' );
    this.secondDerivativeGraphNode = createGraphNode( 'secondDerivative' );

    this.originalGraphNode = new OriginalGraphNode( model, visibleProperties, graphHeightProperty, {
      graphType: 'original',
      curveStroke: getGraphTypeStrokeProperty( 'original' ),

      // originalGraphNode is always instrumented, because it should always be present.
      tandem: options.tandem.createTandem( 'originalGraphNode' )
    } );

    const referenceLineNode = new ReferenceLineNode( model.referenceLine, this.originalGraphNode.chartTransform, {
      x: this.originalGraphNode.x,
      tandem: options.tandem.createTandem( 'referenceLineNode' )
    } );

    // To organize all VerticalLineNode instances under 1 tandem
    const verticalLineNodesTandem = options.tandem.createTandem( 'verticalLines' );

    const verticalLineNodes = model.verticalLines.map( verticalLine =>
      new VerticalLineNode( verticalLine, this.originalGraphNode.chartTransform, {
        x: this.originalGraphNode.x,
        tandem: verticalLineNodesTandem.createTandem( `${verticalLine.labelProperty.value}VerticalLineNode` )
      } ) );

    const verticalLineNodesLayer = new Node( {
      children: verticalLineNodes
    } );

    const graphSetNode = new Node();

    function setVerticalLineNodePosition( verticalLineNode: VerticalLineNode | ReferenceLineNode ): void {
      verticalLineNode.setLineBottom( graphSetNode.bottom + 15 );
      verticalLineNode.setLineTop( graphSetNode.top - 5 );
    }

    graphSetProperty.link( graphSet => {

      // array of Node content of this class
      const content = graphSet.map( graphType => this.getGraphNode( graphType ) );

      const numberOfVisibleGraphs = graphSet.length;

      // layout of all the nodes

      if ( numberOfVisibleGraphs > 0 ) {
        content[ 0 ].x = 0;
        content[ 0 ].y = 0;
      }

      const spacingBetweenGraphs = 20 / numberOfVisibleGraphs + 10; // arbitrary values

      for ( let i = 1; i < numberOfVisibleGraphs; i++ ) {
        content[ i ].x = content[ i - 1 ].x;
        content[ i ].y = content[ i - 1 ].y + graphHeightProperty.value + spacingBetweenGraphs;
      }

      graphSetNode.setChildren( content );

      setVerticalLineNodePosition( referenceLineNode );
      verticalLineNodes.forEach( verticalLineNode => setVerticalLineNodePosition( verticalLineNode ) );
    } );

    options.children = [ graphSetNode, verticalLineNodesLayer, referenceLineNode ];

    this.mutate( options );
  }

  public reset(): void {
    GraphTypeValues.forEach( graphType => this.getGraphNode( graphType ).reset() );
  }

  /**
   * Gets the GraphNode instance that corresponds to GraphType.
   */
  public getGraphNode( graphType: GraphType ): GraphNode {
    const graphNode = graphType === 'integral' ? this.integralGraphNode :
                      graphType === 'original' ? this.originalGraphNode :
                      graphType === 'derivative' ? this.derivativeGraphNode :
                      graphType === 'secondDerivative' ? this.secondDerivativeGraphNode :
                      null;
    assert && assert( graphNode );
    return graphNode!;
  }

  /**
   * Decorates the appropriate graphs for a TangentScrubber.
   */
  public addTangentTool( tangentTool: TangentScrubber, visibleProperty: TReadOnlyProperty<boolean> ): void {

    // Plot a point on each graph that will stay in sync with tangentTool.
    GraphTypeValues.forEach( graphType => this.addPlottedPoint( tangentTool, graphType, visibleProperty, 'tangentPoint' ) );

    // Add a scrubber to the original graph, for moving the x location of tangentTool.
    this.originalGraphNode.addScrubberNode( tangentTool, tangentTool.colorProperty, visibleProperty, 'tangentScrubber' );

    // Add the double-headed tangent arrow at the tangent point on the original graph.
    this.originalGraphNode.addTangentArrowNode( tangentTool, visibleProperty );
  }

  /**
   * Decorates the appropriate graphs for an AreaUnderCurveTool.
   */
  public addAreaUnderCurveTool( areaUnderCurveTool: AreaUnderCurveTool, visibleProperty: TReadOnlyProperty<boolean> ): void {

    // Plot a point on each graph that will stay in sync with areaUnderCurveTool.
    GraphTypeValues.forEach( graphType => this.addPlottedPoint( areaUnderCurveTool, graphType, visibleProperty,
      'areaUnderCurvePoint' ) );

    // Add a scrubber on the original graph, for moving the x location of areaUnderCurveTool.
    this.originalGraphNode.addScrubberNode( areaUnderCurveTool, areaUnderCurveTool.colorProperty, visibleProperty,
      'areaUnderCurveScrubber' );

    // Add a plot of the area under the curve on the original graph.
    this.originalGraphNode.addAreaUnderCurvePlot( areaUnderCurveTool, visibleProperty );
  }

  /**
   * Adds a PlottedPoint to the specified graph.
   */
  private addPlottedPoint( ancillaryTool: AncillaryTool, graphType: GraphType,
                           visibleProperty: TReadOnlyProperty<boolean>, tandemName: string ): void {
    const graphNode = this.getGraphNode( graphType );
    const fillProperty = getGraphTypeStrokeProperty( graphType );
    const plottedPoint = graphNode.addFocusCircle( ancillaryTool.xProperty, ancillaryTool.getYProperty( graphType ),
      fillProperty, visibleProperty, tandemName );
    plottedPoint.addLinkedElement( ancillaryTool, {
      tandem: plottedPoint.tandem.createTandem( ancillaryTool.tandem.name )
    } );
  }
}

calculusGrapher.register( 'GraphNodes', GraphNodes );
