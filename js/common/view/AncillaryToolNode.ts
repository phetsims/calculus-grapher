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
import CalculusGrapherColors from '../CalculusGrapherColors.js';

type SelfOptions = {
  barometerStringProperty: TReadOnlyProperty<string>;

  barometerStrokeProperty?: TReadOnlyProperty<Color>;

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

  private readonly predictModeEnabledProperty: TReadOnlyProperty<boolean>;

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
        barometerPosition: new Vector2( 20, 50 ),
        barometerStrokeProperty: CalculusGrapherColors.derivativeCurveStrokeProperty
      }, providedOptions );

    super( options );

    this.ancillaryTool = ancillaryTool;
    this.graphsNode = graphsNode;
    this.predictModeEnabledProperty = predictModeEnabledProperty;

    // create property associated with under the curve checkbox
    this.ancillaryToolCheckboxProperty = new BooleanProperty( false, {
      tandem: options.visiblePropertiesTandem.createTandem( `${ancillaryTool.tandem.name}CheckboxProperty` )
    } );


    // add ancillaryTool checkbox to the bottom of the main control panel
    controlPanel.addCheckbox( this.ancillaryToolCheckboxProperty,
      new RichText( options.checkboxStringProperty, {
        font: CalculusGrapherConstants.CONTROL_FONT
      } ), {
        visibleProperty: new DerivedProperty( [ predictModeEnabledProperty ], predictModeEnabled =>
          !( predictModeEnabled && graphType === 'original' ) ),
        tandem: controlPanel.tandem.createTandem( `${ancillaryTool.tandem.name}Checkbox` )
      } );

    // create and add the barometer associated with the ancillaryTool appearing to the left of the graphs
    const barometer = new BarometerAccordionBox(
      options.barometerYProperty,
      options.barometerStringProperty, {
        chartTransformOptions: {
          modelYRange: options.barometerModelYRange
        },
        translation: options.barometerPosition,
        visibleProperty: this.getAncillaryToolVisibleProperty( graphType ),
        barometerStrokeProperty: options.barometerStrokeProperty,
        tandem: options.tandem.createTandem( `${ancillaryTool.tandem.name}AccordionBox` )
      } );
    this.addChild( barometer );

    this.addScrubberNode( graphType, {
      lineOptions: {
        visible: options.scrubberLineVisible
      },
      fill: options.mainFillProperty
    } );

    const scrubberGraphType = graphType;
    GRAPH_TYPES.forEach( graphType =>
      this.addFocusCircle( scrubberGraphType, graphType, {
        fill: options.mainFillProperty
      } ) );
  }

  public reset(): void {
    this.ancillaryToolCheckboxProperty.reset();
  }

  protected addFocusCircle( scrubberGraphType: GraphType,
                            graphType: GraphType,
                            providedOptions: StrictOmit<FocusPointNodeOptions, 'visibleProperty'> ): void {
    const graphNode = this.getGraphNode( graphType );
    const verticalProperty = this.getYProperty( graphType );

    // visibility is ascertained by scrubber if it is attached to the originalGraph
    const visibleGraphType = ( scrubberGraphType === 'original' ) ? scrubberGraphType : graphType;

    graphNode.addFocusCircle(
      this.ancillaryTool.xProperty,
      verticalProperty,
      combineOptions<FocusPointNodeOptions>( {
        visibleProperty: this.getAncillaryToolVisibleProperty( visibleGraphType )
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

  protected getAncillaryToolVisibleProperty( graphType: GraphType ): TReadOnlyProperty<boolean> {
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
