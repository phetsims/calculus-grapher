// Copyright 2020-2022, University of Colorado Boulder


/**
 * Properties that are only used within the view hierarchy of the 'Calculus Grapher' simulation.
 *
 * @author Brandon Li
 */


import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import calculusGrapher from '../../calculusGrapher.js';
import Property from '../../../../axon/js/Property.js';

export default class CalculusGrapherViewProperties {

  // indicates if the graph grid is visible.
  public readonly gridVisibleProperty: Property<boolean>;

  //indicates if the reference line is visible.
  public readonly referenceLineVisibleProperty: Property<boolean>;

  //indicates if the integral curve is visible.
  public readonly integralCurveVisibleProperty: Property<boolean>;

  // indicates if the derivative curve is visible.
  public readonly derivativeCurveVisibleProperty: Property<boolean>;

  //indicates if the second derivative curve is visible.
  public readonly secondDerivativeCurveVisibleProperty: Property<boolean>;

  public constructor() {

    this.gridVisibleProperty = new BooleanProperty( false );

    this.referenceLineVisibleProperty = new BooleanProperty( false );

    this.integralCurveVisibleProperty = new BooleanProperty( false );

    this.derivativeCurveVisibleProperty = new BooleanProperty( false );

    this.secondDerivativeCurveVisibleProperty = new BooleanProperty( false );
  }

  /**
   * Resets all the CalculusGrapherViewProperties.
   */
  public reset(): void {
    this.gridVisibleProperty.reset();
    this.referenceLineVisibleProperty.reset();
    this.integralCurveVisibleProperty.reset();
    this.derivativeCurveVisibleProperty.reset();
    this.secondDerivativeCurveVisibleProperty.reset();
  }
}

calculusGrapher.register( 'CalculusGrapherViewProperties', CalculusGrapherViewProperties );
