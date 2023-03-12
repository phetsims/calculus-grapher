// Copyright 2022-2023, University of Colorado Boulder

/**
 * LabModel is the top-level model for the 'Lab' screen. This class adds no additional functionality, but is
 * provided for completeness of the TModel class hierarchy.
 *
 * @author Martin Veillette
 */

import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherModel, { CalculusGrapherModelOptions } from '../../common/model/CalculusGrapherModel.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';

type SelfOptions = EmptySelfOptions;

type LabModelOptions = SelfOptions & PickRequired<CalculusGrapherModelOptions, 'graphSets' | 'tandem'>;

export default class LabModel extends CalculusGrapherModel {

  public constructor( providedOptions: LabModelOptions ) {
    super( providedOptions );
  }
}

calculusGrapher.register( 'LabModel', LabModel );
