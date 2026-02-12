// Copyright 2025-2026, University of Colorado Boulder

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
import TransformedCurve from '../model/TransformedCurve.js';

export default class SmoothButton extends TextPushButton {

  public constructor( interactiveCurveProperty: TReadOnlyProperty<TransformedCurve>,
                      predictEnabledProperty: TReadOnlyProperty<boolean>,
                      tandem: Tandem ) {

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
        predictEnabledProperty,
        CalculusGrapherFluent.a11y.smoothButton.accessibleContextResponsePredictCurveStringProperty,
        CalculusGrapherFluent.a11y.smoothButton.accessibleContextResponseAllCurvesStringProperty
      ], ( predictEnabled, accessibleContextResponsePredictCurve, accessibleContextResponseAllCurvesString ) =>
        predictEnabled ? accessibleContextResponsePredictCurve : accessibleContextResponseAllCurvesString ),
      tandem: tandem
    } );
  }
}

calculusGrapher.register( 'SmoothButton', SmoothButton );