// Copyright 2022, University of Colorado Boulder

/**
 * CurvePushButtonGroup allow the user to manipulate the curve pressing buttons that
 * smooth, erase and undo the original curve
 *
 * @author Martin Veillette
 */

import calculusGrapher from '../../calculusGrapher.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import { HBox, VBox, VBoxOptions } from '../../../../scenery/js/imports.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import TextPushButton, { TextPushButtonOptions } from '../../../../sun/js/buttons/TextPushButton.js';
import EraserButton, { EraserButtonOptions } from '../../../../scenery-phet/js/buttons/EraserButton.js';
import UndoButton, { UndoButtonOptions } from '../../../../scenery-phet/js/buttons/UndoButton.js';
import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';
import PredictModeEnabledProperty from '../model/PredictModeEnabledProperty.js';

type SelfOptions = {
  smoothButtonOptions?: TextPushButtonOptions;
  undoButtonOptions?: UndoButtonOptions;
  eraserButtonOptions?: EraserButtonOptions;
};

export type CurvePushButtonGroupOptions = SelfOptions & VBoxOptions;

export default class CurvePushButtonGroup extends VBox {

  public constructor( predictModeEnabledProperty: PredictModeEnabledProperty,
                      providedOptions?: CurvePushButtonGroupOptions ) {

    const options = optionize<CurvePushButtonGroupOptions, SelfOptions, VBoxOptions>()( {
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
        },

        //VBoxOptions
        spacing: 6
      },
      providedOptions
    );

    // create an undo Button
    const undoButton = new UndoButton(
      combineOptions<UndoButtonOptions>( {
        listener: () => predictModeEnabledProperty.curve.undoToLastSave(),
        tandem: options.tandem.createTandem( 'undoButton' )
      }, options.undoButtonOptions ) );

    // create an eraser Button
    const eraserButton = new EraserButton(
      combineOptions<EraserButtonOptions>( {
        listener: () => predictModeEnabledProperty.curve.reset(),
        tandem: options.tandem.createTandem( 'resetButton' )
      }, options.eraserButtonOptions ) );

    // Put the eraser and undo buttons side by side
    const hBox = new HBox( {
      spacing: 5,
      children: [ undoButton, eraserButton ]
    } );

    // create a smooth Button, with width matching the hbox
    const smoothButton = new TextPushButton( CalculusGrapherStrings.smoothStringProperty,
      combineOptions<TextPushButtonOptions>( {
          listener: () => predictModeEnabledProperty.curve.smooth(),
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
