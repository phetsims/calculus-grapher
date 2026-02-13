// Copyright 2023-2026, University of Colorado Boulder

/**
 * SlopeOfTangentAccordionBox is the accordion box titled 'Slope Of Tangent'.
 * It displays the barometer for the tangent tool.
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import { toFixedNumber } from '../../../../dot/js/util/toFixedNumber.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import CalculusGrapherSymbols from '../CalculusGrapherSymbols.js';
import TangentScrubber from '../model/TangentScrubber.js';
import BarometerAccordionBox, { BarometerAccordionBoxOptions } from './BarometerAccordionBox.js';

type SelfOptions = EmptySelfOptions;

type SlopeOfTangentAccordionBoxOptions = SelfOptions & PickRequired<BarometerAccordionBoxOptions, 'tandem'>;

export default class SlopeOfTangentAccordionBox extends BarometerAccordionBox {

  public constructor( tangentScrubber: TangentScrubber,
                      predictEnabledProperty: TReadOnlyProperty<boolean>,
                      providedOptions: SlopeOfTangentAccordionBoxOptions ) {

    // _.uniq is needed to prevent duplicate dependencies because FluentPatterns share dependent Properties.
    const accessibleParagraphDependencies = _.uniq( [
      ...CalculusGrapherFluent.a11y.slopeOfTangentAccordionBox.accessibleParagraph.zero.getDependentProperties(),
      ...CalculusGrapherFluent.a11y.slopeOfTangentAccordionBox.accessibleParagraph.positive.getDependentProperties(),
      ...CalculusGrapherFluent.a11y.slopeOfTangentAccordionBox.accessibleParagraph.negative.getDependentProperties(),
      tangentScrubber.derivativeCurvePointProperty,
      CalculusGrapherSymbols.accessibleVariableSymbolProperty
    ] );

    const options = optionize<SlopeOfTangentAccordionBoxOptions, SelfOptions, BarometerAccordionBoxOptions>()( {

      // BarometerAccordionBoxOptions
      barColorProperty: new DerivedProperty( [ tangentScrubber.colorProperty ],
        derivativeCurveStroke => derivativeCurveStroke.withAlpha( 0.6 ) ),
      chartTransformOptions: {
        modelYRange: CalculusGrapherConstants.SLOPE_OF_TANGENT_MODEL_RANGE
      },
      accessibleHelpTextCollapsed: CalculusGrapherFluent.a11y.slopeOfTangentAccordionBox.accessibleHelpTextCollapsed.createProperty( {
        variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty
      } ),
      contentAccessibleParagraph: DerivedStringProperty.deriveAny( accessibleParagraphDependencies,
        () => {
          const variable = CalculusGrapherSymbols.accessibleVariableSymbolProperty.value;
          const derivativePoint = tangentScrubber.derivativeCurvePointProperty.value;
          const x = toFixedNumber( derivativePoint.x, CalculusGrapherConstants.X_DESCRIPTION_DECIMALS );
          const y = toFixedNumber( derivativePoint.y, CalculusGrapherConstants.SLOPE_DESCRIPTION_DECIMALS );

          let string: string;
          if ( y === 0 ) {
            // zero
            string = CalculusGrapherFluent.a11y.slopeOfTangentAccordionBox.accessibleParagraph.zero.format( {
              variable: variable,
              x: x
            } );
          }
          else if ( y > 0 ) {
            // positive
            string = CalculusGrapherFluent.a11y.slopeOfTangentAccordionBox.accessibleParagraph.positive.format( {
              absoluteSlope: Math.abs( y ),
              variable: variable,
              x: x
            } );
          }
          else {
            // negative
            string = CalculusGrapherFluent.a11y.slopeOfTangentAccordionBox.accessibleParagraph.negative.format( {
              absoluteSlope: Math.abs( y ),
              variable: variable,
              x: x
            } );
          }
          return string;
        } )
    }, providedOptions );

    super( tangentScrubber.derivativeCurvePointProperty, CalculusGrapherFluent.barometer.slopeOfTangentStringProperty,
      tangentScrubber.visibleProperty, predictEnabledProperty, options );
  }
}

calculusGrapher.register( 'SlopeOfTangentAccordionBox', SlopeOfTangentAccordionBox );