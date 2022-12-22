// Copyright 2020-2022, University of Colorado Boulder

/**
 * Top-level view for the 'Derivative Lab' screen.
 *
 * @author Brandon Li
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherScreenView, { CalculusGrapherScreenViewOptions } from '../../common/view/CalculusGrapherScreenView.js';
import DerivativeModel from '../model/DerivativeModel.js';
import BarometerAccordionBox from '../../common/view/BarometerAccordionBox.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import CalculusGrapherColors from '../../common/CalculusGrapherColors.js';

type SelfOptions = EmptySelfOptions;

type DerivativeScreenViewOptions = SelfOptions & CalculusGrapherScreenViewOptions;

export default class DerivativeScreenView extends CalculusGrapherScreenView {

  public constructor( model: DerivativeModel, providedOptions: DerivativeScreenViewOptions ) {

    const options = optionize<DerivativeScreenViewOptions, SelfOptions, CalculusGrapherScreenViewOptions>()( {
      controlPanelOptions: {
        tangentCheckboxVisible: true,
        smoothButtonVisible: false
      }
    }, providedOptions );

    super( model, options );

    const barometer = new BarometerAccordionBox( model.ancillaryTools.tangentProperty,
      CalculusGrapherStrings.slopeOfTangentStringProperty, {
        visibleProperty: new DerivedProperty( [ this.visibleProperties.tangentVisibleProperty,
            model.predictModeEnabledProperty ],
          ( tangent, predict ) => tangent && !predict ),
        lineOptions: {
          stroke: CalculusGrapherColors.derivativeCurveStrokeProperty
        },
        leftTop: this.layoutBounds.leftTop.plusXY( 20, 50 ),
        tandem: options.tandem.createTandem( 'tangentBarometer' )
      } );

    this.addChild( barometer );
  }
}

calculusGrapher.register( 'DerivativeScreenView', DerivativeScreenView );
