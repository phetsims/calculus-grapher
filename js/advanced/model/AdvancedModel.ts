// Copyright 2020-2022, University of Colorado Boulder

/**
 * Top level model for the 'Advanced' screen.
 *
 * @author Brandon Li
 */

import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherModel, { CalculusGrapherModelOptions } from '../../common/model/CalculusGrapherModel.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;

export type AdvancedModelOptions = SelfOptions & CalculusGrapherModelOptions;

export default class AdvancedModel extends CalculusGrapherModel {

  public constructor( providedOptions?: AdvancedModelOptions ) {
    const options = optionize<AdvancedModelOptions, SelfOptions, CalculusGrapherModelOptions>()(
      {}, providedOptions );

    super( options );

  }
}

calculusGrapher.register( 'AdvancedModel', AdvancedModel );
