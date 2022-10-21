// Copyright 2022, University of Colorado Boulder

/**
 * Class for the all the graphs in the 'Calculus Grapher' simulation.
 *
 * @author Martin Veillette
 */

import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherModel from '../model/CalculusGrapherModel.js';
import GraphNode from './GraphNode.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import { Node, NodeOptions } from '../../../../scenery/js/imports.js';
import CalculusGrapherVisibleProperties from './CalculusGrapherVisibleProperties.js';
import Multilink from '../../../../axon/js/Multilink.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import OriginalGraphNode from './OriginalGraphNode.js';
import CurveLabelsNode from './CurveLabelsNode.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';

type SelfOptions = EmptySelfOptions;

export type GraphNodesOptions = SelfOptions & NodeOptions;

export default class GraphNodes extends Node {

  private readonly originalGraphNode: OriginalGraphNode;
  private readonly derivativeGraphNode: GraphNode;
  private readonly integralGraphNode: GraphNode;
  private readonly secondDerivativeGraphNode: GraphNode;
  private readonly graphHeightProperty: TReadOnlyProperty<number>;

  public constructor( model: CalculusGrapherModel, visibleProperties: CalculusGrapherVisibleProperties, providedOptions?: GraphNodesOptions ) {

    const options = optionize<GraphNodesOptions, SelfOptions, NodeOptions>()( {}, providedOptions );

    super( options );


    const initialMaxYDependencies = [
      visibleProperties.integralGraphNodeVisibleProperty,
      visibleProperties.originalGraphNodeVisibleProperty,
      visibleProperties.derivativeGraphNodeVisibleProperty,
      visibleProperties.secondDerivativeGraphNodeVisibleProperty
    ];

    // determine the (view) height of the graph based on the number of visible graphs.
    this.graphHeightProperty = DerivedProperty.deriveAny( initialMaxYDependencies,
      () => {
        const numberOfVisibleGraphs = _.filter( initialMaxYDependencies, property => property.value ).length;
        return CalculusGrapherConstants.GRAPH_VERTICAL_HEIGHT[ numberOfVisibleGraphs - 1 ];
      } );


    this.integralGraphNode = new GraphNode( model.integralCurve,
      visibleProperties.gridVisibleProperty,
      this.graphHeightProperty,
      CurveLabelsNode.getIntegralLabel(),
      {
        visibleProperty: visibleProperties.integralGraphNodeVisibleProperty,
        tandem: options.tandem.createTandem( 'integralGraphNode' ),
        curveNodeOptions: {
          continuousLinePlotOptions: {
            stroke: CalculusGrapherColors.integralCurveStrokeProperty
          }
        }
      } );


    this.originalGraphNode = new OriginalGraphNode( model.originalCurve,
      visibleProperties.gridVisibleProperty,
      this.graphHeightProperty,
      CurveLabelsNode.getOriginalLabel(),
      {
        visibleProperty: visibleProperties.originalGraphNodeVisibleProperty,
        tandem: options.tandem.createTandem( 'originalGraphNode' ),
        curveNodeOptions: {
          continuousLinePlotOptions: {
            stroke: CalculusGrapherColors.originalCurveStrokeProperty
          }
        }
      } );

    this.derivativeGraphNode = new GraphNode( model.derivativeCurve,
      visibleProperties.gridVisibleProperty,
      this.graphHeightProperty,
      CurveLabelsNode.getDerivativeLabel(),
      {
        curveNodeOptions: {
          continuousLinePlotOptions: {
            stroke: CalculusGrapherColors.derivativeCurveStrokeProperty
          }
        },
        visibleProperty: visibleProperties.derivativeGraphNodeVisibleProperty,
        tandem: options.tandem.createTandem( 'derivativeGraphNode' )

      } );

    this.secondDerivativeGraphNode = new GraphNode( model.secondDerivativeCurve,
      visibleProperties.gridVisibleProperty,
      this.graphHeightProperty,
      CurveLabelsNode.getSecondDerivativeLabel(),
      {
        curveNodeOptions: {
          continuousLinePlotOptions: {
            stroke: CalculusGrapherColors.secondDerivativeCurveStrokeProperty
          }
        },
        visibleProperty: visibleProperties.secondDerivativeGraphNodeVisibleProperty,
        tandem: options.tandem.createTandem( 'secondDerivativeGraphNode' )
      } );

    // convenience function to add element to content array
    const pushElement = ( array: Node[], condition: boolean, node: Node ): void => {
      if ( condition ) {
        array.push( node );
      }
    };


    Multilink.multilink( [
      visibleProperties.integralGraphNodeVisibleProperty,
      visibleProperties.originalGraphNodeVisibleProperty,
      visibleProperties.derivativeGraphNodeVisibleProperty,
      visibleProperties.secondDerivativeGraphNodeVisibleProperty
    ], ( integralVisible, originalVisible, derivativeVisible, secondDerivativeVisible ) => {

      // array of Node content of this class
      const content: Node[] = [];

      pushElement( content, integralVisible, this.integralGraphNode );
      pushElement( content, originalVisible, this.originalGraphNode );
      pushElement( content, derivativeVisible, this.derivativeGraphNode );
      pushElement( content, secondDerivativeVisible, this.secondDerivativeGraphNode );

      const numberOfVisibleGraphs = content.length;

      // layout of all the nodes

      if ( numberOfVisibleGraphs > 0 ) {
        content[ 0 ].top = 100;
      }

      for ( let i = 1; i < numberOfVisibleGraphs; i++ ) {
        content[ i ].rightTop = content[ i - 1 ].rightBottom.addXY( 0, 10 );
      }

      this.setChildren( content );
    } );
  }

  /**
   * Reset all
   */
  public reset(): void {
    this.originalGraphNode.reset();
    this.derivativeGraphNode.reset();
    this.integralGraphNode.reset();
    this.secondDerivativeGraphNode.reset();
  }
}

calculusGrapher.register( 'GraphNodes', GraphNodes );
