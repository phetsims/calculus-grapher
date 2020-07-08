// Copyright 2020, University of Colorado Boulder

/**
 * IntegralCurve is a Curve sub-type for a curve that represents the integral of a OriginalCurve, called the 'base'
 * Curve.
 *
 * When any of the Points of the base Curve changes, the IntegralCurve integrates it and updates its Points.
 * For a general background on integration, see https://en.wikipedia.org/wiki/Integral. Our version uses a trapezoidal
 * Riemann sum to approximate integrals. See https://en.wikipedia.org/wiki/Trapezoidal_rule for background. The
 * IntegralCurve exists at all points since OriginalCurve is finite at all points.
 *
 * Like Curve, IntegralCurve is created at the start and persists for the lifetime of the simulation. Links
 * are left as-is and IntegralCurves are never disposed.
 *
 * @author Brandon Li
 */

import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherUtils from '../CalculusGrapherUtils.js';
import Curve from './Curve.js';
import OriginalCurve from './OriginalCurve.js';

class IntegralCurve extends Curve {

  /**
   * @param {OriginalCurve} baseCurve - the curve to differentiate to get the values of this IntegralCurve.
   */
  constructor( baseCurve ) {
    assert && assert( baseCurve instanceof OriginalCurve, `invalid baseCurve: ${baseCurve}` );

    super();

    //----------------------------------------------------------------------------------------

    // @private {OriginalCurve} - reference to the base Curve that was passed-in.
    this.baseCurve = baseCurve;

    // Observe when any of the base Curve's Point's y-value changes and update this curve to represent the integral of
    // the base Curve. Multilink is never disposed since IntegralCurves are never disposed.
    baseCurve.curveChangedEmitter.addListener( () => {
      this.updateIntegral();
    } );
    this.updateIntegral();
  }

  /**
   * Resets the IntegralCurve.
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
   * Updates the y-values of the IntegralCurve to represent the integral of the base Curve. Each Point of the base
   * curve are considered to be infinitesimally close to each other.
   * @private
   *
   * The IntegralCurve exists at all points since OriginalCurve is finite at all points, so we don't need to consider
   * non-differentiable points of the base curve.
   */
  updateIntegral() {

    // Loop through each pair of Points of the base Curve.
    CalculusGrapherUtils.forEachAdjacentPair( this.baseCurve.points, ( point, previousPoint, index ) => {
      assert && assert( point.isDifferentiable && previousPoint.isDifferentiable );

      // Take the integral from the min to the Point of the base curve using a trapezoidal Riemann sum approximation.
      // See https://en.wikipedia.org/wiki/Trapezoidal_rule for background.
      const trapezoidalArea = ( point.y + previousPoint.y ) / 2 * ( point.x - previousPoint.x );
      assert && assert( Number.isFinite( trapezoidalArea ), 'non finite trapezoidal area' );

      // Set the y-value of the IntegralCurve to the previous value plus the trapezoidal area.
      this.points[ index ].y = this.getClosestPointAt( previousPoint.x ) + trapezoidalArea;
    } );

    this.curveChangedEmitter.emit();
  }
}

calculusGrapher.register( 'IntegralCurve', IntegralCurve );
export default IntegralCurve;