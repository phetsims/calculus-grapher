// Copyright 2022-2026, University of Colorado Boulder

/**
 * GraphType is an enumeration of the types of graphs available in this simulation.
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Enumeration from '../../../../phet-core/js/Enumeration.js';
import EnumerationValue from '../../../../phet-core/js/EnumerationValue.js';
import ProfileColorProperty from '../../../../scenery/js/util/ProfileColorProperty.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';

export default class GraphType extends EnumerationValue {

  // Stroke for the graph's curve
  public readonly strokeProperty: ProfileColorProperty;

  // Tandem name prefix used for tandems related to the graph of this type.
  public readonly tandemNamePrefix: string;

  // Enumeration values
  public static readonly PRIMARY = new GraphType( CalculusGrapherColors.primaryCurveStrokeProperty, 'primary' );

  public static readonly INTEGRAL = new GraphType( CalculusGrapherColors.integralCurveStrokeProperty, 'integral' );

  public static readonly DERIVATIVE = new GraphType( CalculusGrapherColors.derivativeCurveStrokeProperty, 'derivative' );

  public static readonly SECOND_DERIVATIVE = new GraphType( CalculusGrapherColors.secondDerivativeCurveStrokeProperty, 'secondDerivative' );

  public static readonly enumeration = new Enumeration( GraphType );

  public constructor( strokeProperty: ProfileColorProperty, tandemNamePrefix: string ) {
    super();
    this.strokeProperty = strokeProperty;
    this.tandemNamePrefix = tandemNamePrefix;
  }
}

calculusGrapher.register( 'GraphType', GraphType );