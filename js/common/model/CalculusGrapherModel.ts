// Copyright 2020-2022, University of Colorado Boulder

/**
 * Base class for the top-level model of every screen in the 'Calculus Grapher' simulation.
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
import CurveManipulationProperties from './CurveManipulationProperties.js';
import TransformedCurve from './TransformedCurve.js';
import TModel from '../../../../joist/js/TModel.js';
import { GraphSet } from './GraphType.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import ReferenceLine from './ReferenceLine.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Property from '../../../../axon/js/Property.js';
import AncillaryTools from './AncillaryTools.js';

type SelfOptions = {
  graphSets: GraphSet[];
  curveManipulationModeChoices?: CurveManipulationMode[];
};

export type CalculusGrapherModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class CalculusGrapherModel implements TModel {

  // create properties associated with the curve such at the width and mode
  public readonly curveManipulationProperties: CurveManipulationProperties;

  // is the predict mode enabled for the original graph
  public readonly predictModeEnabledProperty: Property<boolean>;

  // which curve to apply operations to
  public readonly curveToTransformProperty: TReadOnlyProperty<TransformedCurve>;

  // model for the reference line
  public readonly referenceLine: ReferenceLine;

  // the model of the various curves
  public readonly originalCurve: TransformedCurve;
  public readonly predictCurve: TransformedCurve;
  public readonly derivativeCurve: DerivativeCurve;
  public readonly integralCurve: IntegralCurve;
  public readonly secondDerivativeCurve: DerivativeCurve;

  // model associated with the scrubber on the original graph
  public readonly ancillaryTools: AncillaryTools;

  protected constructor( providedOptions: CalculusGrapherModelOptions ) {

    const options = optionize<CalculusGrapherModelOptions, SelfOptions>()( {
      curveManipulationModeChoices: CurveManipulationMode.enumeration.values
    }, providedOptions );

    this.curveManipulationProperties = new CurveManipulationProperties(
      options.curveManipulationModeChoices,
      { tandem: options.tandem.createTandem( 'curveManipulationProperties' ) }
    );

    this.originalCurve = new TransformedCurve( {
      // originalCurve is always instrumented, because it should always be present.
      tandem: options.tandem.createTandem( 'originalCurve' ),
      phetioDocumentation: 'The curve that corresponds to the original function'
    } );

    this.predictCurve = new TransformedCurve( {
      // predictCurve is always instrumented, because it should always be present.
      tandem: options.tandem.createTandem( 'predictCurve' )
    } );

    this.predictModeEnabledProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'predictModeEnabledProperty' )
    } );

    this.curveToTransformProperty = new DerivedProperty( [ this.predictModeEnabledProperty ],
      predictModeEnabled => predictModeEnabled ? this.predictCurve : this.originalCurve
    );

    const graphTypes = options.graphSets.flat();

    this.derivativeCurve = new DerivativeCurve( this.originalCurve,
      graphTypes.includes( 'derivative' ) ? options.tandem.createTandem( 'derivativeCurve' ) : Tandem.OPT_OUT );

    this.secondDerivativeCurve = new DerivativeCurve( this.derivativeCurve,
      graphTypes.includes( 'secondDerivative' ) ? options.tandem.createTandem( 'secondDerivativeCurve' ) : Tandem.OPT_OUT );

    this.integralCurve = new IntegralCurve( this.originalCurve,
      graphTypes.includes( 'integral' ) ? options.tandem.createTandem( 'integralCurve' ) : Tandem.OPT_OUT );

    this.referenceLine = new ReferenceLine(
      { tandem: options.tandem.createTandem( 'referenceLine' ) }
    );

    this.ancillaryTools = new AncillaryTools(
      this.originalCurve,
      this.derivativeCurve,
      this.integralCurve, {
        initialCoordinate: 0,
        tandem: options.tandem.createTandem( 'ancillaryTools' )
      } );
  }

  /**
   * Reset all
   */
  public reset(): void {
    this.curveManipulationProperties.reset();
    this.referenceLine.reset();
    this.originalCurve.reset();
    this.predictCurve.reset();
    this.predictModeEnabledProperty.reset();
    this.ancillaryTools.reset();
  }
}

calculusGrapher.register( 'CalculusGrapherModel', CalculusGrapherModel );
