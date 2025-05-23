// Copyright 2022-2024, University of Colorado Boulder

/**
 * AdvancedModel is the top-level model for the 'Advanced' screen. This class adds no additional functionality,
 * but is provided for completeness of the TModel class hierarchy.
 *
 * @author Brandon Li
 */

import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherModel, { CalculusGrapherModelOptions } from '../../common/model/CalculusGrapherModel.js';

type SelfOptions = EmptySelfOptions;

type AdvancedModelOptions = SelfOptions &
  PickOptional<CalculusGrapherModelOptions, 'graphSet'> &
  PickRequired<CalculusGrapherModelOptions, 'graphSets' | 'tandem'>;

export default class AdvancedModel extends CalculusGrapherModel {

  public constructor( providedOptions: AdvancedModelOptions ) {
    super( providedOptions );
  }
}

calculusGrapher.register( 'AdvancedModel', AdvancedModel );