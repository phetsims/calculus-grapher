// Copyright 2023, University of Colorado Boulder

/**
 * NetSignedAreaAccordionBox is the accordion box titled 'Net Signed Area'.
 * It displays the barometer for the area-under-curve tool.
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BarometerAccordionBox, { BarometerAccordionBoxOptions } from './BarometerAccordionBox.js';
import AncillaryTool from '../model/AncillaryTool.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import calculusGrapher from '../../calculusGrapher.js';
import { NodeTranslationOptions } from '../../../../scenery/js/imports.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';

type SelfOptions = EmptySelfOptions;

type NetSignedAreaAccordionBoxOptions = SelfOptions & NodeTranslationOptions &
  PickRequired<BarometerAccordionBoxOptions, 'visibleProperty' | 'tandem'>;

export default class NetSignedAreaAccordionBox extends BarometerAccordionBox {

  public constructor( areaUnderCurveTool: AncillaryTool, providedOptions: NetSignedAreaAccordionBoxOptions ) {

    // value property associated with the barometer
    const barometerYProperty = areaUnderCurveTool.getYProperty( 'integral' );

    // color associated with barometer rectangle: changes according to value of barometer
    const barometerStrokeProperty = new DerivedProperty( [ barometerYProperty,
        CalculusGrapherColors.integralPositiveFillProperty,
        CalculusGrapherColors.integralNegativeFillProperty ],
      ( y, positiveFill, negativeFill ) => y > 0 ? positiveFill : negativeFill );

    const options = optionize<NetSignedAreaAccordionBoxOptions, SelfOptions, BarometerAccordionBoxOptions>()( {

      // BarometerAccordionBoxOptions
      barometerStrokeProperty: barometerStrokeProperty,
      chartTransformOptions: {
        modelYRange: CalculusGrapherConstants.NET_SIGNED_AREA_MODEL_RANGE
      }
    }, providedOptions );

    super( areaUnderCurveTool.getYProperty( 'integral' ),
      CalculusGrapherStrings.barometer.netSignedAreaStringProperty, options );
  }
}

calculusGrapher.register( 'NetSignedAreaAccordionBox', NetSignedAreaAccordionBox );
