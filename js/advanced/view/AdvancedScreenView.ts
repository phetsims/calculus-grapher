// Copyright 2020-2022, University of Colorado Boulder

/**
 * Top-level view for the 'Advanced' screen.
 *
 * @author Brandon Li
 */

import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherScreenView, { CalculusGrapherScreenViewOptions } from '../../common/view/CalculusGrapherScreenView.js';
import AdvancedModel from '../model/AdvancedModel.js';

type SelfOptions = EmptySelfOptions;

export type AdvancedScreenViewOptions = SelfOptions & CalculusGrapherScreenViewOptions;

export default class AdvancedScreenView extends CalculusGrapherScreenView {

  public constructor( model: AdvancedModel, providedOptions: AdvancedScreenViewOptions ) {
    super( model, providedOptions );
  }
}

calculusGrapher.register( 'AdvancedScreenView', AdvancedScreenView );