// Copyright 2025, University of Colorado Boulder

/**
 * UndoButton is the push button that allows the user to undo the last action on the curve.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import ReturnButton from '../../../../scenery-phet/js/buttons/ReturnButton.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CalculusGrapherSymbols from '../CalculusGrapherSymbols.js';
import TransformedCurve from '../model/TransformedCurve.js';

export default class UndoButton extends ReturnButton {

  public constructor( interactiveCurveProperty: TReadOnlyProperty<TransformedCurve>,
                      predictSelectedProperty: TReadOnlyProperty<boolean>,
                      tandem: Tandem ) {

    const accessibleContextResponsePrimaryCurveStringProperty = CalculusGrapherFluent.a11y.undoButton.accessibleContextResponsePrimaryCurve.createProperty( {
      variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty
    } );

    super( {
      listener: () => interactiveCurveProperty.value.undo(),
      yMargin: 6,
      iconOptions: { height: 13 },
      accessibleName: CalculusGrapherFluent.a11y.undoButton.accessibleNameStringProperty,
      accessibleHelpText: CalculusGrapherFluent.a11y.undoButton.accessibleHelpTextStringProperty,
      accessibleContextResponse: new DerivedStringProperty( [
          predictSelectedProperty,
          CalculusGrapherFluent.a11y.undoButton.accessibleContextResponsePredictCurveStringProperty,
          accessibleContextResponsePrimaryCurveStringProperty
        ], ( predictSelected, accessibleContextResponsePredictCurve, accessibleContextResponsePrimaryCurve ) =>
          predictSelected ? accessibleContextResponsePredictCurve : accessibleContextResponsePrimaryCurve
      ),
      tandem: tandem
    } );
  }
}

calculusGrapher.register( 'UndoButton', UndoButton );