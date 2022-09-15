// Copyright 2020-2022, University of Colorado Boulder

// @ts-nocheck
/**
 * CurvePoint is a single mutable point of a Curve at a given x-value. Inheriting from Vector2 was considered, but it
 * was decided to implement CurvePoints to be minimally invasive and lightweight for performance.
 *
 * Each CurvePoint contains the following information:
 *   - The corresponding y-value of the Point.
 *   - Whether the Point exists. A Point that isn't defined means that the Curve has a hole or a discontinuity.
 *   - All of its previously 'saved' y-values. When the user finishes manipulating the OriginalCurve, the y-value of
 *     CurvePoints in the OriginalCurve are saved.
 *
 * For the 'Calculus Grapher' simulation, CurvePoints are used inside of Curve (and its subtypes) to partition the curve
 * into a finite number of close points that map out the general shape and curvature. Adjacent CurvePoints are
 * considered to be infinitesimally close enough for derivative and integral computations. Thus, CurvePoints are created
 * at the start of the sim and are mutated when the Curve changes, meaning CurvePoints are never disposed.
 *
 * @author Brandon Li
 */

import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';

class CurvePoint {

  /**
   * @param {number} x - the x-coordinate of the CurvePoint.
   * @param {number|null} y - the y-coordinate of the CurvePoint.
   */
  constructor( x, y = 0 ) {
    assert && assert( Number.isFinite( x ) && CalculusGrapherConstants.CURVE_X_RANGE.contains( x ), `invalid x: ${x}` );
    assert && assert( y === null || Number.isFinite( y ), `invalid y: ${y}` );

    // @public (read-only) {number} - the x-coordinate of the Point. This value cannot be mutated.
    this.x = x;

    // @public {number|null} - the y-coordinate of the Point. If null, it means that the Point represents a hole or
    //                         a discontinuity in the Curve.
    //
    //                         Using an observable Property for the y-value was considered, but it was deemed to be
    //                         invasive to the performance of the simulation as observers had to listen to the yProperty
    //                         of all CurvePoints. See https://github.com/phetsims/calculus-grapher/issues/19
    this.y = y;

    // @private {number|null} - the initial y-coordinate passed into the CurvePoint, for resetting purposes.
    this.initialY = y;

    // @private {number|null[]} - an array of all of this Point's saved y-values.
    this.savedYValues = [];
  }

  /**
   * Resets this CurvePoint to its factory settings.
   * @public
   *
   * Called when the reset-all button is pressed.
   */
  reset() {
    this.y = this.initialY;
    this.savedYValues = [];
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

  //----------------------------------------------------------------------------------------

  /**
   * Gets the most recently saved y-value.
   * @public
   *
   * @returns {number|null}
   */
  get lastSavedY() {
    return this.savedYValues.length ? _.last( this.savedYValues ) : null;
  }

  /**
   * Saves the current y-value of the Point for the next undoToLastSave() method.
   * @public
   *
   * This method is invoked when the user finishes manipulating the OriginalCurve. When the undo button is pressed,
   * the Points of the OriginalCurve will be set to their last saved state.
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

  //----------------------------------------------------------------------------------------

  /**
   * Debugging string for the CurvePoint.
   * @public
   *
   * @returns {string}
   */
  toString() {
    return `CurvePoint[ x: ${this.x}, y: ${this.y} ]`;
  }

  /**
   * @public
   */
  dispose() {
    assert && assert( false, 'CurvePoint cannot be disposed (exists for the lifetime of the sim)' );
  }
}

calculusGrapher.register( 'CurvePoint', CurvePoint );
export default CurvePoint;
