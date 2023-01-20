// Copyright 2022-2023, University of Colorado Boulder

/**
 * Control HSlider that allows the user to manipulate the width of the curve mode
 *
 * @author Martin Veillette
 */

import HSlider, { HSliderOptions } from '../../../../sun/js/HSlider.js';
import calculusGrapher from '../../calculusGrapher.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Property from '../../../../axon/js/Property.js';


const WIDTH_RANGE = CalculusGrapherConstants.CURVE_MANIPULATION_WIDTH_RANGE;
const NUMBER_OF_TICKS = 9;

type SelfOptions = EmptySelfOptions;

type CurveManipulationWidthSliderOptions = SelfOptions & HSliderOptions;

export default class CurveManipulationWidthSlider extends HSlider {

  public constructor( curveManipulationWidthProperty: Property<number>,
                      providedOptions?: CurveManipulationWidthSliderOptions ) {

    const options = optionize<CurveManipulationWidthSliderOptions, SelfOptions, HSliderOptions>()( {

      // HSliderOptions
      trackSize: new Dimension2( 100, 1 ),
      majorTickLength: 20,
      minorTickLength: 15,
      thumbSize: new Dimension2( 15, 30 ),

      constrainValue: ( value: number ) => WIDTH_RANGE.constrainValue( value )

    }, providedOptions );

    super( curveManipulationWidthProperty, WIDTH_RANGE, options );

    // exclude the first and last ticks, since they will be major ticks
    for ( let i = 1; i < NUMBER_OF_TICKS - 1; i++ ) {
      super.addMinorTick( WIDTH_RANGE.expandNormalizedValue( i / ( NUMBER_OF_TICKS - 1 ) ) );
    }
    super.addMajorTick( WIDTH_RANGE.min );
    super.addMajorTick( WIDTH_RANGE.max );
    super.addMajorTick( WIDTH_RANGE.getCenter() );
  }
}

calculusGrapher.register( 'CurveManipulationWidthSlider', CurveManipulationWidthSlider );
