// Copyright 2022, University of Colorado Boulder

/**
 * Curve Manipulation controls that allow the user to manipulate the curve
 *
 * @author Martin Veillette
 */

import calculusGrapher from '../../calculusGrapher.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import CurveManipulationMode from '../model/CurveManipulationMode.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import { Node, NodeOptions } from '../../../../scenery/js/imports.js';
import CurveManipulationWidthSlider from './CurveManipulationWidthSlider.js';
import CurveManipulationDisplayNode from './CurveManipulationDisplayNode.js';
import CurveManipulationModeRadioButtonGroup, { CurveManipulationModeRadioButtonGroupOptions } from './CurveManipulationModeRadioButtonGroup.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import Property from '../../../../axon/js/Property.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';

// curve manipulation modes that should not display a curve manipulation width slider
const NO_SLIDER_MODES = [ CurveManipulationMode.TILT, CurveManipulationMode.SHIFT, CurveManipulationMode.FREEFORM ];

type SelfOptions = {
  curveManipulationModeRadioButtonGroupOptions?: CurveManipulationModeRadioButtonGroupOptions;
};

export type CurveManipulationControlsOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'>;

export default class CurveManipulationControls extends Node {

  public constructor( widthProperty: Property<number>,
                      modeProperty: EnumerationProperty<CurveManipulationMode>,
                      providedOptions?: CurveManipulationControlsOptions ) {

    const options = optionize<CurveManipulationControlsOptions, SelfOptions, NodeOptions>()( {

      curveManipulationModeRadioButtonGroupOptions: {
        spacing: 3,
        radioButtonOptions: {
          baseColor: CalculusGrapherColors.panelFillProperty
        }
      }
    }, providedOptions );

    const curveManipulationDisplayNode = new CurveManipulationDisplayNode(
      widthProperty,
      modeProperty, {
        tandem: options.tandem.createTandem( 'displayNode' )
      } );

    const curveManipulationWidthSlider = new CurveManipulationWidthSlider(
      widthProperty,
      {
        visibleProperty: new DerivedProperty( [ modeProperty ], mode => !NO_SLIDER_MODES.includes( mode ) ),
        top: curveManipulationDisplayNode.bottom + 10,
        centerX: curveManipulationDisplayNode.centerX,
        tandem: options.tandem.createTandem( 'curveManipulationSlider' )
      } );

    // Radio Buttons that control the curveManipulationModeProperty.
    const curveManipulationModeRadioButtonGroup = new CurveManipulationModeRadioButtonGroup(
      modeProperty, combineOptions<CurveManipulationModeRadioButtonGroupOptions>( {
          top: curveManipulationDisplayNode.bottom + 20 + curveManipulationWidthSlider.height,
          centerX: curveManipulationDisplayNode.centerX,
          tandem: options.tandem.createTandem( 'curveManipulationModeRadioButtonGroup' )
        },
        options.curveManipulationModeRadioButtonGroupOptions
      ) );

    options.children = [ curveManipulationDisplayNode, curveManipulationWidthSlider, curveManipulationModeRadioButtonGroup ];

    super( options );

  }
}

calculusGrapher.register( 'CurveManipulationControls', CurveManipulationControls );
