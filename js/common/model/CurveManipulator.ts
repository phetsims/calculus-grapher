// Copyright 2025-2026, University of Colorado Boulder

/**
 * CurveManipulator is the model for a draggable point used to manipulate the primary curve.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Property from '../../../../axon/js/Property.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import TColor from '../../../../scenery/js/util/TColor.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';

// The default position is at the center of the graph.
const DEFAULT_POSITION = new Vector2(
  CalculusGrapherConstants.CURVE_X_RANGE.getCenter(),
  CalculusGrapherConstants.CURVE_MANIPULATION_Y_RANGE.getCenter()
);

const CurveManipulatorKeyboardModeValues = [ 'grabbed', 'released' ] as const;
export type CurveManipulatorKeyboardMode = ( typeof CurveManipulatorKeyboardModeValues )[number];

type SelfOptions = EmptySelfOptions;

type CurveManipulatorOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem' | 'phetioDocumentation'>;

export default class CurveManipulator extends PhetioObject {

  // Color of the manipulator, color coded to a curve.
  public readonly color: TColor;

  // Position, in model coordinates.
  public readonly positionProperty: Property<Vector2>;

  // Whether moving the manipulator with the keyboard changes the curve.
  public readonly keyboardModeProperty: StringUnionProperty<CurveManipulatorKeyboardMode>;

  // Whether a cue popup will be displayed when the manipulator gets keyboard focus. This cue is per instance
  // instead of global because different instances have different colors and there are other tools that look
  // similar to manipulators.
  public readonly keyboardCueEnabledProperty: Property<boolean>;

  // Whether this manipulator has been moved. Used to show cueing arrows until the manipulator is moved.
  public readonly wasMovedProperty: Property<boolean>;

  public constructor( color: TColor, providedOptions: CurveManipulatorOptions ) {

    const options = optionize<CurveManipulatorOptions, SelfOptions, PhetioObjectOptions>()( {
      isDisposable: false,
      phetioState: false
    }, providedOptions );

    super( options );

    this.color = color;

    this.positionProperty = new Vector2Property( DEFAULT_POSITION, {
      tandem: options.tandem.createTandem( 'positionProperty' ),
      phetioFeatured: true,
      phetioDocumentation: 'Position of the manipulator. If you set the position, make sure it is inside the bounds of the graph.'
    } );

    this.keyboardModeProperty = new StringUnionProperty( 'released', {
      validValues: CurveManipulatorKeyboardModeValues,
      tandem: options.tandem.createTandem( 'keyboardModeProperty' ),
      phetioReadOnly: true,
      phetioDocumentation: 'Whether moving the manipulator with the keyboard changes the curve (grabbed) or just moves the manipulator (released).'
    } );

    this.keyboardCueEnabledProperty = new BooleanProperty( true, {
      tandem: options.tandem.createTandem( 'keyboardCueEnabledProperty' ),
      phetioReadOnly: true,
      phetioDocumentation: 'Whether a cue popup will be displayed when the manipulator gets keyboard focus.'
    } );

    this.wasMovedProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'wasMovedProperty' ),
      phetioReadOnly: true,
      phetioDocumentation: 'Whether this manipulator has been moved.'
    } );

    // TODO REVIEW: This position parameter is not used. https://github.com/phetsims/calculus-grapher/issues/366
    this.positionProperty.lazyLink( position => {
      if ( !isSettingPhetioStateProperty.value ) {
        this.wasMovedProperty.value = true;
      }
    } );
  }

  public reset(): void {
    this.positionProperty.reset();
    this.keyboardModeProperty.reset();
    this.keyboardCueEnabledProperty.reset();
    this.wasMovedProperty.reset();
  }
}

calculusGrapher.register( 'CurveManipulator', CurveManipulator );