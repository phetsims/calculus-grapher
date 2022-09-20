// Copyright 2020-2022, University of Colorado Boulder

/**
 * CalculusGrapherUtils is a collection of general utility functions used in this sim.
 *
 * @author Brandon Li
 */

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
  }
};

calculusGrapher.register( 'CalculusGrapherUtils', CalculusGrapherUtils );
export default CalculusGrapherUtils;
