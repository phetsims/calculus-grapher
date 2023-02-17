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
import CalculusGrapherPreferences from '../model/CalculusGrapherPreferences.js';

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

  // Height of the graph, in view coordinates
  private readonly graphHeight: number;

  // Vertical spacing between GraphNodes, in view coordinates
  private readonly graphYSpacing: number;

  // A reference line that extends vertically through all graphs
  private readonly referenceLineNode: ReferenceLineNode;

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

    // more graphs requires less spacing
    this.graphYSpacing = ( model.graphSetProperty.value.length < 4 ) ? 20 : 12;

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

    this.referenceLineNode = new ReferenceLineNode( model.referenceLine, this.originalGraphNode.chartTransform,
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
      assert && assert( oldGraphSet === null || newGraphSet.length === oldGraphSet.length,
        'graph sets must have the same length' );

      // Interrupt any interactions that are in-progress.
      this.interruptSubtreeInput();

      // Get the GraphNode instances for the old and new GraphSets.
      const oldGraphNodes = oldGraphSet ? this.getGraphNodes( oldGraphSet ) : null;
      const newGraphNodes = this.getGraphNodes( newGraphSet );

      this.graphSetsAnimator.changeGraphSets( this.graphSetNode, oldGraphNodes, newGraphNodes, this.graphHeight, this.graphYSpacing,

        // Resize all LineToolNodes so that they extend through all graphs.
        // For the referenceLine, add a bit more extent at the bottom, so that the drag handle does not overlap scrubber.
        () => {
          this.resizeReferenceLine();
          this.resizeLineToolNodes( verticalLinesNode.verticalLineNodes, 13, 0 );
          this.resizeLineToolNodes( this.scrubberLineNodes, 0, -CalculusGrapherConstants.SCRUBBER_RADIUS );
        } );
    } );

    options.children = [ this.graphSetNode, this.scrubberLineNodesParent, verticalLinesNode, this.referenceLineNode ];

    this.mutate( options );

    CalculusGrapherPreferences.valuesVisibleProperty.link( () => this.resizeReferenceLine() );

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
   * Resizes a set of LineToolNodes so that they extend through all graphs.\
   * NOTE: Top and bottom are computed so that they correspond to ChartRectangles, not GraphNodes.
   */
  private resizeLineToolNodes( lineToolNodes: LineToolNode[], topExtent: number, bottomExtent: number ): void {
    lineToolNodes.forEach( lineToolNode => {
      const numberOfGraphNodes = this.graphSetNode.getChildrenCount();
      const top = this.graphSetNode.x - topExtent;
      const bottom = this.graphSetNode.x + ( numberOfGraphNodes * this.graphHeight ) + ( ( numberOfGraphNodes - 1 ) * this.graphYSpacing ) + bottomExtent;
      lineToolNode.setLineTopAndBottom( top, bottom );
    } );
  }

  private resizeReferenceLine(): void {
    const topExtent = CalculusGrapherPreferences.valuesVisibleProperty.value ? 13 : 0; // add top extent when value is visible
    const bottomExtent = 17; // long enough to avoid overlapping scrubber
    this.resizeLineToolNodes( [ this.referenceLineNode ], topExtent, bottomExtent );
  }

  /**
   * Decorates the appropriate graphs for the tangent feature.
   */
  public addTangentView( tangentScrubber: TangentScrubber, predictEnabledProperty: TReadOnlyProperty<boolean> ): void {

    const derivativeGraphNode = this.derivativeGraphNode!;
    assert && assert( derivativeGraphNode );

    // Determines whether the tangent scrubber, tangent line, and associated points are visible on the graphs.
    const tangentVisibleProperty = new DerivedProperty(
      [ tangentScrubber.visibleProperty, predictEnabledProperty ],
      ( tangentScrubberVisible, predictEnabled ) => tangentScrubberVisible && !predictEnabled, {
        // No PhET-iO instrumentation because this is more complicated than is useful for clients.
      } );

    // Add a scrubber to the derivative graph, for moving the x location of tangentScrubber.
    // See https://github.com/phetsims/calculus-grapher/issues/207
    derivativeGraphNode.addScrubberNode( tangentScrubber, tangentScrubber.colorProperty, tangentVisibleProperty,
      false /* accumulationLineVisible */, 'tangentScrubberNode' );
    this.addScrubberLineNode( tangentScrubber, CalculusGrapherColors.derivativeCurveStrokeProperty );

    // Add the double-headed tangent arrow at the tangent point on the original graph.
    this.originalGraphNode.addTangentArrowNode( tangentScrubber, tangentVisibleProperty );

    // Plot a point on the derivative graph, to show the point that corresponds to the slope of the tangent.
    this.addPlottedPoint( tangentScrubber, tangentVisibleProperty, 'tangentPointNode', derivativeGraphNode,
      tangentScrubber.yDerivativeProperty, CalculusGrapherColors.derivativeCurveStrokeProperty );
  }

  /**
   * Decorates the appropriate graphs for the 'area under curve' feature.
   */
  public addAreaUnderCurveView( areaUnderCurveScrubber: AreaUnderCurveScrubber, predictEnabledProperty: TReadOnlyProperty<boolean> ): void {

    const integralGraphNode = this.integralGraphNode!;
    assert && assert( integralGraphNode );

    // Determines whether the area-under-curve scrubber, plot, and associated points are visible on the graphs.
    const areaUnderCurveVisibleProperty = new DerivedProperty(
      [ areaUnderCurveScrubber.visibleProperty, predictEnabledProperty ],
      ( tangentScrubberVisible, predictEnabled ) => tangentScrubberVisible && !predictEnabled, {
        // No PhET-iO instrumentation because this is more complicated than is useful for clients.
      } );

    // Add a scrubber to the original graph, for moving the x location of areaUnderCurveScrubber.
    this.originalGraphNode.addScrubberNode( areaUnderCurveScrubber, areaUnderCurveScrubber.colorProperty,
      areaUnderCurveVisibleProperty, true /* accumulationLineVisible */, 'areaUnderCurveScrubberNode' );
    this.addScrubberLineNode( areaUnderCurveScrubber, CalculusGrapherColors.integralCurveStrokeProperty );

    // Add a plot of the area under the curve on the original graph.
    this.originalGraphNode.addAreaUnderCurvePlot( areaUnderCurveScrubber, areaUnderCurveVisibleProperty );

    // Plot a point on the integral graph, to show the point that corresponds to the area under the curve.
    this.addPlottedPoint( areaUnderCurveScrubber, areaUnderCurveVisibleProperty, 'areaUnderCurvePointNode',
      integralGraphNode, areaUnderCurveScrubber.yIntegralProperty, CalculusGrapherColors.integralCurveStrokeProperty );
  }

  /**
   * Adds a vertical line that passes through all graphs and moves with scrubber's x position.
   */
  private addScrubberLineNode( scrubber: AncillaryTool, lineStroke: TColor ): void {
    const scrubberLineNode = new ScrubberLineNode( scrubber, this.originalGraphNode.chartTransform, lineStroke );
    this.scrubberLineNodes.push( scrubberLineNode );
    this.scrubberLineNodesParent.addChild( scrubberLineNode );
    this.resizeLineToolNodes( [ scrubberLineNode ], 0, -CalculusGrapherConstants.SCRUBBER_RADIUS );
  }

  /**
   * Adds a PlottedPoint to a graph.
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
