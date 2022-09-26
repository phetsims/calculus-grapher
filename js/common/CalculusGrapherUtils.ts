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
    ( point: CurvePoint, previousPoint: CurvePoint, index: number ): void;
  } ): void {

    for ( let i = 1; i < array.length; i++ ) {
      const value = array[ i ];
      const previousValue = array[ i - 1 ];

      iterator( value, previousValue, i );
    }
  },

  /**
   * Iterates through an array in trios, passing the previous value, the current value, and the next value, to the iterator function.
   * forEachAdjacentTrio( [ 1, 2, 3, 4, 5 ], f ) would invoke  f( 1, 2, 3 ), f( 2, 3, 4 ), f( 3, 4, 5 )
   */
  forEachAdjacentTrio( array: ( CurvePoint )[],
                       iterator: ( previousPoint: CurvePoint | null, point: CurvePoint, nextPoint: CurvePoint | null, index: number ) => void ): void {

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
