// Copyright 2022, University of Colorado Boulder

/**
 * Top level model for the 'Integral Lab' screen.
 *
 * @author Brandon Li
 */

import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherModel, { CalculusGrapherModelOptions } from '../../common/model/CalculusGrapherModel.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;

export type IntegralLabModelOptions = SelfOptions & CalculusGrapherModelOptions;

export default class IntegralLabModel extends CalculusGrapherModel {

  public constructor( providedOptions: IntegralLabModelOptions ) {
    const options = optionize<IntegralLabModelOptions, SelfOptions, CalculusGrapherModelOptions>()( {}, providedOptions );

    super( options );
  }
}

calculusGrapher.register( 'IntegralLabModel', IntegralLabModel );
