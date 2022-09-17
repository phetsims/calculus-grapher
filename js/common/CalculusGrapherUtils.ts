// Copyright 2020-2022, University of Colorado Boulder

/**
 * CalculusGrapherUtils is a collection of general utility functions used in this sim.
 *
 * @author Brandon Li
 */

import Range from '../../../dot/js/Range.js';
import AssertUtils from '../../../phetcommon/js/AssertUtils.js';
import calculusGrapher from '../calculusGrapher.js';
import CurvePoint from './model/CurvePoint.js';

const CalculusGrapherUtils = {

  /**
   * Iterates through an array in pairs, passing the current value and the previous value to the iterator function.
   * For instance, forEachAdjacentPair( [ 1, 2, 3, 4 ], f ) would invoke f( 2, 1 ), f( 3, 2 ), and f( 4, 3 ).
   *
   */
  forEachAdjacentPair( array: ( CurvePoint )[], iterator: {
    ( point: CurvePoint | null, previousPoint: CurvePoint | null ): void;
    ( point: CurvePoint | null, previousPoint: CurvePoint | null, index: number ): void;
  } ): void {
    assert && assert( Array.isArray( array ), `invalid array: ${array}` );
    assert && assert( typeof iterator === 'function', `invalid iterator: ${iterator}` );

    for ( let i = 1; i < array.length; i++ ) {
      const value = array[ i ];
      const previousValue = array[ i - 1 ];

      iterator( value, previousValue, i );
    }
  },

  /**
   * Iterates through an array in trios, passing the previous value, the current value, and the next value, if they
   * exist, to the iterator function. NOTE: this function will pass in boundaries; for instance,
   * forEachAdjacentTrio( [ 1, 2, 3, 4 ], f ) would invoke f( null, 1, 2  ), f( 1, 2, 3 ), f( 2, 3, 4 ),
   * and f( 3, 4, null).
   *
   */
  forEachAdjacentTrio( array: ( CurvePoint )[],
                       iterator: ( previousPoint: CurvePoint | null, point: CurvePoint, nextPoint: CurvePoint | null, index: number ) => void ): void {
    assert && assert( typeof iterator === 'function', `invalid iterator: ${iterator}` );

    for ( let i = 0; i < array.length; i++ ) {
      const value = array[ i ];
      const previousValue = i > 0 ? array[ i - 1 ] : null;
      const nextValue = i < array.length ? array[ i + 1 ] : null;

      iterator( previousValue, value, nextValue, i );
    }
  },

  /**
   * Gets a Range that is scaled by the desired scalar value. For instance, multiplyRange( new Range( 1, 2 ), 2 ) would
   * return Range( 2, 4 ).
   *
   * @param range - will not be mutated
   * @param scalar - amount to scale the extreme of the Range
   */
  multiplyRange( range: Range, scalar: number ): Range {

    return new Range( range.min * scalar, range.max * scalar );
  },

  /**
   * Determines whether an array is strictly sorted in ascending order (inclusive).
   *
   */
  isSorted( array: ( CurvePoint )[] ): boolean {
    assert && AssertUtils.assertArrayOf( array, 'number' );

    // Flag that indicates if the array is sorted.
    let isSorted = true;

    CalculusGrapherUtils.forEachAdjacentPair( array, ( value, previousValue ) => {
      if ( isSorted ) {
        // @ts-ignore
        isSorted = ( value >= previousValue );
      }
    } );
    return isSorted;
  },

  /**
   * Determines whether an array is strictly sorted in ascending order (inclusive) by a criterion function that
   * numerically ranks each element of the array. The criterion function is passed each element of the collection.
   *
   */
  isSortedBy( array: ( CurvePoint | null )[], criterion: ( value: CurvePoint | null, index: number, array: ( CurvePoint | null )[] ) => boolean ): boolean {
    assert && assert( Array.isArray( array ), `invalid array: ${array}` );
    assert && assert( typeof criterion === 'function', `invalid criterion: ${criterion}` );

    // @ts-ignore
    return CalculusGrapherUtils.isSorted( array.map( criterion ) );
  }
};

calculusGrapher.register( 'CalculusGrapherUtils', CalculusGrapherUtils );
export default CalculusGrapherUtils;
