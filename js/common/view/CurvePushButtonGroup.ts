// Copyright 2022, University of Colorado Boulder

/**
 * CurvePushButtonGroup allow the user to manipulate the curve pressing buutons that
 * smooth, erase and undo the original curve
 *
 * @author Martin Veillette
 */

import calculusGrapher from '../../calculusGrapher.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import { HBox, Node, NodeOptions, VBox } from '../../../../scenery/js/imports.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import TextPushButton, { TextPushButtonOptions } from '../../../../sun/js/buttons/TextPushButton.js';
import OriginalCurve from '../model/OriginalCurve.js';
import EraserButton from '../../../../scenery-phet/js/buttons/EraserButton.js';
import UndoButton from '../../../../scenery-phet/js/buttons/UndoButton.js';

type SelfOptions = {
  smoothButtonOptions?: TextPushButtonOptions;
};

export type CurvePushButtonGroupOptions = SelfOptions & NodeOptions;

export default class CurvePushButtonGroup extends Node {

  public constructor( originalCurve: OriginalCurve,
                      providedOptions?: CurvePushButtonGroupOptions ) {

    const options = optionize<CurvePushButtonGroupOptions, SelfOptions, NodeOptions>()( {
        smoothButtonOptions: {
          textNodeOptions: { fontWeight: 'bold' }
        }
      },
      providedOptions
    );


    // Undo Button
    const undoButton = new UndoButton( {
      listener: () => originalCurve.undoToLastSave(),
      iconOptions: { height: 17 },
      tandem: options.tandem.createTandem( 'undoButton' )
    } );

    // Eraser Button
    const eraserButton = new EraserButton( {
      listener: () => originalCurve.reset(),
      iconWidth: 21,
      xMargin: 11,
      tandem: options.tandem.createTandem( 'resetButton' )
    } );

    const hBox = new HBox( {
      spacing: 5,
      children: [ undoButton, eraserButton ]
    } );

    // Smooth Button
    const smoothButton = new TextPushButton( CalculusGrapherStrings.smoothStringProperty,
      combineOptions<TextPushButtonOptions>(
        {
          listener: () => originalCurve.smooth(),
          yMargin: 8,
          maxWidth: hBox.width,
          minWidth: hBox.width,
          tandem: options.tandem.createTandem( 'smoothButton' )
        }, options.smoothButtonOptions
      ) );

    const vBox = new VBox( {
      spacing: 5,
      children: [ smoothButton, hBox ]
    } );

    options.children = [ vBox ];
    super( options );
  }
}

calculusGrapher.register( 'CurvePushButtonGroup', CurvePushButtonGroup );
