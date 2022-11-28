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
import CurveLabelNode from './CurveLabelNode.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import { GraphSet } from './CalculusGrapherScreenView.js';
import Property from '../../../../axon/js/Property.js';
import ReferenceLineNode from './ReferenceLineNode.js';

type SelfOptions = EmptySelfOptions;

export type GraphNodesOptions = SelfOptions & NodeOptions;

export default class GraphNodes extends Node {

  private readonly resetGraphNodes: () => void;
  private readonly graphHeightProperty: TReadOnlyProperty<number>;

  public constructor( model: CalculusGrapherModel,
                      graphSetProperty: Property<GraphSet>,
                      gridVisibleProperty: Property<boolean>,
                      referenceLineVisibleProperty: Property<boolean>,
                      providedOptions?: GraphNodesOptions ) {

    const options = optionize<GraphNodesOptions, SelfOptions, NodeOptions>()( {}, providedOptions );

    // determine the (view) height of the graph based on the number of visible graphs.
    const graphHeightProperty = new DerivedProperty( [ graphSetProperty ], graphsSelected => {
      const numberOfVisibleGraphs = graphsSelected.length;
      return CalculusGrapherConstants.GRAPH_VERTICAL_HEIGHT[ numberOfVisibleGraphs - 1 ];
    } );

    const integralGraphNode = new GraphNode( model.integralCurve,
      gridVisibleProperty,
      graphHeightProperty,
      new CurveLabelNode( { graphType: 'integral' } ),
      {
        curveNodeOptions: {
          continuousLinePlotOptions: {
            stroke: CalculusGrapherColors.integralCurveStrokeProperty
          }
        },
        tandem: options.tandem.createTandem( 'integralGraphNode' )
      } );

    const originalGraphNode = new OriginalGraphNode( model.originalCurve,
      model.curveManipulationProperties,
      gridVisibleProperty,
      graphHeightProperty,
      new CurveLabelNode( { graphType: 'original' } ),
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
      new CurveLabelNode( { graphType: 'derivative' } ),
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
      new CurveLabelNode( { graphType: 'secondDerivative' } ),
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
