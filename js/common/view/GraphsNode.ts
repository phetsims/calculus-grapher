// Copyright 2022, University of Colorado Boulder

/**
 * Class for the all the graphs in the 'Calculus Grapher' simulation.
 *
 * @author Martin Veillette
 */

import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherModel from '../model/CalculusGrapherModel.js';
import GraphNode from './GraphNode.js';
import optionize, { combineOptions, EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import { Node, NodeOptions } from '../../../../scenery/js/imports.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import OriginalGraphNode from './OriginalGraphNode.js';
import CurveLabelsNode from './CurveLabelsNode.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import { GraphChoice, GraphChoices } from './CalculusGrapherScreenView.js';
import Property from '../../../../axon/js/Property.js';
import ReferenceLineNode from './ReferenceLineNode.js';

type SelfOptions = EmptySelfOptions;

export type GraphNodesOptions = SelfOptions & NodeOptions;

export default class GraphNodes extends Node {

  private readonly resetGraphNodes: () => void;
  private readonly graphHeightProperty: TReadOnlyProperty<number>;

  public constructor( model: CalculusGrapherModel,
                      graphsSelectedProperty: Property<GraphChoice>,
                      graphChoices: GraphChoices,
                      gridVisibleProperty: Property<boolean>,
                      referenceLineVisibleProperty: Property<boolean>,
                      providedOptions?: GraphNodesOptions ) {

    const options = optionize<GraphNodesOptions, SelfOptions, NodeOptions>()( {}, providedOptions );

    // determine the (view) height of the graph based on the number of visible graphs.
    const graphHeightProperty = new DerivedProperty( [ graphsSelectedProperty ], graphsSelected => {
      const numberOfVisibleGraphs = graphsSelected.length;
      return CalculusGrapherConstants.GRAPH_VERTICAL_HEIGHT[ numberOfVisibleGraphs - 1 ];
    } );

    const integralGraphNode = new GraphNode( model.integralCurve,
      gridVisibleProperty,
      graphHeightProperty,
      CurveLabelsNode.getIntegralLabel(),
      {
        curveNodeOptions: {
          continuousLinePlotOptions: {
            stroke: CalculusGrapherColors.integralCurveStrokeProperty
          }
        },
        tandem: options.tandem.createTandem( 'integralGraphNode' )
      } );

    const originalGraphNode = new OriginalGraphNode( model.originalCurve,
      gridVisibleProperty,
      graphHeightProperty,
      CurveLabelsNode.getOriginalLabel(),
      {
        curveNodeOptions: {
          continuousLinePlotOptions: {
            stroke: CalculusGrapherColors.originalCurveStrokeProperty
          }
        },
        tandem: options.tandem.createTandem( 'originalGraphNode' )
      } );

    const derivativeGraphNode = new GraphNode( model.derivativeCurve,
      gridVisibleProperty,
      graphHeightProperty,
      CurveLabelsNode.getDerivativeLabel(),
      {
        curveNodeOptions: {
          continuousLinePlotOptions: {
            stroke: CalculusGrapherColors.derivativeCurveStrokeProperty
          }
        },
        tandem: options.tandem.createTandem( 'derivativeGraphNode' )

      } );

    const secondDerivativeGraphNode = new GraphNode( model.secondDerivativeCurve,
      gridVisibleProperty,
      graphHeightProperty,
      CurveLabelsNode.getSecondDerivativeLabel(),
      {
        curveNodeOptions: {
          continuousLinePlotOptions: {
            stroke: CalculusGrapherColors.secondDerivativeCurveStrokeProperty
          }
        },
        tandem: options.tandem.createTandem( 'secondDerivativeGraphNode' )
      } );

    const referenceLineNode = new ReferenceLineNode( model.referenceLineXCoordinateProperty,
      referenceLineVisibleProperty,
      originalGraphNode.chartTransform,
      {
        cursor: 'pointer',
        tandem: options.tandem.createTandem( 'referenceLineNode' )
      } );

    const graphSet = new Node();

    graphsSelectedProperty.link( graphChoice => {

      // array of Node content of this class
      const content = graphChoice.map( graphType => {
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

      const numberOfVisibleGraphs = graphChoice.length;

      // layout of all the nodes

      if ( numberOfVisibleGraphs > 0 ) {
        content[ 0 ].top = 100;
        content[ 0 ].left = 0;
      }

      for ( let i = 1; i < numberOfVisibleGraphs; i++ ) {
        content[ i ].rightTop = content[ i - 1 ].rightBottom.addXY( 0, 10 );
      }

      graphSet.setChildren( content );

      referenceLineNode.setLineBottom( graphSet.bottom );
      referenceLineNode.setLineTop( graphSet.top );

    } );

    super( combineOptions<NodeOptions>( { children: [ graphSet, referenceLineNode ] }, options ) );

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
