// Copyright 2020, University of Colorado Boulder

/**
 * DerivativeCurve is a Curve sub-type for a curve that represents the derivative of a 'base' curve. It is used
 * as both the first derivative and second derivative of the OriginalCurve.
 *
 * DerivativeCurves's main responsibility is to observe when the 'base' Curve changes and differentiates it and update
 * the Points of the derivative. Derivatives are computed by considering the slope of secant lines from both sides of
 * every point. For a general background on differentiation, see
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

    // @private {OriginalCurve} - reference to the 'base' Curve that was passed-in.
    this.baseCurve = baseCurve;

    // Observe when the 'base' Curve changes and update this curve to represent the derivative of the 'base' Curve.
    // Listener is never removed since DerivativeCurves are never disposed.
    baseCurve.curveChangedEmitter.addListener( this.updateDerivative.bind( this ) );

    // Make the initial call to updateDerivative() to match the 'base' Curve upon initialization.
    this.updateDerivative();
  }

  /**
   * Resets the DerivativeCurve. Ensures that DerivativeCurve matches the 'base' Curve regardless of resetting order.
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

    this.curveChangedEmitter.emit();
  }
}

calculusGrapher.register( 'DerivativeCurve', DerivativeCurve );
export default DerivativeCurve;