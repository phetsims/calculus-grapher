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
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import OriginalGraphNode from './OriginalGraphNode.js';
import GraphTypeLabelNode from './GraphTypeLabelNode.js';
import VerticalLineNode from './VerticalLineNode.js';
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

    function createGraphNode( curve: Curve, graphType: GraphType ): GraphNode {
      assert && assert( graphType !== GraphType.ORIGINAL, 'cant handle original' );

      return new GraphNode( curve,
        graphType.strokeProperty,
        gridVisibleProperty,
        graphHeightProperty,
        new GraphTypeLabelNode( graphType ), {
          tandem: subsetGraphTypes.includes( graphType ) ?
                  options.tandem.createTandem( `${graphType.tandemNamePrefix}GraphNode` ) :
                  Tandem.OPT_OUT
        } );
    }

    this.integralGraphNode = createGraphNode( model.integralCurve, GraphType.INTEGRAL );
    this.derivativeGraphNode = createGraphNode( model.derivativeCurve, GraphType.DERIVATIVE );
    this.secondDerivativeGraphNode = createGraphNode( model.secondDerivativeCurve, GraphType.SECOND_DERIVATIVE );

    // originalGraphNode is always instrumented, because it should always be present.
    this.originalGraphNode = new OriginalGraphNode( model, visibleProperties, graphHeightProperty, {
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

    // To display a different set of graphs, get the GraphNodes, handle their layout, and adjust the position
    // of the reference line and vertical lines.
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
    this.integralGraphNode.reset();
    this.originalGraphNode.reset();
    this.derivativeGraphNode.reset();
    this.secondDerivativeGraphNode.reset();
  }

  /**
   * Gets the GraphNode instance that corresponds to GraphType.
   */
  private getGraphNode( graphType: GraphType ): GraphNode {
    const graphNode = graphType === GraphType.INTEGRAL ? this.integralGraphNode :
                      graphType === GraphType.ORIGINAL ? this.originalGraphNode :
                      graphType === GraphType.DERIVATIVE ? this.derivativeGraphNode :
                      graphType === GraphType.SECOND_DERIVATIVE ? this.secondDerivativeGraphNode :
                      null;
    assert && assert( graphNode );
    return graphNode!;
  }

  /**
   * Decorates the appropriate graphs for the tangent feature.
   */
  public addTangentView( tangentScrubber: TangentScrubber, visibleProperty: TReadOnlyProperty<boolean> ): void {

    // Plot a point on each graph that will stay in sync with tangentScrubber.
    this.addPlottedPoints( tangentScrubber, visibleProperty, 'tangentPoint' );

    // Add a scrubber to the original graph, for moving the x location of tangentScrubber.
    this.originalGraphNode.addScrubberNode( tangentScrubber, tangentScrubber.colorProperty, visibleProperty, 'tangentScrubber' );

    // Add the double-headed tangent arrow at the tangent point on the original graph.
    this.originalGraphNode.addTangentArrowNode( tangentScrubber, visibleProperty );
  }

  /**
   * Decorates the appropriate graphs for the 'area under curve' feature.
   */
  public addAreaUnderCurveView( areaUnderCurveScrubber: AreaUnderCurveScrubber, visibleProperty: TReadOnlyProperty<boolean> ): void {

    // Plot a point on each graph that will stay in sync with areaUnderCurveScrubber.
    this.addPlottedPoints( areaUnderCurveScrubber, visibleProperty, 'areaUnderCurvePoint' );

    // Add a scrubber on the original graph, for moving the x location of areaUnderCurveScrubber.
    this.originalGraphNode.addScrubberNode( areaUnderCurveScrubber, areaUnderCurveScrubber.colorProperty, visibleProperty,
      'areaUnderCurveScrubber' );

    // Add a plot of the area under the curve on the original graph.
    this.originalGraphNode.addAreaUnderCurvePlot( areaUnderCurveScrubber, visibleProperty );
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
