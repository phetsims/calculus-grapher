// Copyright 2020, University of Colorado Boulder

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

import Utils from '../../../../dot/js/Utils.js';
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
   * Updates the y-values of the DerivativeCurve to represent the derivative of the 'base' Curve.
   * @private
   *
   * Since each adjacent Point of the base curve is considered to be infinitesimally close to each other, the slope of
   * the secant line between each adjacent Point is considered to be the instantaneous derivative of each Point. Our
   * version, however, considers both the slope of the secant lines from the left and right side of every point. See
   * https://en.wikipedia.org/wiki/Derivative#Rigorous_definition
   *
   * Since the 'Calculus Grapher' sim has second derivatives, the base curve could have cusps and/or non-finite points.
   * Here is the decision tree:
   *   - If a Point of the 'base' curve does not exist:
   *       - The derivative also doesn't exist
   *   - Otherwise:
   *       - If both the left and right Points exist:
   *          - If the slope of the secant lines from the left and right side are approximately equal:
   *              - the slope is the average of the slopes
   *          - Otherwise, the derivative doesn't exist
   *       - If only one of the two adjacent Points exists, only use the slope of the secant line between the point
   *         as the derivative.
   *       - Otherwise, both adjacent Points don't exist, only the derivative also doesn't exist.
   */
  updateDerivative() {

    // Loop through each trio of Points of the base Curve.
    CalculusGrapherUtils.forEachAdjacentTrio( this.baseCurve.points, ( previousPoint, point, nextPoint, index ) => {

      if ( !point.exists ) {

        // If the Point on the base curve isn't differentiable, set the y-value to null to indicate that there is a
        // hole in the DerivativeCurve.
        this.points[ index ].y = null;
      }
      else {

        let leftSlope;
        let rightSlope;
        if ( previousPoint && previousPoint.exists ) {

          // Take the derivative of the Point, but only consider the left-side of the limit definition of a derivative.
          // Use the definition of a slope to approximate the derivative.
          leftSlope = ( point.y - previousPoint.y ) / ( point.x - previousPoint.x );
        }
        if ( nextPoint && nextPoint.exists ) {
          rightSlope = ( nextPoint.y - point.y ) / ( nextPoint.x - point.x );
        }
        // assert && assert( Number.isFinite( leftSlope ) && Number.isFinite( rightSlope ), 'non finite slope at a differentiable point' );
        // console.log( leftSlope, rightSlope)
        if ( Number.isFinite( leftSlope ) && Number.isFinite( rightSlope ) ) {
          this.points[ index ].y = Utils.equalsEpsilon( leftSlope, rightSlope, 0.5 ) ?
            ( leftSlope + rightSlope ) / 2 : null;
        }
        else if ( Number.isFinite( leftSlope ) ) {
          this.points[ index ].y = leftSlope;
        }
        else if ( Number.isFinite( rightSlope ) ) {
          this.points[ index ].y = rightSlope;
        }
        else {
          this.points[ index ].y = null;
        }
        // console.log( 'end', this.points[ index ].y)
      }
    } );
    // console.table( this.points)

    // Signal once that this Curve has changed.
    this.curveChangedEmitter.emit();
  }
}

calculusGrapher.register( 'DerivativeCurve', DerivativeCurve );
export default DerivativeCurve;