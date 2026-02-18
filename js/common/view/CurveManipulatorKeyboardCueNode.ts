// Copyright 2026, University of Colorado Boulder

/**
 * CurveManipulatorKeyboardCueNode is a popup that provides cues about how to change the mode
 * of the curve manipulator using the keyboard.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import KeyboardCueNode from '../../../../scenery-phet/js/accessibility/nodes/KeyboardCueNode.js';
import TextKeyNode from '../../../../scenery-phet/js/keyboard/TextKeyNode.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CurveManipulatorNode from './CurveManipulatorNode.js';

export default class CurveManipulatorKeyboardCueNode extends KeyboardCueNode {

  public constructor( curveManipulatorNode: CurveManipulatorNode ) {

    super( {
      createKeyNode: TextKeyNode.space,
      stringProperty: CalculusGrapherFluent.keyboardHelp.curveManipulator.keyboardCueStringProperty,
      visibleProperty: DerivedProperty.and( [
        curveManipulatorNode.visibleProperty,
        curveManipulatorNode.focusedProperty,
        curveManipulatorNode.curveManipulator.keyboardCueEnabledProperty
      ] )
    } );

    // Center the popup below the curve manipulator node.
    curveManipulatorNode.boundsProperty.link( bounds => {
      this.centerX = bounds.centerX;
      this.top = bounds.bottom + 10;
    } );
  }
}

calculusGrapher.register( 'CurveManipulatorKeyboardCueNode', CurveManipulatorKeyboardCueNode );