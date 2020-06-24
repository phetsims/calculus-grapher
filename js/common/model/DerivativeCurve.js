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
import Curve from './Curve.js';

class DerivativeCurve {

  /**
   * @param {Curve} baseCurve - the curve to differentiate to get the values of this DerivativeCurve.
   */
  constructor( baseCurve ) {
    assert && assert( baseCurve instanceof Curve, `invalid baseCurve: ${baseCurve}` );

    // Observe when any of the base Curve's Point's y-value changes and update this curve to represent the derivative of
    // the base Curve. Multilink is never disposed since DerivativeCurves are never disposed.
    Property.multilink( baseCurve.points.map( _.property( 'yProperty' ) ), () => {

      // this.points.forEach

      //         for ( var i:int = 1; i < this.nbrPoints; i++ ) {
      //       this.deriv_arr[i] = (y_arr[i] - y_arr[i - 1]) / this.dx;
      //   }
      //   this.deriv_arr[0] = this.deriv_arr[1];

    } );


  }
}

calculusGrapher.register( 'DerivativeCurve', DerivativeCurve );
export default DerivativeCurve;