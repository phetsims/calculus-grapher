// Copyright 2020-2022, University of Colorado Boulder

/**
 * Root class (to be subclassed) for the top-level model of every screen in the 'Calculus Grapher' simulation.
 *
 * @author Brandon Li
 */

import calculusGrapher from '../../calculusGrapher.js';
import DerivativeCurve from './DerivativeCurve.js';
import optionize from '../../../../phet-core/js/optionize.js';
import IntegralCurve from './IntegralCurve.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import CurveManipulationMode from './CurveManipulationMode.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import CurveManipulationProperties from './CurveManipulationProperties.js';
import TransformedCurve from './TransformedCurve.js';
import TModel from '../../../../joist/js/TModel.js';
import { GraphSet } from './GraphType.js';
import Tandem from '../../../../tandem/js/Tandem.js';

const CURVE_X_RANGE = CalculusGrapherConstants.CURVE_X_RANGE;

type SelfOptions = {
  graphSets: GraphSet[];
  curveManipulationModeChoices?: CurveManipulationMode[];
};

export type CalculusGrapherModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class CalculusGrapherModel implements TModel {

  // create properties associated with the curve such at the width and mode
  public readonly curveManipulationProperties: CurveManipulationProperties;

  // value to track the x position of the reference line
  public readonly referenceLineXCoordinateProperty: NumberProperty;

  // the model of the various curves
  public readonly originalCurve: TransformedCurve;
  public readonly predictCurve: TransformedCurve;
  public readonly derivativeCurve: DerivativeCurve;
  public readonly integralCurve: IntegralCurve;
  public readonly secondDerivativeCurve: DerivativeCurve;

  public constructor( providedOptions: CalculusGrapherModelOptions ) {

    const options = optionize<CalculusGrapherModelOptions, SelfOptions>()( {
      curveManipulationModeChoices: CurveManipulationMode.enumeration.values
    }, providedOptions );

    this.curveManipulationProperties = new CurveManipulationProperties(
      options.curveManipulationModeChoices,
      { tandem: options.tandem.createTandem( 'curveManipulationProperties' ) }
    );

    this.referenceLineXCoordinateProperty = new NumberProperty( CURVE_X_RANGE.getCenter(), {
      range: CURVE_X_RANGE,
      tandem: options.tandem.createTandem( 'referenceLineXCoordinateProperty' )
    } );

    this.originalCurve = new TransformedCurve( {
      // originalCurve is always instrumented, because it should always be present.
      tandem: options.tandem.createTandem( 'originalCurve' )
    } );

    this.predictCurve = new TransformedCurve( {
      // predictCurve is always instrumented, because it should always be present.
      tandem: options.tandem.createTandem( 'predictCurve' )
    } );

    const graphTypes = _.flatten( options.graphSets );

    this.derivativeCurve = new DerivativeCurve( this.originalCurve,
      graphTypes.includes( 'derivative' ) ? options.tandem.createTandem( 'derivativeCurve' ) : Tandem.OPT_OUT );

    this.secondDerivativeCurve = new DerivativeCurve( this.derivativeCurve,
      graphTypes.includes( 'secondDerivative' ) ? options.tandem.createTandem( 'secondDerivativeCurve' ) : Tandem.OPT_OUT );

    this.integralCurve = new IntegralCurve( this.originalCurve,
      graphTypes.includes( 'integral' ) ? options.tandem.createTandem( 'integralCurve' ) : Tandem.OPT_OUT );
  }

  /**
   * Reset all
   */
  public reset(): void {
    this.curveManipulationProperties.reset();
    this.referenceLineXCoordinateProperty.reset();
    this.originalCurve.reset();
    this.predictCurve.reset();
  }
}

calculusGrapher.register( 'CalculusGrapherModel', CalculusGrapherModel );
