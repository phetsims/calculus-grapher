// Copyright 2020-2023, University of Colorado Boulder

/**
 * Top level model for the 'Derivative Lab' screen.
 *
 * @author Brandon Li
 */

import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherModel, { CalculusGrapherModelOptions } from '../../common/model/CalculusGrapherModel.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import CurveManipulationMode from '../../common/model/CurveManipulationMode.js';

type SelfOptions = EmptySelfOptions;

export type DerivativeModelOptions = SelfOptions & CalculusGrapherModelOptions;

export default class DerivativeModel extends CalculusGrapherModel {

  public constructor( providedOptions: DerivativeModelOptions ) {

    const options = optionize<DerivativeModelOptions, SelfOptions, CalculusGrapherModelOptions>()( {

      // CalculusGrapherModelOptions
      curveManipulationModeChoices: [
        CurveManipulationMode.HILL,
        CurveManipulationMode.PEDESTAL,
        CurveManipulationMode.TILT,
        CurveManipulationMode.SHIFT
      ],
      hasTangentTool: true
    }, providedOptions );

    super( options );
  }
}
calculusGrapher.register( 'DerivativeModel', DerivativeModel );
