// Copyright 2022-2023, University of Colorado Boulder

/**
 * Class for all the graphs in the 'Calculus Grapher' simulation.
 * It also adds the reference line and all the (PhET-IO) vertical lines at the bottom of the graphs
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherModel from '../model/CalculusGrapherModel.js';
import GraphNode from './GraphNode.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import { Node, NodeOptions, TColor } from '../../../../scenery/js/imports.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import OriginalGraphNode from './OriginalGraphNode.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import ReferenceLineNode from './ReferenceLineNode.js';
import TangentScrubber from '../model/TangentScrubber.js';
import AreaUnderCurveScrubber from '../model/AreaUnderCurveScrubber.js';
import AncillaryTool from '../model/AncillaryTool.js';
import GraphType from '../model/GraphType.js';
import Curve from '../model/Curve.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import VerticalLinesNode from './VerticalLinesNode.js';
import GraphSet from '../model/GraphSet.js';
import ScrubberLineNode from './ScrubberLineNode.js';
import LineToolNode from './LineToolNode.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import GraphSetsAnimator from './GraphSetsAnimator.js';

// How much VerticalLines extend above and below the graphs
const VERTICAL_LINE_Y_EXTENT = 4;
const SCRUBBER_LINE_Y_EXTENT = 0;

type SelfOptions = EmptySelfOptions;

type GraphsNodeOptions = SelfOptions & StrictOmit<NodeOptions, 'children'>;

export default class GraphsNode extends Node {

  // An OriginalGraphNode is always present, because the student interacts with curves in the graph.
  public readonly originalGraphNode: OriginalGraphNode;

  // These GraphNodes will be conditionally created, based on whether they appear in model.graphSets.
  private readonly integralGraphNode?: GraphNode;
  private readonly derivativeGraphNode?: GraphNode;
  private readonly secondDerivativeGraphNode?: GraphNode;

  // For iterating over all GraphNode instances
  private readonly graphNodes: GraphNode[];

  // The parent for all GraphNode instances that are part model.graphSetProperty.value
  private readonly graphSetNode: Node;

  // Height of the graph in view coordinates
  private readonly graphHeight: number;

  // Vertical lines that pass through all graphs and follow the x position of a scrubber
  private readonly scrubberLineNodes: ScrubberLineNode[];
  private readonly scrubberLineNodesParent: Node;

  private readonly graphSetsAnimator: GraphSetsAnimator;

  public constructor( model: CalculusGrapherModel, providedOptions?: GraphsNodeOptions ) {

    const options = optionize<GraphsNodeOptions, SelfOptions, NodeOptions>()( {

      // NodeOptions
      phetioVisiblePropertyInstrumented: false
    }, providedOptions );

    super();

    // The (view) height of the graph based on the number of visible graphs.
    this.graphHeight = CalculusGrapherConstants.SINGLE_GRAPH_HEIGHT / model.graphSetProperty.value.length;

    // Creates a GraphNode instance, and instruments it if its GraphType is included in graphSets.
    const createGraphNode = ( graphType: GraphType, curve: Curve ) => {
      assert && assert( graphType !== GraphType.ORIGINAL, 'does not support GraphType.ORIGINAL' );

      return new GraphNode( graphType, curve, model.gridVisibleProperty, {
        graphHeight: this.graphHeight,
        tandem: GraphSet.includes( model.graphSets, graphType ) ?
                options.tandem.createTandem( `${graphType.tandemNamePrefix}GraphNode` ) :
                Tandem.OPT_OUT
      } );
    };

    // OriginalGraphNode is always instrumented, because it should always be present.
    this.originalGraphNode = new OriginalGraphNode( model, {
      graphHeight: this.graphHeight,
      tandem: options.tandem.createTandem( 'originalGraphNode' )
    } );

    this.graphNodes = [ this.originalGraphNode ];

    // Conditionally create the GraphNodes for the derived curves, if they are in model.graphSets.
    if ( GraphSet.includes( model.graphSets, GraphType.INTEGRAL ) ) {
      this.integralGraphNode = createGraphNode( GraphType.INTEGRAL, model.integralCurve );
      this.graphNodes.push( this.integralGraphNode );
    }
    if ( GraphSet.includes( model.graphSets, GraphType.DERIVATIVE ) ) {
      this.derivativeGraphNode = createGraphNode( GraphType.DERIVATIVE, model.derivativeCurve );
      this.graphNodes.push( this.derivativeGraphNode );
    }
    if ( GraphSet.includes( model.graphSets, GraphType.SECOND_DERIVATIVE ) ) {
      this.secondDerivativeGraphNode = createGraphNode( GraphType.SECOND_DERIVATIVE, model.secondDerivativeCurve );
      this.graphNodes.push( this.secondDerivativeGraphNode );
    }

    const referenceLineNode = new ReferenceLineNode( model.referenceLine, this.originalGraphNode.chartTransform,
      options.tandem.createTandem( 'referenceLineNode' ) );

    // Vertical lines
    const verticalLinesNode = new VerticalLinesNode( model.verticalLines, model.verticalLinesLinkableElement,
      this.originalGraphNode.chartTransform, options.tandem.createTandem( 'verticalLinesNode' ) );

    // Scrubber lines
    this.scrubberLineNodes = [];
    this.scrubberLineNodesParent = new Node();

    this.graphSetNode = new Node();

    this.graphSetsAnimator = new GraphSetsAnimator(
      ( model.graphSets.length > 1 ) ? options.tandem.createTandem( 'graphSetsAnimator' ) : Tandem.OPT_OUT );

    // To display a different set of graphs, get the GraphsNode, handle their layout, and adjust the position
    // of the reference line and vertical lines.
    model.graphSetProperty.link( ( newGraphSet, oldGraphSet ) => {

      // Get the GraphNode instances for the old and new GraphSets.
      const oldGraphNodes = oldGraphSet ? this.getGraphNodes( oldGraphSet ) : null;
      const newGraphNodes = this.getGraphNodes( newGraphSet );

      this.graphSetsAnimator.changeGraphSets( this.graphSetNode, oldGraphNodes, newGraphNodes, this.graphHeight,

        // Resize all LineToolNodes so that they extend through all graphs. For the referenceLine, add a bit more extent
        // at the bottom if the bottom graph is the original graph, so that the drag handle does not overlap scrubber.
        () => {
          const bottomOffset = ( newGraphNodes[ newGraphNodes.length - 1 ] instanceof OriginalGraphNode ) ? 4 : 0;
          this.resizeLineToolNodes( [ referenceLineNode ], VERTICAL_LINE_Y_EXTENT, VERTICAL_LINE_Y_EXTENT + bottomOffset );
          this.resizeLineToolNodes( verticalLinesNode.verticalLineNodes, VERTICAL_LINE_Y_EXTENT, VERTICAL_LINE_Y_EXTENT );
          this.resizeLineToolNodes( this.scrubberLineNodes, SCRUBBER_LINE_Y_EXTENT, SCRUBBER_LINE_Y_EXTENT );
        } );
    } );

    options.children = [ this.graphSetNode, this.scrubberLineNodesParent, verticalLinesNode, referenceLineNode ];

    this.mutate( options );

    this.addLinkedElement( model.graphSetProperty, {
      tandem: options.tandem.createTandem( model.graphSetProperty.tandem.name )
    } );
  }

  public reset(): void {
    this.graphNodes.forEach( graphNode => graphNode.reset() );
  }

  public step( dt: number ): void {
    this.graphSetsAnimator.step( dt );
  }

  /**
   * Gets the GraphNode instances that correspond to graphSet, in the same order as graphSet.
   */
  private getGraphNodes( graphSet: GraphSet ): GraphNode[] {
    return graphSet.graphTypes.map( graphType => {
      const graphNode = _.find( this.graphNodes, graphNode => graphNode.graphType === graphType )!;
      assert && assert( graphNode, `expected a GraphNode for graphType=${graphType}` );
      return graphNode;
    } );
  }

  /**
   * Resizes a set of LineToolNodes so that they extend through all graphs.
   */
  private resizeLineToolNodes( lineToolNodes: LineToolNode[], topExtent: number, bottomExtent: number ): void {
    lineToolNodes.forEach( lineToolNode =>
      lineToolNode.setLineTopAndBottom( this.graphSetNode.top - topExtent, this.graphSetNode.bottom + bottomExtent )
    );
  }

  /**
   * Decorates the appropriate graphs for the tangent feature.
   */
  public addTangentView( tangentScrubber: TangentScrubber, predictEnabledProperty: TReadOnlyProperty<boolean> ): void {

    // Determines whether the tangent scrubber, tangent line, and associated points are visible on the graphs.
    const tangentVisibleProperty = new DerivedProperty(
      [ tangentScrubber.visibleProperty, predictEnabledProperty ],
      ( tangentScrubberVisible, predictEnabled ) => tangentScrubberVisible && !predictEnabled, {
        // No PhET-iO instrumentation because this is more complicated than is useful for clients.
      } );

    // Add a scrubber to the original graph, for moving the x location of tangentScrubber.
    this.originalGraphNode.addScrubberNode( tangentScrubber, tangentScrubber.colorProperty, tangentVisibleProperty,
      'tangentScrubberNode' );
    this.addScrubberLineNode( tangentScrubber, CalculusGrapherColors.derivativeCurveStrokeProperty );

    // Add the double-headed tangent arrow at the tangent point on the original graph.
    this.originalGraphNode.addTangentArrowNode( tangentScrubber, tangentVisibleProperty );

    // Plot a point on each graph that will stay in sync with tangentScrubber.
    this.addPlottedPoints( tangentScrubber, tangentVisibleProperty, 'tangentPointNode' );
  }

  /**
   * Decorates the appropriate graphs for the 'area under curve' feature.
   */
  public addAreaUnderCurveView( areaUnderCurveScrubber: AreaUnderCurveScrubber, predictEnabledProperty: TReadOnlyProperty<boolean> ): void {

    // Determines whether the area-under-curve scrubber, plot, and associated points are visible on the graphs.
    const areaUnderCurveVisibleProperty = new DerivedProperty(
      [ areaUnderCurveScrubber.visibleProperty, predictEnabledProperty ],
      ( tangentScrubberVisible, predictEnabled ) => tangentScrubberVisible && !predictEnabled, {
        // No PhET-iO instrumentation because this is more complicated than is useful for clients.
      } );

    // Add a scrubber on the original graph, for moving the x location of areaUnderCurveScrubber.
    this.originalGraphNode.addScrubberNode( areaUnderCurveScrubber, areaUnderCurveScrubber.colorProperty,
      areaUnderCurveVisibleProperty, 'areaUnderCurveScrubberNode' );
    this.addScrubberLineNode( areaUnderCurveScrubber, CalculusGrapherColors.integralCurveStrokeProperty );

    // Add a plot of the area under the curve on the original graph.
    this.originalGraphNode.addAreaUnderCurvePlot( areaUnderCurveScrubber, areaUnderCurveVisibleProperty );

    // Plot a point on each graph that will stay in sync with areaUnderCurveScrubber.
    this.addPlottedPoints( areaUnderCurveScrubber, areaUnderCurveVisibleProperty, 'areaUnderCurvePointNode' );
  }

  /**
   * Adds a vertical line that passes through all graphs and moves with scrubber's x position.
   */
  private addScrubberLineNode( scrubber: AncillaryTool, lineStroke: TColor ): void {
    const scrubberLineNode = new ScrubberLineNode( scrubber, this.originalGraphNode.chartTransform, lineStroke );
    this.scrubberLineNodes.push( scrubberLineNode );
    this.scrubberLineNodesParent.addChild( scrubberLineNode );
    this.resizeLineToolNodes( [ scrubberLineNode ], SCRUBBER_LINE_Y_EXTENT, SCRUBBER_LINE_Y_EXTENT );
  }

  /**
   * Adds a PlottedPoint to each graph.
   */
  private addPlottedPoints( ancillaryTool: AncillaryTool, visibleProperty: TReadOnlyProperty<boolean>, tandemName: string ): void {

    // Do not add a point on originalGraphNode, see https://github.com/phetsims/calculus-grapher/issues/207

    this.integralGraphNode &&
    this.addPlottedPoint( ancillaryTool, visibleProperty, tandemName, this.integralGraphNode, ancillaryTool.yIntegralProperty, CalculusGrapherColors.integralCurveStrokeProperty );

    this.derivativeGraphNode &&
    this.addPlottedPoint( ancillaryTool, visibleProperty, tandemName, this.derivativeGraphNode, ancillaryTool.yDerivativeProperty, CalculusGrapherColors.derivativeCurveStrokeProperty );

    this.secondDerivativeGraphNode &&
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

calculusGrapher.register( 'GraphsNode', GraphsNode );
