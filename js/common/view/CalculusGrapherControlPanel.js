// Copyright 2020-2022, University of Colorado Boulder

/**
 * Control Panel at the middle-right of each screen that allows the user to manipulate certain Properties of
 * the simulation.
 *
 * @author Brandon Li
 */
// @ts-nocheck

import merge from '../../../../phet-core/js/merge.js';
import { Text, VBox } from '../../../../scenery/js/imports.js';
import AquaRadioButtonGroup from '../../../../sun/js/AquaRadioButtonGroup.js';
import TextPushButton from '../../../../sun/js/buttons/TextPushButton.js';
import Panel from '../../../../sun/js/Panel.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import CurveManipulationModes from '../model/CurveManipulationModes.js';
import OriginalCurve from '../model/OriginalCurve.js';

class CalculusGrapherControlPanel extends Panel {

  /**
   * @param {OriginalCurve} originalCurve - the model Curve.
   * @param {Object} [options]
   */
  constructor( originalCurve, options ) {
    assert && assert( originalCurve instanceof OriginalCurve, `invalid originalCurve: ${originalCurve}` );

    options = merge( {

      // {number} - the spacing between the content Nodes of the Panel
      contentSpacing: 7,

      // super-class options
      stroke: CalculusGrapherColors.PANEL_STROKE,
      fill: CalculusGrapherColors.PANEL_FILL

    }, options );

    //----------------------------------------------------------------------------------------

    // Create the content Node of the Control Panel.
    const contentNode = new VBox( { spacing: options.contentSpacing } );
    super( contentNode, options );

    // Radio Buttons that control the curveManipulationModeProperty.
    const curveManipulationModeRadioButtonGroup = new AquaRadioButtonGroup(
      originalCurve.curveManipulationModeProperty,
      CurveManipulationModes.VALUES.map( mode => ( {
        value: mode,
        node: new Text( mode.toString() )
      } ) )
    );

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
  }
}

calculusGrapher.register( 'CalculusGrapherControlPanel', CalculusGrapherControlPanel );
export default CalculusGrapherControlPanel;
