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

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
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
import CurvePoint from './CurvePoint.js';
import ReadOnlyProperty from '../../../../axon/js/ReadOnlyProperty.js';

type SelfOptions = {
  x: number; // Initial value of xProperty
  visible?: boolean; // Initial visibility of the tool

  // So that subclasses can customize which Properties are featured in Studio.
  // See https://github.com/phetsims/calculus-grapher/issues/225
  yIntegralPropertyFeatured?: boolean;
  yOriginalPropertyFeatured?: boolean;
  yDerivativePropertyFeatured?: boolean;
  ySecondDerivativePropertyFeatured?: boolean;
};

export type AncillaryToolOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class AncillaryTool extends PhetioObject {

  // Whether the tool is nominally visible (placed here for performance reason)
  // The actual scenery visibility of the tool is often not solely based on it.
  // Instead, it may be AXON/derived from this property.
  public readonly visibleProperty: Property<boolean>;

  // The x coordinate of the tool
  public readonly xProperty: NumberProperty;

  // CurvePoints for each curve at the location of xProperty.
  // These are of type ReadOnlyProperty so that we can call notifyListenersStatic.
  public readonly integralCurvePointProperty: ReadOnlyProperty<CurvePoint>;
  public readonly originalCurvePointProperty: ReadOnlyProperty<CurvePoint>;
  public readonly derivativeCurvePointProperty: ReadOnlyProperty<CurvePoint>;
  public readonly secondDerivativeCurvePointProperty: ReadOnlyProperty<CurvePoint>;

  // CurvePoints for each curve at the location of xProperty.
  // These are of type ReadOnlyProperty in case we want to link to them via addLinkedElement in subclasses.
  protected readonly yIntegralProperty: ReadOnlyProperty<number | null>;
  protected readonly yOriginalProperty: ReadOnlyProperty<number | null>;
  protected readonly yDerivativeProperty: ReadOnlyProperty<number | null>;
  protected readonly ySecondDerivativeProperty: ReadOnlyProperty<number | null>;

  protected constructor( integralCurve: Curve, originalCurve: Curve, derivativeCurve: Curve, secondDerivativeCurve: Curve,
                         providedOptions: AncillaryToolOptions ) {

    const options = optionize<AncillaryToolOptions, SelfOptions, PhetioObjectOptions>()( {

      // SelfOptions
      visible: false,
      yIntegralPropertyFeatured: true,
      yOriginalPropertyFeatured: true,
      yDerivativePropertyFeatured: true,
      ySecondDerivativePropertyFeatured: true,

      // PhetioObjectOptions
      phetioState: false
    }, providedOptions );

    super( options );

    this.visibleProperty = new BooleanProperty( options.visible, {
      tandem: options.tandem.createTandem( 'visibleProperty' ),
      phetioFeatured: true
    } );

    this.xProperty = new NumberProperty( options.x, {
      range: CalculusGrapherConstants.CURVE_X_RANGE,
      tandem: options.tandem.createTandem( 'xProperty' ),
      phetioFeatured: true
    } );

    // The CurvePoint at xProperty for each curve.
    this.integralCurvePointProperty = createCurvePointProperty( integralCurve, this.xProperty );
    this.originalCurvePointProperty = createCurvePointProperty( originalCurve, this.xProperty );
    this.derivativeCurvePointProperty = createCurvePointProperty( derivativeCurve, this.xProperty );
    this.secondDerivativeCurvePointProperty = createCurvePointProperty( secondDerivativeCurve, this.xProperty );

    // Create PhET-iO-only Properties for each of the above CurvePointProperty instances, where y is mapped to null
    // when there is a discontinuity. These are not used anywhere in the code - they exist solely so that the PhET-iO
    // client can inspect them. They are not garbage collected because they are registered with the PhET-iO tandem registry.
    this.yIntegralProperty = createYProperty( this.integralCurvePointProperty,
      options.tandem.createTandem( 'yIntegralProperty' ), options.yIntegralPropertyFeatured );
    this.yOriginalProperty = createYProperty( this.originalCurvePointProperty,
      options.tandem.createTandem( 'yOriginalProperty' ), options.yOriginalPropertyFeatured );
    this.yDerivativeProperty = createYProperty( this.derivativeCurvePointProperty,
      options.tandem.createTandem( 'yDerivativeProperty' ), options.yDerivativePropertyFeatured );
    this.ySecondDerivativeProperty = createYProperty( this.secondDerivativeCurvePointProperty,
      options.tandem.createTandem( 'ySecondDerivativeProperty' ), options.ySecondDerivativePropertyFeatured );

    // When a curve changes, force listeners of CurvePointProperty instances to be notified, which will cause them
    // to re-inspect the CurvePoint values. We need to do this because CurvePoint instances are mutated as a curve is
    // manipulated, and the value of these Properties will therefore not change.
    const integralCurveListener = () => this.integralCurvePointProperty.notifyListenersStatic();
    const originalCurveListener = () => this.originalCurvePointProperty.notifyListenersStatic();
    const derivativeCurveListener = () => this.derivativeCurvePointProperty.notifyListenersStatic();
    const secondDerivativeCurveListener = () => this.secondDerivativeCurvePointProperty.notifyListenersStatic();

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
  }

  public reset(): void {
    this.visibleProperty.reset();
    this.xProperty.reset();
  }
}

/**
 * As the xProperty for a curve changes, provide the corresponding CurvePoint.
 * Note that curve.pointsProperty may also be changed via PhET-iO, see https://github.com/phetsims/calculus-grapher/issues/307.
 * Return type is ReadOnlyProperty so that we can call notifyListenersStatic.
 */
function createCurvePointProperty( curve: Curve, xProperty: TReadOnlyProperty<number> ): ReadOnlyProperty<CurvePoint> {
  return new DerivedProperty( [ curve.pointsProperty, xProperty ], ( points, x ) => curve.getClosestPointAt( x ) );
}

/**
 * As a CurvePoint changes, provide the corresponding y value, mapping discontinuities to null.
 * This null representation is used only for presentation in PhET-iO/Studio.
 * The return type is ReadOnlyProperty because we may want to link to these in subclasses.
 */
function createYProperty( curvePointProperty: TReadOnlyProperty<CurvePoint>, tandem: Tandem, phetioFeatured: boolean ):
  ReadOnlyProperty<number | null> {
  return new DerivedProperty( [ curvePointProperty ], curvePoint => curvePoint.isDiscontinuous ? null : curvePoint.y, {
    tandem: tandem,
    phetioFeatured: phetioFeatured,
    phetioValueType: NullableIO( NumberIO )
  } );
}

calculusGrapher.register( 'AncillaryTool', AncillaryTool );
