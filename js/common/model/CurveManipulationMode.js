// Copyright 2020-2022, University of Colorado Boulder
// @ts-nocheck
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

class CurveManipulationMode extends EnumerationValue {

  static HILL = new CurveManipulationMode();
  static TRIANGLE = new CurveManipulationMode();
  static PEDESTAL = new CurveManipulationMode();
  static PARABOLA = new CurveManipulationMode();
  static SINE = new CurveManipulationMode();
  static FREEFORM = new CurveManipulationMode();
  static TILT = new CurveManipulationMode();
  static SHIFT = new CurveManipulationMode();

  static enumeration = new Enumeration( CurveManipulationMode );
}

calculusGrapher.register( 'CurveManipulationMode', CurveManipulationMode );
export default CurveManipulationMode;
