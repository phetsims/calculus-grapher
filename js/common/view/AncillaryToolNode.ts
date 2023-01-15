// Copyright 2022-2023, University of Colorado Boulder

/**
 * AncillaryToolNode is the base class for a tool associated with a graph.
 * Its responsibilities include:
 *  - Creating and adding a scrubber
 *  - Creating and adding a focus circle on each graph
 * @author Martin Veillette
 */

import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import { Color, Node, NodeOptions } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { GRAPH_TYPES, GraphType, getGraphTypeStrokeProperty } from '../model/GraphType.js';
import AncillaryTool from '../model/AncillaryTool.js';
import GraphsNode from './GraphsNode.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import { FocusCircleOptions } from './FocusCircle.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import GraphNode from './GraphNode.js';
import { ScrubberNodeOptions } from './ScrubberNode.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';

type SelfOptions = {
  mainFillProperty: TReadOnlyProperty<Color>;
  scrubberLineVisible?: boolean;
};

export type AncillaryToolNodeOptions = SelfOptions & StrictOmit<NodeOptions, 'visibleProperty'> &
  PickRequired<NodeOptions, 'tandem'>;

export default class AncillaryToolNode extends Node {

  private readonly ancillaryTool: AncillaryTool;
  private readonly predictModeEnabledProperty: TReadOnlyProperty<boolean>;
  private readonly graphsNode: GraphsNode;

  protected constructor( ancillaryTool: AncillaryTool,
                         graphType: GraphType,
                         predictModeEnabledProperty: TReadOnlyProperty<boolean>,
                         graphsNode: GraphsNode,
                         providedOptions: AncillaryToolNodeOptions ) {

    const options = optionize<AncillaryToolNodeOptions, SelfOptions, NodeOptions>()( {

      // SelfOptions
      scrubberLineVisible: true,

      // NodeOptions
      visibleProperty: new DerivedProperty(
        [ ancillaryTool.visibleProperty, predictModeEnabledProperty ],
        ( ancillaryToolVisible, predictModeEnabled ) => ancillaryToolVisible && !predictModeEnabled, {
          tandem: providedOptions.tandem.createTandem( 'visibleProperty' ),
          phetioValueType: BooleanIO
        } )
    }, providedOptions );

    super( options );

    this.ancillaryTool = ancillaryTool;
    this.predictModeEnabledProperty = predictModeEnabledProperty;
    this.graphsNode = graphsNode;

    this.addScrubberNode( graphType, {
      lineOptions: {
        visible: options.scrubberLineVisible
      },
      fill: options.mainFillProperty
    } );

    GRAPH_TYPES.forEach( graphType => this.addFocusCircle( graphType ) );
  }

  protected getYProperty( graphType: GraphType ): TReadOnlyProperty<number> {
    return this.ancillaryTool.getYProperty( graphType );
  }

  protected getGraphNode( graphType: GraphType ): GraphNode {
    return this.graphsNode.getGraphNode( graphType );
  }

  private addScrubberNode( graphType: GraphType,
                           providedOptions: StrictOmit<ScrubberNodeOptions, 'visibleProperty' | 'tandem'> ): void {
    const graphNode = this.getGraphNode( graphType );
    graphNode.addScrubberNode( this.ancillaryTool,
      combineOptions<ScrubberNodeOptions>( {
        visibleProperty: this.visibleProperty,
        tandem: graphNode.tandem.createTandem( `${this.ancillaryTool.tandem.name}ScrubberNode` )
      }, providedOptions ) );
  }

  private addFocusCircle( graphType: GraphType,
                          providedOptions?: StrictOmit<FocusCircleOptions, 'visibleProperty'> ): void {
    const graphNode = this.getGraphNode( graphType );
    const verticalProperty = this.getYProperty( graphType );

    graphNode.addFocusCircle(
      this.ancillaryTool.xProperty,
      verticalProperty,
      combineOptions<FocusCircleOptions>( {
        visibleProperty: this.visibleProperty,
        fill: getGraphTypeStrokeProperty( graphType ),
        radius: 3
      }, providedOptions ) );
  }
}
calculusGrapher.register( 'AncillaryToolNode', AncillaryToolNode );
