// Copyright 2022, University of Colorado Boulder

/**
 * CurvePushButtonGroup allow the user to manipulate the curve pressing buttons that
 * smooth, erase and undo the original curve
 *
 * @author Martin Veillette
 */

import calculusGrapher from '../../calculusGrapher.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import { HBox, VBox, VBoxOPtions } from '../../../../scenery/js/imports.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import TextPushButton, { TextPushButtonOptions } from '../../../../sun/js/buttons/TextPushButton.js';
import EraserButton, { EraserButtonOptions } from '../../../../scenery-phet/js/buttons/EraserButton.js';
import UndoButton, { UndoButtonOptions } from '../../../../scenery-phet/js/buttons/UndoButton.js';
import TransformedCurve from '../model/TransformedCurve.js';
import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';

type SelfOptions = {
  smoothButtonOptions?: TextPushButtonOptions;
  undoButtonOptions?: UndoButtonOptions;
  ereserButtonOptions?: EraserButtonOptions;
};

export type CurvePushButtonGroupOptions = SelfOptions & VBoxOPtions;

export default class CurvePushButtonGroup extends VBox {

  public constructor( originalCurve: TransformedCurve,
                      providedOptions?: CurvePushButtonGroupOptions ) {

    const options = optionize<CurvePushButtonGroupOptions, SelfOptions, VBoxOPtions>()( {
        smoothButtonOptions: {
          textNodeOptions: { fontWeight: 'bold' },
          baseColor: PhetColorScheme.BUTTON_YELLOW
        },
        undoButtonOptions: {
          yMargin: 6,
          iconOptions: { height: 13 }
        },
        eraserButtonOptions: {
          iconWidth: 16,
          xMargin: 10
        }

        //VBoxOptions
        spacing: 6
      },
      providedOptions
    );

    // Undo Button
    const undoButton = new UndoButton(
      combineOptions<UndoButtonOptions>( {
        listener: () => originalCurve.undoToLastSave(),
        tandem: options.tandem.createTandem( 'undoButton' )
      }, options.undoButtonOptions ) );

    // Eraser Button
    const eraserButton = new EraserButton(
      combineOptions<EraserButtonOptions>( {
        listener: () => originalCurve.reset(),
        tandem: options.tandem.createTandem( 'resetButton' )
      }, options.eraserButtonOptions ) );

    // Put the eraser and undo buttons side by side
    const hBox = new HBox( {
      spacing: 5,
      children: [ undoButton, eraserButton ]
    } );

    // Smooth Button, with witdh matching the hbox
    const smoothButton = new TextPushButton( CalculusGrapherStrings.smoothStringProperty,
      combineOptions<TextPushButtonOptions>( {
          listener: () => originalCurve.smooth(),
          maxWidth: hBox.width,
          minWidth: hBox.width,
          tandem: options.tandem.createTandem( 'smoothButton' )
        }, options.smoothButtonOptions
      ) );

    // vBox children
    options.children = [ smoothButton, hBox ];
    super( options );
  }
}

calculusGrapher.register( 'CurvePushButtonGroup', CurvePushButtonGroup );
