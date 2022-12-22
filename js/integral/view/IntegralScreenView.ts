// Copyright 2020-2022, University of Colorado Boulder

/**
 * Top-level view for the 'Integral Lab' screen.
 *
 * @author BrandonLi
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherScreenView, { CalculusGrapherScreenViewOptions } from '../../common/view/CalculusGrapherScreenView.js';
import IntegralModel from '../model/IntegralModel.js';
import BarometerAccordionBox from '../../common/view/BarometerAccordionBox.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import CalculusGrapherColors from '../../common/CalculusGrapherColors.js';

type SelfOptions = EmptySelfOptions;

export type IntroScreenViewOptions = SelfOptions & CalculusGrapherScreenViewOptions;

export default class IntegralScreenView extends CalculusGrapherScreenView {

  public constructor( model: IntegralModel, providedOptions: IntroScreenViewOptions ) {

    const options = optionize<IntroScreenViewOptions, SelfOptions, CalculusGrapherScreenViewOptions>()( {
      controlPanelOptions: {
        areaUnderCurveCheckboxVisible: true,
        smoothButtonVisible: false
      }
    }, providedOptions );

    super( model, options );

    const barometer = new BarometerAccordionBox( model.ancillaryTools.areaUnderCurveProperty,
      CalculusGrapherStrings.areaUnderCurveStringProperty, {
        visibleProperty: new DerivedProperty( [ this.visibleProperties.areaUnderCurveVisibleProperty,
            model.predictModeEnabledProperty ],
          ( area, predict ) => area && !predict ),
        lineOptions: {
          stroke: CalculusGrapherColors.integralCurveStrokeProperty
        },
        leftTop: this.layoutBounds.leftTop.plusXY( 20, 20 )
      } );

    this.addChild( barometer );

  }
}

calculusGrapher.register( 'IntegralScreenView', IntegralScreenView );
