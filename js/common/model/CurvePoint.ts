// Copyright 2020-2022, University of Colorado Boulder

/**
 * CurvePoint is a single mutable point of a Curve at a given x-value.
 * Each CurvePoint contains the following information:
 *   - The corresponding y-value and type of the Point.
 *   - All of its previously 'saved' states. When the user finishes manipulating the TransformedCurve, the state of
 *     CurvePoint in the TransformedCurve is saved.
 *
 * For the 'Calculus Grapher' simulation, CurvePoints are used inside of Curve (and its subtypes) to partition the curve
 * into a finite number of close points that map out the general shape and curvature. CurvePoints are created
 * at the start of the sim and are mutated when the Curve changes. CurvePoints are never disposed.
 *
 * @author Brandon Li
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import StringIO from '../../../../tandem/js/types/StringIO.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';

const PointTypeValues = [ 'smooth', 'cusp', 'discontinuous' ] as const;
export type PointType = ( typeof PointTypeValues )[number];

export type PointState = {
  y: number;
  pointType: PointType;
};

export type CurvePointStateObject = {
  x: number;
  y: number;
  pointType: PointType;
  initialY: number;
  initialPointType: PointType;
};

export default class CurvePoint {

  public readonly x: number;

  // Using an observable Property for the y-value was considered, but it was deemed to be
  // invasive to the performance of the simulation as observers had to listen to the yProperty
  // of all CurvePoints. See https://github.com/phetsims/calculus-grapher/issues/19
  public y: number;

  public pointType: PointType;

  // the initial y-coordinate passed into the CurvePoint, for resetting purposes.
  private readonly initialState: PointState;

  // an array of all of this Point's saved states.
  private readonly savedStates: PointState [];

  public constructor( x: number, y = 0, pointType: PointType = 'smooth' ) {
    assert && assert( Number.isFinite( x ) && CalculusGrapherConstants.CURVE_X_RANGE.contains( x ), `invalid x: ${x}` );
    assert && assert( y === null || Number.isFinite( y ), `invalid y: ${y}` );

    this.x = x;
    this.y = y;
    this.pointType = pointType;

    this.initialState = {
      y: y,
      pointType: pointType
    };

    this.savedStates = [];
  }

  public toVector(): Vector2 {
    return new Vector2( this.x, this.y );
  }

  /**
   * Returns a boolean that indicates if the y value of a point is finite.
   */
  public get isFinite(): boolean {
    return Number.isFinite( this.y );
  }

  public get isDiscontinuous(): boolean {
    return this.pointType === 'discontinuous';
  }

  public get isCusp(): boolean {
    return this.pointType === 'cusp';
  }

  //----------------------------------------------------------------------------------------

  /**
   * Gets the most recently saved y-value.
   */
  public get lastSavedY(): number {
    return ( this.savedStates.length === 0 ) ? this.initialState.y : _.last( this.savedStates )!.y;
  }

  /**
   * Saves the current y-value of the Point for the next undoToLastSave() method.
   * This method is invoked when the user finishes manipulating the TransformedCurve. When the undo button is pressed,
   * the Points of the TransformedCurve will be set to their last saved state.
   */
  public save(): void {

    // Save the current state of the CurvePoint.
    this.savedStates.push( {
      y: this.y,
      pointType: this.pointType
    } );

    // empty first element of array if the number of saved values exceed MAX_UNDO
    while ( this.savedStates.length > CalculusGrapherConstants.MAX_UNDO ) {

      // remove first value from array
      this.savedStates.shift();
    }
  }

  /**
   * Debugging string for the CurvePoint.
   */
  public toString(): string {
    return `CurvePoint[ x: ${this.x}, y: ${this.y}, pointType: ${this.pointType} ]`;
  }

  public dispose(): void {
    assert && assert( false, 'CurvePoint cannot be disposed (exists for the lifetime of the sim)' );
  }

  /**
   * Sets the y-value of this CurvedPoint to its last saved state.
   * This method is invoked when the undo button is pressed, which successively undos the last action.
   */
  public undoToLastSave(): void {

    // Set the y-value of this CurvedPoint to the last saved state. The y-value is removed from our savedYValues
    // so the next undoToLastSave() call successively reverts to the state before this one.
    this.y = ( this.savedStates.length === 0 ) ? this.initialState.y : this.savedStates.pop()!.y;
  }

  public reset(): void {
    this.y = this.initialState.y;
    this.pointType = this.initialState.pointType;
    this.savedStates.length = 0;
  }

  // the savedYValues of the curvePoint are purposefully not serialized (see https://github.com/phetsims/calculus-grapher/issues/65 )
  public toStateObject(): CurvePointStateObject {
    return {
      x: this.x,
      y: this.y,
      pointType: this.pointType,
      initialY: this.initialState.y,
      initialPointType: this.initialState.pointType
    };
  }

  public static fromStateObject( stateObject: CurvePointStateObject ): CurvePoint {
    const curvePoint = new CurvePoint(
      stateObject.x,
      stateObject.initialY,
      stateObject.initialPointType
    );
    curvePoint.y = stateObject.y;
    curvePoint.pointType = stateObject.pointType;

    return curvePoint;
  }

  public static readonly CurvePointIO = new IOType<CurvePoint, CurvePointStateObject>( 'CurvePointIO', {
    valueType: CurvePoint,
    stateSchema: {
      x: NumberIO,
      y: NumberIO,
      pointType: StringIO,
      initialY: NumberIO,
      initialPointType: StringIO
    },
    toStateObject: ( curvePoint: CurvePoint ) => curvePoint.toStateObject(),
    fromStateObject: ( stateObject: CurvePointStateObject ) => CurvePoint.fromStateObject( stateObject ),
    documentation: 'describe the point on a curve'
  } );
}
calculusGrapher.register( 'CurvePoint', CurvePoint );
