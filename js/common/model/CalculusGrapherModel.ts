// Copyright 2020-2022, University of Colorado Boulder

/**
 * Root class (to be subclassed) for the top-level model of every screen in the 'Calculus Grapher' simulation.
 *
 * @author Brandon Li
 */

import calculusGrapher from '../../calculusGrapher.js';
import DerivativeCurve from './DerivativeCurve.js';
import OriginalCurve from './OriginalCurve.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
// import PickRequired from '../../../../phet-core/js/types/PickRequired.js';

// import IntegralCurve from './IntegralCurve.js';

type SelfOptions = EmptySelfOptions;

// Make numberOfAtoms optional. Note that it must be omitted, then made required.
type CalculusGrapherModelOptions = SelfOptions;

export default class CalculusGrapherModel {

  public readonly originalCurve: OriginalCurve;
  public readonly derivativeCurve: DerivativeCurve;

  public constructor( providedOptions?: CalculusGrapherModelOptions ) {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const options = optionize<CalculusGrapherModelOptions, SelfOptions>()( {}, providedOptions );

    this.originalCurve = new OriginalCurve();
    this.derivativeCurve = new DerivativeCurve( this.originalCurve );
    // this.secondDerivativeCurve = new DerivativeCurve( this.derivativeCurve );
    // this.integralCurve = new IntegralCurve( this.originalCurve );

  }
}

calculusGrapher.register( 'CalculusGrapherModel', CalculusGrapherModel );
