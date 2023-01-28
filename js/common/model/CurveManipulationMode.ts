// Copyright 2020-2023, University of Colorado Boulder

/**
 * Enumeration of the possible 'modes' of manipulating OriginalCurves.
 *
 * When the user drags on the TransformedCurve, the curve is manipulated based on the current CurveManipulationMode,
 * allowing the user to create custom curves. The documentation in this file is not exhaustive and does not describe
 * the algorithms for responses to curve user-manipulation. Please also see TransformedCurve.js
 *
 * @author Brandon Li
 * @author Martin Veillette
 */

import Enumeration from '../../../../phet-core/js/Enumeration.js';
import EnumerationValue from '../../../../phet-core/js/EnumerationValue.js';
import calculusGrapher from '../../calculusGrapher.js';

export default class CurveManipulationMode extends EnumerationValue {

  public readonly tandemPrefix: string;
  public readonly hasAdjustableWidth: boolean; // determines visibility of width slider

  public static readonly HILL = new CurveManipulationMode( 'hill' );
  public static readonly TRIANGLE = new CurveManipulationMode( 'triangle' );
  public static readonly PEDESTAL = new CurveManipulationMode( 'pedestal' );
  public static readonly PARABOLA = new CurveManipulationMode( 'parabola' );
  public static readonly SINE = new CurveManipulationMode( 'sine' );
  public static readonly FREEFORM = new CurveManipulationMode( 'freeform', false );
  public static readonly TILT = new CurveManipulationMode( 'tilt', false );
  public static readonly SHIFT = new CurveManipulationMode( 'shift', false );

  public static readonly enumeration = new Enumeration( CurveManipulationMode );

  public constructor( tandemPrefix: string, hasAdjustableWidth = true ) {
    super();
    this.tandemPrefix = tandemPrefix;
    this.hasAdjustableWidth = hasAdjustableWidth;
  }
}

calculusGrapher.register( 'CurveManipulationMode', CurveManipulationMode );
