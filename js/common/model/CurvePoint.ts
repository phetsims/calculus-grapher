// Copyright 2020-2022, University of Colorado Boulder

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

export default class CurvePoint {

  public readonly x: number;

  // Using an observable Property for the y-value was considered, but it was deemed to be
  // invasive to the performance of the simulation as observers had to listen to the yProperty
  // of all CurvePoints. See https://github.com/phetsims/calculus-grapher/issues/19
  public y: number;

  // the initial y-coordinate passed into the CurvePoint, for resetting purposes.
  private readonly initialY: number;

  // an array of all of this Point's saved y-values.
  private savedYValues: ( number )[];

  public constructor( x: number, y = 0 ) {
    assert && assert( Number.isFinite( x ) && CalculusGrapherConstants.CURVE_X_RANGE.contains( x ), `invalid x: ${x}` );
    assert && assert( y === null || Number.isFinite( y ), `invalid y: ${y}` );

    this.x = x;
    this.y = y;

    this.initialY = y;
    this.savedYValues = [];
  }

  public reset(): void {
    this.y = this.initialY;
    this.savedYValues = [];
  }

  /**
   * Returns a boolean that indicates if the point exists.
   */
  public get exists(): boolean {
    return Number.isFinite( this.y );
  }

  //----------------------------------------------------------------------------------------

  /**
   * Gets the most recently saved y-value.
   */
  public get lastSavedY(): number {
    return ( this.savedYValues.length === 0 ) ? this.initialY : _.last( this.savedYValues )!;
  }

  /**
   * Saves the current y-value of the Point for the next undoToLastSave() method.
   * This method is invoked when the user finishes manipulating the OriginalCurve. When the undo button is pressed,
   * the Points of the OriginalCurve will be set to their last saved state.
   */
  public save(): void {

    // Save the current y-value of the CurvePoint.
    this.savedYValues.push( this.y );
  }

  /**
   * Sets the y-value of this CurvedPoint to its last saved state.
   * This method is invoked when the undo button is pressed, which successively undos the last action.
   */
  public undoToLastSave(): void {

    // Set the y-value of this CurvedPoint to the last saved state. The y-value is removed from our savedYValues
    // so the next undoToLastSave() call successively reverts to the state before this one.
    this.y = ( this.savedYValues.length === 0 ) ? this.initialY : this.savedYValues.pop()!;
  }

  //----------------------------------------------------------------------------------------

  /**
   * Debugging string for the CurvePoint.
   */
  public toString(): string {
    return `CurvePoint[ x: ${this.x}, y: ${this.y} ]`;
  }

  public dispose(): void {
    assert && assert( false, 'CurvePoint cannot be disposed (exists for the lifetime of the sim)' );
  }
}

calculusGrapher.register( 'CurvePoint', CurvePoint );
