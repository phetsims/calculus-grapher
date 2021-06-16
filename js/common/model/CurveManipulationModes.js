// Copyright 2020-2021, University of Colorado Boulder

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
import calculusGrapher from '../../calculusGrapher.js';

const CurveManipulationModes = Enumeration.byKeys( [

  // Creates a smooth, continuous, and differentiable bell-shaped curve, where the peak is the drag-position.
  'HILL',

  // Creates a triangle-shaped peak that is non-differentiable where it intersects with the rest of the Curve.
  'TRIANGLE',

  // Creates a smooth and continuous trapezoidal-shaped curve with rounded corners.
  'PEDESTAL',

  // Creates a quadratic that is non-differentiable where it intersects with the rest of the Curve.
  'PARABOLA',

  // Creates a sinusoidal wave with a varying amplitude based on the drag-position.
  'SINE',

  // Allows the user to drag Points in the Curve to any desired position to create custom Curves shapes.
  'FREEFORM',

  // Allows the user to tilt the angle of the Curve upwards or downwards.
  'TILT',

  // Allows the user to shift the Curve upwards or downwards.
  'SHIFT'

] );

calculusGrapher.register( 'CurveManipulationModes', CurveManipulationModes );
export default CurveManipulationModes;