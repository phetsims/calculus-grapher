// Copyright 2022-2023, University of Colorado Boulder

/**
 * Top-level model for the 'Advanced' screen.
 *
 * @author Brandon Li
 */

import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherModel, { CalculusGrapherModelOptions } from '../../common/model/CalculusGrapherModel.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;

type AdvancedModelOptions = SelfOptions & CalculusGrapherModelOptions;

export default class AdvancedModel extends CalculusGrapherModel {

  public constructor( providedOptions: AdvancedModelOptions ) {
    super( providedOptions );
  }
}

calculusGrapher.register( 'AdvancedModel', AdvancedModel );
