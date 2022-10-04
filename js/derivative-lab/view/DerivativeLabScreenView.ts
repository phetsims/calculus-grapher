// Copyright 2020-2022, University of Colorado Boulder

/**
 * Top level view for the 'Derivative Lab' screen.
 *
 * @author BrandonLi
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherScreenView, { CalculusGrapherScreenViewOptions } from '../../common/view/CalculusGrapherScreenView.js';
import DerivativeLabModel from '../model/DerivativeLabModel.js';

type SelfOptions = EmptySelfOptions;

export type IntroScreenViewOptions = SelfOptions & CalculusGrapherScreenViewOptions;

export default class DerivativeLabScreenView extends CalculusGrapherScreenView {

  public constructor( model: DerivativeLabModel, providedOptions: IntroScreenViewOptions ) {

    const options = optionize<IntroScreenViewOptions, SelfOptions, CalculusGrapherScreenViewOptions>()( {
      checkboxGroupOptions: {
        isGraphCheckboxIncluded: {
          integralGraph: false,
          derivativeGraph: true,
          secondDerivativeGraph: true
        }
      },
      visiblePropertiesOptions: {
        isIntegralGraphVisible: false,
        isDerivativeGraphVisible: true,
        isSecondDerivativeGraphVisible: true
      }
    }, providedOptions );

    super( model, options );
  }
}

calculusGrapher.register( 'DerivativeLabScreenView', DerivativeLabScreenView );
