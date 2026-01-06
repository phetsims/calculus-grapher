// Copyright 2022-2025, University of Colorado Boulder

/**
 * CurvePushButtonGroup allow the user to manipulate the curve by pressing buttons that
 * smooth, undo, and erase the original curve
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import EraserButton from '../../../../scenery-phet/js/buttons/EraserButton.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CalculusGrapherSymbols from '../CalculusGrapherSymbols.js';
import TransformedCurve from '../model/TransformedCurve.js';
import SmoothButton from './SmoothButton.js';
import UndoButton from './UndoButton.js';

export default class CurvePushButtonGroup extends VBox {

  public constructor( interactiveCurveProperty: TReadOnlyProperty<TransformedCurve>,
                      predictSelectedProperty: TReadOnlyProperty<boolean>,
                      hasSmoothButton: boolean,
                      tandem: Tandem ) {

    // Create an undo Button. Disabling this button when there's nothing to undo is NOT a requirement.
    // See https://github.com/phetsims/calculus-grapher/issues/219
    const undoButton = new UndoButton( interactiveCurveProperty, predictSelectedProperty, tandem.createTandem( 'undoButton' ) );

    const accessibleContextResponsePrimaryCurveStringProperty = CalculusGrapherFluent.a11y.eraserButton.accessibleContextResponsePrimaryCurve.createProperty( {
      variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty
    } );

    // Create an eraser Button. Disabling this button when there's nothing to erase is NOT a requirement.
    // See https://github.com/phetsims/calculus-grapher/issues/219
    const eraserButton = new EraserButton( {
      listener: () => interactiveCurveProperty.value.erase(),
      iconWidth: 16,
      xMargin: 10,
      accessibleName: CalculusGrapherFluent.a11y.eraserButton.accessibleNameStringProperty,
      accessibleHelpText: CalculusGrapherFluent.a11y.eraserButton.accessibleHelpTextStringProperty,
      accessibleContextResponse: new DerivedStringProperty( [
        predictSelectedProperty,
        CalculusGrapherFluent.a11y.eraserButton.accessibleContextResponsePredictCurveStringProperty,
        accessibleContextResponsePrimaryCurveStringProperty
      ], ( predictSelected, accessibleContextResponsePredictCurve, accessibleContextResponsePrimaryCurve ) =>
        predictSelected ? accessibleContextResponsePredictCurve : accessibleContextResponsePrimaryCurve ),
      tandem: tandem.createTandem( 'eraserButton' )
    } );

    // Put the eraser and undo buttons side by side
    const hBox = new HBox( {
      spacing: 8,
      stretch: true,
      children: [ undoButton, eraserButton ]
    } );

    const children = [];

    // Optionally, create a Smooth button.
    if ( hasSmoothButton ) {
      const smoothButton = new SmoothButton( interactiveCurveProperty, tandem.createTandem( 'smoothButton' ) );
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