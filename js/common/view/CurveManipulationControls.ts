// Copyright 2022-2023, University of Colorado Boulder

/**
 * Curve Manipulation controls that allow the user to manipulate the curve
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import calculusGrapher from '../../calculusGrapher.js';
import { VBox } from '../../../../scenery/js/imports.js';
import CurveManipulationModeRadioButtonGroup from './CurveManipulationModeRadioButtonGroup.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import CurveManipulationProperties from '../model/CurveManipulationProperties.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import CurveManipulationWidthControl from './CurveManipulationWidthControl.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';

export default class CurveManipulationControls extends VBox {

  public constructor( curveManipulationProperties: CurveManipulationProperties,
                      predictEnabledProperty: TReadOnlyProperty<boolean>,
                      tandem: Tandem ) {

    const curveManipulationStrokeProperty = new DerivedProperty( [
        predictEnabledProperty,
        CalculusGrapherColors.predictCurveStrokeProperty,
        CalculusGrapherColors.originalCurveStrokeProperty
      ],
      ( predictEnabled, predictCurveStroke, originalCurveStroke ) =>
        predictEnabled ? predictCurveStroke : originalCurveStroke );

    // Control that shows the width, with slider for modes that support adjustable width.
    const widthControl = new CurveManipulationWidthControl( curveManipulationProperties,
      curveManipulationStrokeProperty, tandem.createTandem( 'widthControl' ) );

    // Radio Buttons for choosing the manipulation mode
    const radioButtonGroup = new CurveManipulationModeRadioButtonGroup( curveManipulationProperties.modeProperty,
      curveManipulationStrokeProperty, tandem.createTandem( 'radioButtonGroup' ) );

    super( {
      children: [ widthControl, radioButtonGroup ],
      spacing: 15,
      tandem: tandem,
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    } );
  }
}

calculusGrapher.register( 'CurveManipulationControls', CurveManipulationControls );
