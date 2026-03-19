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
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CalculusGrapherSymbols from '../CalculusGrapherSymbols.js';

export default class CurveManipulationType extends EnumerationValue {

  // Prefix used for tandems related to a CurveManipulationType
  public readonly tandemPrefix: string;

  // Accessible name, used for radio buttons and screenSummary 'current details'.
  public readonly accessibleNameProperty: TReadOnlyProperty<string>;

  // Determines visibility of the width slider
  public readonly hasAdjustableWidth: boolean;

  public static readonly HILL = new CurveManipulationType( 'hill',
    CalculusGrapherFluent.a11y.curveManipulationType.hill.createProperty( {
      variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty
    } ) );

  public static readonly TRIANGLE = new CurveManipulationType( 'triangle',
    CalculusGrapherFluent.a11y.curveManipulationType.triangle.createProperty( {
      variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty
    } ) );

  public static readonly PEDESTAL = new CurveManipulationType( 'pedestal',
    CalculusGrapherFluent.a11y.curveManipulationType.pedestal.createProperty( {
      variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty
    } ) );

  public static readonly PARABOLA = new CurveManipulationType( 'parabola',
    CalculusGrapherFluent.a11y.curveManipulationType.parabola.createProperty( {
      variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty
    } ) );

  public static readonly SINUSOID = new CurveManipulationType( 'sinusoid',
    CalculusGrapherFluent.a11y.curveManipulationType.sinusoidStringProperty );

  public static readonly FREEFORM = new CurveManipulationType( 'freeform',
    CalculusGrapherFluent.a11y.curveManipulationType.freeformStringProperty,
    false );

  public static readonly TILT = new CurveManipulationType( 'tilt',
    CalculusGrapherFluent.a11y.curveManipulationType.tiltStringProperty,
    false );

  public static readonly SHIFT = new CurveManipulationType( 'shift',
    CalculusGrapherFluent.a11y.curveManipulationType.shiftStringProperty,
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
