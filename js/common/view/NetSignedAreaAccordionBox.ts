// Copyright 2023, University of Colorado Boulder

/**
 * NetSignedAreaAccordionBox is the accordion box titled 'Net Signed Area'.
 * It displays the barometer for the area-under-curve tool.
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
import AreaUnderCurveScrubber from '../model/AreaUnderCurveScrubber.js';

type SelfOptions = EmptySelfOptions;

type NetSignedAreaAccordionBoxOptions = SelfOptions &
  PickRequired<BarometerAccordionBoxOptions, 'visibleProperty' | 'tandem'>;

export default class NetSignedAreaAccordionBox extends BarometerAccordionBox {

  public constructor( areaUnderCurveScrubber: AreaUnderCurveScrubber, providedOptions: NetSignedAreaAccordionBoxOptions ) {

    // color associated with barometer rectangle: changes according to value of barometer
    const barometerStrokeProperty = new DerivedProperty(
      [ areaUnderCurveScrubber.yIntegralProperty, areaUnderCurveScrubber.positiveFillProperty, areaUnderCurveScrubber.negativeFillProperty ],
      ( y, positiveFill, negativeFill ) => y > 0 ? positiveFill : negativeFill );

    const options = optionize<NetSignedAreaAccordionBoxOptions, SelfOptions, BarometerAccordionBoxOptions>()( {

      // BarometerAccordionBoxOptions
      barometerStrokeProperty: barometerStrokeProperty,
      chartTransformOptions: {
        modelYRange: CalculusGrapherConstants.NET_SIGNED_AREA_MODEL_RANGE
      }
    }, providedOptions );

    super( areaUnderCurveScrubber.yIntegralProperty, CalculusGrapherStrings.barometer.netSignedAreaStringProperty, options );
  }
}

calculusGrapher.register( 'NetSignedAreaAccordionBox', NetSignedAreaAccordionBox );
