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
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import TColor from '../../../../scenery/js/util/TColor.js';
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';

// The default position is at the center of the graph.
const DEFAULT_POSITION = new Vector2(
  CalculusGrapherConstants.CURVE_X_RANGE.getCenter(),
  CalculusGrapherConstants.CURVE_MANIPULATION_Y_RANGE.getCenter()
);

type SelfOptions = EmptySelfOptions;

type CurveManipulatorOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem' | 'phetioDocumentation'>;

export default class CurveManipulator extends PhetioObject {

  // Color of the manipulator, color coded to a curve.
  public readonly color: TColor;

  // Position, in model coordinates.
  public readonly positionProperty: Property<Vector2>;

  // Whether moving the manipulator with the keyboard changes the curve.
  public readonly keyboardEditEnabledProperty: Property<boolean>;

  // Whether a cue popup will be displayed when the manipulator gets keyboard focus. This cue is per instance
  // instead of global because different instances have different colors and there are other tools that look
  // similar to manipulators.
  public readonly keyboardCueEnabledProperty: Property<boolean>;

  public constructor( color: TColor, providedOptions: CurveManipulatorOptions ) {

    const options = optionize<CurveManipulatorOptions, SelfOptions, PhetioObjectOptions>()( {
      isDisposable: false,
      phetioState: false
    }, providedOptions );

    super( options );

    this.color = color;

    this.positionProperty = new Vector2Property( DEFAULT_POSITION, {
      tandem: options.tandem.createTandem( 'positionProperty' ),
      phetioFeatured: true
    } );

    this.keyboardEditEnabledProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'keyboardEditEnabledProperty' ),
      phetioReadOnly: true,
      phetioDocumentation: 'Whether moving the manipulator with the keyboard changes the curve.'
    } );

    this.keyboardCueEnabledProperty = new BooleanProperty( true, {
      tandem: options.tandem.createTandem( 'keyboardCueEnabledProperty' ),
      phetioReadOnly: true,
      phetioDocumentation: 'Whether a cue popup will be displayed when the manipulator gets keyboard focus.'
    } );
  }

  public reset(): void {
    this.positionProperty.reset();
    this.keyboardEditEnabledProperty.reset();
    this.keyboardCueEnabledProperty.reset();
  }
}

calculusGrapher.register( 'CurveManipulator', CurveManipulator );