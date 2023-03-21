// Copyright 2022-2023, University of Colorado Boulder

/**
 * CurvePushButtonGroup allow the user to manipulate the curve pressing buttons that
 * smooth, erase and undo the original curve
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import calculusGrapher from '../../calculusGrapher.js';
import { HBox, VBox } from '../../../../scenery/js/imports.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import TextPushButton from '../../../../sun/js/buttons/TextPushButton.js';
import EraserButton from '../../../../scenery-phet/js/buttons/EraserButton.js';
import UndoButton from '../../../../scenery-phet/js/buttons/UndoButton.js';
import TransformedCurve from '../model/TransformedCurve.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';
import Tandem from '../../../../tandem/js/Tandem.js';

export default class CurvePushButtonGroup extends VBox {

  public constructor( interactiveCurveProperty: TReadOnlyProperty<TransformedCurve>,
                      hasSmoothButton: boolean, tandem: Tandem ) {

    // Create an undo Button. Disabling this button when there's nothing to undo is NOT a requirement.
    // See https://github.com/phetsims/calculus-grapher/issues/219
    const undoButton = new UndoButton( {
      listener: () => interactiveCurveProperty.value.undo(),
      yMargin: 6,
      iconOptions: { height: 13 },
      tandem: tandem.createTandem( 'undoButton' )
    } );

    // Create an eraser Button. Disabling this button when there's nothing to erase is NOT a requirement.
    // See https://github.com/phetsims/calculus-grapher/issues/219
    const eraserButton = new EraserButton( {
      listener: () => interactiveCurveProperty.value.erase(),
      iconWidth: 16,
      xMargin: 10,
      tandem: tandem.createTandem( 'eraserButton' )
    } );

    // Put the eraser and undo buttons side by side
    const hBox = new HBox( {
      spacing: 8,
      stretch: true,
      children: [ undoButton, eraserButton ]
    } );

    const children = [];

    // Create a Smooth button, with width matching the HBox.
    if ( hasSmoothButton ) {
      const smoothButton = new TextPushButton( CalculusGrapherStrings.smoothStringProperty, {
        listener: () => interactiveCurveProperty.value.smooth(),
        textNodeOptions: {
          font: CalculusGrapherConstants.CONTROL_FONT,
          fontWeight: 'bold',
          maxWidth: 55
        },
        baseColor: PhetColorScheme.BUTTON_YELLOW,
        layoutOptions: {
          stretch: true
        },
        tandem: tandem.createTandem( 'smoothButton' )
      } );
      children.push( smoothButton );
    }

    children.push( hBox );

    super( {
      children: children,
      spacing: 8,
      tandem: tandem
    } );
  }
}

calculusGrapher.register( 'CurvePushButtonGroup', CurvePushButtonGroup );
