[object Promise]

/**
 * IntegralCurve is a Curve sub-type for the curve that represents the integral of the OriginalCurve. The OriginalCurve
 * is referenced as the 'base' Curve of the IntegralCurve.
 *
 * IntegralCurve's main responsibility is to observe when the 'base' Curve changes and integrate it and update the
 * Points of the Integral. For a general background on integration, see https://en.wikipedia.org/wiki/Integral. Our
 * version uses a trapezoidal Riemann sum to approximate integrals. See https://en.wikipedia.org/wiki/Trapezoidal_rule
 * for background. Since the 'base' Curve exists at all Points, the Integral is also finite at all points.
 *
 * Like Curve, IntegralCurve is created at the start and persists for the lifetime of the simulation. Links are left
 * as-is and IntegralCurves are never disposed.
 *
 * @author Brandon Li
 */

import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherUtils from '../CalculusGrapherUtils.js';
import Curve from './Curve.js';
import OriginalCurve from './OriginalCurve.js';

class IntegralCurve extends Curve {

  /**
   * @param {OriginalCurve} baseCurve - the curve to integrate to get the values of this IntegralCurve.
   */
  constructor( baseCurve ) {
    assert && assert( baseCurve instanceof OriginalCurve, `invalid baseCurve: ${baseCurve}` );

    super();

    //----------------------------------------------------------------------------------------

    // @private {OriginalCurve} - reference to the 'base' Curve that was passed-in.
    this.baseCurve = baseCurve;

    // Observe when the 'base' Curve changes and update this curve to represent the integral of the 'base' Curve.
    // Listener is never removed since IntegralCurves are never disposed.
    baseCurve.curveChangedEmitter.addListener( this.updateIntegral.bind( this ) );

    // Make the initial call to updateIntegral() to match the 'base' Curve upon initialization.
    this.updateIntegral();
  }

  /**
   * Resets the IntegralCurve. Ensures that IntegralCurve matches the 'base' Curve regardless of resetting order.
   * @override
   * @public
   *
   * Called when the reset-all button is pressed.
   */
  reset() {
    super.reset();
    this.updateIntegral();
  }

  /**
   * Updates the y-values of the IntegralCurve to represent the integral of the 'base' Curve.
   * @private
   *
   * Since each adjacent Point of the base curve is considered to be infinitesimally close to each other, the
   * trapezoidal area between each adjacent Point is also considered to be infinitesimally small. Thus, summing up all
   * trapezoidal areas correctly matches one of the definitions of a Integral where each y-value represents the 'area'
   * under the 'base' Curve. See https://en.wikipedia.org/wiki/Integral#Riemann_integral
   *
   * The IntegralCurve exists at all points since OriginalCurve is finite at all points, so we don't need to consider
   * non-differentiable or non-finite points of the 'base' curve.
   */
  updateIntegral() {

    // Loop through each pair of adjacent Points of the base Curve.
    CalculusGrapherUtils.forEachAdjacentPair( this.baseCurve.points, ( point, previousPoint, index ) => {
      assert && assert( point.exists && previousPoint.exists );

      // Take the integral from the minimum of the domain of Curves to the x-value of the current point using a
      // trapezoidal Riemann sum approximation. See https://en.wikipedia.org/wiki/Trapezoidal_rule for background.
      const trapezoidalArea = ( point.y + previousPoint.y ) / 2 * ( point.x - previousPoint.x );

      // Add the trapezoidalArea to the previous y-value to get the y-value of the current Point.
      this.points[ index ].y = this.points[ index - 1 ].y + trapezoidalArea;

      // Sanity check that verifies that the Integral exists at the current Point.
      assert && assert( Number.isFinite( trapezoidalArea ) && point.exists, 'non-finite trapezoidal area' );
    } );

    // Signal once that this Curve has changed.
    this.curveChangedEmitter.emit();
  }
}

calculusGrapher.register( 'IntegralCurve', IntegralCurve );
export default IntegralCurve;