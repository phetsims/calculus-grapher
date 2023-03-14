// Copyright 2020-2023, University of Colorado Boulder

/**
 * DerivativeCurve is a Curve subclass for a curve that represents the derivative of a Curve. It is used
 * to evaluate the first derivative of the original curve.
 *
 * DerivativeCurves' main responsibility is to observe when the original Curve changes and differentiates it and update
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

export default class DerivativeCurve extends Curve {

  // Reference to the originalCurve that was passed-in.
  private readonly originalCurve: Curve;

  /**
   * @param originalCurve - the curve to differentiate to get the values for this DerivativeCurve
   * @param tandem
   */
  public constructor( originalCurve: Curve, tandem: Tandem ) {

    super( {

      // CurveOptions
      xRange: originalCurve.xRange,
      numberOfPoints: originalCurve.numberOfPoints,
      tandem: tandem
    } );

    this.originalCurve = originalCurve;

    // Observes when the originalCurve changes and update this curve to represent the derivative.
    // Listener is never removed since DerivativeCurves are never disposed.
    originalCurve.curveChangedEmitter.addListener( this.updateDerivative.bind( this ) );

    // Makes the initial call to updateDerivative() to evaluate the derivative the originalCurve upon initialization.
    this.updateDerivative();
  }

  /**
   * Updates the y-values and pointTypes of the DerivativeCurve to represent the derivative of the originalCurve.
   *
   * The derivative is approximated as the slope of the secant line between each adjacent Point.
   * Our version considers both the slope of the secant lines from the left and right side of every point. See
   * https://en.wikipedia.org/wiki/Numerical_differentiation
   *
   * Special consideration is given to points of originalCurve that are 'cusp' or 'discontinuous'
   * For these cases, the simple algorithm of averaging the slope of the secant lines from the left and right side of every point
   * is incorrect. Instead, for points at the edge of discontinuities, we use the value of the slope that is available.
   *
   * The point type of the derivative is updated. The point type are "promoted", which means that 'cusp' and 'discontinuous'
   * type in the original curve becomes discontinuity in the derivative, but 'smooth' original point remains 'smooth'.
   */
  private updateDerivative(): void {

    const originalPoints = this.originalCurve.points;

    const length = originalPoints.length;

    let leftSlope: number | null;
    let rightSlope: number | null;

    for ( let index = 0; index < length; index++ ) {
      const previousPoint = index > 0 ? originalPoints[ index - 1 ] : null;
      const point = originalPoints[ index ];
      const nextPoint = index < length - 1 ? originalPoints[ index + 1 ] : null;


      if ( previousPoint === null || point.isCusp && previousPoint.isCusp || ( point.isDiscontinuous && previousPoint.isDiscontinuous ) ) {
        leftSlope = null;
      }
      else {
        leftSlope = point.getSlope( previousPoint );
      }

      if ( nextPoint === null || point.isCusp && nextPoint.isCusp || ( point.isDiscontinuous && nextPoint.isDiscontinuous ) ) {
        rightSlope = null;
      }
      else {
        rightSlope = point.getSlope( nextPoint );
      }

      if ( typeof leftSlope === 'number' && typeof rightSlope === 'number' ) {

        // REVIEW: What does approximately equal mean? I see no analysis of how equal the slopes are before setting the
        // REVIEW: derivative.
        // If both the left and right adjacent Points of the Point of the originalCurve curve exist, the derivative is
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
