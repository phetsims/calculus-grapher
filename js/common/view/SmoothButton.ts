// Copyright 2025, University of Colorado Boulder

/**
 * SmoothButton is the push button that allows the user to smooth the curve.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';
import TextPushButton from '../../../../sun/js/buttons/TextPushButton.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import CalculusGrapherSymbols from '../CalculusGrapherSymbols.js';
import TransformedCurve from '../model/TransformedCurve.js';

export default class SmoothButton extends TextPushButton {

  public constructor( interactiveCurveProperty: TReadOnlyProperty<TransformedCurve>,
                      predictSelectedProperty: TReadOnlyProperty<boolean>,
                      tandem: Tandem ) {

    const accessibleContextResponsePrimaryCurveStringProperty = CalculusGrapherFluent.a11y.smoothButton.accessibleContextResponsePrimaryCurve.createProperty( {
      variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty
    } );

    super( CalculusGrapherFluent.smoothStringProperty, {
      isDisposable: false,
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
      accessibleName: CalculusGrapherFluent.a11y.smoothButton.accessibleNameStringProperty,
      accessibleHelpText: CalculusGrapherFluent.a11y.smoothButton.accessibleHelpTextStringProperty,
      accessibleContextResponse: new DerivedStringProperty( [
        predictSelectedProperty,
        CalculusGrapherFluent.a11y.smoothButton.accessibleContextResponsePredictCurveStringProperty,
        accessibleContextResponsePrimaryCurveStringProperty
      ], ( predictSelected, accessibleContextResponsePredictCurve, accessibleContextResponsePrimaryCurve ) =>
        predictSelected ? accessibleContextResponsePredictCurve : accessibleContextResponsePrimaryCurve ),
      tandem: tandem
    } );
  }
}

calculusGrapher.register( 'SmoothButton', SmoothButton );