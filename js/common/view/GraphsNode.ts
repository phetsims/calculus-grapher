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
import { Color, ColorProperty, HBox, Node, NodeOptions, Text } from '../../../../scenery/js/imports.js';
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
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import StringProperty from '../../../../axon/js/StringProperty.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
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

    // create label for original graph that toggles between 'Predict f(x)' and 'f(x)'
    const originalLabelNode = new HBox( {
      children: [
        new Text( CalculusGrapherStrings.predictStringProperty, {
          font: CalculusGrapherConstants.CONTROL_FONT,
          visibleProperty: model.predictModeEnabledProperty
        } ),
        new GraphTypeLabelNode( 'original' ) ],
      spacing: 5
    } );

    this.originalGraphNode = new OriginalGraphNode( model,
      visibleProperties,
      graphHeightProperty,
      originalLabelNode, {
        graphType: 'original',
        curveStroke: getGraphTypeStroke( 'original' ),

        // originalGraphNode is always instrumented, because it should always be present.
        tandem: options.tandem.createTandem( 'originalGraphNode' )
      }
    );

    const pointLabelsTandem = options.tandem.createTandem( 'pointLabels' );
    model.labelledPoints.forEach( ( ancillaryTool, index ) => {
      const label = CalculusGrapherModel.intToUppercaseLetter( index );
      const pointLabelTandem = pointLabelsTandem.createTandem( `${label}PointLabel` );

      const visibleProperty = new BooleanProperty( false,
        { tandem: pointLabelTandem.createTandem( 'visibleProperty' ) } );
      const colorProperty = new ColorProperty( CalculusGrapherColors.originalCurveStrokeProperty.value,
        { tandem: pointLabelTandem.createTandem( 'colorProperty' ) } );
      const labelProperty = new StringProperty( label,
        { tandem: pointLabelTandem.createTandem( 'labelProperty' ) } );

      const pointLabelVisibleProperty = new DerivedProperty(
        [ visibleProperty, model.predictModeEnabledProperty ],
        ( visible, predictMode ) =>
          visible && !predictMode );

      this.originalGraphNode.addPointLabel( ancillaryTool, {
        labelProperty: labelProperty,
        focusPointNodeOptions: { fill: colorProperty },
        visibleProperty: pointLabelVisibleProperty,
        tandem: pointLabelTandem
      } );
    } );

    const referenceLineNode = new ReferenceLineNode( model.referenceLine,
      this.originalGraphNode.chartTransform, {
        x: this.originalGraphNode.x,
        visibleProperty: visibleProperties.referenceLineVisibleProperty,
        cursor: 'pointer',
        tandem: options.tandem.createTandem( 'referenceLineNode' )
      } );

    // To organize all vertical lines under 1 tandem
    const verticalLinesTandem = options.tandem.createTandem( 'verticalLines' );

    const verticalLineNodes = model.labelledVerticalLines.map( ( verticalLine, index ) => {
        const label = CalculusGrapherModel.intToUppercaseLetter( index );
        const verticalLineNodeTandem = verticalLinesTandem.createTandem( `${label}VerticalLineNode` );

        const colorProperty = new ColorProperty( new Color( 0x000000 ),
          { tandem: verticalLineNodeTandem.createTandem( 'colorProperty' ) } );
        const labelProperty = new StringProperty( label,
          { tandem: verticalLineNodeTandem.createTandem( 'labelProperty' ) } );
        const visibleProperty = new BooleanProperty( false,
          { tandem: verticalLineNodeTandem.createTandem( 'visibleProperty' ) } );

        return new VerticalLineNode( verticalLine, this.originalGraphNode.chartTransform, {
          x: this.originalGraphNode.x,
          lineOptions: {
            lineDash: [ 4, 2 ],
            stroke: colorProperty
          },
          labelProperty: labelProperty,
          visibleProperty: visibleProperty,
          tandem: verticalLineNodeTandem
        } );

      }
    );

    const verticalLinesLayer = new Node( {
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

    options.children = [ graphSetNode, verticalLinesLayer, referenceLineNode ];

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
