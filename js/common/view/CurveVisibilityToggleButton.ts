// Copyright 2026, University of Colorado Boulder

/**
 * CurveVisibilityToggleButton is the toggle button used to show/hide curves on a graph.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import { combineOptions, EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import EyeToggleButton, { EyeToggleButtonOptions } from '../../../../scenery-phet/js/buttons/EyeToggleButton.js';
import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';

type SelfOptions = EmptySelfOptions;

export type CurveVisibilityToggleButtonOptions = SelfOptions &
  PickRequired<EyeToggleButtonOptions, 'tandem' | 'accessibleNameOn' | 'accessibleNameOff'>;

export default class CurveVisibilityToggleButton extends EyeToggleButton {

  public constructor( curvesVisibleProperty: Property<boolean>, providedOptions: CurveVisibilityToggleButtonOptions ) {

    const options = combineOptions<EyeToggleButtonOptions>( {
      scale: 0.5,
      baseColor: new DerivedProperty( [ curvesVisibleProperty ], visible => visible ? 'white' : PhetColorScheme.BUTTON_YELLOW ),
      touchAreaXDilation: 8,
      touchAreaYDilation: 8,
      accessibleHelpText: CalculusGrapherFluent.a11y.curveVisibilityToggleButton.accessibleHelpTextStringProperty,
      accessibleContextResponseOn: CalculusGrapherFluent.a11y.curveVisibilityToggleButton.accessibleContextResponseOnStringProperty,
      accessibleContextResponseOff: CalculusGrapherFluent.a11y.curveVisibilityToggleButton.accessibleContextResponseOffStringProperty
    }, providedOptions );

    super( curvesVisibleProperty, options );
  }
}

calculusGrapher.register( 'CurveVisibilityToggleButton', CurveVisibilityToggleButton );