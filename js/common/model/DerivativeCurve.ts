// Copyright 2020-2023, University of Colorado Boulder

/**
 * DerivativeCurve is a Curve sub-type for a curve that represents the derivative of a 'base' curve. It is used
 * as both the first derivative and second derivative of the TransformedCurve.
 *
 * DerivativeCurves' main responsibility is to observe when the 'base' Curve changes and differentiates it and update
 * the Points of the derivative. Derivatives are computed by considering the slope of the secant lines from both sides
 * of every point. For a general background on differentiation, see
 * https://en.wikipedia.org/wiki/Derivative#Rigorous_definition.
 *
 *
 * Like Curve, DerivativeCurve is created at the start and persists for the lifetime of the simulation. Links
 * are left as-is and DerivativeCurves are never disposed.
 *
 * @author Brandon Li
 * @author Martin Veillette
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import Curve from './Curve.js';

export default class DerivativeCurve extends Curve {

  // reference to the 'base' Curve that was passed-in.
  private baseCurve: Curve;

  /**
   * @param baseCurve - the curve to differentiate to get the values of this DerivativeCurve
   * @param tandem
   */
  public constructor( baseCurve: Curve, tandem: Tandem ) {

    super( {

      // CurveOptions
      xRange: baseCurve.xRange,
      numberOfPoints: baseCurve.numberOfPoints,
      tandem: tandem
    } );

    this.baseCurve = baseCurve;

    // Observe when the 'base' Curve changes and update this curve to represent the derivative of the 'base' Curve.
    // Listener is never removed since DerivativeCurves are never disposed.
    baseCurve.curveChangedEmitter.addListener( this.updateDerivative.bind( this ) );

    // Make the initial call to updateDerivative() to match the 'base' Curve upon initialization.
    this.updateDerivative();
  }

  /**
   * Updates the y-values of the DerivativeCurve to represent the derivative of the 'base' Curve.
   *
   * Since each adjacent Point of the base curve is considered to be infinitesimally close to each other, the slope of
   * the secant line between each adjacent Point is considered to be the instantaneous derivative. Our version
   * considers both the slope of the secant lines from the left and right side of every point. See
   * https://en.wikipedia.org/wiki/Derivative#Rigorous_definition
   *
   * Since the 'Calculus Grapher' sim has second derivatives, the 'base' curve could have cusps and/or non-finite
   * points. The algorithm for computing derivatives works by iterating through each Point of the 'base' Curve.
   * Here is the decision tree:
   *
   *   - If the Point of the 'base' curve does not exist:
   *      + The derivative at the corresponding x-value also doesn't exist.
   *
   *   - Otherwise:
   *
   *      + If both the left and right adjacent Points of the Point of the 'base' curve exist:
   *
   *         * If the slope of the secant lines from the left and right side are approximately equal:
   *             - The slope is the average of the slopes.
   *         * Otherwise:
   *             - The derivative doesn't exist
   *
   *      + If only one of the two adjacent Points exists:
   *         * The derivative is the slope of the secant line between the Point and the existing adjacent Point.
   *
   *      + Otherwise:
   *         * Both adjacent Points don't exist, meaning the derivative also doesn't exist.
   */
  private updateDerivative(): void {

    const basePoints = this.baseCurve.points;

    const length = basePoints.length;

    const leftSlopes: ( number | null )[] = [];

    // TODO: consolidate the iterations see #110
    for ( let i = 0; i < length; i++ ) {
      const point = basePoints[ i ];
      const previousPoint = i > 0 ? basePoints[ i - 1 ] : null;

      if ( previousPoint === null || ( point.isDiscontinuous && previousPoint.isDiscontinuous ) ) {
        leftSlopes.push( null );
      }
      else {
        leftSlopes.push( point.getSlope( previousPoint ) );
      }
    }

    const rightSlopes: ( number | null )[] = [];

    for ( let i = 0; i < length; i++ ) {
      const point = basePoints[ i ];
      const nextPoint = i < length - 1 ? basePoints[ i + 1 ] : null;

      if ( nextPoint === null || ( point.isDiscontinuous && nextPoint.isDiscontinuous ) || point.isCusp ) {
        rightSlopes.push( null );
      }
      else {
        rightSlopes.push( point.getSlope( nextPoint ) );
      }
    }

    for ( let index = 0; index < length; index++ ) {
      const leftSlope = leftSlopes[ index ];
      const rightSlope = rightSlopes[ index ];

      if ( typeof leftSlope === 'number' && typeof rightSlope === 'number' ) {
        // If both the left and right adjacent Points of the Point of the 'base' curve exist, the derivative is
        // the average of the slopes if they are approximately equal. Otherwise, the derivative doesn't exist.
        this.points[ index ].y = ( leftSlope + rightSlope ) / 2;
      }
      else if ( typeof leftSlope === 'number' ) {

        // If only the slope of the left side exists, use that as the derivative.
        this.points[ index ].y = leftSlope;
      }
      else if ( typeof rightSlope === 'number' ) {

        // If only the slope of the right side exists, use that as the derivative.
        this.points[ index ].y = rightSlope;
      }
    }

    // Signal once that this Curve has changed.
    this.curveChangedEmitter.emit();
  }
}
calculusGrapher.register( 'DerivativeCurve', DerivativeCurve );
