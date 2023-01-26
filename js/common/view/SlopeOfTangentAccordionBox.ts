// Copyright 2023, University of Colorado Boulder

/**
 * SlopeOfTangentAccordionBox is the accordion box titled 'Slope Of Tangent'.
 * It displays the barometer for the tangent tool.
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BarometerAccordionBox, { BarometerAccordionBoxOptions } from './BarometerAccordionBox.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import calculusGrapher from '../../calculusGrapher.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import TangentScrubber from '../model/TangentScrubber.js';

type SelfOptions = EmptySelfOptions;

type SlopeOfTangentAccordionBoxOptions = SelfOptions &
  PickRequired<BarometerAccordionBoxOptions, 'visibleProperty' | 'tandem'>;

export default class SlopeOfTangentAccordionBox extends BarometerAccordionBox {

  public constructor( tangentScrubber: TangentScrubber, providedOptions: SlopeOfTangentAccordionBoxOptions ) {

    const options = optionize<SlopeOfTangentAccordionBoxOptions, SelfOptions, BarometerAccordionBoxOptions>()( {

      // BarometerAccordionBoxOptions
      barometerStrokeProperty: new DerivedProperty( [ tangentScrubber.colorProperty ],
        derivativeCurveStroke => derivativeCurveStroke.withAlpha( 0.6 ) ),
      chartTransformOptions: {
        modelYRange: CalculusGrapherConstants.SLOPE_OF_TANGENT_MODEL_RANGE
      },
      titleTextOptions: {
        maxWidth: 65
      }
    }, providedOptions );

    super( tangentScrubber.yDerivativeProperty, CalculusGrapherStrings.barometer.slopeOfTangentStringProperty, options );
  }
}

calculusGrapher.register( 'SlopeOfTangentAccordionBox', SlopeOfTangentAccordionBox );
