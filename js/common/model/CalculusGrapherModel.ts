// Copyright 2020-2023, University of Colorado Boulder

/**
 * Base class for the top-level model of every screen in the 'Calculus Grapher' simulation.
 *
 * @author Brandon Li
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import calculusGrapher from '../../calculusGrapher.js';
import DerivativeCurve from './DerivativeCurve.js';
import optionize from '../../../../phet-core/js/optionize.js';
import IntegralCurve from './IntegralCurve.js';
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import CurveManipulationMode from './CurveManipulationMode.js';
import CurveManipulationProperties from './CurveManipulationProperties.js';
import TransformedCurve from './TransformedCurve.js';
import TModel from '../../../../joist/js/TModel.js';
import GraphType, { GraphSet } from './GraphType.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Property from '../../../../axon/js/Property.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import ReferenceLine from './ReferenceLine.js';
import VerticalLine from './VerticalLine.js';
import LabeledPoint from './LabeledPoint.js';
import TangentScrubber from './TangentScrubber.js';
import AreaUnderCurveScrubber from './AreaUnderCurveScrubber.js';
import ArrayIO from '../../../../tandem/js/types/ArrayIO.js';
import EnumerationIO from '../../../../tandem/js/types/EnumerationIO.js';

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

  public readonly graphSets: GraphSet[];
  public readonly graphSetProperty: Property<GraphSet>;

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

  // These exist so that we have something to link to from the view.
  // See https://github.com/phetsims/calculus-grapher/issues/198
  public readonly labeledPointsLinkableElement: PhetioObject;
  public readonly verticalLinesLinkableElement: PhetioObject;

  protected constructor( providedOptions: CalculusGrapherModelOptions ) {

    const options = optionize<CalculusGrapherModelOptions, SelfOptions>()( {

      // SelfOptions
      curveManipulationModeChoices: CurveManipulationMode.enumeration.values,
      phetioTangentScrubberInstrumented: false,
      phetioAreaUnderCurveScrubberInstrumented: false
    }, providedOptions );

    assert && assert( options.graphSets.length > 0, 'there must be at least one valid graphSet' );
    assert && assert( options.graphSets.every( graphSet =>
      graphSet.length === _.uniq( graphSet ).length ), 'each element of the graphSet must be unique' );
    assert && assert( _.every( options.graphSets, graphSet => graphSet.length === options.graphSets[ 0 ].length ),
      'all elements of graphSets must have the same length, a current limitation of this sim' );

    this.graphSets = options.graphSets;

    this.graphSetProperty = new Property( options.graphSets[ 0 ], {
      validValues: options.graphSets,
      tandem: options.tandem.createTandem( 'graphSetProperty' ),
      phetioValueType: ArrayIO( EnumerationIO( GraphType ) )
    } );

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
      graphTypes.includes( GraphType.DERIVATIVE ) ? curvesTandem.createTandem( 'derivativeCurve' ) : Tandem.OPT_OUT );

    this.secondDerivativeCurve = new DerivativeCurve( this.derivativeCurve,
      graphTypes.includes( GraphType.SECOND_DERIVATIVE ) ? curvesTandem.createTandem( 'secondDerivativeCurve' ) : Tandem.OPT_OUT );

    this.integralCurve = new IntegralCurve( this.originalCurve,
      graphTypes.includes( GraphType.INTEGRAL ) ? curvesTandem.createTandem( 'integralCurve' ) : Tandem.OPT_OUT );

    const toolsTandem = options.tandem.createTandem( 'tools' );

    this.referenceLine = new ReferenceLine(
      this.integralCurve, this.originalCurve, this.derivativeCurve, this.secondDerivativeCurve,
      toolsTandem.createTandem( 'referenceLine' )
    );

    this.tangentScrubber = new TangentScrubber(
      this.integralCurve, this.originalCurve, this.derivativeCurve, this.secondDerivativeCurve,
      options.phetioTangentScrubberInstrumented ? toolsTandem.createTandem( 'tangentScrubber' ) : Tandem.OPT_OUT
    );

    this.areaUnderCurveScrubber = new AreaUnderCurveScrubber(
      this.integralCurve, this.originalCurve, this.derivativeCurve, this.secondDerivativeCurve,
      options.phetioAreaUnderCurveScrubberInstrumented ? toolsTandem.createTandem( 'areaUnderCurveScrubber' ) : Tandem.OPT_OUT
    );

    // This exists so that we have something we can link to from the view.
    // See https://github.com/phetsims/calculus-grapher/issues/198
    this.labeledPointsLinkableElement = new PhetioObject( {
      tandem: toolsTandem.createTandem( 'labeledPoints' ),
      phetioState: false
    } );

    // LabeledPoint instances, will appear to be children of 'labeledPoints' in the Studio tree.
    this.labeledPoints = LabeledPoint.createLabeledPoints(
      CalculusGrapherConstants.NUMBER_OF_POINT_LABELS,
      this.integralCurve,
      this.originalCurve,
      this.derivativeCurve,
      this.secondDerivativeCurve,
      this.labeledPointsLinkableElement.tandem );

    // This exists so that we have something we can link to from the view.
    // See https://github.com/phetsims/calculus-grapher/issues/198
    this.verticalLinesLinkableElement = new PhetioObject( {
      tandem: toolsTandem.createTandem( 'verticalLines' ),
      phetioState: false
    } );

    // VerticalLine instances, will appear to be children of 'verticalLines' in the Studio tree.
    this.verticalLines = VerticalLine.createVerticalLines(
      CalculusGrapherConstants.NUMBER_OF_VERTICAL_LINES,
      this.integralCurve,
      this.originalCurve,
      this.derivativeCurve,
      this.secondDerivativeCurve,
      this.verticalLinesLinkableElement.tandem );
  }

  /**
   * Reset all
   */
  public reset(): void {
    this.graphSetProperty.reset();
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
}
calculusGrapher.register( 'CalculusGrapherModel', CalculusGrapherModel );
