// Copyright 2020-2023, University of Colorado Boulder

/**
 * AdvancedScreenView is the top-level view for the 'Advanced' screen. This class adds no additional functionality,
 * but is provided for completeness of the ScreenView class hierarchy.
 *
 * @author Brandon Li
 */

import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherScreenView, { CalculusGrapherScreenViewOptions } from '../../common/view/CalculusGrapherScreenView.js';
import AdvancedModel from '../model/AdvancedModel.js';

type SelfOptions = EmptySelfOptions;

type AdvancedScreenViewOptions = SelfOptions &
  PickRequired<CalculusGrapherScreenViewOptions, 'graphSetRadioButtonGroupItems' | 'tandem'>;

export default class AdvancedScreenView extends CalculusGrapherScreenView {

  public constructor( model: AdvancedModel, providedOptions: AdvancedScreenViewOptions ) {
    super( model, providedOptions );
  }
}

calculusGrapher.register( 'AdvancedScreenView', AdvancedScreenView );