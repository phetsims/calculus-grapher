// Copyright 2020-2026, University of Colorado Boulder

/**
 * CurveManipulationType is an enumeration of the possible ways that curves can be manipulated.
 *
 * When the user drags on a TransformedCurve, the curve is manipulated based on the current CurveManipulationType,
 * allowing the user to create custom curves. The documentation in this file is not exhaustive and does not describe
 * the algorithms for responses to curve user-manipulation. Please also see TransformedCurve.js
 *
 * @author Brandon Li
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Enumeration from '../../../../phet-core/js/Enumeration.js';
import EnumerationValue from '../../../../phet-core/js/EnumerationValue.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';

export default class CurveManipulationType extends EnumerationValue {

  // Prefix used for tandems related to a CurveManipulationType
  public readonly tandemPrefix: string;

  // For core description
  public readonly accessibleNameProperty: TReadOnlyProperty<string>;
  public readonly radioButtonAccessibleHelpTextProperty: TReadOnlyProperty<string>;

  // Determines visibility of the width slider
  public readonly hasAdjustableWidth: boolean;

  public static readonly HILL = new CurveManipulationType( 'hill',
    CalculusGrapherFluent.a11y.curveManipulationTypeRadioButtonGroup.hillRadioButton.accessibleNameStringProperty,
    CalculusGrapherFluent.a11y.curveManipulationTypeRadioButtonGroup.hillRadioButton.accessibleHelpTextStringProperty );

  // Note: TRIANGLE is described as 'Tent' for core description.
  public static readonly TRIANGLE = new CurveManipulationType( 'triangle',
    CalculusGrapherFluent.a11y.curveManipulationTypeRadioButtonGroup.triangleRadioButton.accessibleNameStringProperty,
    CalculusGrapherFluent.a11y.curveManipulationTypeRadioButtonGroup.triangleRadioButton.accessibleHelpTextStringProperty );

  public static readonly PEDESTAL = new CurveManipulationType( 'pedestal',
    CalculusGrapherFluent.a11y.curveManipulationTypeRadioButtonGroup.pedestalRadioButton.accessibleNameStringProperty,
    CalculusGrapherFluent.a11y.curveManipulationTypeRadioButtonGroup.pedestalRadioButton.accessibleHelpTextStringProperty );

  public static readonly PARABOLA = new CurveManipulationType( 'parabola',
    CalculusGrapherFluent.a11y.curveManipulationTypeRadioButtonGroup.parabolaRadioButton.accessibleNameStringProperty,
    CalculusGrapherFluent.a11y.curveManipulationTypeRadioButtonGroup.parabolaRadioButton.accessibleHelpTextStringProperty );

  public static readonly SINUSOID = new CurveManipulationType( 'sinusoid',
    CalculusGrapherFluent.a11y.curveManipulationTypeRadioButtonGroup.sinusoidRadioButton.accessibleNameStringProperty,
    CalculusGrapherFluent.a11y.curveManipulationTypeRadioButtonGroup.sinusoidRadioButton.accessibleHelpTextStringProperty );

  public static readonly FREEFORM = new CurveManipulationType( 'freeform',
    CalculusGrapherFluent.a11y.curveManipulationTypeRadioButtonGroup.freeformRadioButton.accessibleNameStringProperty,
    CalculusGrapherFluent.a11y.curveManipulationTypeRadioButtonGroup.freeformRadioButton.accessibleHelpTextStringProperty,
    false );

  public static readonly TILT = new CurveManipulationType( 'tilt',
    CalculusGrapherFluent.a11y.curveManipulationTypeRadioButtonGroup.tiltRadioButton.accessibleNameStringProperty,
    CalculusGrapherFluent.a11y.curveManipulationTypeRadioButtonGroup.tiltRadioButton.accessibleHelpTextStringProperty,
    false );

  public static readonly SHIFT = new CurveManipulationType( 'shift',
    CalculusGrapherFluent.a11y.curveManipulationTypeRadioButtonGroup.shiftRadioButton.accessibleNameStringProperty,
    CalculusGrapherFluent.a11y.curveManipulationTypeRadioButtonGroup.shiftRadioButton.accessibleHelpTextStringProperty,
    false );

  public static readonly enumeration = new Enumeration( CurveManipulationType );

  public constructor( tandemPrefix: string,
                      accessibleNameProperty: TReadOnlyProperty<string>,
                      radioButtonAccessibleHelpTextProperty: TReadOnlyProperty<string>,
                      hasAdjustableWidth = true ) {
    super();
    this.tandemPrefix = tandemPrefix;
    this.accessibleNameProperty = accessibleNameProperty;
    this.radioButtonAccessibleHelpTextProperty = radioButtonAccessibleHelpTextProperty;
    this.hasAdjustableWidth = hasAdjustableWidth;
  }
}

calculusGrapher.register( 'CurveManipulationType', CurveManipulationType );