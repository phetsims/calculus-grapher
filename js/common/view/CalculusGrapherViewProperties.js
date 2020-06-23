// Copyright 2019-2020, University of Colorado Boulder

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
    this.gridVisibleProrperty = new BooleanProperty( false );

    // @public {BooleanProperty} - indicates if the reference line is visible.
    this.referenceLineVisibleProrperty = new BooleanProperty( false );

    // @public {BooleanProperty} - indicates if the integral curve is visible.
    this.integralCurveVisibleProrperty = new BooleanProperty( false );

     // @public {BooleanProperty} - indicates if the derivative curve is visible.
    this.derivativeCurveVisibleProrperty = new BooleanProperty( false );

     // @public {BooleanProperty} - indicates if the second derivative curve is visible.
    this.secondDerivativeCurveVisibleProrperty = new BooleanProperty( false );
  }

  /**
   * Resets the CalculusGrapherViewProperties.
   * @public
   *
   * Called when the reset-all button is pressed.
   */
  reset() {
    this.gridVisibleProrperty.reset();
    this.referenceLineVisibleProrperty.reset();
    this.integralCurveVisibleProrperty.reset();
    this.derivativeCurveVisibleProrperty.reset();
    this.secondDerivativeCurveVisibleProrperty.reset();
  }
}

calculusGrapher.register( 'CalculusGrapherViewProperties', CalculusGrapherViewProperties );
export default CalculusGrapherViewProperties;