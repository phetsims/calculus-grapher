// Copyright 2020-2025, University of Colorado Boulder

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
    CalculusGrapherFluent.a11y.shapesRadioButtonGroup.hillRadioButton.accessibleNameStringProperty,
    CalculusGrapherFluent.a11y.shapesRadioButtonGroup.hillRadioButton.accessibleHelpTextStringProperty );

  public static readonly TRIANGLE = new CurveManipulationMode( 'triangle',
    CalculusGrapherFluent.a11y.shapesRadioButtonGroup.triangleRadioButton.accessibleNameStringProperty,
    CalculusGrapherFluent.a11y.shapesRadioButtonGroup.triangleRadioButton.accessibleHelpTextStringProperty );

  public static readonly PEDESTAL = new CurveManipulationMode( 'pedestal',
    CalculusGrapherFluent.a11y.shapesRadioButtonGroup.pedestalRadioButton.accessibleNameStringProperty,
    CalculusGrapherFluent.a11y.shapesRadioButtonGroup.pedestalRadioButton.accessibleHelpTextStringProperty );

  public static readonly PARABOLA = new CurveManipulationMode( 'parabola',
    CalculusGrapherFluent.a11y.shapesRadioButtonGroup.parabolaRadioButton.accessibleNameStringProperty,
    CalculusGrapherFluent.a11y.shapesRadioButtonGroup.parabolaRadioButton.accessibleHelpTextStringProperty );

  public static readonly SINUSOID = new CurveManipulationMode( 'sinusoid',
    CalculusGrapherFluent.a11y.shapesRadioButtonGroup.sinusoidRadioButton.accessibleNameStringProperty,
    CalculusGrapherFluent.a11y.shapesRadioButtonGroup.sinusoidRadioButton.accessibleHelpTextStringProperty );

  public static readonly FREEFORM = new CurveManipulationMode( 'freeform',
    CalculusGrapherFluent.a11y.shapesRadioButtonGroup.freeformRadioButton.accessibleNameStringProperty,
    CalculusGrapherFluent.a11y.shapesRadioButtonGroup.freeformRadioButton.accessibleHelpTextStringProperty,
    false );

  public static readonly TILT = new CurveManipulationMode( 'tilt',
    CalculusGrapherFluent.a11y.shapesRadioButtonGroup.tiltRadioButton.accessibleNameStringProperty,
    CalculusGrapherFluent.a11y.shapesRadioButtonGroup.tiltRadioButton.accessibleHelpTextStringProperty,
    false );

  public static readonly SHIFT = new CurveManipulationMode( 'shift',
    CalculusGrapherFluent.a11y.shapesRadioButtonGroup.shiftRadioButton.accessibleNameStringProperty,
    CalculusGrapherFluent.a11y.shapesRadioButtonGroup.shiftRadioButton.accessibleHelpTextStringProperty,
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