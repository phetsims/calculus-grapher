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
import Property, { PropertyOptions } from '../../../../axon/js/Property.js';
import ArrayIO from '../../../../tandem/js/types/ArrayIO.js';

// Constants
const CURVE_X_RANGE = CalculusGrapherConstants.CURVE_X_RANGE;
const NUMBER_OF_POINTS = CalculusGrapherQueryParameters.numberOfPoints;

// phetioDocumentation for pointsProperty, which varies depending on phetioReadOnly
const DOC_READ_ONLY_TRUE =
  'The discrete points that are used to approximate the curve.<br><br>' +
  'Note that the value of pointsProperty is very large, and it is not intended to be human-readable.' +
  ' To improve performance of the simulation, the "Current Value" shown in Studio is not kept up to date.';
const DOC_READ_ONLY_FALSE =
  DOC_READ_ONLY_TRUE +
  ' Press the "Get Value" button in Studio if you need to get the current value.';

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
  public readonly pointsProperty: Property<CurvePoint[]>;

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
    const initialPoints: CurvePoint[] = [];
    for ( let i = 0; i < this.numberOfPoints; i++ ) {
      const xNormalized = i / ( this.numberOfPoints - 1 ); // in the range [0,1]
      const x = this.xRange.expandNormalizedValue( xNormalized );
      initialPoints.push( new CurvePoint( x, 0 ) );
    }

    const pointPropertyOptions: PropertyOptions<CurvePoint[]> = {
      tandem: options.tandem.createTandem( 'pointsProperty' ),
      phetioValueType: ArrayIO( CurvePoint.CurvePointIO ),
      phetioReadOnly: options.pointsPropertyReadOnly,

      // Excluding derived curves from state is a big performance improvement.
      // See https://github.com/phetsims/calculus-grapher/issues/327#issuecomment-1490428949
      phetioState: !options.pointsPropertyReadOnly,
      phetioFeatured: true,
      phetioDocumentation: options.pointsPropertyReadOnly ? DOC_READ_ONLY_TRUE : DOC_READ_ONLY_FALSE
    };
    if ( options.pointsPropertyReadOnly ) {

      // The array of CurvePoints is not expected to change for derived Curves, because CurvePoints are mutated in place.
      // So there is only 1 valid value, the initialPoints.
      pointPropertyOptions.validValues = [ initialPoints ];
    }
    else {

      // The array of CurvePoints may change via PhET-iO, so verify that the new array is valid.
      pointPropertyOptions.isValidValue = points => isValidPoints( initialPoints, points );
    }

    this.pointsProperty = new Property( initialPoints, pointPropertyOptions );

    // For debugging https://github.com/phetsims/calculus-grapher/issues/327, so we can see which curves
    // have their pointsProperty set when running the State Wrapper.
    phet.log && this.pointsProperty.lazyLink( () => phet.log( `${this.pointsProperty.phetioID} changed` ) );

    // Emits when the Curve has changed in any form. Instead of listening to a yProperty
    // of every CurvePoint, which was deemed invasive to the performance of the sim, we
    // use an Emitter that emits once after all CurvePoints are set upon manipulation.
    // See https://github.com/phetsims/calculus-grapher/issues/19
    this.curveChangedEmitter = new Emitter();
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
