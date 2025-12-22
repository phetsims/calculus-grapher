// Copyright 2025, University of Colorado Boulder

/**
 * SmoothButton is the push button that allows the user to smooth the curve.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';
import TextPushButton from '../../../../sun/js/buttons/TextPushButton.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import TransformedCurve from '../model/TransformedCurve.js';

export default class SmoothButton extends TextPushButton {

  public constructor( interactiveCurveProperty: TReadOnlyProperty<TransformedCurve>, tandem: Tandem ) {

    super( CalculusGrapherFluent.smoothStringProperty, {
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
      accessibleContextResponse: CalculusGrapherFluent.a11y.smoothButton.accessibleContextResponseStringProperty,
      tandem: tandem
    } );
  }
}

calculusGrapher.register( 'SmoothButton', SmoothButton );