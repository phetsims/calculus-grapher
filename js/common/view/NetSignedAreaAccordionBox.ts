// Copyright 2023-2025, University of Colorado Boulder

/**
 * NetSignedAreaAccordionBox is the accordion box titled 'Net Signed Area'.
 * It displays the barometer for the area-under-curve tool.
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import { toFixedNumber } from '../../../../dot/js/util/toFixedNumber.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import CalculusGrapherSymbols from '../CalculusGrapherSymbols.js';
import AreaUnderCurveScrubber from '../model/AreaUnderCurveScrubber.js';
import BarometerAccordionBox, { BarometerAccordionBoxOptions } from './BarometerAccordionBox.js';

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
      barNodeAccessibleParagraphStringProperty: CalculusGrapherFluent.a11y.netSignedAreaAccordionBox.accessibleParagraph.createProperty( {
        integralValue: new DerivedProperty( [ areaUnderCurveScrubber.integralCurvePointProperty ],
          integralCurvePoint => toFixedNumber( integralCurvePoint.y, CalculusGrapherConstants.AREA_DESCRIPTION_DECIMALS ) ),
        variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty,
        x: new DerivedProperty( [ areaUnderCurveScrubber.xProperty ], x => toFixedNumber( x, CalculusGrapherConstants.X_DESCRIPTION_DECIMALS ) )
      } )
    }, providedOptions );

    super( areaUnderCurveScrubber.integralCurvePointProperty, CalculusGrapherFluent.barometer.netSignedAreaStringProperty,
      areaUnderCurveScrubber.visibleProperty, predictEnabledProperty, options );
  }
}

calculusGrapher.register( 'NetSignedAreaAccordionBox', NetSignedAreaAccordionBox );