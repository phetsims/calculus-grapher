// Copyright 2020-2026, University of Colorado Boulder

/**
 * CurveManipulationMode is an enumeration of the possible 'modes' for manipulating curves.
 *
 * When the user drags on a TransformedCurve, the curve is manipulated based on the current CurveManipulationMode,
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

const ACCESSIBLE_STRINGS = CalculusGrapherFluent.a11y.shapesRadioButtonGroup;

export default class CurveManipulationMode extends EnumerationValue {

  // Prefix used for tandems related to a CurveManipulationMode
  public readonly tandemPrefix: string;

  // For core description
  public readonly accessibleNameProperty: TReadOnlyProperty<string>;
  public readonly radioButtonAccessibleHelpTextProperty: TReadOnlyProperty<string>;

  // Determines visibility of the width slider
  public readonly hasAdjustableWidth: boolean;

  // Enumeration values
  public static readonly HILL = new CurveManipulationMode( 'hill',
    ACCESSIBLE_STRINGS.hillRadioButton.accessibleNameStringProperty,
    ACCESSIBLE_STRINGS.hillRadioButton.accessibleHelpTextStringProperty );

  public static readonly TRIANGLE = new CurveManipulationMode( 'triangle',
    ACCESSIBLE_STRINGS.triangleRadioButton.accessibleNameStringProperty,
    ACCESSIBLE_STRINGS.triangleRadioButton.accessibleHelpTextStringProperty );

  public static readonly PEDESTAL = new CurveManipulationMode( 'pedestal',
    ACCESSIBLE_STRINGS.pedestalRadioButton.accessibleNameStringProperty,
    ACCESSIBLE_STRINGS.pedestalRadioButton.accessibleHelpTextStringProperty );

  public static readonly PARABOLA = new CurveManipulationMode( 'parabola',
    ACCESSIBLE_STRINGS.parabolaRadioButton.accessibleNameStringProperty,
    ACCESSIBLE_STRINGS.parabolaRadioButton.accessibleHelpTextStringProperty );

  public static readonly SINUSOID = new CurveManipulationMode( 'sinusoid',
    ACCESSIBLE_STRINGS.sinusoidRadioButton.accessibleNameStringProperty,
    ACCESSIBLE_STRINGS.sinusoidRadioButton.accessibleHelpTextStringProperty );

  public static readonly FREEFORM = new CurveManipulationMode( 'freeform',
    ACCESSIBLE_STRINGS.freeformRadioButton.accessibleNameStringProperty,
    ACCESSIBLE_STRINGS.freeformRadioButton.accessibleHelpTextStringProperty,
    false );

  public static readonly TILT = new CurveManipulationMode( 'tilt',
    ACCESSIBLE_STRINGS.tiltRadioButton.accessibleNameStringProperty,
    ACCESSIBLE_STRINGS.tiltRadioButton.accessibleHelpTextStringProperty,
    false );

  public static readonly SHIFT = new CurveManipulationMode( 'shift',
    ACCESSIBLE_STRINGS.shiftRadioButton.accessibleNameStringProperty,
    ACCESSIBLE_STRINGS.shiftRadioButton.accessibleHelpTextStringProperty,
    false );

  public static readonly enumeration = new Enumeration( CurveManipulationMode );

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

calculusGrapher.register( 'CurveManipulationMode', CurveManipulationMode );