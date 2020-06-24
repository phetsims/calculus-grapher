// Copyright 2020, University of Colorado Boulder

/**
 * DerivativeCurve is a Curve sub-type for a curve that represents the derivative of a 'base' curve. It is used
 * as both the first derivative and second derivative of the OriginalCurve.
 *
 * When any of the Points of the base Curve changes, the derivative Curve differentiates it and updates its Points.
 * For a general background on differentiation, see https://en.wikipedia.org/wiki/Derivative#Rigorous_definition.
 * Although derivatives formally consider the behavior of the curve from both sides, for this simulation
 * DerivativeCurves only consider the left side of each Point.
 *
 * Like Curve, DerivativeCurve is created at the start and persist for the lifetime of the simulation. Links
 * are left as-is and DerivativeCurves are never disposed.
 *
 * @author Brandon Li
 */

import Property from '../../../../axon/js/Property.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherUtils from '../CalculusGrapherUtils.js';
import Curve from './Curve.js';

class DerivativeCurve extends Curve {

  /**
   * @param {Curve} baseCurve - the curve to differentiate to get the values of this DerivativeCurve.
   */
  constructor( baseCurve ) {
    assert && assert( baseCurve instanceof Curve, `invalid baseCurve: ${baseCurve}` );

    super();

    //----------------------------------------------------------------------------------------

    // @private {Curve} - reference to the BaseCurve that was passed-in.
    this.baseCurve = baseCurve;

    // Observe when any of the base Curve's Point's y-value changes and update this curve to represent the derivative of
    // the base Curve. Multilink is never disposed since DerivativeCurves are never disposed.
    Property.multilink( baseCurve.points.map( _.property( 'yProperty' ) ), () => {
      this.updateDerivative();
    } );
  }

  /**
   * Resets the DerivativeCurve.
   * @override
   * @public
   *
   * Called when the reset-all button is pressed.
   */
  reset() {
    super.reset();
    this.updateDerivative();
  }

  /**
   * Updates the y-values of the DerivativeCurve to represent the derivative of the base Curve. Each Point of the base
   * curve are considered to be infinitesimally close to each other.
   * @private
   *
   * There are 3 scenarios for taking the derivative of a Point of the base curve:
   *   - If the Point isn't differentiable, the corresponding Point of the DerivativeCurve is a hole.
   *   - If the Point is differentiable but the previous Point is a hole, the corresponding Point of the DerivativeCurve
   *     is 0.
   *   - Otherwise, the Point is differentiable and the previous Point isn't a hole, meaning the slope between the
   *     Points exists and is defined as the derivative.
   */
  updateDerivative() {

    // Loop through each pair of Points of the base Curve.
    CalculusGrapherUtils.forEachAdjacentPair( this.baseCurve.points, ( point, previousPoint, index ) => {

      if ( !point.isDifferentiable ) {

        // If the Point on the base curve isn't differentiable, set the y-value to null to indicate that there is a
        // hole in the DerivativeCurve.
        this.points[ index ].y = null;
      }
      else if ( point.isDifferentiable && !previousPoint.exists ) {

        // If the Point is differentiable but the previous Point is a hole, the corresponding Point of the
        // DerivativeCurve is 0.
        this.points[ index ].y = 0;
      }
      if ( point.isDifferentiable && previousPoint.exists ) {

        // Take the derivative of the Point, but only consider the left-side of the limit definition of a derivative.
        // Use the definition of a slope to approximate the derivative.
        const slope = ( point.y - previousPoint.y ) / ( point.x - previousPoint.x );
        assert && assert( Number.isFinite( slope ), 'non finite slope at a differentiable point' );

        // Set the y-value of the DerivativeCurve to the slope.
        this.points[ index ].y = slope;
      }
    } );
  }
}

calculusGrapher.register( 'DerivativeCurve', DerivativeCurve );
export default DerivativeCurve;