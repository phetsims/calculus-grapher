// Copyright 2022, University of Colorado Boulder

/**
 * AncillaryTools is the model class associated with an x value on the graph
 * it keeps track of all quantities associated with the x value: such as
 *  - the integral of f(x)
 *  - the original function f(x)
 *  - the derivative f'(x)
 *  - the second derivative of f(x)
 *
 * @author Martin Veillette
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import Curve from './Curve.js';

const CURVE_X_RANGE = CalculusGrapherConstants.CURVE_X_RANGE;

type SelfOptions = {
  initialCoordinate: number;
};

export type AncillaryToolsOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class AncillaryTools extends PhetioObject {

  // value to track the x position
  public readonly xCoordinateProperty: NumberProperty;

  public readonly areaUnderCurveProperty: NumberProperty;
  public readonly originalProperty: NumberProperty;
  public readonly tangentProperty: NumberProperty;
  public readonly curvatureProperty: NumberProperty;

  public constructor(
    integralCurve: Curve,
    originalCurve: Curve,
    derivativeCurve: Curve,
    secondDerivativeCurve: Curve,
    providedOptions: AncillaryToolsOptions ) {

    const options = optionize<AncillaryToolsOptions, SelfOptions, PhetioObjectOptions>()( {
      phetioState: false
    }, providedOptions );

    super( options );

    this.xCoordinateProperty = new NumberProperty( options.initialCoordinate, {
      range: CURVE_X_RANGE,
      tandem: options.tandem.createTandem( 'xCoordinateProperty' )

    } );

    this.areaUnderCurveProperty = new NumberProperty( this.getY( integralCurve ), {
      tandem: options.tandem.createTandem( 'integralValueProperty' ),
      phetioReadOnly: true
    } );
    this.originalProperty = new NumberProperty( this.getY( originalCurve ), {
      tandem: options.tandem.createTandem( 'functionValueProperty' ),
      phetioReadOnly: true
    } );
    this.tangentProperty = new NumberProperty( this.getY( derivativeCurve ), {
      tandem: options.tandem.createTandem( 'derivativeValueProperty' ),
      phetioReadOnly: true
    } );
    this.curvatureProperty = new NumberProperty( this.getY( secondDerivativeCurve ), {
      tandem: options.tandem.createTandem( 'secondDerivativeValueProperty' ),
      phetioReadOnly: true
    } );
    const addCurveListener = ( curve: Curve, valueProperty: NumberProperty ): void => {
      curve.curveChangedEmitter.addListener( () => {
        this.assignYValue( curve, valueProperty );
      } );
    };

    addCurveListener( integralCurve, this.areaUnderCurveProperty );
    addCurveListener( originalCurve, this.originalProperty );
    addCurveListener( derivativeCurve, this.tangentProperty );
    addCurveListener( secondDerivativeCurve, this.curvatureProperty );

    this.xCoordinateProperty.link( () => {
      this.assignYValue( integralCurve, this.areaUnderCurveProperty );
      this.assignYValue( originalCurve, this.originalProperty );
      this.assignYValue( derivativeCurve, this.tangentProperty );
      this.assignYValue( secondDerivativeCurve, this.tangentProperty );
    } );

  }

  /**
   * Reset all
   */
  public reset(): void {
    this.xCoordinateProperty.reset();

    this.areaUnderCurveProperty.reset();
    this.originalProperty.reset();
    this.tangentProperty.reset();
    this.curvatureProperty.reset();
  }

  private getX(): number {
    return this.xCoordinateProperty.value;
  }

  private getY( curve: Curve ): number {
    return curve.getYAt( this.getX() );
  }

  private assignYValue( curve: Curve, valueProperty: NumberProperty ): void {
    valueProperty.value = this.getY( curve );
  }
}
calculusGrapher.register( 'AncillaryTools', AncillaryTools );
