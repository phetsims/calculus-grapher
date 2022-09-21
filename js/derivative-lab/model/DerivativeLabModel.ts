// Copyright 2020-2022, University of Colorado Boulder

/**
 * Top level model for the 'Derivative Lab' screen.
 *
 * @author Brandon Li
 */

import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherModel, { CalculusGrapherModelOptions } from '../../common/model/CalculusGrapherModel.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;

export type DerivativeLabModelOptions = SelfOptions & CalculusGrapherModelOptions;

export default class DerivativeLabModel extends CalculusGrapherModel {

  public constructor( providedOptions: DerivativeLabModelOptions ) {
    const options = optionize<DerivativeLabModelOptions, SelfOptions, CalculusGrapherModelOptions>()( {}, providedOptions );

    super( options );

  }
}

calculusGrapher.register( 'DerivativeLabModel', DerivativeLabModel );
