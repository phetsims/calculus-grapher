// Copyright 2022, University of Colorado Boulder

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

export type CurveManipulationControlsOptions = SelfOptions & PickRequired<VBoxOptions, 'tandem'> & StrictOmit<VBoxOptions, 'children'>;

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
      ( enabled, predictStroke, originalStroke ) =>
        enabled ? predictStroke : originalStroke );

    const displayNode = new CurveManipulationDisplayNode(
      curveManipulationProperties,
      curveManipulationStrokeProperty, {
        tandem: options.tandem.createTandem( 'displayNode' )
      } );

    const widthSlider = new CurveManipulationWidthSlider( widthProperty, {
      visibleProperty: new DerivedProperty( [ modeProperty ], mode => !NO_SLIDER_MODES.includes( mode ) ),
      tandem: options.tandem.createTandem( 'widthSlider' )
    } );

    const displayAndSlider = new VBox( {
      children: [ displayNode, widthSlider ],
      spacing: 10,
      excludeInvisibleChildrenFromBounds: false
    } );

    // Radio Buttons that control the curveManipulationModeProperty.
    const radioButtonGroup = new CurveManipulationModeRadioButtonGroup( modeProperty, curveManipulationStrokeProperty, {
      tandem: options.tandem.createTandem( 'radioButtonGroup' )
    } );

    options.children = [ displayAndSlider, radioButtonGroup ];

    super( options );
  }
}

calculusGrapher.register( 'CurveManipulationControls', CurveManipulationControls );
