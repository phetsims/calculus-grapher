// Copyright 2022-2023, University of Colorado Boulder

/**
 * Curve Manipulation controls that allow the user to manipulate the curve
 *
 * @author Martin Veillette
 */

import calculusGrapher from '../../calculusGrapher.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import { VBox, VBoxOptions } from '../../../../scenery/js/imports.js';
import CurveManipulationModeRadioButtonGroup from './CurveManipulationModeRadioButtonGroup.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import CurveManipulationProperties from '../model/CurveManipulationProperties.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import Property from '../../../../axon/js/Property.js';
import CurveManipulationWidthControl from './CurveManipulationWidthControl.js';

type SelfOptions = EmptySelfOptions;

type CurveManipulationControlsOptions = SelfOptions & PickRequired<VBoxOptions, 'tandem'> & StrictOmit<VBoxOptions, 'children'>;

export default class CurveManipulationControls extends VBox {

  public constructor( curveManipulationProperties: CurveManipulationProperties,
                      predictModeEnabledProperty: Property<boolean>,
                      providedOptions?: CurveManipulationControlsOptions ) {

    const options = optionize<CurveManipulationControlsOptions, SelfOptions, VBoxOptions>()( {

      // VBoxOptions
      spacing: 15
    }, providedOptions );

    const curveManipulationStrokeProperty = new DerivedProperty( [
        predictModeEnabledProperty,
        CalculusGrapherColors.predictCurveStrokeProperty,
        CalculusGrapherColors.originalCurveStrokeProperty
      ],
      ( predictModeEnabled, predictCurveStroke, originalCurveStroke ) =>
        predictModeEnabled ? predictCurveStroke : originalCurveStroke );

    // Control that shows the width, with slider for modes that support adjustable width.
    const widthControl = new CurveManipulationWidthControl( curveManipulationProperties,
      curveManipulationStrokeProperty, {
        tandem: options.tandem.createTandem( 'widthControl' )
      } );

    // Radio Buttons for choosing the manipulation mode
    const radioButtonGroup = new CurveManipulationModeRadioButtonGroup( curveManipulationProperties.modeProperty,
      curveManipulationStrokeProperty, {
        tandem: options.tandem.createTandem( 'radioButtonGroup' )
      } );

    options.children = [ widthControl, radioButtonGroup ];

    super( options );
  }
}

calculusGrapher.register( 'CurveManipulationControls', CurveManipulationControls );
