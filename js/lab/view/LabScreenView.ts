// Copyright 2020-2025, University of Colorado Boulder

/**
 * LabScreenView is the top-level view for the 'Lab' screen. This class adds no additional functionality, but is
 * provided for completeness of the ScreenView class hierarchy.
 *
 * @author Martin Veillette
 */

import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
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

    const options = optionize<LabScreenViewOptions, SelfOptions, CalculusGrapherScreenViewOptions>()( {

      // CalculusGrapherScreenViewOptions
      screenSummaryContent: new LabScreenSummaryContent()
    }, providedOptions );

    super( model, options );

    // Play Area focus order
    affirm( this.graphSetRadioButtonGroup, 'This screen is expected to have a graphSetRadioButtonGroup.' );
    this.pdomPlayAreaNode.pdomOrder = [
      this.graphSetRadioButtonGroup,
      this.graphsNode,
      this.rightVBox
    ];

    // Control Area focus order
    this.pdomControlAreaNode.pdomOrder = [
      this.resetAllButton
    ];
  }
}

calculusGrapher.register( 'LabScreenView', LabScreenView );