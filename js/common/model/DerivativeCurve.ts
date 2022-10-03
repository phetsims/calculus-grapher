// Copyright 2020-2022, University of Colorado Boulder

/**
 * DerivativeCurve is a Curve sub-type for a curve that represents the derivative of a 'base' curve. It is used
 * as both the first derivative and second derivative of the OriginalCurve.
 *
 * DerivativeCurves' main responsibility is to observe when the 'base' Curve changes and differentiates it and update
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

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherQueryParameters from '../CalculusGrapherQueryParameters.js';
import Curve from './Curve.js';
import { IntegralCurveOptions } from './IntegralCurve.js';

// constants
const DERIVATIVE_THRESHOLD = CalculusGrapherQueryParameters.derivativeThreshold;

type SelfOptions = EmptySelfOptions;

export type DerivativeCurveOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

// noinspection JSSuspiciousNameCombination
export default class DerivativeCurve extends Curve {

  // reference to the 'base' Curve that was passed-in.
  private baseCurve: Curve;

  /**
   * @param baseCurve - the curve to differentiate to get the values of this DerivativeCurve
   * @param providedOptions
   */
  public constructor( baseCurve: Curve, providedOptions?: DerivativeCurveOptions ) {

    const options = optionize<IntegralCurveOptions, SelfOptions>()( {}, providedOptions );

    super( options );

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
    this.baseCurve.forEachAdjacentTrio( ( previousPoint, point, nextPoint, index ) => {

      let leftSlope: null | number = null;
      let rightSlope: null | number = null;

      // Compute the leftSlope and rightSlope.

      // Take the slope of the secant line between the left adjacent Point and the current Point, where m = dy/dx.
      if ( previousPoint && previousPoint.exists ) {
        leftSlope = ( point.y - previousPoint.y ) / ( point.x - previousPoint.x );
        assert && assert( Number.isFinite( leftSlope ), 'non finite slope' );
      }

      if ( nextPoint && nextPoint.exists ) {
        // Take the slope of the secant line between the current Point and the right adjacent Point, where m = dy/dx.
        rightSlope = ( nextPoint.y - point.y ) / ( nextPoint.x - point.x );
        assert && assert( Number.isFinite( rightSlope ), 'non finite slope' );
      }
      //----------------------------------------------------------------------------------------

      if ( typeof leftSlope === 'number' && typeof rightSlope === 'number' && Number.isFinite( leftSlope ) && Number.isFinite( rightSlope ) ) {
        // If both the left and right adjacent Points of the Point of the 'base' curve exist, the derivative is
        // the average of the slopes if they are approximately equal. Otherwise, the derivative doesn't exist.
        this.points[ index ].y = ( leftSlope + rightSlope ) / 2;
      }
      else if ( typeof leftSlope === 'number' && Number.isFinite( leftSlope ) ) {

        // If only the slope of the left side exists, use that as the derivative.
        this.points[ index ].y = leftSlope;
      }
      else if ( typeof rightSlope === 'number' && Number.isFinite( rightSlope ) ) {

        // If only the slope of the right side exists, use that as the derivative.
        this.points[ index ].y = rightSlope;
      }

      // TODO: prototype to determine the cusp points
      if ( typeof leftSlope === 'number' && typeof rightSlope === 'number' && Number.isFinite( leftSlope ) && Number.isFinite( rightSlope ) ) {

        // evaluate the difference in the angle of the left and right slope
        const K = Math.abs( ( Math.atan( leftSlope ) - Math.atan( rightSlope ) ) );

        if ( K >= DERIVATIVE_THRESHOLD ) {
          this.baseCurve.cusps.push( point );
        }
      }

    } );

    // Signal once that this Curve has changed.
    this.curveChangedEmitter.emit();
  }
}

calculusGrapher.register( 'DerivativeCurve', DerivativeCurve );
