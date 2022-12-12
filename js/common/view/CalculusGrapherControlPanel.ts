// Copyright 2020-2022, University of Colorado Boulder

/**
 * Control Panel at the middle-right of each screen that allows the user to manipulate certain Properties of
 * the simulation.
 *
 * @author Brandon Li
 */

import { HSeparator, Text, VBox } from '../../../../scenery/js/imports.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import optionize from '../../../../phet-core/js/optionize.js';
import CurveManipulationControls from './CurveManipulationControls.js';
import CurvePushButtonGroup from './CurvePushButtonGroup.js';
import CalculusGrapherVisibleProperties from './CalculusGrapherVisibleProperties.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import CurveManipulationProperties from '../model/CurveManipulationProperties.js';
import PredictModeRadioButtonGroup from './PredictModeRadioButtonGroup.js';
import TransformedCurve from '../model/TransformedCurve.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Property from '../../../../axon/js/Property.js';

type SelfOptions = {
  areaUnderCurveCheckboxVisible?: boolean;
  tangentCheckboxVisible?: boolean;
  smoothButtonVisible?: boolean;
};

export type CalculusGrapherControlPanelOptions = SelfOptions & PanelOptions;

export default class CalculusGrapherControlPanel extends Panel {

  public constructor( curveManipulationProperties: CurveManipulationProperties,
                      predictModeEnabledProperty: Property<boolean>,
                      curveToTransformProperty: TReadOnlyProperty<TransformedCurve>,
                      visibleProperties: CalculusGrapherVisibleProperties,
                      providedOptions: CalculusGrapherControlPanelOptions ) {

    const options = optionize<CalculusGrapherControlPanelOptions, SelfOptions, PanelOptions>()( {

      // SelfOptions
      areaUnderCurveCheckboxVisible: false,
      tangentCheckboxVisible: false,
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

    // create tangent checkbox, with visibility tied to option field
    const tangentCheckbox = new Checkbox( visibleProperties.tangentVisibleProperty,
      new Text( CalculusGrapherStrings.tangentStringProperty ), {
        visible: options.tangentCheckboxVisible,
        tandem: options.tandem.createTandem( 'tangentCheckbox' )
      }
    );

    // create area under curve checkbox, with visibility tied to option field
    const areaUnderCurveCheckbox = new Checkbox( visibleProperties.areaUnderCurveVisibleProperty,
      new Text( CalculusGrapherStrings.areaUnderCurveStringProperty ), {
        visible: options.areaUnderCurveCheckboxVisible,
        tandem: options.tandem.createTandem( 'areaUnderCurveCheckbox' )
      } );

    // assemble all the scenery nodes
    const contentNode = new VBox( {
      spacing: 10,
      children: [
        predictModeRadioButtonGroup,
        curveManipulationControls,
        curveButtons,
        new HSeparator(),
        tangentCheckbox,
        areaUnderCurveCheckbox
      ]
    } );

    super( contentNode, options );
  }
}

calculusGrapher.register( 'CalculusGrapherControlPanel', CalculusGrapherControlPanel );
