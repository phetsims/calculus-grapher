// Copyright 2020-2022, University of Colorado Boulder

/**
 * Top level model for the 'Intro' screen.
 *
 * @author Brandon Li
 */

import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherModel, { CalculusGrapherModelOptions } from '../../common/model/CalculusGrapherModel.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;

export type IntroModelOptions = SelfOptions & CalculusGrapherModelOptions;

export default class IntroModel extends CalculusGrapherModel {

  public constructor( providedOptions?: IntroModelOptions ) {
    const options = optionize<IntroModelOptions, SelfOptions, CalculusGrapherModelOptions>()( {}, providedOptions );

    super( options );

  }
}

calculusGrapher.register( 'IntroModel', IntroModel );
