// Copyright 2025-2026, University of Colorado Boulder

/**
 * CurveManipulator is the model for a draggable point used to manipulate the original curve.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Property from '../../../../axon/js/Property.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';

// The default position is at the center of the graph.
const DEFAULT_POSITION = new Vector2(
  CalculusGrapherConstants.CURVE_X_RANGE.getCenter(),
  CalculusGrapherConstants.CURVE_MANIPULATION_Y_RANGE.getCenter()
);

export default class CurveManipulator extends PhetioObject {

  // Position of the cursor, in model coordinates.
  public readonly positionProperty: Property<Vector2>;

  // Whether moving the manipulator with the keyboard changes the curve.
  public readonly keyboardCurveManipulationEnabledProperty: Property<boolean>;

  // Whether the associated KeyboardCueNode is visible when the manipulator gets focus.
  public readonly keyboardCueEnabledProperty: Property<boolean>;

  public constructor( tandem: Tandem ) {

    super( {
      isDisposable: false,
      tandem: tandem,
      phetioState: false
    } );

    this.positionProperty = new Vector2Property( DEFAULT_POSITION, {
      tandem: tandem.createTandem( 'positionProperty' ),
      phetioFeatured: true
    } );

    //TODO https://github.com/phetsims/calculus-grapher/issues/125 Which mode should be the default?
    this.keyboardCurveManipulationEnabledProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'keyboardCurveManipulationEnabledProperty' ),
      phetioReadOnly: true,
      phetioDocumentation: 'Whether moving the manipulator with the keyboard changes the curve.'
    } );

    this.keyboardCueEnabledProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'keyboardCueEnabledProperty' ),
      phetioReadOnly: true,
      phetioDocumentation: 'Whether a cue popup will be displayed when the manipulator gets focus.'
    } );
  }

  public reset(): void {
    this.positionProperty.reset();
    this.keyboardCurveManipulationEnabledProperty.reset();
    this.keyboardCueEnabledProperty.reset();
  }
}

calculusGrapher.register( 'CurveManipulator', CurveManipulator );