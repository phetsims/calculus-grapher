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
import CurveManipulator from '../model/CurveManipulator.js';
import TransformedCurve from '../model/TransformedCurve.js';

const ACCESSIBLE_STRINGS = CalculusGrapherFluent.a11y.eraserButton;

export default class CurveEraserButton extends EraserButton {

  public constructor( interactiveCurveProperty: TReadOnlyProperty<TransformedCurve>,
                      activeCurveManipulatorProperty: TReadOnlyProperty<CurveManipulator>,
                      predictEnabledProperty: TReadOnlyProperty<boolean>,
                      tandem: Tandem ) {

    super( {
      isDisposable: false,
      listener: () => {
        interactiveCurveProperty.value.erase();
        activeCurveManipulatorProperty.value.reset();
      },
      iconWidth: 16,
      xMargin: 10,
      accessibleName: ACCESSIBLE_STRINGS.accessibleNameStringProperty,
      accessibleHelpText: ACCESSIBLE_STRINGS.accessibleHelpTextStringProperty,
      accessibleContextResponse: new DerivedStringProperty( [
        predictEnabledProperty,
        ACCESSIBLE_STRINGS.accessibleContextResponse.predictCurveStringProperty,
        ACCESSIBLE_STRINGS.accessibleContextResponse.primaryCurveStringProperty
      ], ( predictEnabled, predictCurveString, primaryCurveString ) =>
        predictEnabled ? predictCurveString : primaryCurveString ),
      tandem: tandem
    } );
  }
}

calculusGrapher.register( 'CurveEraserButton', CurveEraserButton );