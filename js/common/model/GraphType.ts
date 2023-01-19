// Copyright 2022-2023, University of Colorado Boulder

/**
 * Types for identifying the types of graphs available, and sets of those graphs.
 *
 * @author Martin Veillette
 */

import { ProfileColorProperty } from '../../../../scenery/js/imports.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';

// The types of graphs that are available
export const GraphTypeValues = [ 'original', 'integral', 'derivative', 'secondDerivative' ] as const;
export type GraphType = ( typeof GraphTypeValues )[ number ];

// An ordered set of GraphType.
export type GraphSet = GraphType[];

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
