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

class CurveManipulationModes extends EnumerationValue {

  static HILL = new CurveManipulationModes();
  static TRIANGLE = new CurveManipulationModes();
  static PEDESTAL = new CurveManipulationModes();
  static PARABOLA = new CurveManipulationModes();
  static SINE = new CurveManipulationModes();
  static FREEFORM = new CurveManipulationModes();
  static TILT = new CurveManipulationModes();
  static SHIFT = new CurveManipulationModes();

  static enumeration = new Enumeration( CurveManipulationModes );
}

calculusGrapher.register( 'CurveManipulationModes', CurveManipulationModes );
export default CurveManipulationModes;
