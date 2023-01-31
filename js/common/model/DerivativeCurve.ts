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
   * The derivative is approximated as the slope of the secant line between each adjacent Point.
   * Our version considers both the slope of the secant lines from the left and right side of every point. See
   * https://en.wikipedia.org/wiki/Numerical_differentiation
   *
   * Since the 'Calculus Grapher' sim has second derivatives, the 'base' curve could have cusps and/or non-finite
   * points. The algorithm for computing derivatives works by iterating through each Point of the 'base' Curve.
   *
   *  TODO: add documentation
   */
  private updateDerivative(): void {

    const basePoints = this.baseCurve.points;

    const length = basePoints.length;

    let leftSlope: number | null;
    let rightSlope: number | null;

    for ( let index = 0; index < length; index++ ) {
      const previousPoint = index > 0 ? basePoints[ index - 1 ] : null;
      const point = basePoints[ index ];
      const nextPoint = index < length - 1 ? basePoints[ index + 1 ] : null;


      if ( previousPoint === null || ( point.isDiscontinuous && previousPoint.isDiscontinuous ) ) {
        leftSlope = null;
      }
      else {
        leftSlope = point.getSlope( previousPoint );
      }

      if ( nextPoint === null || point.isCusp || ( point.isDiscontinuous && nextPoint.isDiscontinuous ) ) {
        rightSlope = null;
      }
      else {
        rightSlope = point.getSlope( nextPoint );
      }

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
