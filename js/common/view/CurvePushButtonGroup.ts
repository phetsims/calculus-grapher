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

  public constructor( curveToTransformProperty: TReadOnlyProperty<TransformedCurve>,
                      hasSmoothButton: boolean, tandem: Tandem ) {

    // create an undo Button
    const undoButton = new UndoButton( {
      listener: () => curveToTransformProperty.value.undoToLastSave(),
      yMargin: 6,
      iconOptions: { height: 13 },
      tandem: tandem.createTandem( 'undoButton' )
    } );

    // create an eraser Button
    const eraserButton = new EraserButton( {
      listener: () => curveToTransformProperty.value.reset(),
      iconWidth: 16,
      xMargin: 10,
      tandem: tandem.createTandem( 'resetButton' )
    } );

    // Put the eraser and undo buttons side by side
    const hBox = new HBox( {
      spacing: 5,
      children: [ undoButton, eraserButton ]
    } );

    const children = [];

    // Create a Smooth button, with width matching the HBox.
    if ( hasSmoothButton ) {
      const smoothButton = new TextPushButton( CalculusGrapherStrings.smoothStringProperty, {
        listener: () => curveToTransformProperty.value.smooth(),
        textNodeOptions: {
          font: CalculusGrapherConstants.CONTROL_FONT,
          fontWeight: 'bold'
        },
        baseColor: PhetColorScheme.BUTTON_YELLOW,
        maxWidth: hBox.width,
        minWidth: hBox.width,
        tandem: tandem.createTandem( 'smoothButton' )
      } );
      children.push( smoothButton );
    }

    children.push( hBox );

    super( {
      children: children,
      spacing: 6,
      tandem: tandem
    } );
  }
}

calculusGrapher.register( 'CurvePushButtonGroup', CurvePushButtonGroup );
