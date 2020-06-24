// Copyright 2020, University of Colorado Boulder

/**
 * Curve is the base-class for a single curve that appears in a 'Calculus Grapher' simulation. It provides functionality
 * that is common to all CurveTypes and is intended to be sub-classed for CurveType-specific features.
 *
 * For an overview of the class hierarchy of Curves, see
 * https://github.com/phetsims/calculus-grapher/blob/master/doc/implementation-notes.md
 *
 * Primary responsibilities are:
 *   - Create an array of CurvePoints for 'every' x-value in its interval. Technically, there is an infinite number
 *     of x-values in an interval, but we represent the curve by creating a large finite number of CurvePoints that are
 *     close together.
 *   - Create convenience methods to reference and mutate CurvePoints at a x-value.
 *   - Provide the reset method and other convenience methods.
 *
 * For the 'Calculus Grapher' sim, the same Curves instances are used throughout the lifetime of the simulation. Curves
 * are created at the start of the sim and persist, so no dispose method is necessary.
 *
 * @author Brandon Li
 */

import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import CurvePoint from './CurvePoint.js';
import CurveTypes from './CurveTypes.js';

// constants
const CURVE_X_RANGE = CalculusGrapherConstants.CURVE_X_RANGE;
const POINTS_PER_COORDINATE = 12;

class Curve {

  /**
   * @param {CurveTypes} curveType - the type of Curve
   */
  constructor( curveType ) {
    assert && assert( CurveTypes.includes( curveType ), `invalid curveType: ${curveType}` );

    //----------------------------------------------------------------------------------------

    // @private {CurvePoint[]} - the points that map out the curve at a finite number of points inside of a interval.
    //                           See the comment at the top of this file for full context.
    this.points = [];

    // Populate the points of the curve with CurvePoints that are close together. CurvePoints are created at the
    // start of the simulation here and they are never disposed. Points are initialized at y = 0.
    for ( let x = CURVE_X_RANGE.min; x <= CURVE_X_RANGE.max; x += 1 / POINTS_PER_COORDINATE ) {
      this.points.push( new CurvePoint( x, 0 ) );
    }
  }

  /**
   * Resets the Curve to its initial state.
   * @public
   *
   * Called when the reset-all button is pressed.
   */
  reset() {
    this.points.forEach( point => { point.reset(); } ); // Reset all CurvePoints.
  }
}

calculusGrapher.register( 'Curve', Curve );
export default Curve;