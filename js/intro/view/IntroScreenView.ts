// Copyright 2020-2022, University of Colorado Boulder

/**
 * Top level view for the 'Intro' screen.
 *
 * @author BrandonLi
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherScreenView, { CalculusGrapherScreenViewOptions } from '../../common/view/CalculusGrapherScreenView.js';
import IntroModel from '../model/IntroModel.js';

type SelfOptions = EmptySelfOptions;

export type IntroScreenViewOptions = SelfOptions & CalculusGrapherScreenViewOptions;

export default class IntroScreenView extends CalculusGrapherScreenView {

  public constructor( model: IntroModel, providedOptions?: IntroScreenViewOptions ) {

    const options = optionize<IntroScreenViewOptions, SelfOptions, CalculusGrapherScreenViewOptions>()( {
      isGraphCheckboxIncluded: {
        integralGraph: true,
        derivativeGraph: true,
        secondDerivativeGraph: false
      },
      isIntegralGraphVisible: false,
      isDerivativeGraphVisible: false,
      isSecondDerivativeGraphVisible: false
    }, providedOptions );

    super( model, options );

  }
}

calculusGrapher.register( 'IntroScreenView', IntroScreenView );
