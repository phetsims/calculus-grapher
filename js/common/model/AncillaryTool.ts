// Copyright 2022, University of Colorado Boulder

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

    this.yIntegralProperty = new DerivedProperty( [ this.xProperty ],
      x => integralCurve.getYAt( x ), {
        tandem: options.tandem.createTandem( 'yIntegralProperty' ),
        phetioValueType: NumberIO
      } );

    this.yOriginalProperty = new DerivedProperty( [ this.xProperty ],
      x => originalCurve.getYAt( x ), {
        tandem: options.tandem.createTandem( 'yOriginalProperty' ),
        phetioValueType: NumberIO
      } );

    this.yDerivativeProperty = new DerivedProperty( [ this.xProperty ],
      x => derivativeCurve.getYAt( x ), {
        tandem: options.tandem.createTandem( 'yDerivativeProperty' ),
        phetioValueType: NumberIO
      } );

    this.ySecondDerivativeProperty = new DerivedProperty( [ this.xProperty ],
      x => secondDerivativeCurve.getYAt( x ), {
        tandem: options.tandem.createTandem( 'ySecondDerivativeProperty' ),
        phetioValueType: NumberIO
      } );

    const curveChangedListener = () => this.xProperty.notifyListenersStatic();
    integralCurve.curveChangedEmitter.addListener( curveChangedListener );
    originalCurve.curveChangedEmitter.addListener( curveChangedListener );
    derivativeCurve.curveChangedEmitter.addListener( curveChangedListener );
    secondDerivativeCurve.curveChangedEmitter.addListener( curveChangedListener );
  }

  /**
   * Reset all
   */
  public reset(): void {
    this.xProperty.reset();
  }
}

calculusGrapher.register( 'AncillaryTool', AncillaryTool );
