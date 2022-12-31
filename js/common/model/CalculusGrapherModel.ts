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
import { GraphSet, GraphType } from './GraphType.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Property from '../../../../axon/js/Property.js';
import AncillaryTool, { AncillaryToolOptions } from './AncillaryTool.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import Range from '../../../../dot/js/Range.js';
import Curve from './Curve.js';

const CURVE_X_RANGE = CalculusGrapherConstants.CURVE_X_RANGE;

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
  public readonly referenceLine: AncillaryTool;

  // model associated with the scrubber on the original graph
  public readonly labelledPoints: AncillaryTool[];

  // model associated with the scrubber on the original graph
  public readonly labelledVerticalLines: AncillaryTool[];

  // the model of the various curves
  public readonly originalCurve: TransformedCurve;
  public readonly predictCurve: TransformedCurve;
  public readonly derivativeCurve: DerivativeCurve;
  public readonly integralCurve: IntegralCurve;
  public readonly secondDerivativeCurve: DerivativeCurve;

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

    this.referenceLine = this.createAncillaryTool( {
      initialCoordinate: CURVE_X_RANGE.getCenter(),
      tandem: options.tandem.createTandem( 'referenceLine' )
    } );

    this.labelledPoints = this.createAncillaryTools( 10,
      options.tandem.createTandem( 'points' ), 'Point' );

    this.labelledVerticalLines = this.createAncillaryTools( 10,
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

    this.labelledPoints.forEach( point => point.reset() );
    this.labelledVerticalLines.forEach( line => line.reset() );
  }

  protected createAncillaryTool( providedOptions?: AncillaryToolOptions ): AncillaryTool {

    const options = optionize<AncillaryToolOptions>()( {}, providedOptions );

    return new AncillaryTool( this.integralCurve, this.originalCurve, this.derivativeCurve, this.secondDerivativeCurve,
      options );
  }

  // returns an array of 'totalNumber' AncillaryTool, with evenly spaced initialCoordinates,
  // stamped with alphabetically ordered tandem names.
  private createAncillaryTools( totalNumber: number, tandem: Tandem, tandemSuffix: string ): AncillaryTool[] {

    return CalculusGrapherModel.arrayGenerator( totalNumber ).map( value => this.createAncillaryTool( {
      initialCoordinate: CURVE_X_RANGE.expandNormalizedValue( value / totalNumber ),
      tandem: tandem.createTandem( `${CalculusGrapherModel.intToUppercaseLetter( value )}${tandemSuffix}` )
    } ) );
  }

  public static intToUppercaseLetter( integer: number ): string {
    assert && assert( ( new Range( 0, 25 ) ).contains( integer ), `integer must range from 0 to 25: ${integer}` );
    assert && assert( Number.isInteger( integer ), `must be an integer: ${integer}` );

    return String.fromCharCode( integer + 'A'.charCodeAt( 0 ) );
  }

  /**
   * generate an array of consecutive numbers
   * @param length - length of the array
   * @param start - initial value of the array
   */
  public static arrayGenerator( length: number, start = 0 ): number[] {
    assert && assert( Number.isInteger( length ), `length must be an integer: ${length}` );
    assert && assert( length >= 0, `length cannot be negative: ${length}` );

    return [ ...Array( length ).keys() ].map( number => number + start );
  }

  public getCurve( graphType: GraphType ): Curve {
    return ( graphType === 'original' ) ? this.originalCurve :
           ( graphType === 'integral' ) ? this.integralCurve :
           ( graphType === 'derivative' ) ? this.derivativeCurve :
           ( graphType === 'secondDerivative' ) ? this.secondDerivativeCurve :
           null!;
  }
}
calculusGrapher.register( 'CalculusGrapherModel', CalculusGrapherModel );
