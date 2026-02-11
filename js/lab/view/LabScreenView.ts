// Copyright 2020-2025, University of Colorado Boulder

/**
 * LabScreenView is the top-level view for the 'Lab' screen. This class adds no additional functionality, but is
 * provided for completeness of the ScreenView class hierarchy.
 *
 * @author Martin Veillette
 */

import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherScreenView, { CalculusGrapherScreenViewOptions } from '../../common/view/CalculusGrapherScreenView.js';
import LabModel from '../model/LabModel.js';
import LabScreenSummaryContent from './LabScreenSummaryContent.js';

type SelfOptions = EmptySelfOptions;

type LabScreenViewOptions = SelfOptions &
  PickRequired<CalculusGrapherScreenViewOptions, 'graphSetRadioButtonGroupItems' | 'tandem'>;

export default class LabScreenView extends CalculusGrapherScreenView {

  public constructor( model: LabModel, providedOptions: LabScreenViewOptions ) {

    super( model, providedOptions );

    // Play Area focus order
    affirm( this.graphSetRadioButtonGroup, 'LabScreenView requires a graphSetRadioButtonGroup.' );
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

    // screenSummaryContent cannot be set via options because it depends on the existence of this.graphsNode.
    this.setScreenSummaryContent( new LabScreenSummaryContent( model, this.graphsNode ) );
  }
}

calculusGrapher.register( 'LabScreenView', LabScreenView );