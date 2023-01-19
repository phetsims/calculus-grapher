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
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import Curve from './Curve.js';
import ReferenceLine from './ReferenceLine.js';
import VerticalLine from './VerticalLine.js';
import LabeledPoint from './LabeledPoint.js';
import TangentScrubber from './TangentScrubber.js';
import AreaUnderCurveScrubber from './AreaUnderCurveScrubber.js';

type SelfOptions = {

  // Identifies the graphs that are supported by the screen associated with this model, and should therefore
  // be instrumented for PhET-iO.
  graphSets: GraphSet[];

  // Identifies the curve manipulation modes that are supported by the screen associated with this model.
  curveManipulationModeChoices?: CurveManipulationMode[];

  // Should the TangentScrubber be instrumented for PhET-iO?
  phetioTangentScrubberInstrumented?: boolean;

  // Should the AreaUnderCurveScrubber be instrumented for PhET-iO?
  phetioAreaUnderCurveScrubberInstrumented?: boolean;
};

export type CalculusGrapherModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class CalculusGrapherModel implements TModel {

  // Properties associated with curve manipulation
  public readonly curveManipulationProperties: CurveManipulationProperties;

  // Is the predict mode enabled for the original graph?
  public readonly predictModeEnabledProperty: Property<boolean>;

  // model elements for the various curves
  public readonly originalCurve: TransformedCurve;
  public readonly predictCurve: TransformedCurve;
  public readonly derivativeCurve: DerivativeCurve;
  public readonly integralCurve: IntegralCurve;
  public readonly secondDerivativeCurve: DerivativeCurve;

  // which curve to apply operations to
  public readonly curveToTransformProperty: TReadOnlyProperty<TransformedCurve>;

  // model elements for the various tools
  public readonly referenceLine: ReferenceLine;
  public readonly tangentScrubber: TangentScrubber;
  public readonly areaUnderCurveScrubber: AreaUnderCurveScrubber;
  public readonly labeledPoints: LabeledPoint[];
  public readonly verticalLines: VerticalLine[];

  protected constructor( providedOptions: CalculusGrapherModelOptions ) {

    const options = optionize<CalculusGrapherModelOptions, SelfOptions>()( {

      // SelfOptions
      curveManipulationModeChoices: CurveManipulationMode.enumeration.values,
      phetioTangentScrubberInstrumented: false,
      phetioAreaUnderCurveScrubberInstrumented: false
    }, providedOptions );

    this.curveManipulationProperties = new CurveManipulationProperties( options.curveManipulationModeChoices, {
      tandem: options.tandem.createTandem( 'curveManipulationProperties' )
    } );

    this.predictModeEnabledProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'predictModeEnabledProperty' )
    } );

    const curvesTandem = options.tandem.createTandem( 'curves' );

    this.originalCurve = new TransformedCurve( {
      // originalCurve is always instrumented, because it should always be present.
      tandem: curvesTandem.createTandem( 'originalCurve' ),
      phetioDocumentation: 'The curve that corresponds to the original function'
    } );

    this.predictCurve = new TransformedCurve( {
      // predictCurve is always instrumented, because it should always be present.
      tandem: curvesTandem.createTandem( 'predictCurve' )
    } );

    this.curveToTransformProperty = new DerivedProperty( [ this.predictModeEnabledProperty ],
      predictModeEnabled => predictModeEnabled ? this.predictCurve : this.originalCurve
    );

    // Create a flat array of the supported GraphTypes. This is then used to conditionally instrument curves.
    const graphTypes = options.graphSets.flat();

    this.derivativeCurve = new DerivativeCurve( this.originalCurve,
      graphTypes.includes( 'derivative' ) ? curvesTandem.createTandem( 'derivativeCurve' ) : Tandem.OPT_OUT );

    this.secondDerivativeCurve = new DerivativeCurve( this.derivativeCurve,
      graphTypes.includes( 'secondDerivative' ) ? curvesTandem.createTandem( 'secondDerivativeCurve' ) : Tandem.OPT_OUT );

    this.integralCurve = new IntegralCurve( this.originalCurve,
      graphTypes.includes( 'integral' ) ? curvesTandem.createTandem( 'integralCurve' ) : Tandem.OPT_OUT );

    const toolsTandem = options.tandem.createTandem( 'tools' );

    this.referenceLine = new ReferenceLine( this.integralCurve, this.originalCurve, this.derivativeCurve, this.secondDerivativeCurve, {
      tandem: toolsTandem.createTandem( 'referenceLine' )
    } );

    this.tangentScrubber = new TangentScrubber( this.integralCurve, this.originalCurve, this.derivativeCurve,
      this.secondDerivativeCurve, {
        tandem: options.phetioTangentScrubberInstrumented ? toolsTandem.createTandem( 'tangentScrubber' ) : Tandem.OPT_OUT
      } );

    this.areaUnderCurveScrubber = new AreaUnderCurveScrubber( this.integralCurve, this.originalCurve, this.derivativeCurve,
      this.secondDerivativeCurve, {
        tandem: options.phetioAreaUnderCurveScrubberInstrumented ? toolsTandem.createTandem( 'areaUnderCurveScrubber' ) : Tandem.OPT_OUT
      } );

    this.labeledPoints = LabeledPoint.createMultiple(
      CalculusGrapherConstants.NUMBER_OF_POINT_LABELS,
      this.integralCurve,
      this.originalCurve,
      this.derivativeCurve,
      this.secondDerivativeCurve,
      toolsTandem.createTandem( 'labeledPoints' ) );

    this.verticalLines = VerticalLine.createMultiple(
      CalculusGrapherConstants.NUMBER_OF_VERTICAL_LINES,
      this.integralCurve,
      this.originalCurve,
      this.derivativeCurve,
      this.secondDerivativeCurve,
      toolsTandem.createTandem( 'verticalLines' ) );
  }

  /**
   * Reset all
   */
  public reset(): void {
    this.originalCurve.reset();
    this.predictCurve.reset();
    this.curveManipulationProperties.reset();
    this.predictModeEnabledProperty.reset();

    // Reset tools
    this.referenceLine.reset();
    this.tangentScrubber.reset();
    this.areaUnderCurveScrubber.reset();
    // Do not reset this.labeledPoints, because they are configured only via PhET-iO.
    // Do not reset this.verticalLines, because they are configured only via PhET-iO.
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
