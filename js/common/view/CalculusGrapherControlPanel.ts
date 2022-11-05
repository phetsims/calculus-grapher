// Copyright 2020-2022, University of Colorado Boulder

/**
 * Control Panel at the middle-right of each screen that allows the user to manipulate certain Properties of
 * the simulation.
 *
 * @author Brandon Li
 */

import { HBox, VBox } from '../../../../scenery/js/imports.js';
import TextPushButton, { TextPushButtonOptions } from '../../../../sun/js/buttons/TextPushButton.js';
import UndoButton from '../../../../scenery-phet/js/buttons/UndoButton.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import OriginalCurve from '../model/OriginalCurve.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import CurveManipulationModeRadioButtonGroup from './CurveManipulationModeRadioButtonGroup.js';
import EraserButton from '../../../../scenery-phet/js/buttons/EraserButton.js';
import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';
import CurveManipulationWidthSlider from './CurveManipulationWidthSlider.js';
import CurveManipulationDisplayNode from './CurveManipulationDisplayNode.js';

type SelfOptions = {
  contentSpacing?: number;
  smoothButtonOptions?: TextPushButtonOptions;
};

export type CalculusGrapherControlPanelOptions = SelfOptions & PanelOptions;

export default class CalculusGrapherControlPanel extends Panel {

  public constructor( originalCurve: OriginalCurve, providedOptions: CalculusGrapherControlPanelOptions ) {

    const options = optionize<CalculusGrapherControlPanelOptions, SelfOptions, PanelOptions>()( {

      //  the spacing between the content Nodes of the Panel
      contentSpacing: 7,

      smoothButtonOptions: {
        baseColor: PhetColorScheme.BUTTON_YELLOW
      },

      // super-class options
      stroke: CalculusGrapherColors.panelStrokeProperty,
      fill: CalculusGrapherColors.panelFillProperty

    }, providedOptions );

    const curveManipulationWidthSlider = new CurveManipulationWidthSlider(
      originalCurve.curveManipulationWidthProperty,
      originalCurve.curveManipulationModeProperty, {
        tandem: options.tandem.createTandem( 'slider' )
      } );

    const curveManipulationDisplayNode = new CurveManipulationDisplayNode(
      originalCurve.curveManipulationWidthProperty,
      originalCurve.curveManipulationModeProperty, {
        tandem: options.tandem.createTandem( 'displayNode' )
      } );

    // Radio Buttons that control the curveManipulationModeProperty.
    const curveManipulationModeRadioButtonGroup = new CurveManipulationModeRadioButtonGroup(
      originalCurve.curveManipulationModeProperty, {
        tandem: options.tandem.createTandem( 'curveManipulationModeRadioButtonGroup' ),
        spacing: 5,
        radioButtonOptions: {
          baseColor: CalculusGrapherColors.panelFillProperty
        }
      } );

    // Smooth Button
    const smoothButton = new TextPushButton( CalculusGrapherStrings.smoothStringProperty,
      combineOptions<TextPushButtonOptions>(
        {
          listener: () => originalCurve.smooth(),
          tandem: options.tandem.createTandem( 'smoothButton' )
        }, options.smoothButtonOptions
      ) );

    // Undo Button
    const undoButton = new UndoButton( {
      listener: () => originalCurve.undoToLastSave(),
      tandem: options.tandem.createTandem( 'undoButton' ),
      iconOptions: { height: 15 }
    } );

    // Reset Button
    const resetButton = new EraserButton( {
      listener: () => originalCurve.reset(),
      tandem: options.tandem.createTandem( 'resetButton' ),
      iconWidth: 20
    } );

    // TODO: ideally the two buttons should have the same dimensions (height and width)
    // the undo and reset buttons should have the same height
    undoButton.scale( resetButton.height / undoButton.height );

    // scenery node to align the undo and reset buttons
    const buttonIconGroup = new HBox( {
      spacing: 10,
      children: [ undoButton, resetButton ]
    } );

    const contentNode = new VBox( {
      spacing: options.contentSpacing,
      children: [
        curveManipulationDisplayNode,
        curveManipulationWidthSlider,
        curveManipulationModeRadioButtonGroup,
        smoothButton,
        buttonIconGroup
      ]
    } );

    super( contentNode, options );
  }
}

calculusGrapher.register( 'CalculusGrapherControlPanel', CalculusGrapherControlPanel );
