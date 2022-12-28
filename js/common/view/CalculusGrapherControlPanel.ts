// Copyright 2020-2022, University of Colorado Boulder

/**
 * Control Panel at the middle-right of each screen that allows the user to manipulate certain Properties of
 * the simulation.
 *
 * @author Brandon Li
 */

import { HSeparator, Node, VBox } from '../../../../scenery/js/imports.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import optionize from '../../../../phet-core/js/optionize.js';
import CurveManipulationControls from './CurveManipulationControls.js';
import CurvePushButtonGroup from './CurvePushButtonGroup.js';
import CalculusGrapherVisibleProperties from './CalculusGrapherVisibleProperties.js';
import Checkbox, { CheckboxOptions } from '../../../../sun/js/Checkbox.js';
import CurveManipulationProperties from '../model/CurveManipulationProperties.js';
import PredictModeRadioButtonGroup from './PredictModeRadioButtonGroup.js';
import TransformedCurve from '../model/TransformedCurve.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Property from '../../../../axon/js/Property.js';
import LinkableProperty from '../../../../axon/js/LinkableProperty.js';

type SelfOptions = {
  smoothButtonVisible?: boolean;
};

export type CalculusGrapherControlPanelOptions = SelfOptions & PanelOptions;

export default class CalculusGrapherControlPanel extends Panel {

  private contentNode: Node;

  public constructor( curveManipulationProperties: CurveManipulationProperties,
                      predictModeEnabledProperty: Property<boolean>,
                      curveToTransformProperty: TReadOnlyProperty<TransformedCurve>,
                      visibleProperties: CalculusGrapherVisibleProperties,
                      providedOptions: CalculusGrapherControlPanelOptions ) {

    const options = optionize<CalculusGrapherControlPanelOptions, SelfOptions, PanelOptions>()( {

      // SelfOptions
      smoothButtonVisible: true,

      // PanelOptions
      stroke: CalculusGrapherColors.panelStrokeProperty,
      fill: CalculusGrapherColors.panelFillProperty

    }, providedOptions );

    const predictModeRadioButtonGroup = new PredictModeRadioButtonGroup( predictModeEnabledProperty, {
      tandem: options.tandem.createTandem( 'predictModeRadioButtonGroup' )
    } );

    // create controls associated with curve manipulation (slider and display) as well as curve mode buttons
    const curveManipulationControls = new CurveManipulationControls(
      curveManipulationProperties,
      predictModeEnabledProperty, {
        tandem: options.tandem.createTandem( 'curveManipulationControls' )
      } );

    // create yellow curve buttons associated with undo, erase and (optionally) smoothing the curve
    const curveButtons = new CurvePushButtonGroup( curveToTransformProperty, {
      smoothButtonOptions: {
        visible: options.smoothButtonVisible
      },
      tandem: options.tandem.createTandem( 'curveButtons' )
    } );

    // assemble all the scenery nodes
    const contentNode = new VBox( {
      spacing: 10,
      children: [
        predictModeRadioButtonGroup,
        curveManipulationControls,
        curveButtons
      ]
    } );

    super( contentNode, options );

    this.contentNode = contentNode;
  }

  public addCheckbox( property: LinkableProperty<boolean>, content: Node, providedOptions?: CheckboxOptions ): void {

    const checkbox = new Checkbox( property, content, providedOptions );

    this.addAdditionalContent( checkbox );
  }

  private addAdditionalContent( node: Node ): void {

    const children = this.contentNode.children;

    // add an hSeparator if the last children of content is NOT a checkbox
    if ( !( children[ children.length - 1 ] instanceof Checkbox ) ) {
      this.contentNode.addChild( new HSeparator() );
    }

    this.contentNode.addChild( node );
  }
}
calculusGrapher.register( 'CalculusGrapherControlPanel', CalculusGrapherControlPanel );
