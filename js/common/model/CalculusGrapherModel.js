// Copyright 2020-2022, University of Colorado Boulder
// @ts-nocheck
/**
 * Root class (to be subclassed) for the top-level model of every screen in the 'Calculus Grapher' simulation.
 *
 * @author Brandon Li
 */

import calculusGrapher from '../../calculusGrapher.js';
import DerivativeCurve from './DerivativeCurve.js';
import OriginalCurve from './OriginalCurve.js';

// import IntegralCurve from './IntegralCurve.js';

class CalculusGrapherModel {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {


    // @public (read-only)
    this.originalCurve = new OriginalCurve();
    this.derivativeCurve = new DerivativeCurve( this.originalCurve );
    // this.secondDerivativeCurve = new DerivativeCurve( this.derivativeCurve );
    // this.integralCurve = new IntegralCurve( this.originalCurve );

  }
}

calculusGrapher.register( 'CalculusGrapherModel', CalculusGrapherModel );
export default CalculusGrapherModel;
