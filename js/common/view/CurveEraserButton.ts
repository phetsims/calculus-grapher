// Copyright 2022-2026, University of Colorado Boulder

/**
 * CurveEraserButton is the push button that allows the user to erase all manipulations that were made to
 * the interactive curve.
 *
 * NOTE: Disabling this button when there's nothing to erase is NOT a requirement.
 * See https://github.com/phetsims/calculus-grapher/issues/219
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import EraserButton from '../../../../scenery-phet/js/buttons/EraserButton.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CalculusGrapherSymbols from '../CalculusGrapherSymbols.js';
import CurveManipulator from '../model/CurveManipulator.js';
import TransformedCurve from '../model/TransformedCurve.js';

export default class CurveEraserButton extends EraserButton {

  public constructor( interactiveCurveProperty: TReadOnlyProperty<TransformedCurve>,
                      curveManipulator: CurveManipulator,
                      predictSelectedProperty: TReadOnlyProperty<boolean>,
                      tandem: Tandem ) {

    const accessibleContextResponsePrimaryCurveStringProperty = CalculusGrapherFluent.a11y.eraserButton.accessibleContextResponsePrimaryCurve.createProperty( {
      variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty
    } );

    super( {
      isDisposable: false,
      listener: () => {
        interactiveCurveProperty.value.erase();
        curveManipulator.reset();
      },
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
      tandem: tandem
    } );
  }
}

calculusGrapher.register( 'CurveEraserButton', CurveEraserButton );