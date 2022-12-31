// Copyright 2022, University of Colorado Boulder

/**
 * AncillaryToolNode is the base class for a tool associated with original graph.
 * Its responsibilities include:
 *  - Creating a property associated with the ancillary tool checkbox
 *  - Creating a derived property that conditionally shows the ancillary tools
 *  - Creating and adding a checkbox on the main panel
 *  - Creating and adding a scrubber on the original graph
 *  - Creating and adding a focus circle on the original curve
 *  - Creating and adding a barometer associated with the ancillary tool
 * @author Martin Veillette
 */

import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import { Color, Node, NodeOptions, RichText } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import BarometerAccordionBox from '../../common/view/BarometerAccordionBox.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Range from '../../../../dot/js/Range.js';
import { GRAPH_TYPES, GraphType } from '../model/GraphType.js';
import CalculusGrapherConstants from '../../common/CalculusGrapherConstants.js';
import Property from '../../../../axon/js/Property.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import AncillaryTool from '../model/AncillaryTool.js';
import CalculusGrapherControlPanel from './CalculusGrapherControlPanel.js';
import GraphsNode from './GraphsNode.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import { FocusPointNodeOptions } from './FocusCircle.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import GraphNode from './GraphNode.js';
import { ScrubberNodeOptions } from './ScrubberNode.js';

type SelfOptions = {
  barometerStringProperty: TReadOnlyProperty<string>;

  barometerYProperty: TReadOnlyProperty<number>;
  checkboxStringProperty: TReadOnlyProperty<string>;

  mainFillProperty: TReadOnlyProperty<Color>;
  visiblePropertiesTandem: Tandem;

  scrubberLineVisible?: boolean;
  barometerModelYRange?: Range;

  barometerPosition?: Vector2;

};

export type AncillaryToolNodeOptions = SelfOptions & NodeOptions;

export default class AncillaryToolNode extends Node {

  protected readonly ancillaryToolVisibleProperty: TReadOnlyProperty<boolean>;
  // indicates if checkbox of the ancillary tool is checked.
  private readonly ancillaryToolCheckboxProperty: Property<boolean>;

  private readonly graphsNode: GraphsNode;
  private readonly ancillaryTool: AncillaryTool;

  protected constructor( ancillaryTool: AncillaryTool,
                         graphType: GraphType,
                         predictModeEnabledProperty: TReadOnlyProperty<boolean>,
                         controlPanel: CalculusGrapherControlPanel,
                         graphsNode: GraphsNode,
                         providedOptions: AncillaryToolNodeOptions ) {

    const options = optionize<AncillaryToolNodeOptions, SelfOptions, NodeOptions>()(
      {
        scrubberLineVisible: true,
        barometerModelYRange: new Range( -100, 100 ),
        barometerPosition: new Vector2( 20, 50 )
      }, providedOptions );

    super( options );

    this.ancillaryTool = ancillaryTool;
    this.graphsNode = graphsNode;

    // create property associated with under the curve checkbox
    this.ancillaryToolCheckboxProperty = new BooleanProperty( false, {
      tandem: options.visiblePropertiesTandem.createTandem( `${ancillaryTool.tandem.name}CheckboxProperty` )
    } );

    // add ancillaryTool checkbox to the bottom of the main control panel
    controlPanel.addCheckbox( this.ancillaryToolCheckboxProperty,
      new RichText( options.checkboxStringProperty, {
        font: CalculusGrapherConstants.CONTROL_FONT
      } ), {
        visibleProperty: DerivedProperty.not( predictModeEnabledProperty ),
        tandem: controlPanel.tandem.createTandem( `${ancillaryTool.tandem.name}Checkbox` )
      } );

    // create property that conditionally shows the ancillary tools
    this.ancillaryToolVisibleProperty = new DerivedProperty( [
        this.ancillaryToolCheckboxProperty,
        predictModeEnabledProperty ],
      ( ancillaryToolCheckbox, predictMode ) =>
        ancillaryToolCheckbox && !predictMode );

    // create and add the barometer associated with the ancillaryTool appearing to the left of the graphs
    const barometer = new BarometerAccordionBox(
      options.barometerYProperty,
      options.barometerStringProperty, {
        chartTransformOptions: {
          modelYRange: options.barometerModelYRange
        },
        translation: options.barometerPosition,
        visibleProperty: this.ancillaryToolVisibleProperty,
        lineOptions: {
          stroke: options.mainFillProperty
        },
        tandem: options.tandem.createTandem( `${ancillaryTool.tandem.name}AccordionBox` )
      } );
    this.addChild( barometer );

    this.addScrubberNode( graphType, {
      lineOptions: {
        visible: options.scrubberLineVisible
      },
      fill: options.mainFillProperty
    } );

    GRAPH_TYPES.forEach( graphType =>
      this.addFocusCircle( graphType, {
        fill: options.mainFillProperty
      } ) );
  }

  public reset(): void {
    this.ancillaryToolCheckboxProperty.reset();
  }

  protected addFocusCircle( graphType: GraphType,
                            providedOptions: StrictOmit<FocusPointNodeOptions, 'visibleProperty'> ): void {
    const graphNode = this.getGraphNode( graphType );
    const verticalProperty = this.getYProperty( graphType );

    graphNode.addFocusCircle(
      this.ancillaryTool.xProperty,
      verticalProperty,
      combineOptions<FocusPointNodeOptions>( {
        visibleProperty: this.ancillaryToolVisibleProperty
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
        visibleProperty: this.ancillaryToolVisibleProperty,
        tandem: graphNode.tandem.createTandem( `${this.ancillaryTool.tandem.name}ScrubberNode` )
      }, providedOptions ) );
  }
}
calculusGrapher.register( 'AncillaryToolNode', AncillaryToolNode );
