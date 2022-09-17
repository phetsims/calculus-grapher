// Copyright 2020-2022, University of Colorado Boulder

/**
 * Control Panel at the middle-right of each screen that allows the user to manipulate certain Properties of
 * the simulation.
 *
 * @author Brandon Li
 */

import { Text, VBox } from '../../../../scenery/js/imports.js';
import AquaRadioButtonGroup from '../../../../sun/js/AquaRadioButtonGroup.js';
import TextPushButton from '../../../../sun/js/buttons/TextPushButton.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import CurveManipulationMode from '../model/CurveManipulationMode.js';
import OriginalCurve from '../model/OriginalCurve.js';
import optionize from '../../../../phet-core/js/optionize.js';

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

    // Create the content Node of the Control Panel.
    const contentNode = new VBox( { spacing: options.contentSpacing } );

    // Create radio button group items
    const aquaRadioButtonGroupItems = CurveManipulationMode.enumeration.values.map(
      ( mode, index ) => ( {
        value: mode,
        node: new Text( mode.toString() )
      } )
    );

    // Radio Buttons that control the curveManipulationModeProperty.
    const curveManipulationModeRadioButtonGroup = new AquaRadioButtonGroup(
      originalCurve.curveManipulationModeProperty, aquaRadioButtonGroupItems );

    // Smooth Button
    const smoothButton = new TextPushButton( CalculusGrapherStrings.smoothStringProperty, {
      listener: () => originalCurve.smooth()
    } );

    // Reset Button
    const resetButton = new TextPushButton( CalculusGrapherStrings.resetStringProperty, {
      listener: () => originalCurve.reset()
    } );

    contentNode.children = [
      curveManipulationModeRadioButtonGroup,
      smoothButton,
      resetButton
    ];

    super( contentNode, options );
  }
}

calculusGrapher.register( 'CalculusGrapherControlPanel', CalculusGrapherControlPanel );
