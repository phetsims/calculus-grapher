// Copyright 2023, University of Colorado Boulder

/**
 * CurveManipulationWidthControl is display the width as a curve, with a slider to control the width for
 * manipulation modes that have an adjustable width.
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Color, VBox, VBoxOptions } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import CurveManipulationDisplayNode from './CurveManipulationDisplayNode.js';
import CurveManipulationWidthSlider from './CurveManipulationWidthSlider.js';
import CurveManipulationProperties from '../model/CurveManipulationProperties.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';

type SelfOptions = EmptySelfOptions;

type CurveManipulationWidthControlOptions = SelfOptions & PickRequired<VBoxOptions, 'tandem'>;

export default class CurveManipulationWidthControl extends VBox {

  public constructor( curveManipulationProperties: CurveManipulationProperties,
                      curveManipulationStrokeProperty: TReadOnlyProperty<Color>,
                      providedOptions: CurveManipulationWidthControlOptions ) {

    const options = optionize<CurveManipulationWidthControlOptions, SelfOptions, VBoxOptions>()( {

      // VBoxOptions
      spacing: 10,
      excludeInvisibleChildrenFromBounds: false
    }, providedOptions );

    const curveNode = new CurveManipulationDisplayNode(
      curveManipulationProperties,
      curveManipulationStrokeProperty, {
        tandem: options.tandem.createTandem( 'curveNode' )
      } );

    const slider = new CurveManipulationWidthSlider( curveManipulationProperties.widthProperty, {
      visibleProperty: new DerivedProperty( [ curveManipulationProperties.modeProperty ],
        mode => mode.hasAdjustableWidth ),
      tandem: options.tandem.createTandem( 'slider' )
    } );

    options.children = [ curveNode, slider ];

    super( options );
  }
}

calculusGrapher.register( 'CurveManipulationWidthControl', CurveManipulationWidthControl );