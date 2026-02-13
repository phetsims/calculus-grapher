// Copyright 2023-2026, University of Colorado Boulder

/**
 * SlopeOfTangentAccordionBox is the accordion box titled 'Slope Of Tangent'.
 * It displays the barometer for the tangent tool.
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
import TangentScrubber from '../model/TangentScrubber.js';
import BarometerAccordionBox, { BarometerAccordionBoxOptions } from './BarometerAccordionBox.js';

const ACCESSIBLE_STRINGS = CalculusGrapherFluent.a11y.slopeOfTangentAccordionBox;

type SelfOptions = EmptySelfOptions;

type SlopeOfTangentAccordionBoxOptions = SelfOptions & PickRequired<BarometerAccordionBoxOptions, 'tandem'>;

export default class SlopeOfTangentAccordionBox extends BarometerAccordionBox {

  public constructor( tangentScrubber: TangentScrubber,
                      predictEnabledProperty: TReadOnlyProperty<boolean>,
                      providedOptions: SlopeOfTangentAccordionBoxOptions ) {

    const options = optionize<SlopeOfTangentAccordionBoxOptions, SelfOptions, BarometerAccordionBoxOptions>()( {

      // BarometerAccordionBoxOptions
      barColorProperty: new DerivedProperty( [ tangentScrubber.colorProperty ],
        derivativeCurveStroke => derivativeCurveStroke.withAlpha( 0.6 ) ),
      chartTransformOptions: {
        modelYRange: CalculusGrapherConstants.SLOPE_OF_TANGENT_MODEL_RANGE
      },
      accessibleHelpTextCollapsed: ACCESSIBLE_STRINGS.accessibleHelpTextCollapsed.createProperty( {
        variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty
      } ),
      barNodeAccessibleParagraphStringProperty: ACCESSIBLE_STRINGS.accessibleParagraph.createProperty( {
        derivativeValue: new DerivedProperty( [ tangentScrubber.derivativeCurvePointProperty ],
          derivativeCurvePoint => toFixedNumber( derivativeCurvePoint.y, CalculusGrapherConstants.SLOPE_DESCRIPTION_DECIMALS ) ),
        variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty,
        x: new DerivedProperty( [ tangentScrubber.xProperty ], x => toFixedNumber( x, CalculusGrapherConstants.X_DESCRIPTION_DECIMALS ) )
      } )
    }, providedOptions );

    super( tangentScrubber.derivativeCurvePointProperty, CalculusGrapherFluent.barometer.slopeOfTangentStringProperty,
      tangentScrubber.visibleProperty, predictEnabledProperty, options );
  }
}

calculusGrapher.register( 'SlopeOfTangentAccordionBox', SlopeOfTangentAccordionBox );