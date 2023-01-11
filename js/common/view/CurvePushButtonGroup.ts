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
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import TransformedCurve from '../model/TransformedCurve.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';

type SelfOptions = {
  smoothButtonOptions?: TextPushButtonOptions;
  undoButtonOptions?: UndoButtonOptions;
  eraserButtonOptions?: EraserButtonOptions;
};

type CurvePushButtonGroupOptions = SelfOptions & StrictOmit<VBoxOptions, 'children'>;

export default class CurvePushButtonGroup extends VBox {

  public constructor( curveToTransformProperty: TReadOnlyProperty<TransformedCurve>,
                      providedOptions?: CurvePushButtonGroupOptions ) {

    const options = optionize<CurvePushButtonGroupOptions, SelfOptions, VBoxOptions>()( {

      // SelfOptions
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

      // VBoxOptions
      spacing: 6
    }, providedOptions );

    // create an undo Button
    const undoButton = new UndoButton(
      combineOptions<UndoButtonOptions>( {
        listener: () => curveToTransformProperty.value.undoToLastSave(),
        tandem: options.tandem.createTandem( 'undoButton' )
      }, options.undoButtonOptions ) );

    // create an eraser Button
    const eraserButton = new EraserButton(
      combineOptions<EraserButtonOptions>( {
        listener: () => curveToTransformProperty.value.reset(),
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
          listener: () => curveToTransformProperty.value.smooth(),
          font: CalculusGrapherConstants.CONTROL_FONT,
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
