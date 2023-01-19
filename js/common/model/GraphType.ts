// Copyright 2022-2023, University of Colorado Boulder

/**
 * Types for identifying the types of graphs available, and sets of those graphs.
 *
 * @author Martin Veillette
 */

import Enumeration from '../../../../phet-core/js/Enumeration.js';
import EnumerationValue from '../../../../phet-core/js/EnumerationValue.js';
import { ProfileColorProperty } from '../../../../scenery/js/imports.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import calculusGrapher from '../../calculusGrapher.js';

export default class GraphType extends EnumerationValue {

  // Stroke for the graph's curve
  public readonly strokeProperty: ProfileColorProperty;

  // Tandem name prefix used for tandems related to the graph of this type.
  public readonly tandemNamePrefix: string;

  public static readonly ORIGINAL = new GraphType( CalculusGrapherColors.originalCurveStrokeProperty, 'original' );
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

// An ordered set of GraphType.
export type GraphSet = GraphType[];

calculusGrapher.register( 'GraphType', GraphType );