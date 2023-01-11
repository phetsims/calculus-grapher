// Copyright 2022, University of Colorado Boulder

/**
 * Control HSlider that allows the user to manipulate the width of the curve mode
 *
 * @author Martin Veillette
 */

import HSlider, { HSliderOptions } from '../../../../sun/js/HSlider.js';
import calculusGrapher from '../../calculusGrapher.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import Utils from '../../../../dot/js/Utils.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Property from '../../../../axon/js/Property.js';

const WIDTH_RANGE = CalculusGrapherConstants.CURVE_MANIPULATION_WIDTH_RANGE;

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

      // Snap to the nearest whole number.
      constrainValue: ( value: number ) => WIDTH_RANGE.constrainValue( Utils.roundSymmetric( value ) )

    }, providedOptions );

    super( curveManipulationWidthProperty, WIDTH_RANGE, options );

    super.addMajorTick( WIDTH_RANGE.min );
    super.addMajorTick( WIDTH_RANGE.max );
    super.addMajorTick( WIDTH_RANGE.getCenter() );

    for ( let i = 1; i < 9; i++ ) {
      super.addMinorTick( WIDTH_RANGE.min + i * ( WIDTH_RANGE.max - WIDTH_RANGE.min ) / 8 );
    }
  }
}

calculusGrapher.register( 'CurveManipulationWidthSlider', CurveManipulationWidthSlider );
