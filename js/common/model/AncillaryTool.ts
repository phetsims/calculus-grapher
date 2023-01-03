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

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import Curve from './Curve.js';
import { GraphType } from './GraphType.js';

const CURVE_X_RANGE = CalculusGrapherConstants.CURVE_X_RANGE;

type SelfOptions = {
  initialCoordinate: number;
};

export type AncillaryToolOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class AncillaryTool extends PhetioObject {

  // value to track the x position
  public readonly xProperty: NumberProperty;

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

    const yIntegralProperty = new DerivedProperty( [ this.xProperty ],
      x => integralCurve.getYAt( x ), {
        tandem: options.tandem.createTandem( 'yIntegralProperty' ),
        phetioValueType: NumberIO
      } );

    const yOriginalProperty = new DerivedProperty( [ this.xProperty ],
      x => originalCurve.getYAt( x ), {
        tandem: options.tandem.createTandem( 'yOriginalProperty' ),
        phetioValueType: NumberIO
      } );

    const yDerivativeProperty = new DerivedProperty( [ this.xProperty ],
      x => derivativeCurve.getYAt( x ), {
        tandem: options.tandem.createTandem( 'yDerivativeProperty' ),
        phetioValueType: NumberIO
      } );

    const ySecondDerivativeProperty = new DerivedProperty( [ this.xProperty ],
      x => secondDerivativeCurve.getYAt( x ), {
        tandem: options.tandem.createTandem( 'ySecondDerivativeProperty' ),
        phetioValueType: NumberIO
      } );

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

calculusGrapher.register( 'AncillaryTool', AncillaryTool );
