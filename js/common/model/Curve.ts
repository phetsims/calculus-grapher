// Copyright 2020-2023, University of Colorado Boulder

/**
 * Curve is the base class for a single 'curve' that appears in the 'Calculus Grapher' simulation. It provides
 * functionality that is common to all types of curves, and is intended to be sub-classed for type-specific features.
 *
 * Curves are modeled by segmenting the curve into a finite number of CurvePoints that are close together and map out
 * their y-values to the shape of a function. Adjacent CurvePoints are considered to be infinitesimally close
 * enough for derivative and integral computations and are considered to cover 'every' x-value within its domain.
 *
 * Responsibilities are:
 *   - Create an array of CurvePoints for the Curve.
 *   - Create convenience methods to reference and mutate CurvePoints at a given x-value.
 *   - Provide other convenience methods to set the initial value of the curve points.
 *
 * For the 'Calculus Grapher' sim, the same Curves instances are used throughout the lifetime of the simulation, so no
 * dispose method is necessary. An overview for the class hierarchy of Curves is given in
 * https://github.com/phetsims/calculus-grapher/blob/master/doc/implementation-notes.md
 *
 * @author Brandon Li
 * @author Martin Veillette
 */

import Emitter from '../../../../axon/js/Emitter.js';
import Utils from '../../../../dot/js/Utils.js';
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import CalculusGrapherQueryParameters from '../CalculusGrapherQueryParameters.js';
import CurvePoint from './CurvePoint.js';
import Range from '../../../../dot/js/Range.js';
import optionize from '../../../../phet-core/js/optionize.js';
import Property from '../../../../axon/js/Property.js';
import ArrayIO from '../../../../tandem/js/types/ArrayIO.js';
import Tandem from '../../../../tandem/js/Tandem.js';

// Constants
const CURVE_X_RANGE = CalculusGrapherConstants.CURVE_X_RANGE;
const NUMBER_OF_POINTS = CalculusGrapherQueryParameters.numberOfPoints;

type SelfOptions = {

  // Range of the x-axis
  xRange?: Range;

  // Number of points (evenly-spaced along the x-axis) that will be used to approximate the curve
  numberOfPoints?: number;

  // For PhET-IO, is pointsProperty read-only?
  pointsPropertyReadOnly?: boolean;
};

export type CurveOptions = SelfOptions & PhetioObjectOptions;

export default class Curve extends PhetioObject {

  // The collection of points that describe the curve. This is an array of CurvePoint instances that are typically
  // mutated in place, so that we have acceptable performance. If Curve was instantiated with pointsPropertyReadOnly:false,
  // then it is possible to set pointsProperty via PhET-iO.
  private readonly pointsProperty: Property<CurvePoint[]>;

  // Using an observable Property for the y-value was considered, but it was deemed to be
  // invasive to the performance of the simulation as observers had to listen to the yProperty
  // of all CurvePoints. See https://github.com/phetsims/calculus-grapher/issues/19
  public readonly curveChangedEmitter: Emitter;

  // Range of the x-axis
  public readonly xRange: Range;

  // Number of points (evenly-spaced along the x-axis) that will be used to approximate the curve
  public readonly numberOfPoints: number;

  // Delta between x coordinate values
  protected readonly deltaX: number;

  protected constructor( providedOptions: CurveOptions ) {

    const options = optionize<CurveOptions, SelfOptions, PhetioObjectOptions>()( {

      // SelfOptions
      xRange: CURVE_X_RANGE,
      numberOfPoints: NUMBER_OF_POINTS,

      // PhetioObjectOptions
      phetioState: false,
      pointsPropertyReadOnly: true
    }, providedOptions );

    super( options );

    this.xRange = options.xRange;
    this.numberOfPoints = options.numberOfPoints;
    this.deltaX = this.xRange.getLength() / ( this.numberOfPoints - 1 );

    // Initial points, with equally-spaced x values, and y=0.
    // These CurvePoint instances are reused throughout the lifetime of the sim, and never disposed.
    const initialPoints: CurvePoint[] = [];
    for ( let i = 0; i < this.numberOfPoints; i++ ) {
      const xNormalized = i / ( this.numberOfPoints - 1 ); // in the range [0,1]
      const x = this.xRange.expandNormalizedValue( xNormalized );
      initialPoints.push( new CurvePoint( x, 0 ) );
    }

    this.pointsProperty = new Property( initialPoints, {
      isValidValue: points => isValidPoints( initialPoints, points ),
      tandem: options.tandem.createTandem( 'pointsProperty' ),
      phetioValueType: ArrayIO( CurvePoint.CurvePointIO ),
      phetioReadOnly: options.pointsPropertyReadOnly,
      phetioFeatured: true,
      phetioDocumentation: 'The discrete points that are used to approximate the curve.'
    } );

    // Emits when the Curve has changed in any form. Instead of listening to a yProperty
    // of every CurvePoint, which was deemed invasive to the performance of the sim, we
    // use an Emitter that emits once after all CurvePoints are set upon manipulation.
    // See https://github.com/phetsims/calculus-grapher/issues/19
    this.curveChangedEmitter = new Emitter();

    // This section of code is specific to PhET-iO, and has a slight performance penalty that we do not want to impose
    // on the PhET brand. See https://github.com/phetsims/calculus-grapher/issues/90 and https://github.com/phetsims/calculus-grapher/issues/278
    if ( Tandem.PHET_IO_ENABLED ) {

      // Use this to short-circuit reentrant behavior where curveChangedEmitter and pointsProperty listeners (below)
      // call each other.
      let notifyListeners = true;

      // For interactive and derived Curves, we mutate CurvePoints. The value of pointsProperty therefore does not change
      // unless set via PhET-iO for a Curve instantiated with pointsPropertyReadOnly:false. So when the sim is changing
      // the curve (either by the user manipulating a curve, or the sim deriving a curve), this is needed to notify
      // Studio that pointsProperty has effectively changed.
      this.curveChangedEmitter.addListener( () => {
        if ( notifyListeners ) {
          this.pointsProperty.notifyListenersStatic();
        }
      } );

      // For Curve instances created with pointsPropertyReadOnly:false, pointsProperty may be set via PhET-iO. If that
      // happens, notify listeners. Guard against pointsProperty's listener and curveChangedEmitter calling each other.
      if ( !options.pointsPropertyReadOnly ) {
        this.pointsProperty.lazyLink( ( newPoints, oldPoints ) => {
          if ( newPoints !== oldPoints ) {
            notifyListeners = false;
            this.curveChangedEmitter.emit();
            notifyListeners = true;
          }
        } );
      }
    }
  }

  /**
   * Since pointsProperty is private, use this method to access the points. It is expected that callers will mutate
   * these points; do not add/remove points. If you mutate these points, be certain that they conform to function
   * isValidPoints, and call curveChangedEmitter.emit() after you have finished mutating.
   */
  public get points(): CurvePoint[] {
    return this.pointsProperty.value;
  }

  /**
   * Gets the CurvePoint whose x-value is closest to the given x-value.
   */
  public getClosestPointAt( x: number ): CurvePoint {
    assert && assert( Number.isFinite( x ), `invalid x: ${x}` );

    return this.points[ this.getClosestIndexAt( x ) ];
  }

  /**
   * Gets the index associated with this point.
   */
  protected getIndex( point: CurvePoint ): number {
    const normalizedValue = this.xRange.getNormalizedValue( point.x );
    return Utils.roundSymmetric( normalizedValue * ( this.numberOfPoints - 1 ) );
  }

  /**
   * Gets the index of the array whose x-value is closest to the given x-value.
   */
  protected getClosestIndexAt( x: number ): number {
    assert && assert( Number.isFinite( x ), `invalid x: ${x}` );

    const normalizedValue = this.xRange.getNormalizedValue( x );

    const index = Utils.roundSymmetric( normalizedValue * ( this.numberOfPoints - 1 ) );

    // Clamp the index to a point inside our range.
    return Utils.clamp( index, 0, this.points.length - 1 );
  }
}

/**
 * Determines whether a new set of points is valid.
 */
function isValidPoints( initialPoints: CurvePoint[], points: CurvePoint[] ): boolean {

  // The number of points must be the same.
  let isValid = ( initialPoints.length === points.length );

  // All x coordinates must be the same.
  for ( let i = 0; i < initialPoints.length && isValid; i++ ) {
    isValid = ( initialPoints[ i ].x === points[ i ].x );
  }
  return isValid;
}

calculusGrapher.register( 'Curve', Curve );
