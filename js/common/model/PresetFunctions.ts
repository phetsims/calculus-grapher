// Copyright 2023, University of Colorado Boulder

/**
 * PresetFunctions is a set of mathematical functions used for debugging purposes
 *
 * @author Martin Veillette
 */

import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import CalculusGrapherQueryParameters from '../CalculusGrapherQueryParameters.js';
import { MathFunction } from './Curve.js';

// convenience constants
const X_RANGE = CalculusGrapherConstants.CURVE_X_RANGE;
const WIDTH = X_RANGE.getLength();
const CENTER_X = X_RANGE.getCenter();
const MIN_X = X_RANGE.min;
const PI = Math.PI;
const A = CalculusGrapherConstants.TYPICAL_Y;
const SMALL_X = 0.1;
const SPACING_X = WIDTH / ( CalculusGrapherQueryParameters.numberOfPoints - 1 );

export type PresetFunction = {
  mathFunction: MathFunction;

  // optional argument: used to create piecewise function. The math function is
  // evaluated at the xPositions, and the remaining points are interpolated (linearly)
  xPositions?: number[];
};

const MathFunctions: MathFunction[] =
  [ x => A * Math.sin( 2 * PI * 5 * x / WIDTH ),
    x => A * Math.sin( 2 * PI * 50 * x / WIDTH ),
    x => A / ( ( x - CENTER_X ) ** 2 + SMALL_X ** 2 ),
    x => A * Math.cos( 1 / 10 * ( x - CENTER_X ) ** 2 ),
    x => ( 1 / 10 * ( x - CENTER_X ) ** 2 % A ),
    x => 2 * Math.floor( A / 2 * Math.sin( 2 * PI * 5 * x / WIDTH ) )
  ];

const PresetFunctions: PresetFunction[] =
  [ { mathFunction: MathFunctions[ 0 ] },
    { mathFunction: MathFunctions[ 0 ], xPositions: getSpacedArray( 1 ) },
    { mathFunction: MathFunctions[ 1 ] },
    { mathFunction: MathFunctions[ 2 ] },
    { mathFunction: MathFunctions[ 2 ], xPositions: getSpacedArray( 1 ) },
    { mathFunction: MathFunctions[ 2 ], xPositions: getSpacedArray( 2 ) },
    { mathFunction: MathFunctions[ 3 ] },
    { mathFunction: MathFunctions[ 4 ] },
    { mathFunction: MathFunctions[ 5 ] },
    { mathFunction: MathFunctions[ 5 ], xPositions: getSpacedArray( 1 ) }
  ];

/**
 * Generate an array of number equally spaced over the X_RANGE curve
 */
function getSpacedArray( spacing = SPACING_X ): number[] {
  const arrayLength = WIDTH / spacing + 1;
  return Array.from( { length: arrayLength }, ( _, i ) => i * spacing + MIN_X );
}

calculusGrapher.register( 'PresetFunctions', PresetFunctions );
export default PresetFunctions;
