// Copyright 2022-2023, University of Colorado Boulder

/**
 * Top-level model for the 'Lab' screen.
 *
 * @author Martin Veillette
 */

import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherModel, { CalculusGrapherModelOptions } from '../../common/model/CalculusGrapherModel.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;

type LabModelOptions = SelfOptions & CalculusGrapherModelOptions;

export default class LabModel extends CalculusGrapherModel {

  public constructor( providedOptions: LabModelOptions ) {
    super( providedOptions );
  }
}

calculusGrapher.register( 'LabModel', LabModel );
