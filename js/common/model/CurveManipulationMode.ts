// Copyright 2020-2022, University of Colorado Boulder

/**
 * Enumeration of the possible 'modes' of manipulating OriginalCurves.
 *
 * When the user drags on the OriginalCurve, the curve is manipulated based on the current CurveManipulationMode,
 * allowing the user to create custom curves. The documentation in this file is not exhaustive and does not describe
 * the algorithms for responses to curve user-manipulation. Please also see OriginalCurve.js
 *
 * @author Brandon Li
 */

import Enumeration from '../../../../phet-core/js/Enumeration.js';
import EnumerationValue from '../../../../phet-core/js/EnumerationValue.js';
import calculusGrapher from '../../calculusGrapher.js';

export default class CurveManipulationMode extends EnumerationValue {

  public readonly tandemPrefix: string;

  public static HILL = new CurveManipulationMode( 'hill' );
  public static TRIANGLE = new CurveManipulationMode( 'triangle' );
  public static PEDESTAL = new CurveManipulationMode( 'pedestal' );
  public static PARABOLA = new CurveManipulationMode( 'parabola' );
  public static SINE = new CurveManipulationMode( 'sine' );
  public static FREEFORM = new CurveManipulationMode( 'freeform' );
  public static TILT = new CurveManipulationMode( 'tilt' );
  public static SHIFT = new CurveManipulationMode( 'shift' );

  public static enumeration = new Enumeration( CurveManipulationMode );

  public constructor( tandemPrefix: string ) {
    super();
    this.tandemPrefix = tandemPrefix;
  }
}

calculusGrapher.register( 'CurveManipulationMode', CurveManipulationMode );
