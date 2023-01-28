// Copyright 2020-2023, University of Colorado Boulder

/**
 * Curve is the base-class for a single 'curve' that appears in the 'Calculus Grapher' simulation. It provides
 * functionality that is common to all types of curves, and is intended to be sub-classed for type-specific features.
 *
 * Curves are modeled by segmenting the curve into a finite number of CurvePoints that are close together and map out
 * the y-values of the shape and curvature of the Curve. Adjacent CurvePoints are considered to be infinitesimally close
 * enough for derivative and integral computations and are considered to cover 'every' x-value within its domain.
 *
 * Responsibilities are:
 *   - Create an array of CurvePoints for the Curve.
 *   - Create convenience methods to reference and mutate CurvePoints at a given x-value.
 *   - Provide other convenience methods to set the initial value of the curve points.
 *
 * For the 'Calculus Grapher' sim, the same Curves instances are used throughout the lifetime of the simulation, so no
 * dispose method is necessary. For an overview of the class hierarchy of Curves, see
 * https://github.com/phetsims/calculus-grapher/blob/master/doc/implementation-notes.md
 *
 * @author Brandon Li
 * @author Martin Veillette
 */

import Emitter from '../../../../axon/js/Emitter.js';
import Utils from '../../../../dot/js/Utils.js';
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import CalculusGrapherQueryParameters from '../CalculusGrapherQueryParameters.js';
import CurvePoint from './CurvePoint.js';
import Range from '../../../../dot/js/Range.js';
import optionize from '../../../../phet-core/js/optionize.js';
import Property from '../../../../axon/js/Property.js';
import ArrayIO from '../../../../tandem/js/types/ArrayIO.js';
import { MathFunction } from './PresetFunctions.js';

// constants
const CURVE_X_RANGE = CalculusGrapherConstants.CURVE_X_RANGE;
const NUMBER_OF_POINTS = CalculusGrapherQueryParameters.numberOfPoints;
const ANGLE_MISMATCH_THRESHOLD = CalculusGrapherQueryParameters.angleMismatchThreshold;
const SLOPE_THRESHOLD = CalculusGrapherQueryParameters.slopeThreshold;

type SelfOptions = {
  xRange?: Range;
  numberOfPoints?: number;
  mathFunction?: MathFunction;
  pointsPropertyReadOnly?: boolean;
};

export type CurveOptions = SelfOptions & PhetioObjectOptions;

export default class Curve extends PhetioObject {

  // The collection of points that describe the curve. This is an array of CurvePoint instances that are typically
  // mutated in place, so that we have acceptable performance. If Curve was instantiated with positionPropertyReadOnly:true,
  // then it is possible to set pointsProperty via PhET-iO.
  private readonly pointsProperty: Property<CurvePoint[]>;

  // Using an observable Property for the y-value was considered, but it was deemed to be
  // invasive to the performance of the simulation as observers had to listen to the yProperty
  // of all CurvePoints. See https://github.com/phetsims/calculus-grapher/issues/19
  public readonly curveChangedEmitter: Emitter;

  public readonly xRange: Range;
  public readonly numberOfPoints: number;

  protected constructor( providedOptions: CurveOptions ) {

    const options = optionize<CurveOptions, SelfOptions, PhetioObjectOptions>()( {

      // SelfOptions
      xRange: CURVE_X_RANGE,
      numberOfPoints: NUMBER_OF_POINTS,
      mathFunction: () => 0,

      // PhetioObjectOptions
      phetioState: false,
      pointsPropertyReadOnly: true
    }, providedOptions );

    super( options );

    // create a reference to these option fields
    this.xRange = options.xRange;
    this.numberOfPoints = options.numberOfPoints;

    // the Points that map out the curve within the domain. See the comment at the top of this file for full context.
    const initialPoints = this.getFromMathFunction( options.mathFunction );

    this.pointsProperty = new Property( initialPoints, {
      isValidValue: points => isValidPoints( initialPoints, points ),
      tandem: options.tandem.createTandem( 'pointsProperty' ),
      phetioValueType: ArrayIO( CurvePoint.CurvePointIO ),
      phetioReadOnly: options.pointsPropertyReadOnly
    } );

    // Emits when the Curve has changed in any form. Instead of listening to a yProperty
    // of every CurvePoint, which was deemed invasive to the performance of the sim, we
    // use an Emitter that emits once after all CurvePoints are set upon manipulation.
    // See https://github.com/phetsims/calculus-grapher/issues/19
    this.curveChangedEmitter = new Emitter();

    // Use this to short-circuit reentrant behavior where curveChangedEmitter and pointsProperty listeners (below)
    // call each other.
    let notifyListeners = true;

    this.curveChangedEmitter.addListener( () => {

      // assign point type for entire curve
      this.assignType();

      // This is needed to notify Studio that pointsProperty has effectively changed.
      if ( notifyListeners ) {
        this.pointsProperty.notifyListenersStatic();
      }
    } );

    // For Curve instances created with positionPropertyReadOnly:true, pointsProperty may be set via PhET-iO.
    // If that happens, notify listeners.
    this.pointsProperty.link( ( newPoints, oldPoints ) => {
      if ( newPoints !== oldPoints ) {
        notifyListeners = false;
        this.curveChangedEmitter.emit();
        notifyListeners = true;
      }
    } );
  }

  /**
   * Since pointsProperty is private, use this method to access the points. It is expected that callers will mutate
   * these points; do not add/remove points. If you mutate these points, be certain that they conform to function
   * isValidPoints, and call curveChangedEmitter.emit() after you have finished mutating.
   */
  public get points(): CurvePoint[] {
    return this.pointsProperty.value;
  }

  /**
   * Gets the CurvePoint whose x-value is closest to the given x-value.
   */
  public getClosestPointAt( x: number ): CurvePoint {
    assert && assert( Number.isFinite( x ), `invalid x: ${x}` );

    return this.points[ this.getClosestIndexAt( x ) ];
  }

  public get deltaX(): number {
    return this.xRange.getLength() / ( this.numberOfPoints - 1 );
  }

  /**
   * Gets the index of the array whose x-value is closest to the given x-value.
   */
  public getClosestIndexAt( x: number ): number {
    assert && assert( Number.isFinite( x ), `invalid x: ${x}` );

    const normalizedValue = this.xRange.getNormalizedValue( x );

    const index = Utils.roundSymmetric( normalizedValue * ( this.numberOfPoints - 1 ) );

    // Clamp the index to a point inside our range.
    return Utils.clamp( index, 0, this.points.length - 1 );
  }

  /**
   * Iterates through an array in trios, passing the previous value, the current value, and the next value, to the iterator function.
   * forEachAdjacentTrio( [ 1, 2, 3, 4], f ) would invoke f(null, 1, 2),  f( 1, 2, 3 ), f( 2, 3, 4 ), f( 3, 4, null )
   */
  public forEachAdjacentTrio( iterator: ( previousPoint: CurvePoint | null, point: CurvePoint, nextPoint: CurvePoint | null, index: number ) => void ): void {

    for ( let i = 0; i < this.points.length; i++
    ) {
      const value = this.points[ i ];
      const previousValue = i > 0 ? this.points[ i - 1 ] : null;
      const nextValue = i < this.points.length ? this.points[ i + 1 ] : null;

      iterator( previousValue, value, nextValue, i );
    }
  }

  /**
   * Iterates through an array in pairs, passing the current value and the previous value to the iterator function.
   * For instance, forEachAdjacentPair( [ 1, 2, 3, 4 ], f ) would invoke f( 2, 1 ), f( 3, 2 ), and f( 4, 3 ).
   *
   */
  public forEachAdjacentPair( iterator: {
    ( point: CurvePoint, previousPoint: CurvePoint, index: number ): void;
  } ): void {

    for ( let i = 1; i < this.points.length; i++
    ) {
      const value = this.points[ i ];
      const previousValue = this.points[ i - 1 ];

      iterator( value, previousValue, i );
    }
  }

  private getFromMathFunction( mathFunction: MathFunction ): CurvePoint[] {
    // Populate the points of the curve with CurvePoints that are close together. CurvePoints are created at the
    // start of the simulation here and are never disposed.

    const points: CurvePoint[] = [];

    const numberOfPoints = this.numberOfPoints;

    for ( let i = 0; i < numberOfPoints; i++ ) {

      // a value ranging from 0 to 1, inclusive;
      const normalizedValue = i / ( numberOfPoints - 1 );

      const x = this.xRange.expandNormalizedValue( normalizedValue );

      points.push( new CurvePoint( x, mathFunction( x ) ) );
    }
    return points;
  }

  private assignType(): void {

    // Loop through each trio of adjacent Points of the curve.
    this.forEachAdjacentTrio( ( previousPoint, point, nextPoint ) => {

      let leftSideDifference: null | number = null;
      let rightSideDifference: null | number = null;

      let leftSlope: null | number = null;
      let rightSlope: null | number = null;

      // Compute the leftDifference and rightDifference.
      if ( previousPoint && previousPoint.isFinite ) {
        leftSideDifference = ( point.y - previousPoint.y );
        assert && assert( Number.isFinite( leftSideDifference ), 'non finite left side difference' );
        leftSlope = leftSideDifference / ( point.x - previousPoint.x );
        assert && assert( Number.isFinite( leftSlope ), 'non finite slope' );
      }

      if ( nextPoint && nextPoint.isFinite ) {
        rightSideDifference = ( nextPoint.y - point.y );
        assert && assert( Number.isFinite( rightSideDifference ), 'non finite right side difference' );
        rightSlope = rightSideDifference / ( nextPoint.x - point.x );
        assert && assert( Number.isFinite( rightSlope ), 'non finite slope' );
      }

      if ( typeof leftSideDifference === 'number' && typeof rightSideDifference === 'number' &&
           Number.isFinite( leftSideDifference ) && Number.isFinite( rightSideDifference ) &&
           typeof leftSlope === 'number' && typeof rightSlope === 'number' &&
           Number.isFinite( leftSlope ) && Number.isFinite( rightSlope ) ) {

        // find max jump
        const jump = Math.max( Math.abs( leftSideDifference ), Math.abs( rightSideDifference ) );
        const maxSlope = jump / this.deltaX;

        // find difference in angle of slopes
        const K = Math.abs( ( Math.atan( leftSlope ) - Math.atan( rightSlope ) ) );

        if ( maxSlope >= SLOPE_THRESHOLD ) {
          point.pointType = 'discontinuous';
        }
        else if ( K >= ANGLE_MISMATCH_THRESHOLD ) {
          point.pointType = 'cusp';
        }
        else {
          point.pointType = 'smooth';
        }
      }
    } );
  }
}

/**
 * Determines whether a new set of points is value.
 */
function isValidPoints( initialPoints: CurvePoint[], points: CurvePoint[] ): boolean {

  // The number of points must be the same.
  let isValid = ( initialPoints.length === points.length );

  // All x coordinates must be the same.
  for ( let i = 0; i < initialPoints.length && isValid; i++ ) {
    isValid = ( initialPoints[ i ].x === points[ i ].x );
  }
  return isValid;
}

calculusGrapher.register( 'Curve', Curve );
