// Copyright 2022, University of Colorado Boulder

/**
 * Types for identifying the types of graphs available, and sets of those graphs.
 *
 * @author Martin Veillette
 */

import { TColor } from '../../../../scenery/js/imports.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';

// The types of graphs that are available
export type GraphType = 'original' | 'integral' | 'derivative' | 'secondDerivative';

// An ordered set of GraphType.
export type GraphSet = GraphType[];

export const GRAPH_TYPES = new Set<GraphType>( [ 'original', 'integral', 'derivative', 'secondDerivative' ] );

/**
 * Gets the stroke for a specific GraphType.
 */
export function getGraphTypeStroke( graphType: GraphType ): TColor {
  return ( graphType === 'original' ) ? CalculusGrapherColors.originalCurveStrokeProperty :
         ( graphType === 'integral' ) ? CalculusGrapherColors.integralCurveStrokeProperty :
         ( graphType === 'derivative' ) ? CalculusGrapherColors.derivativeCurveStrokeProperty :
         ( graphType === 'secondDerivative' ) ? CalculusGrapherColors.secondDerivativeCurveStrokeProperty :
         null;
}

/**
 * Gets the derivative GraphType of a GraphType
 */
export function getDerivativeOf( graphType: GraphType ): GraphType {
  assert && assert( graphType !== 'secondDerivative', 'second derivative is not handled' );
  return ( graphType === 'original' ) ? 'derivative' :
         ( graphType === 'integral' ) ? 'original' :
         ( graphType === 'derivative' ) ? 'secondDerivative' : null!;
}

/**
 * Gets the integral GraphType of a GraphType
 */
export function getIntegralOf( graphType: GraphType ): GraphType {
  assert && assert( graphType !== 'integral', 'integral is not handled' );
  return ( graphType === 'original' ) ? 'integral' :
         ( graphType === 'derivative' ) ? 'original' :
         ( graphType === 'secondDerivative' ) ? 'derivative' : null!;
}
