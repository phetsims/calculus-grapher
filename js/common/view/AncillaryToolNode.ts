// Copyright 2022-2023, University of Colorado Boulder

/**
 * AncillaryToolNode is the base class for a tool associated with a graph.
 * Its responsibilities include:
 *  - Creating a property associated with the ancillary tool checkbox
 *  - Creating a derived property that conditionally shows the ancillary tools
 *  - Creating and adding a checkbox on the main panel
 *  - Creating and adding a scrubber
 *  - Creating and adding a focus circle on each graph
 *  - Creating and adding a barometer associated with the ancillary tool
 * @author Martin Veillette
 */

import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import { Color, Node, NodeOptions } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { getGraphTypeStroke, GRAPH_TYPES, GraphType } from '../model/GraphType.js';
import Property from '../../../../axon/js/Property.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import AncillaryTool from '../model/AncillaryTool.js';
import GraphsNode from './GraphsNode.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import { FocusPointNodeOptions } from './FocusCircle.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import GraphNode from './GraphNode.js';
import { ScrubberNodeOptions } from './ScrubberNode.js';

type SelfOptions = {

  mainFillProperty: TReadOnlyProperty<Color>;
  visiblePropertiesTandem: Tandem;

  scrubberLineVisible?: boolean;

};

export type AncillaryToolNodeOptions = SelfOptions & NodeOptions;

export default class AncillaryToolNode extends Node {

  private readonly predictModeEnabledProperty: TReadOnlyProperty<boolean>;

  // indicates if checkbox of the ancillary tool is checked.
  public readonly ancillaryToolCheckboxProperty: Property<boolean>;

  private readonly graphsNode: GraphsNode;
  private readonly ancillaryTool: AncillaryTool;

  protected constructor( ancillaryTool: AncillaryTool,
                         graphType: GraphType,
                         predictModeEnabledProperty: TReadOnlyProperty<boolean>,
                         graphsNode: GraphsNode,
                         providedOptions: AncillaryToolNodeOptions ) {

    const options = optionize<AncillaryToolNodeOptions, SelfOptions, NodeOptions>()(
      {
        scrubberLineVisible: true
      }, providedOptions );

    super( options );

    this.ancillaryTool = ancillaryTool;
    this.graphsNode = graphsNode;
    this.predictModeEnabledProperty = predictModeEnabledProperty;

    // create property associated with under the curve checkbox
    this.ancillaryToolCheckboxProperty = new BooleanProperty( false, {
      tandem: options.visiblePropertiesTandem.createTandem( `${ancillaryTool.tandem.name}CheckboxProperty` )
    } );

    this.addScrubberNode( graphType, {
      lineOptions: {
        visible: options.scrubberLineVisible
      },
      fill: options.mainFillProperty
    } );

    const scrubberGraphType = graphType;
    GRAPH_TYPES.forEach( graphType =>
      this.addFocusCircle( scrubberGraphType, graphType ) );
  }

  public reset(): void {
    this.ancillaryToolCheckboxProperty.reset();
  }

  protected addFocusCircle( scrubberGraphType: GraphType,
                            graphType: GraphType,
                            providedOptions?: StrictOmit<FocusPointNodeOptions, 'visibleProperty'> ): void {
    const graphNode = this.getGraphNode( graphType );
    const verticalProperty = this.getYProperty( graphType );

    // visibility is ascertained by scrubber if it is attached to the originalGraph
    const visibleGraphType = ( scrubberGraphType === 'original' ) ? scrubberGraphType : graphType;

    graphNode.addFocusCircle(
      this.ancillaryTool.xProperty,
      verticalProperty,
      combineOptions<FocusPointNodeOptions>( {
        visibleProperty: this.getAncillaryToolVisibleProperty( visibleGraphType ),
        fill: getGraphTypeStroke( graphType ),
        radius: 3
      }, providedOptions ) );
  }

  protected getYProperty( graphType: GraphType ): TReadOnlyProperty<number> {
    return this.ancillaryTool.getYProperty( graphType );
  }

  protected getGraphNode( graphType: GraphType ): GraphNode {
    return this.graphsNode.getGraphNode( graphType );
  }

  protected addScrubberNode( graphType: GraphType,
                             providedOptions: StrictOmit<ScrubberNodeOptions, 'visibleProperty' | 'tandem'> ): void {
    const graphNode = this.getGraphNode( graphType );
    graphNode.addScrubberNode(
      this.ancillaryTool,
      combineOptions<ScrubberNodeOptions>( {
        visibleProperty: this.getAncillaryToolVisibleProperty( graphType ),
        tandem: graphNode.tandem.createTandem( `${this.ancillaryTool.tandem.name}ScrubberNode` )
      }, providedOptions ) );
  }

  public getAncillaryToolVisibleProperty( graphType: GraphType ): TReadOnlyProperty<boolean> {
    return new DerivedProperty( [
        this.ancillaryToolCheckboxProperty, this.predictModeEnabledProperty ],
      ( ancillaryToolCheckbox, predictModeEnabled ) => {

        // if graphType is original and in predictMode
        const mustHideTool = predictModeEnabled && graphType === 'original';

        return ancillaryToolCheckbox && !mustHideTool;
      } );
  }

}
calculusGrapher.register( 'AncillaryToolNode', AncillaryToolNode );
