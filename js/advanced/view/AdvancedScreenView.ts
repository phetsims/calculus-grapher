// Copyright 2020-2025, University of Colorado Boulder

/**
 * AdvancedScreenView is the top-level view for the 'Advanced' screen. This class adds no additional functionality,
 * but is provided for completeness of the ScreenView class hierarchy.
 *
 * @author Brandon Li
 */

import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherScreenView, { CalculusGrapherScreenViewOptions } from '../../common/view/CalculusGrapherScreenView.js';
import AdvancedModel from '../model/AdvancedModel.js';
import AdvancedScreenSummaryContent from './AdvancedScreenSummaryContent.js';

type SelfOptions = EmptySelfOptions;

type AdvancedScreenViewOptions = SelfOptions &
  PickRequired<CalculusGrapherScreenViewOptions, 'graphSetRadioButtonGroupItems' | 'tandem'>;

export default class AdvancedScreenView extends CalculusGrapherScreenView {

  public constructor( model: AdvancedModel, providedOptions: AdvancedScreenViewOptions ) {

    super( model, providedOptions );

    // Play Area focus order
    affirm( this.graphSetRadioButtonGroup, 'AdvancedScreenView requires a graphSetRadioButtonGroup.' );
    this.pdomPlayAreaNode.pdomOrder = [
      this.graphSetRadioButtonGroup,
      this.graphsNode,
      this.rightVBox,
      this.graphsNode.scrubberNodesParent
    ];

    // Control Area focus order
    this.pdomControlAreaNode.pdomOrder = [
      this.resetAllButton
    ];

    // screenSummaryContent cannot be set via options because it depends on the existence of view elements.
    this.setScreenSummaryContent( new AdvancedScreenSummaryContent() );
  }
}

calculusGrapher.register( 'AdvancedScreenView', AdvancedScreenView );