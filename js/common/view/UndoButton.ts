// Copyright 2025-2026, University of Colorado Boulder

/**
 * UndoButton is the push button that allows the user to undo the last action on the curve.
 *
 * NOTE: Disabling this button when there's nothing to undo is NOT a requirement.
 * See https://github.com/phetsims/calculus-grapher/issues/219
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import ReturnButton from '../../../../scenery-phet/js/buttons/ReturnButton.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import TransformedCurve from '../model/TransformedCurve.js';

const ACCESSIBLE_STRINGS = CalculusGrapherFluent.a11y.undoButton;

export default class UndoButton extends ReturnButton {

  public constructor( interactiveCurveProperty: TReadOnlyProperty<TransformedCurve>,
                      predictEnabledProperty: TReadOnlyProperty<boolean>,
                      tandem: Tandem ) {

    super( {
      isDisposable: false,
      listener: () => interactiveCurveProperty.value.undo(),
      yMargin: 6,
      iconOptions: { height: 13 },
      accessibleName: ACCESSIBLE_STRINGS.accessibleNameStringProperty,
      accessibleHelpText: ACCESSIBLE_STRINGS.accessibleHelpTextStringProperty,
      accessibleContextResponse: new DerivedStringProperty( [
        predictEnabledProperty,
        ACCESSIBLE_STRINGS.accessibleContextResponse.predictCurveStringProperty,
        ACCESSIBLE_STRINGS.accessibleContextResponse.primaryCurveStringProperty
      ], ( predictEnabled, accessibleContextResponsePredictCurve, accessibleContextResponsePrimaryCurve ) =>
        predictEnabled ? accessibleContextResponsePredictCurve : accessibleContextResponsePrimaryCurve ),
      tandem: tandem
    } );
  }
}

calculusGrapher.register( 'UndoButton', UndoButton );