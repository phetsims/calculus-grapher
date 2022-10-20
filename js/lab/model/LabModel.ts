// Copyright 2020-2022, University of Colorado Boulder

/**
 * Top level model for the 'Lab' screen.
 *
 * @author Martin Veillette
 */

import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherModel, { CalculusGrapherModelOptions } from '../../common/model/CalculusGrapherModel.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;

export type LabModelOptions = SelfOptions & CalculusGrapherModelOptions;

export default class LabModel extends CalculusGrapherModel {

  public constructor( providedOptions?: LabModelOptions ) {
    const options = optionize<LabModelOptions, SelfOptions, CalculusGrapherModelOptions>()(
      {}, providedOptions );

    super( options );

  }
}

calculusGrapher.register( 'LabModel', LabModel );
