// Copyright 2020-2022, University of Colorado Boulder

/**
 * Properties that are only used within the view hierarchy of the 'Calculus Grapher' simulation.
 *
 * @author Brandon Li
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import calculusGrapher from '../../calculusGrapher.js';
import Property from '../../../../axon/js/Property.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';

type SelfOptions = {
  isGridVisible?: boolean;
  isReferenceLineVisible?: boolean;
};
export type CalculusGrapherVisiblePropertiesOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class CalculusGrapherVisibleProperties {

  // indicates if the graph grid is visible.
  public readonly gridVisibleProperty: Property<boolean>;

  //indicates if the reference line is visible.
  public readonly referenceLineVisibleProperty: Property<boolean>;

  public constructor( providedOptions: CalculusGrapherVisiblePropertiesOptions ) {

    const options = optionize<CalculusGrapherVisiblePropertiesOptions, SelfOptions>()( {
      isGridVisible: false,
      isReferenceLineVisible: false
    }, providedOptions );

    this.gridVisibleProperty = new BooleanProperty( options.isGridVisible, {
      tandem: options.tandem.createTandem( 'gridVisibleProperty' )
    } );

    this.referenceLineVisibleProperty = new BooleanProperty( options.isReferenceLineVisible, {
      tandem: options.tandem.createTandem( 'referenceLineVisibleProperty' )
    } );

  }

  /**
   * Resets all the CalculusGrapherViewProperties.
   */
  public reset(): void {
    this.gridVisibleProperty.reset();
    this.referenceLineVisibleProperty.reset();
  }
}

calculusGrapher.register( 'CalculusGrapherVisibleProperties', CalculusGrapherVisibleProperties );
