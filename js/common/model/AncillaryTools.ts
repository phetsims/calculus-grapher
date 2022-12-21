// Copyright 2022, University of Colorado Boulder

/**
 * AncillaryTools is the model class associated with an x value on the graph
 * properties of the area under the curve and the tangent
 *
 * @author Martin Veillette
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import Curve from './Curve.js';

const CURVE_X_RANGE = CalculusGrapherConstants.CURVE_X_RANGE;

type SelfOptions = {
  initialCoordinate: number;
};

export type AncillaryToolsOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class AncillaryTools {

  // value to track the x position of scrubber
  public readonly xCoordinateProperty: NumberProperty;

  public readonly tangentProperty: NumberProperty;
  public readonly areaUnderCurveProperty: NumberProperty;
  public readonly originalProperty: NumberProperty;

  public constructor(
    originalCurve: Curve,
    derivativeCurve: Curve,
    integralCurve: Curve,
    providedOptions: AncillaryToolsOptions ) {

    const options = optionize<AncillaryToolsOptions, SelfOptions>()(
      {}, providedOptions );

    this.xCoordinateProperty = new NumberProperty( options.initialCoordinate, {
      range: CURVE_X_RANGE,
      tandem: options.tandem.createTandem( 'xCoordinateProperty' )
    } );

    this.tangentProperty = new NumberProperty( this.getY( derivativeCurve ) );
    this.areaUnderCurveProperty = new NumberProperty( this.getY( integralCurve ) );
    this.originalProperty = new NumberProperty( this.getY( originalCurve ) );
    const addCurveListener = ( curve: Curve, valueProperty: NumberProperty ): void => {
      curve.curveChangedEmitter.addListener( () => {
        this.assignYValue( curve, valueProperty );
      } );
    };

    addCurveListener( derivativeCurve, this.tangentProperty );
    addCurveListener( originalCurve, this.originalProperty );
    addCurveListener( integralCurve, this.areaUnderCurveProperty );


    this.xCoordinateProperty.link( () => {
      this.assignYValue( derivativeCurve, this.tangentProperty );
      this.assignYValue( originalCurve, this.originalProperty );
      this.assignYValue( integralCurve, this.areaUnderCurveProperty );
    } );


  }

  /**
   * Reset all
   */
  public reset(): void {
    this.xCoordinateProperty.reset();
    this.tangentProperty.reset();
    this.areaUnderCurveProperty.reset();
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
