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

import optionize from '../../../../phet-core/js/optionize.js';
import { Color, Node, NodeOptions, RichText } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import BarometerAccordionBox from '../../common/view/BarometerAccordionBox.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Range from '../../../../dot/js/Range.js';
import { getGraphTypeStroke } from '../model/GraphType.js';
import CalculusGrapherConstants from '../../common/CalculusGrapherConstants.js';
import Property from '../../../../axon/js/Property.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import AncillaryTool from '../model/AncillaryTool.js';
import CalculusGrapherControlPanel from './CalculusGrapherControlPanel.js';
import GraphsNode from './GraphsNode.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Tandem from '../../../../tandem/js/Tandem.js';

type SelfOptions = {
  barometerStringProperty: TReadOnlyProperty<string>;

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

  protected constructor( ancillaryTool: AncillaryTool,
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
    const barometer = new BarometerAccordionBox( ancillaryTool.yIntegralProperty,
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

    // add scrubber to the bottom of the original graph
    graphsNode.originalGraphNode.addScrubberNode(
      ancillaryTool, {
        lineOptions: {
          visible: options.scrubberLineVisible
        },
        visibleProperty: this.ancillaryToolVisibleProperty,
        fill: options.mainFillProperty,
        tandem: graphsNode.originalGraphNode.tandem.createTandem( `${ancillaryTool.tandem.name}ScrubberNode` )
      } );

    // add focus circle (disk) to the original curve
    graphsNode.originalGraphNode.addFocusCircle(
      ancillaryTool.xProperty,
      ancillaryTool.yOriginalProperty, {
        visibleProperty: this.ancillaryToolVisibleProperty,
        fill: getGraphTypeStroke( 'original' )
      } );
  }

  public reset(): void {
    this.ancillaryToolCheckboxProperty.reset();
  }


}
calculusGrapher.register( 'AncillaryToolNode', AncillaryToolNode );
