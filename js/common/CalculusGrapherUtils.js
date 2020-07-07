// Copyright 2020, University of Colorado Boulder

/**
 * CalculusGrapherUtils is a collection of general utility functions used in this sim.
 *
 * @author Brandon Li
 */

import Range from '../../../dot/js/Range.js';
import AssertUtils from '../../../phetcommon/js/AssertUtils.js';
import calculusGrapher from '../calculusGrapher.js';

const CalculusGrapherUtils = {

  /**
   * Iterates through an array in pairs, passing the current value and the previous value to the iterator function.
   * For instance, forEachAdjacentPair( [ 1, 2, 3, 4 ], f ) would invoke f( 2, 1 ), f( 3, 2 ), and f( 4, 3 ).
   * @public
   *
   * @param {*[]} array
   * @param {function(value:*,previousValue:*,index*)} iterator
   */
  forEachAdjacentPair( array, iterator ) {
    assert && assert( Array.isArray( array ), `invalid array: ${array}` );
    assert && assert( typeof iterator === 'function', `invalid iterator: ${iterator}` );

    for ( let i = 1; i < array.length; i++ ) {
      const value = array[ i ];
      const previousValue = array[ i - 1 ];

      iterator( value, previousValue, i );
    }
  },

  /**
   * Gets a Range that is scaled by the desired scalar value. For instance, multiplyRange( new Range( 1, 2 ), 2 ) would
   * return Range( 2, 4 ).
   * @public
   *
   * @param {Range} range - will not be mutated
   * @param {number} scalar - amount to scale the each extreme of the Range
   * @returns {Range}
   */
  multiplyRange( range, scalar ) {
    assert && assert( range instanceof Range, `invalid range: ${range}` );
    assert && assert( typeof scalar === 'number', `invalid scalar: ${scalar}` );

    return new Range( range.min * scalar, range.max * scalar );
  },

  /**
   * Determines whether an array is strictly sorted in ascending order (inclusive).
   * @public
   *
   * @param {number[]} array
   * @returns {boolean}
   */
  isSorted( array ) {
    assert && AssertUtils.assertArrayOf( array, 'number' );

    // Flag that indicates if the array is sorted.
    let isSorted = true;

    CalculusGrapherUtils.forEachAdjacentPair( array, ( value, previousValue ) => {
      if ( isSorted ) {
        isSorted = ( value >= previousValue );
      }
    } );
    return isSorted;
  },

  /**
   * Determines whether an array is strictly sorted in ascending order (inclusive) by a criterion function that
   * numerically ranks each element of the array. The criterion function is passed each element of the collection.
   * @public
   *
   * @param {*[]} array
   * @param {function(value:*):number} criterion
   * @returns {boolean}
   */
  isSortedBy( array, criterion ) {
    assert && assert( Array.isArray( array ), `invalid array: ${array}` );
    assert && assert( typeof criterion === 'function', `invalid criterion: ${criterion}` );

    return CalculusGrapherUtils.isSorted( array.map( criterion ) );
  }
};

calculusGrapher.register( 'CalculusGrapherUtils', CalculusGrapherUtils );
export default CalculusGrapherUtils;