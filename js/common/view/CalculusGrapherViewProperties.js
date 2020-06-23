// Copyright 2019-2020, University of Colorado Boulder

/**
 * Properties that are only used within the view hierarchy of the 'Calculus Grapher' simulation.
 *
 * @author Brandon Li
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import collisionLab from '../../collisionLab.js';

class CalculusGrapherViewProperties {

  constructor() {

    // @public {BooleanProperty} - indicates if the grids of the graphs are visible.
    this.gridVisibleProrperty = new BooleanProperty( false );

    // @public {BooleanProperty} - indicates if the reference line is visible.
    this.referenceLineVisibleProrperty = new BooleanProperty( false );
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
  }
}

collisionLab.register( 'CalculusGrapherViewProperties', CalculusGrapherViewProperties );
export default CalculusGrapherViewProperties;