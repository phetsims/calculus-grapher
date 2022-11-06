// Copyright 2020-2022, University of Colorado Boulder

/**
 * Control Panel at the middle-right of each screen that allows the user to manipulate certain Properties of
 * the simulation.
 *
 * @author Brandon Li
 */

import { VBox } from '../../../../scenery/js/imports.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import OriginalCurve from '../model/OriginalCurve.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import CurveManipulationControls from './CurveManipulationControls.js';
import CurvePushButtonGroup, { CurvePushButtonGroupOptions } from './CurvePushButtonGroup.js';
import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';

type SelfOptions = {
  contentSpacing?: number;
  curvePushButtonGroupOptions?: CurvePushButtonGroupOptions;
};

export type CalculusGrapherControlPanelOptions = SelfOptions & PanelOptions;

export default class CalculusGrapherControlPanel extends Panel {

  public constructor( originalCurve: OriginalCurve, providedOptions: CalculusGrapherControlPanelOptions ) {

    const options = optionize<CalculusGrapherControlPanelOptions, SelfOptions, PanelOptions>()( {

      //  the spacing between the content Nodes of the Panel
      contentSpacing: 7,

      curvePushButtonGroupOptions: {
        smoothButtonOptions: {
          baseColor: PhetColorScheme.BUTTON_YELLOW
        }
      },

      // super-class options
      stroke: CalculusGrapherColors.panelStrokeProperty,
      fill: CalculusGrapherColors.panelFillProperty

    }, providedOptions );

    const curveManipulationControls = new CurveManipulationControls(
      originalCurve.curveManipulationWidthProperty,
      originalCurve.curveManipulationModeProperty, {
        tandem: options.tandem.createTandem( 'curveManipulationControls' )
      } );

    const curveButtons = new CurvePushButtonGroup( originalCurve,
      combineOptions<CurvePushButtonGroupOptions>( {
          tandem: options.tandem.createTandem( 'curveButtons' )
        },
        options.curvePushButtonGroupOptions ) );

    const contentNode = new VBox( {
      spacing: options.contentSpacing,
      children: [ curveManipulationControls,
        curveButtons
      ]
    } );

    super( contentNode, options );
  }
}

calculusGrapher.register( 'CalculusGrapherControlPanel', CalculusGrapherControlPanel );
