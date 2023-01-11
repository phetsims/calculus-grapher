// Copyright 2020-2023, University of Colorado Boulder

/**
 * Top level model for the 'Integral Lab' screen.
 *
 * @author Brandon Li
 */

import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherModel, { CalculusGrapherModelOptions } from '../../common/model/CalculusGrapherModel.js';
import optionize from '../../../../phet-core/js/optionize.js';
import CurveManipulationMode from '../../common/model/CurveManipulationMode.js';

type SelfOptions = {
  curveManipulationModeChoices?: CurveManipulationMode[];
};

export type IntegralModelOptions = SelfOptions & CalculusGrapherModelOptions;

export default class IntegralModel extends CalculusGrapherModel {

  public constructor( providedOptions: IntegralModelOptions ) {

    const options = optionize<IntegralModelOptions, SelfOptions, CalculusGrapherModelOptions>()( {

      // SelfOptions
      curveManipulationModeChoices: [
        CurveManipulationMode.HILL,
        CurveManipulationMode.PEDESTAL,
        CurveManipulationMode.TILT,
        CurveManipulationMode.SHIFT
      ],
      hasAreaUnderCurveTool: true
    }, providedOptions );

    super( options );
  }
}

calculusGrapher.register( 'IntegralModel', IntegralModel );
