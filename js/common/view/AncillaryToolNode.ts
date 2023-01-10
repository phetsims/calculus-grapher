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
import { getGraphTypeStroke, GRAPH_TYPES, GraphType } from '../model/GraphType.js';
import AncillaryTool from '../model/AncillaryTool.js';
import GraphsNode from './GraphsNode.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import { FocusPointNodeOptions } from './FocusCircle.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import GraphNode from './GraphNode.js';
import { ScrubberNodeOptions } from './ScrubberNode.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';

type SelfOptions = {
  mainFillProperty: TReadOnlyProperty<Color>;
  visiblePropertiesTandem: Tandem;
  scrubberLineVisible?: boolean;
};

export type AncillaryToolNodeOptions = SelfOptions & StrictOmit<NodeOptions, 'visibleProperty'> &
  PickRequired<NodeOptions, 'tandem'>;

export default class AncillaryToolNode extends Node {

  private readonly predictModeEnabledProperty: TReadOnlyProperty<boolean>;

  // indicates if checkbox of the ancillary tool is checked.
  public readonly ancillaryToolCheckboxProperty: TReadOnlyProperty<boolean>;

  private readonly graphsNode: GraphsNode;
  private readonly ancillaryTool: AncillaryTool;

  protected constructor( ancillaryTool: AncillaryTool,
                         ancillaryToolCheckboxProperty: TReadOnlyProperty<boolean>,
                         graphType: GraphType,
                         predictModeEnabledProperty: TReadOnlyProperty<boolean>,
                         graphsNode: GraphsNode,
                         providedOptions: AncillaryToolNodeOptions ) {

    const options = optionize<AncillaryToolNodeOptions, SelfOptions, NodeOptions>()( {

      // SelfOptions
      scrubberLineVisible: true,

      // NodeOptions
      visibleProperty: new DerivedProperty(
        [ ancillaryToolCheckboxProperty, predictModeEnabledProperty ],
        ( ancillaryToolCheckbox, predictModeEnabled ) => ancillaryToolCheckbox && !predictModeEnabled, {
          tandem: providedOptions.tandem.createTandem( 'visibleProperty' ),
          phetioValueType: BooleanIO
        } )
    }, providedOptions );

    super( options );

    this.ancillaryTool = ancillaryTool;
    this.graphsNode = graphsNode;
    this.predictModeEnabledProperty = predictModeEnabledProperty;

    // property associated with ancillary checkbox
    this.ancillaryToolCheckboxProperty = ancillaryToolCheckboxProperty;

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
                          providedOptions?: StrictOmit<FocusPointNodeOptions, 'visibleProperty'> ): void {
    const graphNode = this.getGraphNode( graphType );
    const verticalProperty = this.getYProperty( graphType );

    graphNode.addFocusCircle(
      this.ancillaryTool.xProperty,
      verticalProperty,
      combineOptions<FocusPointNodeOptions>( {
        visibleProperty: this.visibleProperty,
        fill: getGraphTypeStroke( graphType ),
        radius: 3
      }, providedOptions ) );
  }
}
calculusGrapher.register( 'AncillaryToolNode', AncillaryToolNode );
