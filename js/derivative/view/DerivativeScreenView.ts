// Copyright 2020-2022, University of Colorado Boulder

/**
 * Top level view for the 'Derivative Lab' screen.
 *
 * @author BrandonLi
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherScreenView, { CalculusGrapherScreenViewOptions } from '../../common/view/CalculusGrapherScreenView.js';
import DerivativeModel from '../model/DerivativeModel.js';

type SelfOptions = EmptySelfOptions;

export type IntroScreenViewOptions = SelfOptions & CalculusGrapherScreenViewOptions;

export default class DerivativeScreenView extends CalculusGrapherScreenView {

  public constructor( model: DerivativeModel, providedOptions: IntroScreenViewOptions ) {

    const options = optionize<IntroScreenViewOptions, SelfOptions, CalculusGrapherScreenViewOptions>()( {
      graphsCheckboxGroupOptions: {
        isGraphCheckboxIncluded: {
          integralGraph: false,
          derivativeGraph: false,
          secondDerivativeGraph: false
        }
      },
      visiblePropertiesOptions: {
        isIntegralGraphVisible: false,
        isDerivativeGraphVisible: true,
        isSecondDerivativeGraphVisible: false
      }
    }, providedOptions );

    super( model, options );
  }
}

calculusGrapher.register( 'DerivativeScreenView', DerivativeScreenView );
