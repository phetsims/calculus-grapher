// Copyright 2022-2023, University of Colorado Boulder

/**
 * Types for identifying the types of graphs available, and sets of those graphs.
 *
 * @author Martin Veillette
 */

import { ProfileColorProperty } from '../../../../scenery/js/imports.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';

// The types of graphs that are available
export type GraphType = 'original' | 'integral' | 'derivative' | 'secondDerivative';

// An ordered set of GraphType.
export type GraphSet = GraphType[];

export const GRAPH_TYPES = new Set<GraphType>( [ 'original', 'integral', 'derivative', 'secondDerivative' ] );

/**
 * Gets the stroke Property for a specific GraphType.
 */
export function getGraphTypeStrokeProperty( graphType: GraphType ): ProfileColorProperty {
  const stroke = ( graphType === 'original' ) ? CalculusGrapherColors.originalCurveStrokeProperty :
         ( graphType === 'integral' ) ? CalculusGrapherColors.integralCurveStrokeProperty :
         ( graphType === 'derivative' ) ? CalculusGrapherColors.derivativeCurveStrokeProperty :
         ( graphType === 'secondDerivative' ) ? CalculusGrapherColors.secondDerivativeCurveStrokeProperty :
         null;
  assert && assert( stroke );
  return stroke!;
}

/**
 * Gets the derivative GraphType of a GraphType
 */
export function getDerivativeOf( graphType: GraphType ): GraphType {
  assert && assert( graphType !== 'secondDerivative', 'second derivative is not handled' );
  const derivativeOfGraphType = graphType === 'integral' ? 'original' :
                                graphType === 'original' ? 'derivative' :
                                graphType === 'derivative' ? 'secondDerivative' :
                                null;
  assert && assert( derivativeOfGraphType );
  return derivativeOfGraphType!;
}

/**
 * Gets the integral GraphType of a GraphType
 */
export function getIntegralOf( graphType: GraphType ): GraphType {
  assert && assert( graphType !== 'integral', 'integral is not handled' );
  const integralOfGraphType = graphType === 'original' ? 'integral' :
                              graphType === 'derivative' ? 'original' :
                              graphType === 'secondDerivative' ? 'derivative' :
                              null;
  assert && assert( integralOfGraphType );
  return integralOfGraphType!;
}
