// Copyright 2025, University of Colorado Boulder

/**
 * UndoButton is the push button that allows the user to undo the last action on the curve.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import ReturnButton from '../../../../scenery-phet/js/buttons/ReturnButton.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import TransformedCurve from '../model/TransformedCurve.js';

export default class UndoButton extends ReturnButton {

  public constructor( interactiveCurveProperty: TReadOnlyProperty<TransformedCurve>, tandem: Tandem ) {
    super( {
      listener: () => interactiveCurveProperty.value.undo(),
      yMargin: 6,
      iconOptions: { height: 13 },
      accessibleName: CalculusGrapherFluent.a11y.undoButton.accessibleNameStringProperty,
      accessibleHelpText: CalculusGrapherFluent.a11y.undoButton.accessibleHelpTextStringProperty,
      accessibleContextResponse: CalculusGrapherFluent.a11y.undoButton.accessibleContextResponseStringProperty,
      tandem: tandem
    } );
  }
}

calculusGrapher.register( 'UndoButton', UndoButton );