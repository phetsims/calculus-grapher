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
import IntegralCurve from './IntegralCurve.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';

type SelfOptions = EmptySelfOptions;

export type CalculusGrapherModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class CalculusGrapherModel {

  public readonly originalCurve: OriginalCurve;
  public readonly derivativeCurve: DerivativeCurve;
  public readonly integralCurve: IntegralCurve;
  public readonly secondDerivativeCurve: DerivativeCurve;

  public constructor( providedOptions: CalculusGrapherModelOptions ) {

    const options = optionize<CalculusGrapherModelOptions, SelfOptions>()( {}, providedOptions );

    this.originalCurve = new OriginalCurve( options );
    this.derivativeCurve = new DerivativeCurve( this.originalCurve );
    this.secondDerivativeCurve = new DerivativeCurve( this.derivativeCurve );
    this.integralCurve = new IntegralCurve( this.originalCurve );

  }
}

calculusGrapher.register( 'CalculusGrapherModel', CalculusGrapherModel );
