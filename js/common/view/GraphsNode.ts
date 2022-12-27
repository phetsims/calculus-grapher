// Copyright 2022, University of Colorado Boulder

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
import { getGraphTypeStroke, GraphSet } from '../model/GraphType.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import CalculusGrapherVisibleProperties from './CalculusGrapherVisibleProperties.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import StringProperty from '../../../../axon/js/StringProperty.js';

type SelfOptions = {
  graphSets: GraphSet[];
};

export type GraphNodesOptions = SelfOptions & StrictOmit<NodeOptions, 'children'>;

export default class GraphNodes extends Node {

  private readonly resetGraphNodes: () => void;

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

    // create and add content for the node, based on graphType, notation and variable
    const integralGraphNode = new GraphNode( model.integralCurve,
      gridVisibleProperty,
      graphHeightProperty,
      new GraphTypeLabelNode( 'integral' ),
      {
        curveStroke: getGraphTypeStroke( 'integral' ),
        tandem: graphTypes.includes( 'integral' ) ? options.tandem.createTandem( 'integralGraphNode' ) : Tandem.OPT_OUT
      } );

    integralGraphNode.addFocusCircle( model.ancillaryTools.xCoordinateProperty,
      model.ancillaryTools.areaUnderCurveProperty,
      {
        visibleProperty: new DerivedProperty( [
            visibleProperties.areaUnderCurveVisibleProperty,
            model.predictModeEnabledProperty ],
          ( area, predictMode ) => area && !predictMode ),
        fill: getGraphTypeStroke( 'integral' )
      } );

    const originalGraphNode = new OriginalGraphNode( model,
      visibleProperties,
      graphHeightProperty,
      originalLabelNode,
      {
        curveStroke: getGraphTypeStroke( 'original' ),

        // originalGraphNode is always instrumented, because it should always be present.
        tandem: options.tandem.createTandem( 'originalGraphNode' )
      }
    );

    const pointsLabelTandem = options.tandem.createTandem( 'PointsLabel' );
    model.labelledPoints.forEach( ( ancillaryTool, index ) => {
      const label = CalculusGrapherModel.intToUppercaseLetter( index );
      const pointLabelTandem = pointsLabelTandem.createTandem( `${label}PointLabel` );

      originalGraphNode.addPointLabel( ancillaryTool, {
        labelProperty: new StringProperty( label, {
          tandem: pointLabelTandem.createTandem( 'labelProperty' )
        } ),
        visibleProperty: new BooleanProperty( true,
          { tandem: pointLabelTandem.createTandem( 'visibleProperty' ) } ),
        tandem: pointLabelTandem
      } );
    } );

    originalGraphNode.addFocusCircle( model.ancillaryTools.xCoordinateProperty,
      model.ancillaryTools.originalProperty, {
        visibleProperty: new DerivedProperty( [
            visibleProperties.areaUnderCurveVisibleProperty,
            visibleProperties.tangentVisibleProperty,
            model.predictModeEnabledProperty ],
          ( area, tangent, predictMode ) =>
            ( area || tangent ) && !predictMode ),
        fill: getGraphTypeStroke( 'original' )
      } );

    const derivativeGraphNode = new GraphNode( model.derivativeCurve,
      gridVisibleProperty,
      graphHeightProperty,
      new GraphTypeLabelNode( 'derivative' ),
      {
        curveStroke: getGraphTypeStroke( 'derivative' ),
        tandem: graphTypes.includes( 'derivative' ) ? options.tandem.createTandem( 'derivativeGraphNode' ) : Tandem.OPT_OUT
      } );

    derivativeGraphNode.addFocusCircle( model.ancillaryTools.xCoordinateProperty,
      model.ancillaryTools.tangentProperty, {
        visibleProperty: new DerivedProperty( [
            visibleProperties.tangentVisibleProperty,
            model.predictModeEnabledProperty ],
          ( tangent, predictMode ) => tangent && !predictMode ),
        fill: getGraphTypeStroke( 'derivative' )
      } );

    const secondDerivativeGraphNode = new GraphNode( model.secondDerivativeCurve,
      gridVisibleProperty,
      graphHeightProperty,
      new GraphTypeLabelNode( 'secondDerivative' ),
      {
        curveStroke: getGraphTypeStroke( 'secondDerivative' ),
        tandem: graphTypes.includes( 'secondDerivative' ) ? options.tandem.createTandem( 'secondDerivativeGraphNode' ) : Tandem.OPT_OUT
      } );

    const referenceLineNode = new VerticalLineNode( model.referenceLine,
      originalGraphNode.chartTransform, {
        x: originalGraphNode.x,
        visibleProperty: visibleProperties.referenceLineVisibleProperty,
        cursor: 'pointer',
        tandem: options.tandem.createTandem( 'referenceLineNode' )
      } );

    const verticalLinesLayerTandem = options.tandem.createTandem( 'verticalLinesLayer' );
    const verticalLinesNode = model.labelledVerticalLines.map( ( verticalLine, index ) => {
        const label = CalculusGrapherModel.intToUppercaseLetter( index );
        const verticalLineNodeTandem = verticalLinesLayerTandem.createTandem( `${label}VerticalLineNode` );
        return new VerticalLineNode( verticalLine, originalGraphNode.chartTransform, {
          x: originalGraphNode.x,
          cursor: null,
          dragListenerEnabled: false,
          lineOptions: {
            lineDash: [ 4, 2 ],
            stroke: new ColorProperty( new Color( 0x000000 ), {
              tandem: verticalLineNodeTandem.createTandem( 'colorProperty' )
            } )
          },
          sphereOptions: { visible: false },
          labelProperty: new StringProperty( label, {
            tandem: verticalLineNodeTandem.createTandem( 'labelProperty' )
          } ),
          visibleProperty: new BooleanProperty( false,
            { tandem: verticalLineNodeTandem.createTandem( 'visibleProperty' ) } ),
          tandem: verticalLineNodeTandem
        } );
      }
    );

    const verticalLinesLayer = new Node( {
      children: verticalLinesNode,
      tandem: verticalLinesLayerTandem
    } );

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
        content[ 0 ].y = 0;
      }

      const spacingBetweenGraphs = 20 / numberOfVisibleGraphs + 10; // arbitrary values

      for ( let i = 1; i < numberOfVisibleGraphs; i++ ) {
        content[ i ].x = content[ i - 1 ].x;
        content[ i ].y = content[ i - 1 ].y + graphHeightProperty.value + spacingBetweenGraphs;
      }

      graphSetNode.setChildren( content );


      // TODO: find a better way to set positions
      referenceLineNode.setLineBottom( graphSetNode.bottom + 10 );
      referenceLineNode.setLineTop( graphSetNode.top - 5 );
      verticalLinesNode.forEach( verticalLineNode => {
        verticalLineNode.setLineBottom( graphSetNode.bottom + 10 );
        verticalLineNode.setLineTop( graphSetNode.top - 5 );
      } );
    } );

    options.children = [ graphSetNode, referenceLineNode, verticalLinesLayer ];

    super( options );

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
