// Copyright 2022-2023, University of Colorado Boulder

/**
 * Curve Manipulation controls that allow the user to manipulate the curve
 *
 * @author Martin Veillette
 */

import calculusGrapher from '../../calculusGrapher.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import CurveManipulationMode from '../model/CurveManipulationMode.js';
import { VBox, VBoxOptions } from '../../../../scenery/js/imports.js';
import CurveManipulationWidthSlider from './CurveManipulationWidthSlider.js';
import CurveManipulationDisplayNode from './CurveManipulationDisplayNode.js';
import CurveManipulationModeRadioButtonGroup from './CurveManipulationModeRadioButtonGroup.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import CurveManipulationProperties from '../model/CurveManipulationProperties.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import Property from '../../../../axon/js/Property.js';

// curve manipulation modes that should not display a curve manipulation width slider
const NO_SLIDER_MODES = [ CurveManipulationMode.TILT, CurveManipulationMode.SHIFT, CurveManipulationMode.FREEFORM ];

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

    // destructure the properties of curveManipulationProperties for convenience
    const { modeProperty, widthProperty } = curveManipulationProperties;

    const curveManipulationStrokeProperty = new DerivedProperty( [
        predictModeEnabledProperty,
        CalculusGrapherColors.predictCurveStrokeProperty,
        CalculusGrapherColors.originalCurveStrokeProperty
      ],
      ( predictModeEnabled, predictCurveStroke, originalCurveStroke ) =>
        predictModeEnabled ? predictCurveStroke : originalCurveStroke );

    const widthControlTandem = options.tandem.createTandem( 'widthControl' );

    const curveNode = new CurveManipulationDisplayNode(
      curveManipulationProperties,
      curveManipulationStrokeProperty, {
        tandem: widthControlTandem.createTandem( 'curveNode' )
      } );

    const slider = new CurveManipulationWidthSlider( widthProperty, {
      visibleProperty: new DerivedProperty( [ modeProperty ], mode => !NO_SLIDER_MODES.includes( mode ) ),
      tandem: widthControlTandem.createTandem( 'slider' )
    } );

    const widthControl = new VBox( {
      children: [ curveNode, slider ],
      spacing: 10,
      excludeInvisibleChildrenFromBounds: false,
      tandem: widthControlTandem
    } );

    // Radio Buttons that control the curveManipulationModeProperty.
    const radioButtonGroup = new CurveManipulationModeRadioButtonGroup( modeProperty, curveManipulationStrokeProperty, {
      tandem: options.tandem.createTandem( 'radioButtonGroup' )
    } );

    options.children = [ widthControl, radioButtonGroup ];

    super( options );
  }
}

calculusGrapher.register( 'CurveManipulationControls', CurveManipulationControls );
