// Copyright 2020-2024, University of Colorado Boulder

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

import Enumeration from '../../../../phet-core/js/Enumeration.js';
import EnumerationValue from '../../../../phet-core/js/EnumerationValue.js';
import calculusGrapher from '../../calculusGrapher.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';

export default class CurveManipulationMode extends EnumerationValue {

  // Prefix used for tandems related to a CurveManipulationMode
  public readonly tandemPrefix: string;

  // For core description of associated radio buttons.
  public readonly radioButtonAccessibleNameProperty: TReadOnlyProperty<string>;
  public readonly radioButtonAccessibleHelpTextProperty: TReadOnlyProperty<string>;

  // Determines visibility of the width slider
  public readonly hasAdjustableWidth: boolean;

  // Enumeration values
  public static readonly HILL = new CurveManipulationMode( 'hill',
    CalculusGrapherStrings.a11y.curveManipulationModeRadioButtonGroup.hillRadioButton.accessibleNameStringProperty,
    CalculusGrapherStrings.a11y.curveManipulationModeRadioButtonGroup.hillRadioButton.accessibleHelpTextStringProperty );

  public static readonly TRIANGLE = new CurveManipulationMode( 'triangle',
    CalculusGrapherStrings.a11y.curveManipulationModeRadioButtonGroup.triangleRadioButton.accessibleNameStringProperty,
    CalculusGrapherStrings.a11y.curveManipulationModeRadioButtonGroup.triangleRadioButton.accessibleHelpTextStringProperty );

  public static readonly PEDESTAL = new CurveManipulationMode( 'pedestal',
    CalculusGrapherStrings.a11y.curveManipulationModeRadioButtonGroup.pedestalRadioButton.accessibleNameStringProperty,
    CalculusGrapherStrings.a11y.curveManipulationModeRadioButtonGroup.pedestalRadioButton.accessibleHelpTextStringProperty );

  public static readonly PARABOLA = new CurveManipulationMode( 'parabola',
    CalculusGrapherStrings.a11y.curveManipulationModeRadioButtonGroup.parabolaRadioButton.accessibleNameStringProperty,
    CalculusGrapherStrings.a11y.curveManipulationModeRadioButtonGroup.parabolaRadioButton.accessibleHelpTextStringProperty );

  public static readonly SINUSOID = new CurveManipulationMode( 'sinusoid',
    CalculusGrapherStrings.a11y.curveManipulationModeRadioButtonGroup.sinusoidRadioButton.accessibleNameStringProperty,
    CalculusGrapherStrings.a11y.curveManipulationModeRadioButtonGroup.freeformRadioButton.accessibleHelpTextStringProperty );

  public static readonly FREEFORM = new CurveManipulationMode( 'freeform',
    CalculusGrapherStrings.a11y.curveManipulationModeRadioButtonGroup.freeformRadioButton.accessibleNameStringProperty,
    CalculusGrapherStrings.a11y.curveManipulationModeRadioButtonGroup.freeformRadioButton.accessibleHelpTextStringProperty,
    false );

  public static readonly TILT = new CurveManipulationMode( 'tilt',
    CalculusGrapherStrings.a11y.curveManipulationModeRadioButtonGroup.tiltRadioButton.accessibleNameStringProperty,
    CalculusGrapherStrings.a11y.curveManipulationModeRadioButtonGroup.tiltRadioButton.accessibleHelpTextStringProperty,
    false );

  public static readonly SHIFT = new CurveManipulationMode( 'shift',
    CalculusGrapherStrings.a11y.curveManipulationModeRadioButtonGroup.shiftRadioButton.accessibleNameStringProperty,
    CalculusGrapherStrings.a11y.curveManipulationModeRadioButtonGroup.shiftRadioButton.accessibleHelpTextStringProperty,
    false );

  public static readonly enumeration = new Enumeration( CurveManipulationMode );

  public constructor( tandemPrefix: string,
                      radioButtonAccessibleNameProperty: TReadOnlyProperty<string>,
                      radioButtonAccessibleHelpTextProperty: TReadOnlyProperty<string>,
                      hasAdjustableWidth = true ) {
    super();
    this.tandemPrefix = tandemPrefix;
    this.radioButtonAccessibleNameProperty = radioButtonAccessibleNameProperty;
    this.radioButtonAccessibleHelpTextProperty = radioButtonAccessibleHelpTextProperty;
    this.hasAdjustableWidth = hasAdjustableWidth;
  }
}

calculusGrapher.register( 'CurveManipulationMode', CurveManipulationMode );