// Copyright 2020-2023, University of Colorado Boulder

/**
 * DerivativeModel is the top-level model for the 'Derivative' screen.
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
import TangentScrubber from '../../common/model/TangentScrubber.js';

type SelfOptions = EmptySelfOptions;

type DerivativeModelOptions = SelfOptions & PickRequired<CalculusGrapherModelOptions, 'graphSets' | 'tandem'>;

export default class DerivativeModel extends CalculusGrapherModel {

  public readonly tangentScrubber: TangentScrubber;

  public constructor( providedOptions: DerivativeModelOptions ) {

    const options = optionize<DerivativeModelOptions, SelfOptions, CalculusGrapherModelOptions>()( {

      // CalculusGrapherModelOptions
      curveManipulationModeChoices: [
        CurveManipulationMode.HILL,
        CurveManipulationMode.PEDESTAL,
        CurveManipulationMode.TILT,
        CurveManipulationMode.SHIFT
      ],
      hasTangentScrubber: true
    }, providedOptions );

    super( options );

    this.tangentScrubber = new TangentScrubber( this.integralCurve, this.originalCurve, this.derivativeCurve,
      this.secondDerivativeCurve, this.toolsTandem.createTandem( 'tangentScrubber' )
    );
  }

  public override reset(): void {
    this.tangentScrubber.reset();
    super.reset();
  }
}
calculusGrapher.register( 'DerivativeModel', DerivativeModel );
