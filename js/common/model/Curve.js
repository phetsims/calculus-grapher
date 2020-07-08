// Copyright 2020, University of Colorado Boulder

/**
 * Curve is the base-class for a single curve that appears in the 'Calculus Grapher' simulation. It provides
 * functionality that is common to all types of curves, which are integrals, original, and derivative curves, and is
 * intended to be sub-classed for type-specific features.
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

import Emitter from '../../../../axon/js/Emitter.js';
import Utils from '../../../../dot/js/Utils.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import CalculusGrapherQueryParameters from '../CalculusGrapherQueryParameters.js';
import CurvePoint from './CurvePoint.js';

// constants
const CURVE_X_RANGE = CalculusGrapherConstants.CURVE_X_RANGE;
const POINTS_PER_COORDINATE = CalculusGrapherQueryParameters.pointsPerCoordinate;

class Curve {

  constructor() {

    // @public (read-only) {CurvePoint[]} - the points that map out the curve at a finite number of points inside of a
    //                                      interval. See the comment at the top of this file for full context.
    this.points = [];

    // Populate the points of the curve with CurvePoints that are close together. CurvePoints are created at the
    // start of the simulation here and they are never disposed. Points are initialized at y = 0.
    for ( let x = CURVE_X_RANGE.min; x <= CURVE_X_RANGE.max; x += 1 / POINTS_PER_COORDINATE ) {
      this.points.push( new CurvePoint( x ) );
    }

    // @public (read-only) {Emitter} - Emits when the Curve has changed in any form.
    this.curveChangedEmitter = new Emitter();
  }

  /**
   * Resets the Curve to its initial state.
   * @public
   *
   * Called when the reset-all button is pressed.
   */
  reset() {
    this.points.forEach( point => {
      point.reset();
    } );

    this.curveChangedEmitter.emit();
  }

  /**
   * Gets the CurvePoint whose x-value is closest to the given x-value.
   * @public
   *
   * @param {number} x
   * @returns {CurvePoint}
   */
  getClosestsPointAt( x ) {
    assert && assert( Number.isFinite( x ), `invalid x: ${x}` );

    // Use dimensional analysis to convert the x-value to the index of the Point.
    const index = Utils.roundSymmetric( ( x - CURVE_X_RANGE.min ) * POINTS_PER_COORDINATE );

    return this.points[ Utils.clamp( index, 0, this.points.length ) ];
  }
}

calculusGrapher.register( 'Curve', Curve );
export default Curve;