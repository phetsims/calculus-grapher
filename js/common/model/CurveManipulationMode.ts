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

  public static HILL = new CurveManipulationMode();
  public static TRIANGLE = new CurveManipulationMode();
  public static PEDESTAL = new CurveManipulationMode();
  public static PARABOLA = new CurveManipulationMode();
  public static SINE = new CurveManipulationMode();
  public static FREEFORM = new CurveManipulationMode();
  public static TILT = new CurveManipulationMode();
  public static SHIFT = new CurveManipulationMode();

  public static enumeration = new Enumeration( CurveManipulationMode );
}

calculusGrapher.register( 'CurveManipulationMode', CurveManipulationMode );
