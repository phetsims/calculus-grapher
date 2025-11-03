// Copyright 2022-2025, University of Colorado Boulder

/**
 * GraphType identifies the types of graphs available in this simulation.
 * The class also has four static readonly properties that represent the four types of graphs available.
 * These properties are named ORIGINAL, INTEGRAL, DERIVATIVE, and SECOND_DERIVATIVE.
 * The class has two properties:
 *  - strokeProperty - represents the color of the curve stroke for the graph.
 * - tandemNamePrefix - represents the prefix used for tandems related to the graph of this type.
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Enumeration from '../../../../phet-core/js/Enumeration.js';
import EnumerationValue from '../../../../phet-core/js/EnumerationValue.js';
import ProfileColorProperty from '../../../../scenery/js/util/ProfileColorProperty.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';

export default class GraphType extends EnumerationValue {

  // Stroke for the graph's curve
  public readonly strokeProperty: ProfileColorProperty;

  // Tandem name prefix used for tandems related to the graph of this type.
  public readonly tandemNamePrefix: string;

  // For core description of associated radio buttons.
  public readonly radioButtonAccessibleNameProperty?: TReadOnlyProperty<string>;
  public readonly radioButtonAccessibleHelpTextProperty?: TReadOnlyProperty<string>;

  // Enumeration values
  public static readonly ORIGINAL = new GraphType( CalculusGrapherColors.originalCurveStrokeProperty, 'original' );

  public static readonly INTEGRAL = new GraphType( CalculusGrapherColors.integralCurveStrokeProperty, 'integral',
    CalculusGrapherStrings.a11y.graphSetRadioButtonGroup.integralRadioButton.accessibleNameStringProperty,
    CalculusGrapherStrings.a11y.graphSetRadioButtonGroup.integralRadioButton.accessibleHelpTextStringProperty );

  public static readonly DERIVATIVE = new GraphType( CalculusGrapherColors.derivativeCurveStrokeProperty, 'derivative',
    CalculusGrapherStrings.a11y.graphSetRadioButtonGroup.derivativeRadioButton.accessibleNameStringProperty,
    CalculusGrapherStrings.a11y.graphSetRadioButtonGroup.derivativeRadioButton.accessibleHelpTextStringProperty );

  public static readonly SECOND_DERIVATIVE = new GraphType( CalculusGrapherColors.secondDerivativeCurveStrokeProperty, 'secondDerivative',
    CalculusGrapherStrings.a11y.graphSetRadioButtonGroup.secondDerivativeRadioButton.accessibleNameStringProperty,
    CalculusGrapherStrings.a11y.graphSetRadioButtonGroup.secondDerivativeRadioButton.accessibleHelpTextStringProperty );

  public static readonly enumeration = new Enumeration( GraphType );

  public constructor( strokeProperty: ProfileColorProperty,
                      tandemNamePrefix: string,
                      radioButtonAccessibleNameProperty?: TReadOnlyProperty<string>,
                      radioButtonAccessibleHelpTextProperty?: TReadOnlyProperty<string> ) {
    super();
    this.strokeProperty = strokeProperty;
    this.tandemNamePrefix = tandemNamePrefix;
    this.radioButtonAccessibleNameProperty = radioButtonAccessibleNameProperty;
    this.radioButtonAccessibleHelpTextProperty = radioButtonAccessibleHelpTextProperty;
  }
}

calculusGrapher.register( 'GraphType', GraphType );