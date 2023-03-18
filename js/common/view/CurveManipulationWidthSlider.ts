// Copyright 2022-2023, University of Colorado Boulder

/**
 * CurveManipulationWidthSlider extends the HSlider class from the Sun library.
 * The purpose of this class is to create a slider that allows the user to adjust
 * the width of a curve in a graph. It creates a slider with major and minor ticks
 * that snap to the closest tick when the user interacts with it.
 *
 * @author Martin Veillette
 */

import HSlider, { HSliderOptions } from '../../../../sun/js/HSlider.js';
import calculusGrapher from '../../calculusGrapher.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Property from '../../../../axon/js/Property.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';

const WIDTH_RANGE = CalculusGrapherConstants.CURVE_MANIPULATION_WIDTH_RANGE;
const NUMBER_OF_TICKS = 9;
assert && assert( NUMBER_OF_TICKS % 2 === 1, 'must have an odd number of ticks for there to be a center tick' );

type SelfOptions = EmptySelfOptions;

type CurveManipulationWidthSliderOptions = SelfOptions & PickRequired<HSliderOptions, 'tandem' | 'visibleProperty'>;

export default class CurveManipulationWidthSlider extends HSlider {

  public constructor( curveManipulationWidthProperty: Property<number>,
                      providedOptions: CurveManipulationWidthSliderOptions ) {

    // an array of numbers corresponding to the positions of the ticks (in model coordinate)
    const tickValues = [ ...Array( NUMBER_OF_TICKS ) ].map( ( x, i ) =>
      WIDTH_RANGE.expandNormalizedValue( i / ( NUMBER_OF_TICKS - 1 ) ) );

    const options = optionize<CurveManipulationWidthSliderOptions, SelfOptions, HSliderOptions>()( {

      // HSliderOptions
      trackSize: new Dimension2( 100, 1 ),
      majorTickLength: 20,
      minorTickLength: 15,
      minorTickLineWidth: 0.5,
      thumbSize: new Dimension2( 15, 30 ),

      // snap to ticks
      constrainValue: ( value: number ) => findClosestTick( tickValues, value )

    }, providedOptions );

    super( curveManipulationWidthProperty, WIDTH_RANGE, options );

    // Major ticks at min, max, and center
    const majorTickValues = [ tickValues[ 0 ], tickValues[ tickValues.length - 1 ], tickValues[ ( tickValues.length - 1 ) / 2 ] ];

    // Add minor ticks, skipping the major ticks.
    tickValues.forEach( tickValue => {
      if ( !majorTickValues.includes( tickValue ) ) {
        this.addMinorTick( tickValue );
      }
    } );

    // Add major ticks.
    majorTickValues.forEach( majorTickValue => this.addMajorTick( majorTickValue ) );
  }
}

// Given a value, will return the tick (in model coordinates) that is the closest to the value.
function findClosestTick( tickValues: number[], value: number ): number {
  tickValues.sort( ( a, b ) => Math.abs( value - a ) - Math.abs( value - b ) );
  return tickValues[ 0 ];
}

calculusGrapher.register( 'CurveManipulationWidthSlider', CurveManipulationWidthSlider );
