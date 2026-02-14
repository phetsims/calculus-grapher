// Copyright 2020-2026, University of Colorado Boulder

/**
 * DerivativeCurve is a Curve subclass for a curve that represents the derivative of a Curve. It is used
 * to evaluate the first derivative of the primary curve.
 *
 * DerivativeCurves' main responsibility is to observe when the primary curve changes and differentiates it and update
 * the Points of the derivative. Derivatives are computed by considering the slope of the secant lines from both sides
 * of every point. For a general background on differentiation, see
 * https://en.wikipedia.org/wiki/Derivative#Rigorous_definition.
 *
 * Like Curve, DerivativeCurve is created at the start and persists for the lifetime of the simulation. Links
 * are left as-is since instances of DerivativeCurve are never disposed.
 *
 * @author Brandon Li
 * @author Martin Veillette
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import Curve from './Curve.js';
import PrimaryCurve from './PrimaryCurve.js';

export default class DerivativeCurve extends Curve {

  // Reference to the primaryCurve that was passed-in.
  private readonly primaryCurve: PrimaryCurve;

  /**
   * @param primaryCurve - the curve to differentiate to get the values for this DerivativeCurve
   * @param tandem
   */
  public constructor( primaryCurve: PrimaryCurve, tandem: Tandem ) {

    super( {

      // CurveOptions
      xRange: primaryCurve.xRange,
      numberOfPoints: primaryCurve.numberOfPoints,
      tandem: tandem
    } );

    this.primaryCurve = primaryCurve;

    // Observes when the primaryCurve changes and update this curve to represent the derivative.
    // Listener is never removed since DerivativeCurves are never disposed.
    primaryCurve.curveChangedEmitter.addListener( this.updateDerivative.bind( this ) );

    // Makes the initial call to updateDerivative() to evaluate the derivative the primaryCurve upon initialization.
    this.updateDerivative();
  }

  /**
   * Updates the y-values and pointTypes of the DerivativeCurve to represent the derivative of the primaryCurve.
   *
   * The derivative is approximated as the slope of the secant line between each adjacent Point.
   * Our version considers both the slope of the secant lines from the left and right sides of every point. See
   * https://en.wikipedia.org/wiki/Numerical_differentiation
   *
   * Special consideration is given to points of primaryCurve that are 'cusp' or 'discontinuous'
   * For these cases, the simple algorithm of averaging the slope of the secant lines from the left and right side of every point
   * is incorrect. Instead, for points at the edge of discontinuities, we use the value of the slope that is available.
   *
   * The point type of the derivative is updated. The point type is "promoted", which means that 'cusp' and 'discontinuous'
   * type in the primary curve becomes discontinuity in the derivative, but 'smooth' primary point remains 'smooth'.
   */
  private updateDerivative(): void {

    const primaryPoints = this.primaryCurve.points;

    const length = primaryPoints.length;

    // Slope to the left of a point. It may not exist if the point is at the beginning of our curve range
    let backwardSlope: number | null;

    // Slope to the right of a point. It may not exist if the point is at the end of the curve range
    let forwardSlope: number | null;

    for ( let index = 0; index < length; index++ ) {
      const previousPoint = index > 0 ? primaryPoints[ index - 1 ] : null;
      const point = primaryPoints[ index ];
      const nextPoint = index < length - 1 ? primaryPoints[ index + 1 ] : null;

      if ( previousPoint === null || point.isCusp && previousPoint.isCusp || ( point.isDiscontinuous && previousPoint.isDiscontinuous ) ) {
        backwardSlope = null;
      }
      else {
        backwardSlope = point.getSlope( previousPoint );
      }

      if ( nextPoint === null || point.isCusp && nextPoint.isCusp || ( point.isDiscontinuous && nextPoint.isDiscontinuous ) ) {
        forwardSlope = null;
      }
      else {
        forwardSlope = point.getSlope( nextPoint );
      }

      if ( typeof backwardSlope === 'number' && typeof forwardSlope === 'number' ) {

        // Best case scenario: Both slopes exist. We average them to get the symmetric difference quotient,
        // which is a better numerical approximation of the derivative than the usual difference quotient
        this.points[ index ].y = ( backwardSlope + forwardSlope ) / 2;
      }
      else if ( typeof backwardSlope === 'number' ) {

        // If only the slope of the left side exists, use that as the derivative.
        this.points[ index ].y = backwardSlope;
      }
      else if ( typeof forwardSlope === 'number' ) {

        // If only the slope of the right side exists, use that as the derivative.
        this.points[ index ].y = forwardSlope;
      }

      if ( point.isCusp ) {
        this.points[ index ].pointType = 'discontinuous';
      }
      else if ( point.isDiscontinuous ) {
        this.points[ index ].pointType = 'discontinuous';
      }
      else {
        this.points[ index ].pointType = 'smooth';
      }

    }

    // Signal once that this Curve has changed.
    this.curveChangedEmitter.emit();
  }
}
calculusGrapher.register( 'DerivativeCurve', DerivativeCurve );