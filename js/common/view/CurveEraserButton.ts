// Copyright 2025, University of Colorado Boulder

/**
 * CurveEraserButton is the push button that allows the user to erase all manipulations that were made to
 * the interactive curve.
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
import TransformedCurve from '../model/TransformedCurve.js';

export default class CurveEraserButton extends EraserButton {

  public constructor( interactiveCurveProperty: TReadOnlyProperty<TransformedCurve>,
                      predictSelectedProperty: TReadOnlyProperty<boolean>,
                      tandem: Tandem ) {

    const accessibleContextResponsePrimaryCurveStringProperty = CalculusGrapherFluent.a11y.eraserButton.accessibleContextResponsePrimaryCurve.createProperty( {
      variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty
    } );

    super( {
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
      tandem: tandem
    } );
  }
}

calculusGrapher.register( 'CurveEraserButton', CurveEraserButton );