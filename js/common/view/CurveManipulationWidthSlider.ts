// Copyright 2022, University of Colorado Boulder

/**
 * Control HSlider at the middle-right of each screen that allows the user to manipulate certain Properties of
 * the simulation.
 *
 * @author Martin Veillette
 */

import HSlider, { HSliderOptions } from '../../../../sun/js/HSlider.js';
import calculusGrapher from '../../calculusGrapher.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import Utils from '../../../../dot/js/Utils.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';

const WIDTH_RANGE = CalculusGrapherConstants.CURVE_MANIPULATION_WIDTH_RANGE;


type SelfOptions = EmptySelfOptions;

type CurveManipulationWidthSliderOptions = SelfOptions & HSliderOptions;

export default class CurveManipulationWidthSlider extends HSlider {

  public constructor( curveManipulationWidthProperty: NumberProperty, provideOptions?: CurveManipulationWidthSliderOptions ) {

    const options = optionize<CurveManipulationWidthSliderOptions, SelfOptions, HSliderOptions>()( {

      trackSize: new Dimension2( 100, 1 ),

      // Snap to the nearest whole number.
      constrainValue: ( value: number ) => WIDTH_RANGE.constrainValue( Utils.roundSymmetric( value ) )
      // super-class options
    }, provideOptions );


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