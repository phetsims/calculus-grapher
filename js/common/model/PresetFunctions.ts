// Copyright 2023, University of Colorado Boulder

/**
 * PresetFunctions contains the complete implementation for CalculusGrapherQueryParameters.presetFunctions query
 * parameter. It includes a set of mathematical functions (presets) and a KeyboardEvent listener for cycling
 * through those presets when the left/right arrow keys are pressed.
 * See https://github.com/phetsims/calculus-grapher/issues/193
 *
 * @author Martin Veillette
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import TransformedCurve from './TransformedCurve.js';

// Convenience constants
const X_RANGE = CalculusGrapherConstants.CURVE_X_RANGE;
const WIDTH = X_RANGE.getLength();
const CENTER_X = X_RANGE.getCenter();
const MIN_X = X_RANGE.min;
const PI = Math.PI;
const A = CalculusGrapherConstants.TYPICAL_Y;

export type MathFunction = ( x: number ) => number;

const MATH_FUNCTIONS: MathFunction[] = [
  x => A * Math.sin( 2 * PI * 5 * x / WIDTH ),
  x => A * Math.sin( 2 * PI * 20 * x / WIDTH ),
  x => A * Math.sin( 2 * PI * 20 * x / WIDTH * Math.sin( 1 / 10 * ( x - CENTER_X ) ** 2 ) ),
  x => A * Math.cos( ( x - CENTER_X ) ** 2 ),
  x => ( 1 / 10 * ( x - CENTER_X ) ** 2 % A ),
  x => A * Math.floor( A / 2 * Math.sin( 2 * PI * 5 * x / WIDTH ) )
];

export type PresetFunction = {
  mathFunction: MathFunction;

  // Optional argument: used to create piecewise function. The math function is
  // evaluated at the xPositions, and the remaining points are interpolated (linearly)
  xPositions?: number[];
};

const PRESET_FUNCTIONS: PresetFunction[] =
  [ { mathFunction: MATH_FUNCTIONS[ 0 ] },
    { mathFunction: MATH_FUNCTIONS[ 0 ], xPositions: createXPositions( 0.25 ) },
    { mathFunction: MATH_FUNCTIONS[ 1 ] },
    { mathFunction: MATH_FUNCTIONS[ 2 ] },
    { mathFunction: MATH_FUNCTIONS[ 3 ] },
    { mathFunction: MATH_FUNCTIONS[ 3 ], xPositions: createXPositions( 1 ) },
    { mathFunction: MATH_FUNCTIONS[ 4 ] },
    { mathFunction: MATH_FUNCTIONS[ 4 ], xPositions: createXPositions( 1 ) },
    { mathFunction: MATH_FUNCTIONS[ 5 ] },
    { mathFunction: MATH_FUNCTIONS[ 5 ], xPositions: createXPositions( 1 ) }
  ];

/**
 * Creates an array of equally-spaced x positions over a curve's X_RANGE.
 */
function createXPositions( spacing: number ): number[] {
  const arrayLength = WIDTH / spacing + 1;
  return Array.from( { length: arrayLength }, ( _, i ) => i * spacing + MIN_X );
}

const PresetFunctions = {

  /**
   * Cycles through preset functions using the left/right arrow keys.
   * @param screenVisibleProperty - so that events are processed only when the associated Screen is visible
   * @param originalCurve
   */
  addKeyboardEventListener( screenVisibleProperty: TReadOnlyProperty<boolean>, originalCurve: TransformedCurve ): void {

    const length = PRESET_FUNCTIONS.length;

    // Index for the presetFunction array
    let index = 0;

    // Adds a keyboard listener to ArrowLeft and ArrowRight
    window.addEventListener( 'keydown', event => {

      // The listener on window is global, but it should only act on this screen
      if ( screenVisibleProperty.value ) {
        const isLeft = event.code === 'ArrowLeft';
        const isRight = event.code === 'ArrowRight';

        // Does not perform any action unless we have the right keys
        if ( isLeft || isRight ) {

          if ( isLeft ) {

            // Decreases index value by one
            index--;
          }
          else if ( isRight ) {

            // Increases index value by one
            index++;
          }

          // Making sure the cycledIndex lies between 0 and length-1, even if index is negative
          const cycledIndex = ( index % length + length ) % length;

          // Applies the math function to the original curve
          originalCurve.applyPresetFunction( PRESET_FUNCTIONS[ cycledIndex ] );
        }
      }
    } );
  }
};

export default PresetFunctions;
