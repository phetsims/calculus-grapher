// Copyright 2023, University of Colorado Boulder

/**
 * SlopeOfTangentAccordionBox is the accordion box titled 'Slope Of Tangent'.
 * It displays the barometer for the tangent tool.
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Range from '../../../../dot/js/Range.js';
import BarometerAccordionBox, { BarometerAccordionBoxOptions } from './BarometerAccordionBox.js';
import AncillaryTool from '../model/AncillaryTool.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import calculusGrapher from '../../calculusGrapher.js';
import { NodeTranslationOptions } from '../../../../scenery/js/imports.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';

type SelfOptions = EmptySelfOptions;

type SlopeOfTangentAccordionBoxOptions = SelfOptions & NodeTranslationOptions &
  PickRequired<BarometerAccordionBoxOptions, 'visibleProperty' | 'tandem'>;

export default class SlopeOfTangentAccordionBox extends BarometerAccordionBox {

  public constructor( tangentTool: AncillaryTool, providedOptions: SlopeOfTangentAccordionBoxOptions ) {

    const options = optionize<SlopeOfTangentAccordionBoxOptions, SelfOptions, BarometerAccordionBoxOptions>()( {

      // BarometerAccordionBoxOptions
      barometerStrokeProperty: new DerivedProperty( [ CalculusGrapherColors.derivativeCurveStrokeProperty ],
        derivativeCurveStroke => derivativeCurveStroke.withAlpha( 0.6 ) ),
      chartTransformOptions: {
        modelYRange: new Range( -10, 10 )
      }
    }, providedOptions );

    super( tangentTool.getYProperty( 'derivative' ),
      CalculusGrapherStrings.barometer.slopeOfTangentStringProperty, options );
  }
}

calculusGrapher.register( 'SlopeOfTangentAccordionBox', SlopeOfTangentAccordionBox );