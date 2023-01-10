// Copyright 2020-2022, University of Colorado Boulder

/**
 * Top level model for the 'Integral Lab' screen.
 *
 * @author Brandon Li
 */

import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherModel, { CalculusGrapherModelOptions } from '../../common/model/CalculusGrapherModel.js';
import optionize from '../../../../phet-core/js/optionize.js';
import CurveManipulationMode from '../../common/model/CurveManipulationMode.js';
import CalculusGrapherConstants from '../../common/CalculusGrapherConstants.js';
import AncillaryTool from '../../common/model/AncillaryTool.js';

const CURVE_X_RANGE = CalculusGrapherConstants.CURVE_X_RANGE;

type SelfOptions = {
  curveManipulationModeChoices?: CurveManipulationMode[];
};
export type IntegralModelOptions = SelfOptions & CalculusGrapherModelOptions;

export default class IntegralModel extends CalculusGrapherModel {

  // model associated with the scrubber on the original graph
  public readonly areaUnderCurveTool: AncillaryTool;

  public constructor( providedOptions: IntegralModelOptions ) {
    const options = optionize<IntegralModelOptions, SelfOptions, CalculusGrapherModelOptions>()( {
      curveManipulationModeChoices: [
        CurveManipulationMode.HILL,
        CurveManipulationMode.PEDESTAL,
        CurveManipulationMode.TILT,
        CurveManipulationMode.SHIFT
      ]
    }, providedOptions );

    super( options );

    this.areaUnderCurveTool = new AncillaryTool( this.integralCurve, this.originalCurve, this.derivativeCurve, this.secondDerivativeCurve, {
      initialCoordinate: CURVE_X_RANGE.min,
      tandem: options.tandem.createTandem( 'areaUnderCurveTool' )
    } );
  }

  /**
   * Reset all
   */
  public override reset(): void {
    super.reset();
    this.areaUnderCurveTool.reset();
  }
}

calculusGrapher.register( 'IntegralModel', IntegralModel );
