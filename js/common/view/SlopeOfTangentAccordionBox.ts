// Copyright 2023-2025, University of Colorado Boulder

/**
 * SlopeOfTangentAccordionBox is the accordion box titled 'Slope Of Tangent'.
 * It displays the barometer for the tangent tool.
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
import TangentScrubber from '../model/TangentScrubber.js';
import BarometerAccordionBox, { BarometerAccordionBoxOptions } from './BarometerAccordionBox.js';

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
      accessibleHelpTextCollapsed: CalculusGrapherFluent.a11y.slopeOfTangentAccordionBox.accessibleHelpTextCollapsedStringProperty,
      accessibleParagraph: CalculusGrapherFluent.a11y.slopeOfTangentAccordionBox.accessibleParagraphStringProperty
    }, providedOptions );

    super( tangentScrubber.derivativeCurvePointProperty, CalculusGrapherFluent.barometer.slopeOfTangentStringProperty,
      tangentScrubber.visibleProperty, predictEnabledProperty, options );
  }
}

calculusGrapher.register( 'SlopeOfTangentAccordionBox', SlopeOfTangentAccordionBox );