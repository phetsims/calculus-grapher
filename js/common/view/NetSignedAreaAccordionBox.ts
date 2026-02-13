// Copyright 2023-2026, University of Colorado Boulder

/**
 * NetSignedAreaAccordionBox is the accordion box titled 'Net Signed Area'.
 * It displays the barometer for the area-under-curve tool.
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import { toFixed } from '../../../../dot/js/util/toFixed.js';
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

    // _.uniq is needed to prevent duplicate dependencies because FluentPatterns share dependent Properties.
    const accessibleParagraphDependencies = _.uniq( [
      ...CalculusGrapherFluent.a11y.netSignedAreaAccordionBox.accessibleParagraph.zero.getDependentProperties(),
      ...CalculusGrapherFluent.a11y.netSignedAreaAccordionBox.accessibleParagraph.positive.getDependentProperties(),
      ...CalculusGrapherFluent.a11y.netSignedAreaAccordionBox.accessibleParagraph.negative.getDependentProperties(),
      areaUnderCurveScrubber.integralCurvePointProperty,
      CalculusGrapherSymbols.accessibleVariableSymbolProperty
    ] );

    const options = optionize<NetSignedAreaAccordionBoxOptions, SelfOptions, BarometerAccordionBoxOptions>()( {

      // BarometerAccordionBoxOptions
      barColorProperty: barColorProperty,
      chartTransformOptions: {
        modelYRange: CalculusGrapherConstants.NET_SIGNED_AREA_MODEL_RANGE
      },
      accessibleHelpTextCollapsed: CalculusGrapherFluent.a11y.netSignedAreaAccordionBox.accessibleHelpTextCollapsed.createProperty( {
        variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty
      } ),
      contentAccessibleParagraph: DerivedStringProperty.deriveAny( accessibleParagraphDependencies,
        () => {
          const variable = CalculusGrapherSymbols.accessibleVariableSymbolProperty.value;
          const integralPoint = areaUnderCurveScrubber.integralCurvePointProperty.value;
          const x = toFixed( integralPoint.x, CalculusGrapherConstants.X_DESCRIPTION_DECIMALS );
          const y = toFixedNumber( integralPoint.y, CalculusGrapherConstants.AREA_DESCRIPTION_DECIMALS );

          let string: string;
          if ( y === 0 ) {
            // zero
            string = CalculusGrapherFluent.a11y.netSignedAreaAccordionBox.accessibleParagraph.zero.format( {
              variable: variable,
              x: x
            } );
          }
          else if ( y > 0 ) {
            // positive
            string = CalculusGrapherFluent.a11y.netSignedAreaAccordionBox.accessibleParagraph.positive.format( {
              absoluteValue: Math.abs( y ),
              variable: variable,
              x: x
            } );
          }
          else {
            // negative
            string = CalculusGrapherFluent.a11y.netSignedAreaAccordionBox.accessibleParagraph.negative.format( {
              absoluteValue: Math.abs( y ),
              variable: variable,
              x: x
            } );
          }
          return string;
        } )
    }, providedOptions );

    super( areaUnderCurveScrubber.integralCurvePointProperty, CalculusGrapherFluent.barometer.netSignedAreaStringProperty,
      areaUnderCurveScrubber.visibleProperty, predictEnabledProperty, options );
  }
}

calculusGrapher.register( 'NetSignedAreaAccordionBox', NetSignedAreaAccordionBox );