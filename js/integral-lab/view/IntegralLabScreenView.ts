// Copyright 2020-2022, University of Colorado Boulder

/**
 * Top level view for the 'Integral Lab' screen.
 *
 * @author BrandonLi
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherScreenView, { CalculusGrapherScreenViewOptions } from '../../common/view/CalculusGrapherScreenView.js';
import IntegralLabModel from '../model/IntegralLabModel.js';


type SelfOptions = EmptySelfOptions;

export type IntroScreenViewOptions = SelfOptions & CalculusGrapherScreenViewOptions;

export default class IntegralLabScreenView extends CalculusGrapherScreenView {

  public constructor( model: IntegralLabModel, providedOptions: IntroScreenViewOptions ) {

    const options = optionize<IntroScreenViewOptions, SelfOptions, CalculusGrapherScreenViewOptions>()( {
      isGraphCheckboxIncluded: {
        integralGraph: true,
        derivativeGraph: true,
        secondDerivativeGraph: false
      },
      isIntegralGraphVisible: false,
      isDerivativeGraphVisible: true,
      isSecondDerivativeGraphVisible: false
    }, providedOptions );

    super( model, options );
  }
}

calculusGrapher.register( 'IntegralLabScreenView', IntegralLabScreenView );
