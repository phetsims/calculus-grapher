// Copyright 2022-2023, University of Colorado Boulder

/**
 * CurvePushButtonGroup allow the user to manipulate the curve pressing buttons that
 * smooth, erase and undo the original curve
 *
 * @author Martin Veillette
 */

import calculusGrapher from '../../calculusGrapher.js';
import optionize from '../../../../phet-core/js/optionize.js';
import { HBox, VBox, VBoxOptions } from '../../../../scenery/js/imports.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import TextPushButton from '../../../../sun/js/buttons/TextPushButton.js';
import EraserButton from '../../../../scenery-phet/js/buttons/EraserButton.js';
import UndoButton from '../../../../scenery-phet/js/buttons/UndoButton.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import TransformedCurve from '../model/TransformedCurve.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';

type SelfOptions = {
  hasSmoothButton?: boolean;
};

type CurvePushButtonGroupOptions = SelfOptions & StrictOmit<VBoxOptions, 'children'>;

export default class CurvePushButtonGroup extends VBox {

  public constructor( curveToTransformProperty: TReadOnlyProperty<TransformedCurve>,
                      providedOptions?: CurvePushButtonGroupOptions ) {

    const options = optionize<CurvePushButtonGroupOptions, SelfOptions, VBoxOptions>()( {

      // SelfOptions
      hasSmoothButton: true,

      // VBoxOptions
      spacing: 6
    }, providedOptions );

    // create an undo Button
    const undoButton = new UndoButton( {
      listener: () => curveToTransformProperty.value.undoToLastSave(),
      yMargin: 6,
      iconOptions: { height: 13 },
      tandem: options.tandem.createTandem( 'undoButton' )
    } );

    // create an eraser Button
    const eraserButton = new EraserButton( {
      listener: () => curveToTransformProperty.value.reset(),
      iconWidth: 16,
      xMargin: 10,
      tandem: options.tandem.createTandem( 'resetButton' )
    } );

    // Put the eraser and undo buttons side by side
    const hBox = new HBox( {
      spacing: 5,
      children: [ undoButton, eraserButton ]
    } );

    options.children = [];

    // create a smooth Button, with width matching the hbox
    if ( options.hasSmoothButton ) {
      const smoothButton = new TextPushButton( CalculusGrapherStrings.smoothStringProperty, {
        listener: () => curveToTransformProperty.value.smooth(),
        textNodeOptions: {
          font: CalculusGrapherConstants.CONTROL_FONT,
          fontWeight: 'bold'
        },
        baseColor: PhetColorScheme.BUTTON_YELLOW,
        maxWidth: hBox.width,
        minWidth: hBox.width,
        tandem: options.tandem.createTandem( 'smoothButton' )
      } );
      options.children.push( smoothButton );
    }

    options.children.push( hBox );

    super( options );
  }
}

calculusGrapher.register( 'CurvePushButtonGroup', CurvePushButtonGroup );
