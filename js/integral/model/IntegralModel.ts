// Copyright 2020-2023, University of Colorado Boulder

/**
 * IntegralModel is the top-level model for the 'Integral' screen.
 *
 * @author Brandon Li
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherModel, { CalculusGrapherModelOptions } from '../../common/model/CalculusGrapherModel.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import CurveManipulationMode from '../../common/model/CurveManipulationMode.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import AreaUnderCurveScrubber from '../../common/model/AreaUnderCurveScrubber.js';

type SelfOptions = EmptySelfOptions;

type IntegralModelOptions = SelfOptions & PickRequired<CalculusGrapherModelOptions, 'graphSets' | 'tandem'>;

export default class IntegralModel extends CalculusGrapherModel {

  public readonly areaUnderCurveScrubber: AreaUnderCurveScrubber;

  public constructor( providedOptions: IntegralModelOptions ) {

    const options = optionize<IntegralModelOptions, SelfOptions, CalculusGrapherModelOptions>()( {

      // CalculusGrapherModelOptions
      curveManipulationModeChoices: [
        CurveManipulationMode.HILL,
        CurveManipulationMode.PEDESTAL,
        CurveManipulationMode.TILT,
        CurveManipulationMode.SHIFT
      ],
      hasAreaUnderCurveScrubber: true
    }, providedOptions );

    super( options );

    this.areaUnderCurveScrubber = new AreaUnderCurveScrubber( this.integralCurve, this.originalCurve,
      this.derivativeCurve, this.secondDerivativeCurve, this.toolsTandem.createTandem( 'areaUnderCurveScrubber' ) );
  }

  public override reset(): void {
    this.areaUnderCurveScrubber.reset();
    super.reset();
  }
}

calculusGrapher.register( 'IntegralModel', IntegralModel );
