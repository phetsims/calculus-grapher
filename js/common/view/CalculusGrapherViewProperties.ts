// Copyright 2020-2022, University of Colorado Boulder

// @ts-nocheck
/**
 * Properties that are only used within the view hierarchy of the 'Calculus Grapher' simulation.
 *
 * @author Brandon Li
 */


import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import calculusGrapher from '../../calculusGrapher.js';


class CalculusGrapherViewProperties {

  constructor() {

    // @public {BooleanProperty} - indicates if the grids of the graphs are visible.
    this.gridVisibleProperty = new BooleanProperty( false );

    // @public {BooleanProperty} - indicates if the reference line is visible.
    this.referenceLineVisibleProperty = new BooleanProperty( false );

    // @public {BooleanProperty} - indicates if the integral curve is visible.
    this.integralCurveVisibleProperty = new BooleanProperty( false );

    // @public {BooleanProperty} - indicates if the derivative curve is visible.
    this.derivativeCurveVisibleProperty = new BooleanProperty( false );

    // @public {BooleanProperty} - indicates if the second derivative curve is visible.
    this.secondDerivativeCurveVisibleProperty = new BooleanProperty( false );
  }

  /**
   * Resets the CalculusGrapherViewProperties.
   * @public
   *
   * Called when the reset-all button is pressed.
   */
  reset() {
    this.gridVisibleProperty.reset();
    this.referenceLineVisibleProperty.reset();
    this.integralCurveVisibleProperty.reset();
    this.derivativeCurveVisibleProperty.reset();
    this.secondDerivativeCurveVisibleProperty.reset();
  }
}

calculusGrapher.register( 'CalculusGrapherViewProperties', CalculusGrapherViewProperties );
export default CalculusGrapherViewProperties;
