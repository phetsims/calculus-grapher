// Copyright 2020, University of Colorado Boulder

/**
 * Root class (to be subclassed) for the top-level model of every screen in the 'Calculus Grapher' simulation.
 *
 * @author Brandon Li
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import DerivativeCurve from './DerivativeCurve.js';
import IntegralCurve from './IntegralCurve.js';
import OriginalCurve from './OriginalCurve.js';

class CalculusGrapherModel {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem, options ) {
    assert && assert( tandem instanceof Tandem, `invalid tandem: ${tandem}` );


    // @public (read-only)
    this.originalCurve = new OriginalCurve();
    this.derivativeCurve = new DerivativeCurve( this.originalCurve );
    this.secondDerivativeCurve = new DerivativeCurve( this.derivativeCurve );
    this.integralCurve = new IntegralCurve( this.originalCurve );

  }
}

calculusGrapher.register( 'CalculusGrapherModel', CalculusGrapherModel );
export default CalculusGrapherModel;