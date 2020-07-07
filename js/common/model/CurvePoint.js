// Copyright 2020, University of Colorado Boulder

/**
 * CurvePoint is a single mutable point of a Curve at a given x-value.
 *
 * Each CurvePoint contains the following information:
 *   - The corresponding y-value of the point.
 *   - Whether or not the point exists. A point that isn't defined means that the Curve has a hole or a discontinuity.
 *   - All of its previously 'saved' y-values. When the user finishes manipulating the original Curve, the y-value of
 *     CurvePoints in the OriginalCurve are saved.
 *   - Whether or not the point is a cusp. See https://en.wikipedia.org/wiki/Cusp_(singularity). For 'Calculus Grapher',
 *     cusps imply that the Point is non-differentiable and non-twice-differentiable.
 *
 * For the 'Calculus Grapher' simulation, CurvePoints are used inside of Curve and its subtypes to represent and map
 * out the Curve at a finite number of points inside of a interval. Thus, CurvePoints are created at the start of the
 * sim and are mutated when the Curve changes. CurvePoints are never disposed.
 *
 * @author Brandon Li
 */

import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';

class CurvePoint {

  /**
   * @param {number} x - the x-coordinate of the point.
   * @param {number|null} y - the y-coordinate of the point.
   * @param {Object} [options]
   */
  constructor( x, y, options ) {
    assert && assert( Number.isFinite( x ) && CalculusGrapherConstants.CURVE_X_RANGE.contains( x ), `invalid x: ${x}` );
    assert && assert( y === null || typeof y === 'number', `invalid y: ${y}` );

    // @public (read-only) {number} - the x-coordinate of the Point. This value cannot be mutated.
    this.x = x;

    // @public {number} - the y-coordinate of the Point. If null, it means that the point is undefined (which means
    //                    there is a hole in the curve).
    this.y = y;

    // @private {number[]} - an array of all of this Point's saved y-values.
    this.savedYValues = [];

    // @public {boolean} - indicates if the Point is currently a cusp.
    this.isCusp = false;
  }

  /**
   * Resets this CurvePoint to its factory settings.
   * @public
   *
   * Called when the reset-all button is pressed.
   */
  reset() {
    this.savedYValues = [];
    this.isCusp = false;
  }

  /**
   * Returns a boolean that indicates if the point is differentiable. For the 'Calculus Grapher' simulation, there
   * are not vertical tangents, so the only time this is true is when this Point is a cusp or when this Point isn't
   * defined.
   * @public
   *
   * @returns {boolean}
   */
  get isDifferentiable() {
    return this.exists && !this.isCusp;
  }

  /**
   * Returns a boolean that indicates if the point exists.
   * @public
   *
   * @returns {boolean}
   */
  get exists() {
    return Number.isFinite( this.y );
  }

  /**
   * Gets the most recently saved y-value, if it exists.
   * @public
   *
   * @returns {number|null}
   */
  get previousY() {
    return _.last( this.savedYValues );
  }

  /**
   * Saves the current y-value of the Point for the next undoToLastSave() method.
   * @public
   *
   * This method is invoked when the user finishes manipulating the original Curve. When the undo button is pressed,
   * the Points of the original Curve will be set to their last saved state.
   */
  save() {

    // Save the current y-value of the CurvePoint.
    this.savedYValues.push( this.y );
  }

  /**
   * Sets the y-value of this CurvedPoint to its last saved state.
   * @public
   *
   * This method is invoked when the undo button is pressed, which successively undos the last action.
   */
  undoToLastSave() {

    // Set the y-value of this CurvedPoint to the last saved state. The y-value is removed from our savedYValues
    // so the next undoToLastSave() call successively reverts to the state before this one.
    this.y = this.savedYValues.pop();
  }

  /**
   * Debugging string for the CurvePoint.
   * @public
   *
   * @returns {string}
   */
  toString() {
    return `CurvePoint[ x: ${this.x}, y: ${this.y} ]`;
  }
}

calculusGrapher.register( 'CurvePoint', CurvePoint );
export default CurvePoint;