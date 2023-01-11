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
import { getGraphTypeStroke, GRAPH_TYPES, GraphSet, GraphType } from '../model/GraphType.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import CalculusGrapherVisibleProperties from './CalculusGrapherVisibleProperties.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import ReferenceLineNode from './ReferenceLineNode.js';

type SelfOptions = {
  graphSets: GraphSet[];
};

export type GraphNodesOptions = SelfOptions & StrictOmit<NodeOptions, 'children'>;

export default class GraphNodes extends Node {

  public originalGraphNode: OriginalGraphNode;
  public integralGraphNode: GraphNode;
  public derivativeGraphNode: GraphNode;
  public secondDerivativeGraphNode: GraphNode;

  public constructor( model: CalculusGrapherModel,
                      graphSetProperty: TReadOnlyProperty<GraphSet>,
                      visibleProperties: CalculusGrapherVisibleProperties,
                      providedOptions?: GraphNodesOptions ) {

    const options = optionize<GraphNodesOptions, SelfOptions, NodeOptions>()( {}, providedOptions );

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
          curveStroke: getGraphTypeStroke( graphType ),
          tandem: subsetGraphTypes.includes( graphType ) ? options.tandem.createTandem( `${graphType}GraphNode` ) : Tandem.OPT_OUT
        } );
    }

    this.integralGraphNode = createGraphNode( 'integral' );
    this.derivativeGraphNode = createGraphNode( 'derivative' );
    this.secondDerivativeGraphNode = createGraphNode( 'secondDerivative' );

    this.originalGraphNode = new OriginalGraphNode( model, visibleProperties, graphHeightProperty, {
      graphType: 'original',
      curveStroke: getGraphTypeStroke( 'original' ),

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

  /**
   * Reset all
   */
  public reset(): void {
    GRAPH_TYPES.forEach( graphType => this.getGraphNode( graphType ).reset() );
  }

  public getGraphNode( graphType: GraphType ): GraphNode {
    const graphNode = graphType === 'integral' ? this.integralGraphNode :
                      graphType === 'original' ? this.originalGraphNode :
                      graphType === 'derivative' ? this.derivativeGraphNode :
                      graphType === 'secondDerivative' ? this.secondDerivativeGraphNode :
                      null;
    assert && assert( graphNode );
    return graphNode!;
  }
}

calculusGrapher.register( 'GraphNodes', GraphNodes );
