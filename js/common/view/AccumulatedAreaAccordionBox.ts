// Copyright 2023, University of Colorado Boulder

/**
 * AccumulatedAreaAccordionBox is the accordion box titled 'Accumulated Area'.
 * It displays the barometer for the area-under-curve tool.
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

type AccumulatedAreaAccordionBoxOptions = SelfOptions & NodeTranslationOptions &
  PickRequired<BarometerAccordionBoxOptions, 'visibleProperty' | 'tandem'>;

export default class AccumulatedAreaAccordionBox extends BarometerAccordionBox {

  public constructor( areaUnderCurveTool: AncillaryTool, providedOptions: AccumulatedAreaAccordionBoxOptions ) {

    // value property associated with the barometer
    const barometerYProperty = areaUnderCurveTool.getYProperty( 'integral' );

    // color associated with barometer rectangle: changes according to value of barometer
    const barometerStrokeProperty = new DerivedProperty( [ barometerYProperty,
        CalculusGrapherColors.integralPositiveFillProperty,
        CalculusGrapherColors.integralNegativeFillProperty ],
      ( y, positiveFill, negativeFill ) => y > 0 ? positiveFill : negativeFill );

    const options = optionize<AccumulatedAreaAccordionBoxOptions, SelfOptions, BarometerAccordionBoxOptions>()( {

      // BarometerAccordionBoxOptions
      barometerStrokeProperty: barometerStrokeProperty,
      chartTransformOptions: {
        modelYRange: new Range( -200, 200 )
      }
    }, providedOptions );

    super( areaUnderCurveTool.getYProperty( 'integral' ),
      CalculusGrapherStrings.barometer.accumulatedAreaStringProperty, options );
  }
}

calculusGrapher.register( 'AccumulatedAreaAccordionBox', AccumulatedAreaAccordionBox );