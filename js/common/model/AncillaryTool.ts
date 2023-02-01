// Copyright 2022-2023, University of Colorado Boulder

/**
 * AncillaryTool is the model base class associated with an x value on the graph.
 * It keeps track of the following quantities associated with the x value:
 *  - the integral of f(x)
 *  - the original function f(x)
 *  - the derivative of f(x)
 *  - the second derivative of f(x)
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
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
import Tandem from '../../../../tandem/js/Tandem.js';
import Property from '../../../../axon/js/Property.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';

type SelfOptions = {

  // Initial value of xProperty
  x: number;

  // Initial visibility of the tool
  visible?: boolean;
};

export type AncillaryToolOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class AncillaryTool extends PhetioObject {

  // Whether the tool is nominally visible (placed here for performance reason)
  // The actual scenery visibility of the tool is often not solely based on it.
  // Instead, it may be AXON/derived from this property.
  public readonly visibleProperty: Property<boolean>;

  // The x position of the tool
  public readonly xProperty: NumberProperty;

  // Y-values from CurvePoint
  public readonly yIntegralProperty: TReadOnlyProperty<number>;
  public readonly yOriginalProperty: TReadOnlyProperty<number>;
  public readonly yDerivativeProperty: TReadOnlyProperty<number>;
  public readonly ySecondDerivativeProperty: TReadOnlyProperty<number>;

  protected constructor(
    integralCurve: Curve,
    originalCurve: Curve,
    derivativeCurve: Curve,
    secondDerivativeCurve: Curve,
    providedOptions: AncillaryToolOptions ) {

    const options = optionize<AncillaryToolOptions, SelfOptions, PhetioObjectOptions>()( {

      // SelfOptions
      visible: false,

      // PhetioObjectOptions
      phetioState: false
    }, providedOptions );

    super( options );

    this.visibleProperty = new BooleanProperty( options.visible, {
      tandem: options.tandem.createTandem( 'visibleProperty' )
    } );

    this.xProperty = new NumberProperty( options.x, {
      range: CalculusGrapherConstants.CURVE_X_RANGE,
      tandem: options.tandem.createTandem( 'xCoordinateProperty' )
    } );

    // Create the Properties associated with each curve.
    const yIntegralProperty = createProperties( this.xProperty, integralCurve, options.tandem.createTandem( 'yIntegralProperty' ) );
    const yOriginalProperty = createProperties( this.xProperty, originalCurve, options.tandem.createTandem( 'yOriginalProperty' ) );
    const yDerivativeProperty = createProperties( this.xProperty, derivativeCurve, options.tandem.createTandem( 'yDerivativeProperty' ) );
    const ySecondDerivativeProperty = createProperties( this.xProperty, secondDerivativeCurve, options.tandem.createTandem( 'ySecondDerivativeProperty' ) );

    // When a curve is changed, update its associated y Property.
    const integralCurveListener = () => yIntegralProperty.recomputeDerivation();
    const originalCurveListener = () => yOriginalProperty.recomputeDerivation();
    const derivativeCurveListener = () => yDerivativeProperty.recomputeDerivation();
    const secondDerivativeCurveListener = () => ySecondDerivativeProperty.recomputeDerivation();

    // Optimization: Only listen to curveChangedEmitter when this tool is visible.
    this.visibleProperty.link( visible => {
      if ( visible ) {

        // Attach listeners
        integralCurve.curveChangedEmitter.addListener( integralCurveListener );
        originalCurve.curveChangedEmitter.addListener( originalCurveListener );
        derivativeCurve.curveChangedEmitter.addListener( derivativeCurveListener );
        secondDerivativeCurve.curveChangedEmitter.addListener( secondDerivativeCurveListener );

        // Update immediately by calling listeners.
        integralCurveListener();
        originalCurveListener();
        derivativeCurveListener();
        secondDerivativeCurveListener();
      }
      else {
        if ( integralCurve.curveChangedEmitter.hasListener( integralCurveListener ) ) {
          integralCurve.curveChangedEmitter.removeListener( integralCurveListener );
        }
        if ( originalCurve.curveChangedEmitter.hasListener( originalCurveListener ) ) {
          originalCurve.curveChangedEmitter.removeListener( originalCurveListener );
        }
        if ( derivativeCurve.curveChangedEmitter.hasListener( derivativeCurveListener ) ) {
          derivativeCurve.curveChangedEmitter.removeListener( derivativeCurveListener );
        }
        if ( secondDerivativeCurve.curveChangedEmitter.hasListener( secondDerivativeCurveListener ) ) {
          secondDerivativeCurve.curveChangedEmitter.removeListener( secondDerivativeCurveListener );
        }
      }
    } );

    // We used const above for each DerivedProperty so that we could call recomputeDerivation.
    // So now assign them to fields of type TReadOnlyProperty<number>.
    this.yIntegralProperty = yIntegralProperty;
    this.yOriginalProperty = yOriginalProperty;
    this.yDerivativeProperty = yDerivativeProperty;
    this.ySecondDerivativeProperty = ySecondDerivativeProperty;
  }

  public reset(): void {
    this.visibleProperty.reset();
    this.xProperty.reset();
  }
}

/**
 * Creates 3 Properties associates with evaluating the y value for a curve. Only one of these Properties
 * is returned. For the other 2: one (curvePointProperty) is a dependency and the other (yStudioProperty)
 * is created solely for PhET-iO. See https://github.com/phetsims/calculus-grapher/issues/133.
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
  // This Property persists because it is referenced by the tandem registry.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const yPhetioProperty = new DerivedProperty( [ curvePointProperty ],
    curvePoint => curvePoint.isDiscontinuous ? null : curvePoint.y, {
      tandem: tandem,
      phetioValueType: NullableIO( NumberIO )
    } );

  return yProperty;
}

calculusGrapher.register( 'AncillaryTool', AncillaryTool );
