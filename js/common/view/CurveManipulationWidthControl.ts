// Copyright 2023, University of Colorado Boulder

/**
 * CurveManipulationWidthControl is display the width as a curve, with a slider to control the width for
 * manipulation modes that have an adjustable width.
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Color, VBox } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import CurveManipulationDisplayNode from './CurveManipulationDisplayNode.js';
import CurveManipulationWidthSlider from './CurveManipulationWidthSlider.js';
import CurveManipulationProperties from '../model/CurveManipulationProperties.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';

export default class CurveManipulationWidthControl extends VBox {

  public constructor( curveManipulationProperties: CurveManipulationProperties,
                      curveManipulationStrokeProperty: TReadOnlyProperty<Color>,
                      tandem: Tandem ) {

    const curveDisplayNode = new CurveManipulationDisplayNode( curveManipulationProperties,
      curveManipulationStrokeProperty, tandem.createTandem( 'curveDisplayNode' ) );

    const slider = new CurveManipulationWidthSlider( curveManipulationProperties.widthProperty, {
      visibleProperty: new DerivedProperty( [ curveManipulationProperties.modeProperty ],
        mode => mode.hasAdjustableWidth ),
      tandem: tandem.createTandem( 'slider' )
    } );

    super( {
      children: [ curveDisplayNode, slider ],
      spacing: 10,
      excludeInvisibleChildrenFromBounds: false,
      tandem: tandem,
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    } );
  }
}

calculusGrapher.register( 'CurveManipulationWidthControl', CurveManipulationWidthControl );
