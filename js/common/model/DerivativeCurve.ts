// Copyright 2020-2022, University of Colorado Boulder

/**
 * DerivativeCurve is a Curve sub-type for a curve that represents the derivative of a 'base' curve. It is used
 * as both the first derivative and second derivative of the OriginalCurve.
 *
 * DerivativeCurves's main responsibility is to observe when the 'base' Curve changes and differentiates it and update
 * the Points of the derivative. Derivatives are computed by considering the slope of the secant lines from both sides
 * of every point. For a general background on differentiation, see
 * https://en.wikipedia.org/wiki/Derivative#Rigorous_definition.
 *
 * For the 'Calculus Grapher' simulation, there are no vertical tangents. However, it is possible for the 'base' Curve
 * to have cusps that are not differentiable. See https://en.wikipedia.org/wiki/Cusp_(singularity). Cusps imply that the
 * Point is non-differentiable and non-twice-differentiable. Cusps are detected when the slope of the left secant line
 * and the slope of the right secant line differ by more than a set threshold.
 *
 * Like Curve, DerivativeCurve is created at the start and persists for the lifetime of the simulation. Links
 * are left as-is and DerivativeCurves are never disposed.
 *
 * @author Brandon Li
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherQueryParameters from '../CalculusGrapherQueryParameters.js';
import CalculusGrapherUtils from '../CalculusGrapherUtils.js';
import Curve from './Curve.js';

// constants
const DERIVATIVE_THRESHOLD = CalculusGrapherQueryParameters.derivativeThreshold;

export default class DerivativeCurve extends Curve {

  // reference to the 'base' Curve that was passed-in.
  private baseCurve: Curve;

  /**
   * @param baseCurve - the curve to differentiate to get the values of this DerivativeCurve.
   */
  public constructor( baseCurve: Curve ) {

    super();

    this.baseCurve = baseCurve;

    // Observe when the 'base' Curve changes and update this curve to represent the derivative of the 'base' Curve.
    // Listener is never removed since DerivativeCurves are never disposed.
    baseCurve.curveChangedEmitter.addListener( this.updateDerivative.bind( this ) );

    // Make the initial call to updateDerivative() to match the 'base' Curve upon initialization.
    this.updateDerivative();
  }

  /**
   * Resets the DerivativeCurve. Ensures that DerivativeCurve matches the 'base' Curve regardless of resetting order.
   * Called when the reset-all button is pressed.
   */
  public override reset(): void {
    super.reset();
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
    this.baseCurve.cusps = [];
    // Loop through each trio of adjacent Points of the base Curve.
    CalculusGrapherUtils.forEachAdjacentTrio( this.baseCurve.points, ( previousPoint, point, nextPoint, index ) => {

      if ( !point.exists ) {

        // If the Point of the 'base' curve does not exist, set the y-value to null to indicate that there is a
        // hole in the DerivativeCurve.
        this.points[ index ].y = null;
      }
      else {

        // Flags of the slopes of the secant lines from the left and right adjacent sides of the Point. Set later.
        let leftSlope;
        let rightSlope;

        // Compute the leftSlope and rightSlope.
        if ( previousPoint && previousPoint.exists ) {

          // Take the slope of the secant line between the left adjacent Point and the current Point, where m = dy/dx.

          // @ts-ignore
          leftSlope = ( point.y - previousPoint.y ) / ( point.x - previousPoint.x );
          assert && assert( Number.isFinite( leftSlope ), 'non finite slope' );
        }
        if ( nextPoint && nextPoint.exists ) {

          // Take the slope of the secant line between the current Point and the right adjacent Point, where m = dy/dx.
          // @ts-ignore
          rightSlope = ( nextPoint.y - point.y ) / ( nextPoint.x - point.x );
          assert && assert( Number.isFinite( rightSlope ), 'non finite slope' );
        }

        //----------------------------------------------------------------------------------------

        // Set the y-value of the corresponding Point of the DerivativeCurve.
        if ( Number.isFinite( leftSlope ) && Number.isFinite( rightSlope ) ) {

          // @ts-ignore
          const p0 = new Vector2( previousPoint.x, previousPoint.y );
          // @ts-ignore
          const p1 = new Vector2( point.x, point.y );
          // @ts-ignore
          const p2 = new Vector2( nextPoint.x, nextPoint.y );

          const dx1 = p1.x - p0.x;
          const dy1 = p1.y - p0.y;
          const dx2 = p2.x - p0.x;
          const dy2 = p2.y - p0.y;
          const area = dx1 * dy2 - dy1 * dx2;
          const len0 = p0.distance( p1 );
          const len1 = p1.distance( p2 );
          const len2 = p2.distance( p0 );

          const K = 4 * Math.abs( area ) / ( len0 * len1 * len2 );
          if ( K >= DERIVATIVE_THRESHOLD ) {
            // @ts-ignore
            this.baseCurve.cusps.push( point );
          }

          // If both the left and right adjacent Points of the Point of the 'base' curve exist, the derivative is
          // the average of the slopes if they are approximately equal. Otherwise, the derivative doesn't exist.
          // @ts-ignore
          this.points[ index ].y = ( leftSlope + rightSlope );
        }
        else if ( Number.isFinite( leftSlope ) ) {

          // If only the slope of the left side exists, use that as the derivative.
          // @ts-ignore
          this.points[ index ].y = leftSlope;
        }
        else if ( Number.isFinite( rightSlope ) ) {

          // If only the slope of the right side exists, use that as the derivative.
          // @ts-ignore
          this.points[ index ].y = rightSlope;
        }
        else {

          // Otherwise, both adjacent Points don't exist, meaning the derivative also doesn't exist
          this.points[ index ].y = null;
        }
      }
    } );

    // Signal once that this Curve has changed.
    this.curveChangedEmitter.emit();
  }
}

calculusGrapher.register( 'DerivativeCurve', DerivativeCurve );
