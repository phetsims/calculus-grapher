// Copyright 2020-2021, University of Colorado Boulder

/**
 * Curve is the base-class for a single 'curve' that appears in the 'Calculus Grapher' simulation. It provides
 * functionality that is common to all types of curves, which are 'integrals', 'original', and 'derivative' curves, and
 * is intended to be sub-classed for type-specific features.
 *
 * Curves are modeled by segmenting the curve into a finite number of CurvePoints that are close together and map out
 * the y-values of the shape and curvature of the Curve. Adjacent CurvePoints are considered to be infinitesimally close
 * enough for derivative and integral computations and are considered to cover 'every' x-value within its domain.
 *
 * Responsibilities are:
 *   - Create an array of CurvePoints for each partition of the Curve.
 *   - Create convenience methods to reference and mutate CurvePoints at a given x-value.
 *   - Provide the reset method and other convenience methods.
 *
 * For the 'Calculus Grapher' sim, the same Curves instances are used throughout the lifetime of the simulation, so no
 * dispose method is necessary. For an overview of the class hierarchy of Curves, see
 * https://github.com/phetsims/calculus-grapher/blob/master/doc/implementation-notes.md
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

    // @public (read-only) {CurvePoint[]} - the Points that map out the curve at a finite number of partitions within
    //                                      the domain. See the comment at the top of this file for full context.
    this.points = [];

    // Populate the points of the curve with CurvePoints that are close together. CurvePoints are created at the
    // start of the simulation here and are never disposed.
    for ( let x = CURVE_X_RANGE.min; x <= CURVE_X_RANGE.max; x += 1 / POINTS_PER_COORDINATE ) {
      this.points.push( new CurvePoint( x ) );
    }

    // @public (read-only) {Emitter} - Emits when the Curve has changed in any form. Instead of listening to a yProperty
    //                                 of every CurvePoint, which was deemed invasive to the performance of the sim, we
    //                                 use an Emitter that emits once after all CurvePoints are set upon manipulation.
    //                                 See https://github.com/phetsims/calculus-grapher/issues/19
    this.curveChangedEmitter = new Emitter();
  }

  /**
   * Resets the Curve to its initial state.
   * @public
   *
   * Called when the reset-all button is pressed.
   */
  reset() {

    // Reset every CurvePoint to its initial state.
    this.points.forEach( point => {
      point.reset();
    } );

    // Signal once that this Curve has changed.
    this.curveChangedEmitter.emit();
  }

  /**
   * Gets the CurvePoint whose x-value is closest to the given x-value.
   * @public
   *
   * @param {number} x
   * @returns {CurvePoint}
   */
  getClosestPointAt( x ) {
    assert && assert( Number.isFinite( x ), `invalid x: ${x}` );

    // Use dimensional analysis to convert the x-value to the index of the Point.
    const index = Utils.roundSymmetric( ( x - CURVE_X_RANGE.min ) * POINTS_PER_COORDINATE );

    // Clamp the index to a point inside our range.
    return this.points[ Utils.clamp( index, 0, this.points.length - 1 ) ];
  }
}

calculusGrapher.register( 'Curve', Curve );
export default Curve;