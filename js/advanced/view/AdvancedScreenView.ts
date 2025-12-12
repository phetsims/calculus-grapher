// Copyright 2020-2025, University of Colorado Boulder

/**
 * AdvancedScreenView is the top-level view for the 'Advanced' screen. This class adds no additional functionality,
 * but is provided for completeness of the ScreenView class hierarchy.
 *
 * @author Brandon Li
 */

import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
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

    const options = optionize<AdvancedScreenViewOptions, SelfOptions, CalculusGrapherScreenViewOptions>()( {

      // CalculusGrapherScreenViewOptions
      screenSummaryContent: new AdvancedScreenSummaryContent()
    }, providedOptions );

    super( model, options );

    // Play Area focus order
    affirm( this.graphSetRadioButtonGroup, 'This screen is expected to have a graphSetRadioButtonGroup.' );
    this.pdomPlayAreaNode.pdomOrder = [
      this.graphsNode,
      this.rightVBox,
      this.graphsNode.scrubberNodesParent
    ];

    // Control Area focus order
    this.pdomControlAreaNode.pdomOrder = [
      this.resetAllButton
    ];
  }
}

calculusGrapher.register( 'AdvancedScreenView', AdvancedScreenView );