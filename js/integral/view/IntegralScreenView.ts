// Copyright 2020-2022, University of Colorado Boulder

/**
 * Top level view for the 'Integral Lab' screen.
 *
 * @author BrandonLi
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherScreenView, { CalculusGrapherScreenViewOptions } from '../../common/view/CalculusGrapherScreenView.js';
import IntegralModel from '../model/IntegralModel.js';

type SelfOptions = EmptySelfOptions;

export type IntroScreenViewOptions = SelfOptions & StrictOmit<CalculusGrapherScreenViewOptions, 'graphSets'>;

export default class IntegralScreenView extends CalculusGrapherScreenView {

  public constructor( model: IntegralModel, providedOptions: IntroScreenViewOptions ) {

    const options = optionize<IntroScreenViewOptions, SelfOptions, CalculusGrapherScreenViewOptions>()( {
      graphSets: [
        [ 'integral', 'original' ]
      ],
      controlPanelOptions: {
        checkboxGroup: {
          areaUnderCurveCheckboxProperty: new BooleanProperty( true )
        }
      }
    }, providedOptions );

    super( model, options );
  }
}

calculusGrapher.register( 'IntegralScreenView', IntegralScreenView );
