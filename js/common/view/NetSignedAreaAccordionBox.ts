// Copyright 2023-2026, University of Colorado Boulder

/**
 * NetSignedAreaAccordionBox is the accordion box titled 'Net Signed Area'.
 * It displays the barometer for the area-under-curve tool.
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import CalculusGrapherSymbols from '../CalculusGrapherSymbols.js';
import AreaUnderCurveScrubber from '../model/AreaUnderCurveScrubber.js';
import BarometerAccordionBox, { BarometerAccordionBoxOptions } from './BarometerAccordionBox.js';
import AreaUnderCurveScrubberDescriber from './description/AreaUnderCurveScrubberDescriber.js';

type SelfOptions = EmptySelfOptions;

type NetSignedAreaAccordionBoxOptions = SelfOptions & PickRequired<BarometerAccordionBoxOptions, 'tandem'>;

export default class NetSignedAreaAccordionBox extends BarometerAccordionBox {

  public constructor( areaUnderCurveScrubber: AreaUnderCurveScrubber,
                      predictEnabledProperty: TReadOnlyProperty<boolean>,
                      providedOptions: NetSignedAreaAccordionBoxOptions ) {

    // Color of the vertical bar in the barometer
    const barColorProperty = new DerivedProperty(
      [ areaUnderCurveScrubber.integralCurvePointProperty, areaUnderCurveScrubber.positiveFillProperty, areaUnderCurveScrubber.negativeFillProperty ],
      ( curvePoint, positiveFill, negativeFill ) => ( curvePoint.y > 0 ) ? positiveFill : negativeFill );

    const options = optionize<NetSignedAreaAccordionBoxOptions, SelfOptions, BarometerAccordionBoxOptions>()( {

      // BarometerAccordionBoxOptions
      barColorProperty: barColorProperty,
      chartTransformOptions: {
        modelYRange: CalculusGrapherConstants.NET_SIGNED_AREA_MODEL_RANGE
      },
      accessibleHelpTextCollapsed: CalculusGrapherFluent.a11y.netSignedAreaAccordionBox.accessibleHelpTextCollapsed.createProperty( {
        variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty
      } ),
      contentAccessibleParagraph: AreaUnderCurveScrubberDescriber.getNetSignedAreaAccessibleParagraph( areaUnderCurveScrubber.integralCurvePointProperty )
    }, providedOptions );

    super( areaUnderCurveScrubber.integralCurvePointProperty, CalculusGrapherFluent.barometer.netSignedAreaStringProperty,
      areaUnderCurveScrubber.visibleProperty, predictEnabledProperty, options );
  }
}

calculusGrapher.register( 'NetSignedAreaAccordionBox', NetSignedAreaAccordionBox );