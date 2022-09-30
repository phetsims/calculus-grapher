// Copyright 2020-2022, University of Colorado Boulder

/**
 *  Class for the all the graphs in the 'Calculus Grapher' simulation.
 *
 * @author Martin Veillette
 */

/**
 *  Class for the all the graphs in the 'Calculus Grapher' simulation.
 *
 * @author Martin Veillette
 */
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherModel from '../model/CalculusGrapherModel.js';
import GraphNode from './GraphNode.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import { Node, NodeOptions } from '../../../../scenery/js/imports.js';
import CalculusGrapherViewProperties from './CalculusGrapherViewProperties.js';
import Multilink from '../../../../axon/js/Multilink.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';

type SelfOptions = EmptySelfOptions;

export type GraphNodesOptions = SelfOptions & NodeOptions;

export default class GraphNodes extends Node {

  private readonly originalGraphNode: GraphNode;
  private readonly derivativeGraphNode: GraphNode;
  private readonly integralGraphNode: GraphNode;
  private readonly secondDerivativeGraphNode: GraphNode;

  public constructor( model: CalculusGrapherModel, viewProperties: CalculusGrapherViewProperties, providedOptions?: GraphNodesOptions ) {

    const options = optionize<GraphNodesOptions, SelfOptions, NodeOptions>()( {}, providedOptions );

    super( options );

    const initialMaxYProperty = new NumberProperty( 5 );

    this.integralGraphNode = new GraphNode( model.integralCurve,
      viewProperties.gridVisibleProperty,
      initialMaxYProperty,
      {
        visibleProperty: viewProperties.integralGraphNodeVisibleProperty,
        tandem: options.tandem.createTandem( 'integralGraphNode' )
      } );


    this.originalGraphNode = new GraphNode( model.originalCurve,
      viewProperties.gridVisibleProperty,
      initialMaxYProperty,
      {
        visibleProperty: viewProperties.originalGraphNodeVisibleProperty,
        tandem: options.tandem.createTandem( 'originalGraphNode' ),
        phetioDocumentation: 'PhET-iO only, not settable in the sim'
      } );

    this.derivativeGraphNode = new GraphNode( model.derivativeCurve,
      viewProperties.gridVisibleProperty,
      initialMaxYProperty,
      {
        visibleProperty: viewProperties.derivativeGraphNodeVisibleProperty,
        tandem: options.tandem.createTandem( 'derivativeGraphNode' )
      } );

    this.secondDerivativeGraphNode = new GraphNode( model.secondDerivativeCurve,
      viewProperties.gridVisibleProperty,
      initialMaxYProperty,
      {
        visibleProperty: viewProperties.secondDerivativeGraphNodeVisibleProperty,
        tandem: options.tandem.createTandem( 'secondDerivativeGraphNode' )
      } );

    // array of Node content of this class
    let content: Node[] = [];

    // convenience function to add element to content array
    const pushElement = ( condition: boolean, node: Node ): void => {
      if ( condition ) {
        content.push( node );
      }
    };

    const initialMaxYArray = [ 14, 7, 5, 3 ];

    Multilink.multilink( [
      viewProperties.integralGraphNodeVisibleProperty,
      viewProperties.originalGraphNodeVisibleProperty,
      viewProperties.derivativeGraphNodeVisibleProperty,
      viewProperties.secondDerivativeGraphNodeVisibleProperty
    ], ( integralVisible, originalVisible, derivativeVisible, secondDerivativeVisible ) => {

      content = [];

      pushElement( integralVisible, this.integralGraphNode );
      pushElement( originalVisible, this.originalGraphNode );
      pushElement( derivativeVisible, this.derivativeGraphNode );
      pushElement( secondDerivativeVisible, this.secondDerivativeGraphNode );


      initialMaxYProperty.value = initialMaxYArray[ content.length - 1 ];

      // layout of all the nodes
      if ( content.length > 0 ) {
        content[ 0 ].top = 100;
      }

      for ( let i = 1; i < content.length; i++ ) {
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
