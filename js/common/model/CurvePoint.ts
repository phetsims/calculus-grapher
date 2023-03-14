// Copyright 2020-2023, University of Colorado Boulder

/**
 * CurvePoint is a single mutable point of a Curve at a given x-value.
 * Each CurvePoint contains the following information:
 *   - The corresponding y-value and type of the Point.
 *   - All of its previously 'saved' states. When the user finishes manipulating the TransformedCurve, the state of
 *     CurvePoint in the TransformedCurve is saved.
 *
 * For the 'Calculus Grapher' simulation, CurvePoints are used inside of Curve (and its subclasses) to partition the curve
 * into a finite number of close points that map out the general shape and curvature. CurvePoints are created
 * at the start of the sim and are mutated when the Curve changes. CurvePoints are never disposed.
 *
 * @author Brandon Li
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import StringUnionIO from '../../../../tandem/js/types/StringUnionIO.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';

const PointTypeValues = [ 'smooth', 'cusp', 'discontinuous' ] as const;
export type PointType = ( typeof PointTypeValues )[number];

// For capturing the state of a CurvePoint, used to support Undo feature
type CurvePointState = {
  y: number;
  pointType: PointType;
};

// PhET-iO state object, for serialization
export type CurvePointStateObject = {
  x: number;
  y: number;
  pointType: PointType;
  initialY: number;
  initialPointType: PointType;
};

export default class CurvePoint {

  // The x coordinate is fixed.
  public readonly x: number;

  // Using an observable Property for the y-value was considered, but it was deemed to be
  // invasive to the performance of the simulation as observers had to listen to the yProperty
  // of all CurvePoints. See https://github.com/phetsims/calculus-grapher/issues/19
  public y: number;

  // Metadata that tells us a bit more about this point
  public pointType: PointType;

  // The initial y-coordinate, for resetting purposes.
  private readonly initialState: CurvePointState;

  // An array of this CurvePoint's saved states, for the Undo feature. This is a stack (last in, first out)
  // that has a maximum length. When the maximum length is reached, the oldest saved state is discarded.
  // When save() is called, the current state of this CurvePoint is pushed onto the end of the stack.
  // When undo() is called, the last state that was pushed to the stack is popped off, and used to restore
  // the state of this CurvePoint. Note that this field is not serialized as part of PhET-iO state, see
  // https://github.com/phetsims/calculus-grapher/issues/65
  private readonly undoStack: CurvePointState[];

  // Vector2 representation of this CurvePoint, to be used in bamboo data sets. This instance is allocated once
  // at instantiation, then reused to prevent garbage collection.
  private readonly vector: Vector2;

  public constructor( x: number, y = 0, pointType: PointType = 'smooth' ) {
    assert && assert( Number.isFinite( x ), `invalid x: ${x}` );

    this.x = x;
    this.y = y;
    this.pointType = pointType;

    this.initialState = {
      y: y,
      pointType: pointType
    };

    this.undoStack = [];
    this.vector = new Vector2( x, y );
  }

  /**
   * Returns a reference to the Vector2 representation of this CurvePoint. DO NOT MODIFY!
   */
  public getVector(): Vector2 {
    this.vector.y = this.y; // defer update of y until we ask for it
    return this.vector;
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
   * Gets the most-recently saved y-value.
   */
  public get lastSavedY(): number {
    return ( this.undoStack.length === 0 ) ? this.initialState.y : _.last( this.undoStack )!.y;
  }

  /**
   * Gets the most-recently saved point type.
   */
  public get lastSavedType(): PointType {
    return ( this.undoStack.length === 0 ) ? this.initialState.pointType : _.last( this.undoStack )!.pointType;
  }

  /**
   * Saves the current state of the CurvePoint. This method is invoked when the user finishes manipulating the
   * TransformedCurve. When the undo button is pressed, the Points of the TransformedCurve will be set to their
   * most-recent saved state.
   */
  public save(): void {

    // Save the current state of the CurvePoint.
    this.undoStack.push( {
      y: this.y,
      pointType: this.pointType
    } );

    // If we've reached the maximum length of our undo stack, remove the oldest state from the stack, which
    // is the first element in the array.
    while ( this.undoStack.length > CalculusGrapherConstants.MAX_UNDO ) {
      this.undoStack.shift();
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
   * Sets the state of this CurvedPoint to its last saved state.
   * This method is invoked when the undo button is pressed, which successively undoes the last action.
   * If the undo stack is empty, this is a no-op.
   */
  public undo(): void {
    if ( this.undoStack.length !== 0 ) {
      const pointState = this.undoStack.pop()!;
      this.y = pointState.y;
      this.pointType = pointState.pointType;
    }
  }

  // Gets the slope between this point and targetPoint.
  public getSlope( targetPoint: CurvePoint ): number {
    assert && assert( targetPoint !== this, 'you need two different points' );

    const slope = ( this.y - targetPoint.y ) / ( this.x - targetPoint.x );

    assert && assert( Number.isFinite( slope ), 'non finite slope' );
    return slope;
  }

  public reset(): void {
    this.y = this.initialState.y;
    this.pointType = this.initialState.pointType;
    this.undoStack.length = 0;
  }

  // undoStack is purposefully not serialized (see https://github.com/phetsims/calculus-grapher/issues/65)
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
      pointType: StringUnionIO( PointTypeValues ),
      initialY: NumberIO,
      initialPointType: StringUnionIO( PointTypeValues )
    },
    toStateObject: ( curvePoint: CurvePoint ) => curvePoint.toStateObject(),
    fromStateObject: ( stateObject: CurvePointStateObject ) => CurvePoint.fromStateObject( stateObject ),
    documentation: 'describe the point on a curve'
  } );
}

calculusGrapher.register( 'CurvePoint', CurvePoint );
