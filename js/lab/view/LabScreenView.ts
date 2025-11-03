// Copyright 2020-2023, University of Colorado Boulder

/**
 * LabScreenView is the top-level view for the 'Lab' screen. This class adds no additional functionality, but is
 * provided for completeness of the ScreenView class hierarchy.
 *
 * @author Martin Veillette
 */

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
  }
}

calculusGrapher.register( 'LabScreenView', LabScreenView );