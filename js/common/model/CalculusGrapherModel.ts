// Copyright 2020-2023, University of Colorado Boulder

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
import { GraphSet, GraphType } from './GraphType.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Property from '../../../../axon/js/Property.js';
import AncillaryTool from './AncillaryTool.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import Curve from './Curve.js';
import LabeledAncillaryTool from './LabeledAncillaryTool.js';

type SelfOptions = {
  graphSets: GraphSet[];
  curveManipulationModeChoices?: CurveManipulationMode[];
  hasTangentTool?: boolean;
  hasAreaUnderCurveTool?: boolean;
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
  public readonly referenceLine: AncillaryTool;
  public readonly tangentTool: AncillaryTool;
  public readonly areaUnderCurveTool: AncillaryTool;

  public readonly pointLabels: LabeledAncillaryTool[];
  public readonly verticalLines: LabeledAncillaryTool[];

  // the model of the various curves
  public readonly originalCurve: TransformedCurve;
  public readonly predictCurve: TransformedCurve;
  public readonly derivativeCurve: DerivativeCurve;
  public readonly integralCurve: IntegralCurve;
  public readonly secondDerivativeCurve: DerivativeCurve;

  protected constructor( providedOptions: CalculusGrapherModelOptions ) {

    const options = optionize<CalculusGrapherModelOptions, SelfOptions>()( {

      // SelfOptions
      curveManipulationModeChoices: CurveManipulationMode.enumeration.values,
      hasTangentTool: false,
      hasAreaUnderCurveTool: false
    }, providedOptions );

    this.curveManipulationProperties = new CurveManipulationProperties( options.curveManipulationModeChoices, {
      tandem: options.tandem.createTandem( 'curveManipulationProperties' )
    } );

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

    this.referenceLine = new AncillaryTool( this.integralCurve, this.originalCurve, this.derivativeCurve, this.secondDerivativeCurve, {
      initialCoordinate: CalculusGrapherConstants.CURVE_X_RANGE.getCenter(),
      tandem: options.tandem.createTandem( 'referenceLine' )
    } );

    this.tangentTool = new AncillaryTool( this.integralCurve, this.originalCurve, this.derivativeCurve, this.secondDerivativeCurve, {
      initialCoordinate: CalculusGrapherConstants.CURVE_X_RANGE.min + CalculusGrapherConstants.CURVE_X_RANGE.getLength() / 3,
      tandem: options.hasTangentTool ? options.tandem.createTandem( 'tangentTool' ) : Tandem.OPT_OUT
    } );

    this.areaUnderCurveTool = new AncillaryTool( this.integralCurve, this.originalCurve, this.derivativeCurve, this.secondDerivativeCurve, {
      initialCoordinate: CalculusGrapherConstants.CURVE_X_RANGE.min,
      tandem: options.hasAreaUnderCurveTool ? options.tandem.createTandem( 'areaUnderCurveTool' ) : Tandem.OPT_OUT
    } );

    this.pointLabels = LabeledAncillaryTool.createTools(
      CalculusGrapherConstants.MAX_POINT_LABELS,
      this.integralCurve,
      this.originalCurve,
      this.derivativeCurve,
      this.secondDerivativeCurve,
      options.tandem.createTandem( 'pointLabels' ), 'PointLabel' );

    this.verticalLines = LabeledAncillaryTool.createTools(
      CalculusGrapherConstants.MAX_VERTICAL_LINES,
      this.integralCurve,
      this.originalCurve,
      this.derivativeCurve,
      this.secondDerivativeCurve,
      options.tandem.createTandem( 'verticalLines' ), 'VerticalLine' );
  }

  /**
   * Reset all
   */
  public reset(): void {
    this.originalCurve.reset();
    this.predictCurve.reset();
    this.curveManipulationProperties.reset();
    this.predictModeEnabledProperty.reset();

    this.referenceLine.reset();
    this.tangentTool.reset();
    this.areaUnderCurveTool.reset();

    this.pointLabels.forEach( pointLabel => pointLabel.reset() );
    this.verticalLines.forEach( verticalLineTool => verticalLineTool.reset() );
  }

  public getCurve( graphType: GraphType ): Curve {
    const curve = graphType === 'integral' ? this.integralCurve :
                  graphType === 'original' ? this.originalCurve :
                  graphType === 'derivative' ? this.derivativeCurve :
                  graphType === 'secondDerivative' ? this.secondDerivativeCurve :
                  null;
    assert && assert( curve );
    return curve!;
  }
}
calculusGrapher.register( 'CalculusGrapherModel', CalculusGrapherModel );
