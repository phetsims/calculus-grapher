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
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import OriginalGraphNode from './OriginalGraphNode.js';
import CurveLabelsNode from './CurveLabelsNode.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import { GraphChoice, GraphChoices } from './CalculusGrapherScreenView.js';
import Property from '../../../../axon/js/Property.js';

type SelfOptions = EmptySelfOptions;

export type GraphNodesOptions = SelfOptions & NodeOptions;

export default class GraphNodes extends Node {

  private readonly originalGraphNode: OriginalGraphNode;
  private readonly derivativeGraphNode: GraphNode;
  private readonly secondDerivativeGraphNode: GraphNode;
  private readonly integralGraphNode: GraphNode;
  private readonly graphHeightProperty: TReadOnlyProperty<number>;

  public constructor( model: CalculusGrapherModel,
                      graphsSelectedProperty: Property<GraphChoice>,
                      graphChoices: GraphChoices,
                      gridVisibleProperty: Property<boolean>,
                      providedOptions?: GraphNodesOptions ) {

    const options = optionize<GraphNodesOptions, SelfOptions, NodeOptions>()( {}, providedOptions );

    super( options );

    // determine the (view) height of the graph based on the number of visible graphs.
    this.graphHeightProperty = new DerivedProperty( [ graphsSelectedProperty ], graphsSelected => {
      const numberOfVisibleGraphs = graphsSelectedProperty.value.length;
      return CalculusGrapherConstants.GRAPH_VERTICAL_HEIGHT[ numberOfVisibleGraphs - 1 ];
    } );


    this.integralGraphNode = new GraphNode( model.integralCurve,
      gridVisibleProperty,
      this.graphHeightProperty,
      CurveLabelsNode.getIntegralLabel(),
      {
        curveNodeOptions: {
          continuousLinePlotOptions: {
            stroke: CalculusGrapherColors.integralCurveStrokeProperty
          }
        },
        tandem: options.tandem.createTandem( 'integralGraphNode' )
      } );


    this.originalGraphNode = new OriginalGraphNode( model.originalCurve,
      gridVisibleProperty,
      this.graphHeightProperty,
      CurveLabelsNode.getOriginalLabel(),
      {
        curveNodeOptions: {
          continuousLinePlotOptions: {
            stroke: CalculusGrapherColors.originalCurveStrokeProperty
          }
        },
        tandem: options.tandem.createTandem( 'originalGraphNode' )
      } );

    this.derivativeGraphNode = new GraphNode( model.derivativeCurve,
      gridVisibleProperty,
      this.graphHeightProperty,
      CurveLabelsNode.getDerivativeLabel(),
      {
        curveNodeOptions: {
          continuousLinePlotOptions: {
            stroke: CalculusGrapherColors.derivativeCurveStrokeProperty
          }
        },
        tandem: options.tandem.createTandem( 'derivativeGraphNode' )

      } );

    this.secondDerivativeGraphNode = new GraphNode( model.secondDerivativeCurve,
      gridVisibleProperty,
      this.graphHeightProperty,
      CurveLabelsNode.getSecondDerivativeLabel(),
      {
        curveNodeOptions: {
          continuousLinePlotOptions: {
            stroke: CalculusGrapherColors.secondDerivativeCurveStrokeProperty
          }
        },
        tandem: options.tandem.createTandem( 'secondDerivativeGraphNode' )
      } );


    graphsSelectedProperty.link( graphChoice => {


      // array of Node content of this class
      const content = graphChoice.map( graphType => {
          if ( graphType === 'integral' ) {
            return this.integralGraphNode;
          }
          else if ( graphType === 'original' ) {
            return this.originalGraphNode;
          }
          else if ( graphType === 'derivative' ) {
            return this.derivativeGraphNode;
          }
          else if ( graphType === 'secondDerivative' ) {
            return this.secondDerivativeGraphNode;
          }
          else {
            throw new Error( 'Unsupported graphType' );
          }
        }
      );

      const numberOfVisibleGraphs = graphChoice.length;

      // layout of all the nodes

      if ( numberOfVisibleGraphs > 0 ) {
        content[ 0 ].top = 100;
        content[ 0 ].left = 0;
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
    this.secondDerivativeGraphNode.reset();
    this.integralGraphNode.reset();
  }
}

calculusGrapher.register( 'GraphNodes', GraphNodes );
