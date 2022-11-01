// Copyright 2020-2022, University of Colorado Boulder

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
 *   - Provide other convenience methods to set the initial value of the curve points.
 *
 * For the 'Calculus Grapher' sim, the same Curves instances are used throughout the lifetime of the simulation, so no
 * dispose method is necessary. For an overview of the class hierarchy of Curves, see
 * https://github.com/phetsims/calculus-grapher/blob/master/doc/implementation-notes.md
 *
 * @author Brandon Li
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

// constants
const CURVE_X_RANGE = CalculusGrapherConstants.CURVE_X_RANGE;
const POINTS_PER_COORDINATE = CalculusGrapherQueryParameters.pointsPerCoordinate;

type MathFunction = ( x: number ) => number;
type SimplePoint = [ x: number, y: number ];

type SelfOptions = {
  xRange?: Range;
  pointsPerCoordinate?: number;
  mathFunction?: MathFunction;
  initialPoints?: SimplePoint[];
};

export type CurveOptions = SelfOptions & PhetioObjectOptions;

export default class Curve extends PhetioObject {

  public readonly points: CurvePoint[];

  // Using an observable Property for the y-value was considered, but it was deemed to be
  // invasive to the performance of the simulation as observers had to listen to the yProperty
  // of all CurvePoints. See https://github.com/phetsims/calculus-grapher/issues/19
  public readonly curveChangedEmitter: Emitter;

  public cusps: CurvePoint[];

  public readonly xRange: Range;
  public readonly pointsPerCoordinate: number;

  public constructor( providedOptions: CurveOptions ) {

    assert && assert( !( providedOptions.mathFunction && providedOptions.initialPoints ),
      'Only one way to set the curve is allowed' );

    const options = optionize<CurveOptions, SelfOptions, PhetioObjectOptions>()( {
      xRange: CURVE_X_RANGE,
      pointsPerCoordinate: POINTS_PER_COORDINATE,
      mathFunction: x => 0,
      initialPoints: [ [ 0, 0 ] ],
      phetioState: false
    }, providedOptions );

    super( options );

    // create a reference to these option fields
    this.xRange = options.xRange;
    this.pointsPerCoordinate = options.pointsPerCoordinate;

    // the Points that map out the curve at a finite number of partitions within
    // the domain. See the comment at the top of this file for full context.

    this.points = ( options.initialPoints.length > 1 ) ?
                  this.getFromSimplePoints( options.initialPoints ) :
                  this.getFromMathFunction( options.mathFunction );

    // Emits when the Curve has changed in any form. Instead of listening to a yProperty
    // of every CurvePoint, which was deemed invasive to the performance of the sim, we
    // use an Emitter that emits once after all CurvePoints are set upon manipulation.
    // See https://github.com/phetsims/calculus-grapher/issues/19
    this.curveChangedEmitter = new Emitter();

    // a collection of cusps points if present
    this.cusps = []; // {CurvePoint[]}
  }

  /**
   * Gets the CurvePoint whose x-value is closest to the given x-value.
   */
  public getClosestPointAt( x: number ): CurvePoint {
    assert && assert( Number.isFinite( x ), `invalid x: ${x}` );

    return this.points[ this.getClosestIndexAt( x ) ];
  }

  /**
   * Gets the index of the array whose x-value is closest to the given x-value.
   */
  public getClosestIndexAt( x: number ): number {
    assert && assert( Number.isFinite( x ), `invalid x: ${x}` );

    // Use dimensional analysis to convert the x-value to the index of the Point.
    const index = Utils.roundSymmetric( ( x - this.xRange.min ) * this.pointsPerCoordinate );

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
    for ( let x = this.xRange.min; x <= this.xRange.max; x += 1 / this.pointsPerCoordinate ) {
      points.push( new CurvePoint( x, mathFunction( x ) ) );
    }
    return points;
  }

  /**
   * Returns a complete set of curvePoints, equally x-spaced from an array of simple Points.
   * The missing points are interpolated from the simplePoints.
   *
   * @param simplePoints - eg: [[0,0], [3,3], [5,3], [10,0]]
   */
  private getFromSimplePoints( simplePoints: SimplePoint[] ): CurvePoint[] {

    // x separation between two adjacent points in curvePoint array
    const deltaX = 1 / this.pointsPerCoordinate;
    const minX = this.xRange.min;
    const maxX = this.xRange.max;

    // build the x values of the curvePoints; equally space by deltaX
    const xArray: number[] = [];
    for ( let x = minX; x <= maxX; x += deltaX ) {
      xArray.push( x );
    }

    // sorting callback in terms of the x values of  simple points
    const sortCallback = ( p1: SimplePoint, p2: SimplePoint ): number => p1[ 0 ] > p2[ 0 ] ? 1 : -1;

    // filter function that remove x duplicates on sorted arrays of simple points
    const uniqueCallback = ( p1: SimplePoint, index: number, array: SimplePoint[] ): boolean =>
      !index || p1[ 0 ] !== array[ index - 1 ][ 0 ];

    // sort x values and filter the duplicate x values.
    const sortedSimplePoints = simplePoints.sort( sortCallback ).filter( uniqueCallback );

    // ensure that there is a point before or at the min x
    if ( sortedSimplePoints[ 0 ][ 0 ] > minX ) {

      // insert a point with a y value of zero at the minimum x range
      sortedSimplePoints.unshift( [ minX, 0 ] );
    }

    // ensure that there is a point after or at the max X value
    if ( sortedSimplePoints[ sortedSimplePoints.length - 1 ][ 0 ] < maxX ) {

      // insert a point with a y value of zero at the maximum x range
      sortedSimplePoints.push( [ maxX, 0 ] );
    }

    // an array of all the points but in SimplePoints format.
    const allPoints: SimplePoint[] = [];

    // construct allPoints by iterating over the sorted simple points
    for ( let i = 1; i < sortedSimplePoints.length; i++ ) {
      const p1 = sortedSimplePoints[ i - 1 ];
      const p2 = sortedSimplePoints[ i ];

      // an array of simple points that interpolates between p1 and p2 with x value allowed by xArray
      const partialPoints = this.linearInterpolate( p1, p2, xArray );

      allPoints.push( ...partialPoints );
    }

    // we may have duplicate x values at the junctions of the segments, filter them out.
    const sortedUniquePoints = allPoints.filter( uniqueCallback );

    // generate an array of CurvePoints from the simplePoints
    return sortedUniquePoints.map( point => new CurvePoint( point[ 0 ], point[ 1 ] ) );
  }

  /**
   * return an array of SimplePoints that interpolate between p1 and p2, with only x -value that are allowed within x-Array
   * @param p1 - initial point
   * @param p2 - final point
   * @param xArray - array of finely equally spaced x points
   */
  private linearInterpolate( p1: SimplePoint, p2: SimplePoint, xArray: number[ ] ): SimplePoint[ ] {

    // convenience variables
    const x1 = p1[ 0 ];
    const y1 = p1[ 1 ];
    const x2 = p2[ 0 ];
    const y2 = p2[ 1 ];

    // interpolating function
    const y = ( x: number ): number => Utils.linear( x1, x2, y1, y2, x );

    // function that returns the closest element of xArray to the value x;
    const closestMatch = ( x: number ): number => xArray.reduce( ( previousX: number, currentX: number ) =>
      Math.abs( currentX - x ) < Math.abs( previousX - x ) ? currentX : previousX );

    const getIndex = ( xValue: number ): number => xArray.findIndex( x => closestMatch( xValue ) === x )!;

    // get portion of the xArray
    const xSlice = xArray.slice( getIndex( x1 ), getIndex( x2 ) );

    // map portion of the array to simple points
    return xSlice.map( x => [ x, y( x ) ] );
  }

}

calculusGrapher.register( 'Curve', Curve );
