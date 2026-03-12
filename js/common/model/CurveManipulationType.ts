// Copyright 2020-2026, University of Colorado Boulder

/**
 * CurveManipulationType is an enumeration of the possible ways that curves can be manipulated.
 *
 * When the user drags on a TransformedCurve, the curve is manipulated based on the current CurveManipulationType,
 * allowing the user to create custom curves. The documentation in this file is not exhaustive and does not describe
 * the algorithms for responses to curve user-manipulation. Please also see TransformedCurve.js
 *
 * @author Brandon Li
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Enumeration from '../../../../phet-core/js/Enumeration.js';
import EnumerationValue from '../../../../phet-core/js/EnumerationValue.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CalculusGrapherSymbols from '../CalculusGrapherSymbols.js';

export default class CurveManipulationType extends EnumerationValue {

  // Prefix used for tandems related to a CurveManipulationType
  public readonly tandemPrefix: string;

  // Accessible name that will be used for the radio button that selects this CurveManipulationType.
  public readonly accessibleNameProperty: TReadOnlyProperty<string>;

  // Determines visibility of the width slider
  public readonly hasAdjustableWidth: boolean;

  public static readonly HILL = new CurveManipulationType( 'hill',
    CalculusGrapherFluent.a11y.curveManipulationTypeRadioButtonGroup.hillRadioButton.accessibleNameStringProperty );

  public static readonly TRIANGLE = new CurveManipulationType( 'triangle',
    CalculusGrapherFluent.a11y.curveManipulationTypeRadioButtonGroup.triangleRadioButton.accessibleName.createProperty( {
      variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty
    } ) );

  public static readonly PEDESTAL = new CurveManipulationType( 'pedestal',
    CalculusGrapherFluent.a11y.curveManipulationTypeRadioButtonGroup.pedestalRadioButton.accessibleNameStringProperty );

  public static readonly PARABOLA = new CurveManipulationType( 'parabola',
    CalculusGrapherFluent.a11y.curveManipulationTypeRadioButtonGroup.parabolaRadioButton.accessibleName.createProperty( {
      variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty
    } ) );

  public static readonly SINUSOID = new CurveManipulationType( 'sinusoid',
    CalculusGrapherFluent.a11y.curveManipulationTypeRadioButtonGroup.sinusoidRadioButton.accessibleNameStringProperty );

  public static readonly FREEFORM = new CurveManipulationType( 'freeform',
    CalculusGrapherFluent.a11y.curveManipulationTypeRadioButtonGroup.freeformRadioButton.accessibleNameStringProperty,
    false );

  public static readonly TILT = new CurveManipulationType( 'tilt',
    CalculusGrapherFluent.a11y.curveManipulationTypeRadioButtonGroup.tiltRadioButton.accessibleNameStringProperty,
    false );

  public static readonly SHIFT = new CurveManipulationType( 'shift',
    CalculusGrapherFluent.a11y.curveManipulationTypeRadioButtonGroup.shiftRadioButton.accessibleNameStringProperty,
    false );

  public static readonly enumeration = new Enumeration( CurveManipulationType );

  public constructor( tandemPrefix: string,
                      accessibleNameProperty: TReadOnlyProperty<string>,
                      hasAdjustableWidth = true ) {
    super();
    this.tandemPrefix = tandemPrefix;
    this.accessibleNameProperty = accessibleNameProperty;
    this.hasAdjustableWidth = hasAdjustableWidth;
  }
}

calculusGrapher.register( 'CurveManipulationType', CurveManipulationType );