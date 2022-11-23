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
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import CurveManipulationControls from './CurveManipulationControls.js';
import CurvePushButtonGroup, { CurvePushButtonGroupOptions } from './CurvePushButtonGroup.js';
import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import CalculusGrapherVisibleProperties from './CalculusGrapherVisibleProperties.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import TransformedCurve from '../model/TransformedCurve.js';
import CurveManipulationProperties from '../model/CurveManipulationProperties.js';

type SelfOptions = {
  contentSpacing?: number;
  curvePushButtonGroupOptions?: CurvePushButtonGroupOptions;
  areaUnderCurveCheckboxProperty?: BooleanProperty;
  tangentCheckboxProperty?: BooleanProperty;
};

export type CalculusGrapherControlPanelOptions = SelfOptions & PanelOptions;

export default class CalculusGrapherControlPanel extends Panel {

  public constructor( originalCurve: TransformedCurve,
                      curveManipulationProperties: CurveManipulationProperties,
                      visibleProperties: CalculusGrapherVisibleProperties,
                      providedOptions: CalculusGrapherControlPanelOptions ) {

    const options = optionize<CalculusGrapherControlPanelOptions, SelfOptions, PanelOptions>()( {

      //  the spacing between the content Nodes of the Panel
      contentSpacing: 7,

      curvePushButtonGroupOptions: {
        smoothButtonOptions: {
          baseColor: PhetColorScheme.BUTTON_YELLOW,
          visible: false
        }
      },

      areaUnderCurveCheckboxProperty: new BooleanProperty( false ),
      tangentCheckboxProperty: new BooleanProperty( false ),

      // super-class options
      stroke: CalculusGrapherColors.panelStrokeProperty,
      fill: CalculusGrapherColors.panelFillProperty

    }, providedOptions );

    // create controls associated with curve manipulation (slider and display) as well as curve mode buttons
    const curveManipulationControls = new CurveManipulationControls(
      curveManipulationProperties.widthProperty,
      curveManipulationProperties.modeProperty, {
        tandem: options.tandem.createTandem( 'curveManipulationControls' )
      } );

    // create yellow curve buttons associated with undo, erase and (optionally) smoothing the curve
    const curveButtons = new CurvePushButtonGroup( originalCurve,
      combineOptions<CurvePushButtonGroupOptions>( {
          tandem: options.tandem.createTandem( 'curveButtons' )
        },
        options.curvePushButtonGroupOptions ) );


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
