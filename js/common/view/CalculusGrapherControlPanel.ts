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
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import CalculusGrapherVisibleProperties from './CalculusGrapherVisibleProperties.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import CalculusGrapherModel from '../model/CalculusGrapherModel.js';

type SelfOptions = {
  contentSpacing?: number;
  areaUnderCurveCheckboxProperty?: BooleanProperty;
  tangentCheckboxProperty?: BooleanProperty;
  smoothButtonVisible?: boolean;
};

export type CalculusGrapherControlPanelOptions = SelfOptions & PanelOptions;

export default class CalculusGrapherControlPanel extends Panel {

  public constructor( model: CalculusGrapherModel,
                      visibleProperties: CalculusGrapherVisibleProperties,
                      providedOptions: CalculusGrapherControlPanelOptions ) {

    const options = optionize<CalculusGrapherControlPanelOptions, SelfOptions, PanelOptions>()( {

      //  the spacing between the content Nodes of the Panel
      contentSpacing: 7,

      areaUnderCurveCheckboxProperty: new BooleanProperty( false ),
      tangentCheckboxProperty: new BooleanProperty( false ),
      smoothButtonVisible: true,

      // super-class options
      stroke: CalculusGrapherColors.panelStrokeProperty,
      fill: CalculusGrapherColors.panelFillProperty

    }, providedOptions );


    // destructuring the calculus grapher model
    const { originalCurve, curveManipulationProperties } = model;

    // create controls associated with curve manipulation (slider and display) as well as curve mode buttons
    const curveManipulationControls = new CurveManipulationControls(
      curveManipulationProperties.widthProperty,
      curveManipulationProperties.modeProperty, {
        tandem: options.tandem.createTandem( 'curveManipulationControls' )
      } );

    // create yellow curve buttons associated with undo, erase and (optionally) smoothing the curve
    const curveButtons = new CurvePushButtonGroup( originalCurve, {
      smoothButtonOptions: {
        visible: options.smoothButtonVisible
      },
      tandem: options.tandem.createTandem( 'curveButtons' )
    } );


    // create tangent checkbox, with visibility tied to option field
    const tangentCheckbox = new Checkbox( visibleProperties.tangentVisibleProperty,
      new Text( CalculusGrapherStrings.tangentStringProperty ), {
        visibleProperty: options.tangentCheckboxProperty,
        tandem: options.tandem.createTandem( 'tangentCheckbox' )
      }
    );

    // create area under curve checkbox, with visibility tied to option field
    const areaUnderCurveCheckbox = new Checkbox( visibleProperties.areaUnderCurveVisibleProperty,
      new Text( CalculusGrapherStrings.areaUnderCurveStringProperty ), {
        visibleProperty: options.areaUnderCurveCheckboxProperty,
        tandem: options.tandem.createTandem( 'areaUnderCurveCheckbox' )
      }
    );

    // assemble all the scenery nodes
    const contentNode = new VBox( {
      spacing: options.contentSpacing,
      children: [ curveManipulationControls,
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
