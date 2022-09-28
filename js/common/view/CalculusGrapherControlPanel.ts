// Copyright 2020-2022, University of Colorado Boulder

/**
 * Control Panel at the middle-right of each screen that allows the user to manipulate certain Properties of
 * the simulation.
 *
 * @author Brandon Li
 */

import { VBox } from '../../../../scenery/js/imports.js';
import TextPushButton from '../../../../sun/js/buttons/TextPushButton.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import OriginalCurve from '../model/OriginalCurve.js';
import optionize from '../../../../phet-core/js/optionize.js';
import CurveManipulationModeRadioButtonGroup from './CurveManipulationModeRadioButtonGroup.js';

type SelfOptions = {
  contentSpacing?: number;
};

type CalculusGrapherControlPanelOptions = SelfOptions & PanelOptions;

export default class CalculusGrapherControlPanel extends Panel {

  public constructor( originalCurve: OriginalCurve, provideOptions?: CalculusGrapherControlPanelOptions ) {

    const options = optionize<CalculusGrapherControlPanelOptions, SelfOptions, PanelOptions>()( {

      //  the spacing between the content Nodes of the Panel
      contentSpacing: 7,

      // super-class options
      stroke: CalculusGrapherColors.PANEL_STROKE,
      fill: CalculusGrapherColors.PANEL_FILL

    }, provideOptions );

    // Radio Buttons that control the curveManipulationModeProperty.
    const curveManipulationModeRadioButtonGroup = new CurveManipulationModeRadioButtonGroup(
      originalCurve.curveManipulationModeProperty, {
        tandem: options.tandem.createTandem( 'curveManipulationModeRadioButtonGroup' )
      } );


    // Undo Button
    const undoButton = new TextPushButton( CalculusGrapherStrings.undoStringProperty, {
      listener: () => originalCurve.undoToLastSave(),
      tandem: options.tandem.createTandem( 'undoButton' )
    } );

    // Smooth Button
    const smoothButton = new TextPushButton( CalculusGrapherStrings.smoothStringProperty, {
      listener: () => originalCurve.smooth(),
      tandem: options.tandem.createTandem( 'smoothButton' )
    } );

    // Reset Button
    const resetButton = new TextPushButton( CalculusGrapherStrings.resetStringProperty, {
      listener: () => originalCurve.reset(),
      tandem: options.tandem.createTandem( 'resetButton' )
    } );

    const contentNode = new VBox( {
      spacing: options.contentSpacing,
      children: [
        curveManipulationModeRadioButtonGroup,
        undoButton,
        smoothButton,
        resetButton
      ]
    } );

    super( contentNode, options );
  }
}

calculusGrapher.register( 'CalculusGrapherControlPanel', CalculusGrapherControlPanel );
