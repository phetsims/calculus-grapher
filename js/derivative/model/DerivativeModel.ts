// Copyright 2020-2023, University of Colorado Boulder

/**
 * Top level model for the 'Derivative Lab' screen.
 *
 * @author Brandon Li
 */

import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherModel, { CalculusGrapherModelOptions } from '../../common/model/CalculusGrapherModel.js';
import optionize from '../../../../phet-core/js/optionize.js';
import CurveManipulationMode from '../../common/model/CurveManipulationMode.js';
import AncillaryTool from '../../common/model/AncillaryTool.js';
import CalculusGrapherConstants from '../../common/CalculusGrapherConstants.js';

const CURVE_X_RANGE = CalculusGrapherConstants.CURVE_X_RANGE;

type SelfOptions = {
  curveManipulationModeChoices?: CurveManipulationMode[];
};
export type DerivativeModelOptions = SelfOptions & CalculusGrapherModelOptions;

export default class DerivativeModel extends CalculusGrapherModel {

  public readonly tangentTool: AncillaryTool;

  public constructor( providedOptions: DerivativeModelOptions ) {
    const options = optionize<DerivativeModelOptions, SelfOptions, CalculusGrapherModelOptions>()( {
      curveManipulationModeChoices: [
        CurveManipulationMode.HILL,
        CurveManipulationMode.PEDESTAL,
        CurveManipulationMode.TILT,
        CurveManipulationMode.SHIFT
      ]
    }, providedOptions );

    super( options );

    this.tangentTool = new AncillaryTool( this.integralCurve, this.originalCurve, this.derivativeCurve, this.secondDerivativeCurve, {
      initialCoordinate: CURVE_X_RANGE.min + CURVE_X_RANGE.getLength() / 3,
      tandem: options.tandem.createTandem( 'tangentTool' )
    } );
  }

  /**
   * Reset all
   */
  public override reset(): void {
    super.reset();
    this.tangentTool.reset();
  }
}
calculusGrapher.register( 'DerivativeModel', DerivativeModel );
