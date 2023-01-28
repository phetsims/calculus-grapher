// Copyright 2022-2023, University of Colorado Boulder

/**
 * Curve Manipulation controls that allow the user to manipulate the curve
 *
 * @author Martin Veillette
 */

import calculusGrapher from '../../calculusGrapher.js';
import { VBox } from '../../../../scenery/js/imports.js';
import CurveManipulationModeRadioButtonGroup from './CurveManipulationModeRadioButtonGroup.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import CurveManipulationProperties from '../model/CurveManipulationProperties.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import Property from '../../../../axon/js/Property.js';
import CurveManipulationWidthControl from './CurveManipulationWidthControl.js';
import Tandem from '../../../../tandem/js/Tandem.js';

export default class CurveManipulationControls extends VBox {

  public constructor( curveManipulationProperties: CurveManipulationProperties,
                      predictModeEnabledProperty: Property<boolean>,
                      tandem: Tandem ) {

    const curveManipulationStrokeProperty = new DerivedProperty( [
        predictModeEnabledProperty,
        CalculusGrapherColors.predictCurveStrokeProperty,
        CalculusGrapherColors.originalCurveStrokeProperty
      ],
      ( predictModeEnabled, predictCurveStroke, originalCurveStroke ) =>
        predictModeEnabled ? predictCurveStroke : originalCurveStroke );

    // Control that shows the width, with slider for modes that support adjustable width.
    const widthControl = new CurveManipulationWidthControl( curveManipulationProperties,
      curveManipulationStrokeProperty, tandem.createTandem( 'widthControl' ) );

    // Radio Buttons for choosing the manipulation mode
    const radioButtonGroup = new CurveManipulationModeRadioButtonGroup( curveManipulationProperties.modeProperty,
      curveManipulationStrokeProperty, tandem.createTandem( 'radioButtonGroup' ) );

    super( {
      children: [ widthControl, radioButtonGroup ],
      spacing: 15,
      tandem: tandem
    } );
  }
}

calculusGrapher.register( 'CurveManipulationControls', CurveManipulationControls );
