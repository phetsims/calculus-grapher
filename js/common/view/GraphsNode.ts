// Copyright 2022, University of Colorado Boulder

/**
 * Class for the all the graphs in the 'Calculus Grapher' simulation.
 *
 * @author Martin Veillette
 */

import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherModel from '../model/CalculusGrapherModel.js';
import GraphNode from './GraphNode.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import { Node, NodeOptions } from '../../../../scenery/js/imports.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import OriginalGraphNode from './OriginalGraphNode.js';
import GraphTypeLabelNode from './GraphTypeLabelNode.js';
import ReferenceLineNode from './ReferenceLineNode.js';
import { getGraphTypeStroke, GraphSet } from '../model/GraphType.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import CalculusGrapherVisibleProperties from './CalculusGrapherVisibleProperties.js';

type SelfOptions = {
  graphSets: GraphSet[];
};

export type GraphNodesOptions = SelfOptions & NodeOptions;

export default class GraphNodes extends Node {

  private readonly resetGraphNodes: () => void;
  private readonly graphHeightProperty: TReadOnlyProperty<number>;

  public constructor( model: CalculusGrapherModel,
                      graphSetProperty: TReadOnlyProperty<GraphSet>,
                      visibleProperties: CalculusGrapherVisibleProperties,
                      providedOptions?: GraphNodesOptions ) {

    const options = optionize<GraphNodesOptions, SelfOptions, NodeOptions>()( {}, providedOptions );

    // is the grid of each graph node visible
    const gridVisibleProperty = visibleProperties.gridVisibleProperty;

    // determine the (view) height of the graph based on the number of visible graphs.
    const graphHeightProperty = new DerivedProperty( [ graphSetProperty ], graphsSelected => {
      const numberOfVisibleGraphs = graphsSelected.length;
      return CalculusGrapherConstants.GRAPH_VERTICAL_HEIGHT[ numberOfVisibleGraphs - 1 ];
    } );

    const graphTypes = options.graphSets.flat();

    const integralGraphNode = new GraphNode( model.integralCurve,
      gridVisibleProperty,
      graphHeightProperty,
      new GraphTypeLabelNode( 'integral' ),
      {
        curveStroke: getGraphTypeStroke( 'integral' ),
        tandem: graphTypes.includes( 'integral' ) ? options.tandem.createTandem( 'integralGraphNode' ) : Tandem.OPT_OUT
      } );

    const originalGraphNode = new OriginalGraphNode( model,
      visibleProperties,
      graphHeightProperty,
      new GraphTypeLabelNode( 'original' ),
      {
        curveStroke: getGraphTypeStroke( 'original' ),

        // originalGraphNode is always instrumented, because it should always be present.
        tandem: options.tandem.createTandem( 'originalGraphNode' )
      }
    );

    const derivativeGraphNode = new GraphNode( model.derivativeCurve,
      gridVisibleProperty,
      graphHeightProperty,
      new GraphTypeLabelNode( 'derivative' ),
      {
        curveStroke: getGraphTypeStroke( 'derivative' ),
        tandem: graphTypes.includes( 'derivative' ) ? options.tandem.createTandem( 'derivativeGraphNode' ) : Tandem.OPT_OUT
      } );

    const secondDerivativeGraphNode = new GraphNode( model.secondDerivativeCurve,
      gridVisibleProperty,
      graphHeightProperty,
      new GraphTypeLabelNode( 'secondDerivative' ),
      {
        curveStroke: getGraphTypeStroke( 'secondDerivative' ),
        tandem: graphTypes.includes( 'secondDerivative' ) ? options.tandem.createTandem( 'secondDerivativeGraphNode' ) : Tandem.OPT_OUT
      } );

    const referenceLineNode = new ReferenceLineNode( model.referenceLineXCoordinateProperty,
      originalGraphNode.chartTransform, {
        visibleProperty: visibleProperties.referenceLineVisibleProperty,
        cursor: 'pointer',
        tandem: options.tandem.createTandem( 'referenceLineNode' )
      } );

    referenceLineNode.x = originalGraphNode.x;

    const graphSetNode = new Node();

    graphSetProperty.link( graphSet => {

      // array of Node content of this class
      const content = graphSet.map( graphType => {
          if ( graphType === 'integral' ) {
            return integralGraphNode;
          }
          else if ( graphType === 'original' ) {
            return originalGraphNode;
          }
          else if ( graphType === 'derivative' ) {
            return derivativeGraphNode;
          }
          else if ( graphType === 'secondDerivative' ) {
            return secondDerivativeGraphNode;
          }
          else {
            throw new Error( 'Unsupported graphType' );
          }
        }
      );

      const numberOfVisibleGraphs = graphSet.length;

      // layout of all the nodes

      if ( numberOfVisibleGraphs > 0 ) {
        content[ 0 ].x = 0;
        content[ 0 ].top = 100;
      }

      for ( let i = 1; i < numberOfVisibleGraphs; i++ ) {
        content[ i ].x = content[ i - 1 ].x;
        content[ i ].top = content[ i - 1 ].bottom + 10;
      }

      graphSetNode.setChildren( content );

      referenceLineNode.setLineBottom( graphSetNode.bottom + 5 );
      referenceLineNode.setLineTop( graphSetNode.top - 5 );

    } );

    super( combineOptions<NodeOptions>( { children: [ graphSetNode, referenceLineNode ] }, options ) );

    this.graphHeightProperty = graphHeightProperty;

    this.resetGraphNodes = () => {
      originalGraphNode.reset();
      derivativeGraphNode.reset();
      integralGraphNode.reset();
      secondDerivativeGraphNode.reset();
    };

  }

  /**
   * Reset all
   */
  public reset(): void {
    this.resetGraphNodes();
  }
}

calculusGrapher.register( 'GraphNodes', GraphNodes );
