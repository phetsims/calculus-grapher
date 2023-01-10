// Copyright 2022-2023, University of Colorado Boulder

/**
 * AncillaryTool is the model class associated with an x value on the graph
 * it keeps track of all quantities associated with the x value: such as
 *  - the integral of f(x)
 *  - the original function f(x)
 *  - the derivative f'(x)
 *  - the second derivative of f(x)
 *
 * @author Martin Veillette
 */

import DerivedProperty, { UnknownDerivedProperty } from '../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import NullableIO from '../../../../tandem/js/types/NullableIO.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import Curve from './Curve.js';
import { GraphType } from './GraphType.js';
import Tandem from '../../../../tandem/js/Tandem.js';

const CURVE_X_RANGE = CalculusGrapherConstants.CURVE_X_RANGE;

type SelfOptions = {
  initialCoordinate: number;
};

export type AncillaryToolOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class AncillaryTool extends PhetioObject {

  // value to track the x position
  public readonly xProperty: NumberProperty;

  // y values from CurvePoint
  public readonly yIntegralProperty: TReadOnlyProperty<number>;
  public readonly yOriginalProperty: TReadOnlyProperty<number>;
  public readonly yDerivativeProperty: TReadOnlyProperty<number>;
  public readonly ySecondDerivativeProperty: TReadOnlyProperty<number>;

  public constructor(
    integralCurve: Curve,
    originalCurve: Curve,
    derivativeCurve: Curve,
    secondDerivativeCurve: Curve,
    providedOptions: AncillaryToolOptions ) {

    const options = optionize<AncillaryToolOptions, SelfOptions, PhetioObjectOptions>()( {
      phetioState: false
    }, providedOptions );

    super( options );

    this.xProperty = new NumberProperty( options.initialCoordinate, {
      range: CURVE_X_RANGE,
      tandem: options.tandem.createTandem( 'xCoordinateProperty' )
    } );

    // We used const above for each DerivedProperty so that we could call recomputeDerivation.
    // So now assign them to fields of type TReadOnlyProperty<number>.
    const yIntegralProperty = createProperties( this.xProperty, integralCurve, options.tandem.createTandem( 'yIntegralProperty' ) );
    const yOriginalProperty = createProperties( this.xProperty, originalCurve, options.tandem.createTandem( 'yOriginalProperty' ) );
    const yDerivativeProperty = createProperties( this.xProperty, derivativeCurve, options.tandem.createTandem( 'yDerivativeProperty' ) );
    const ySecondDerivativeProperty = createProperties( this.xProperty, secondDerivativeCurve, options.tandem.createTandem( 'ySecondDerivativeProperty' ) );

    // When a curve is changed, update its associated y Property.
    integralCurve.curveChangedEmitter.addListener( () => yIntegralProperty.recomputeDerivation() );
    originalCurve.curveChangedEmitter.addListener( () => yOriginalProperty.recomputeDerivation() );
    derivativeCurve.curveChangedEmitter.addListener( () => yDerivativeProperty.recomputeDerivation() );
    secondDerivativeCurve.curveChangedEmitter.addListener( () => ySecondDerivativeProperty.recomputeDerivation() );

    // We used const above for each DerivedProperty so that we could call recomputeDerivation.
    // So now assign them to fields of type TReadOnlyProperty<number>.
    this.yIntegralProperty = yIntegralProperty;
    this.yOriginalProperty = yOriginalProperty;
    this.yDerivativeProperty = yDerivativeProperty;
    this.ySecondDerivativeProperty = ySecondDerivativeProperty;
  }

  /**
   * Reset all
   */
  public reset(): void {
    this.xProperty.reset();
  }

  /**
   * Gets the y Property associated with the specified graph type.
   */
  public getYProperty( graphType: GraphType ): TReadOnlyProperty<number> {
    const yProperty = graphType === 'integral' ? this.yIntegralProperty :
                      graphType === 'original' ? this.yOriginalProperty :
                      graphType === 'derivative' ? this.yDerivativeProperty :
                      graphType === 'secondDerivative' ? this.ySecondDerivativeProperty :
                      null;
    assert && assert( yProperty );
    return yProperty!;
  }
}

/**
 * Creates 3 Properties associates with evaluating the y value for a curve. Only one of these Properties
 * is returned. For the other 2: one (curvePointProperty) is a dependency and the other (yStudioProperty)
 * is created solely for PhET-iO only. See https://github.com/phetsims/calculus-grapher/issues/133.
 * @param xProperty
 * @param curve
 * @param tandem - CAREFUL! This tandem instruments the PhET-iO Property, not the Property used by AncillaryTool.
 */
function createProperties( xProperty: TReadOnlyProperty<number>, curve: Curve, tandem: Tandem ): UnknownDerivedProperty<number> {

  const curvePointProperty = new DerivedProperty( [ xProperty ],
    x => curve.getClosestPointAt( x )
  );

  const yProperty = DerivedProperty.deriveAny( [ curvePointProperty ], () => curvePointProperty.value.y );

  // We are creating this Property solely for PhET-iO, to present the y value. For discontinuities, we present null.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const yStudioProperty = new DerivedProperty( [ curvePointProperty ],
    curvePoint => curvePoint.pointType === 'discontinuous' ? null : curvePoint.y, {
      tandem: tandem,
      phetioValueType: NullableIO( NumberIO )
    } );

  return yProperty;
}

calculusGrapher.register( 'AncillaryTool', AncillaryTool );
