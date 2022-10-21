// Copyright 2020-2022, University of Colorado Boulder

/**
 * Top level view for the 'Lab' screen.
 *
 * @author Martin Veillette
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherScreenView, { CalculusGrapherScreenViewOptions } from '../../common/view/CalculusGrapherScreenView.js';
import LabModel from '../model/LabModel.js';

type SelfOptions = EmptySelfOptions;

export type LabScreenViewOptions = SelfOptions & CalculusGrapherScreenViewOptions;

export default class LabScreenView extends CalculusGrapherScreenView {

  public constructor( model: LabModel, providedOptions?: LabScreenViewOptions ) {

    const options = optionize<LabScreenViewOptions, SelfOptions, CalculusGrapherScreenViewOptions>()( {
      graphsRadioButtonGroupOptions: {},
      visiblePropertiesOptions: {
        isIntegralGraphVisible: false,
        isDerivativeGraphVisible: true,
        isSecondDerivativeGraphVisible: true
      }
    }, providedOptions );

    super( model, options );

  }
}

calculusGrapher.register( 'LabScreenView', LabScreenView );
