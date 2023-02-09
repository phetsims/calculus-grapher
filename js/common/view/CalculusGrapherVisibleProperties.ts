// Copyright 2020-2023, University of Colorado Boulder

/**
 * Properties that are only used within the view hierarchy of the 'Calculus Grapher' simulation.
 *
 * @author Brandon Li
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import calculusGrapher from '../../calculusGrapher.js';
import Property from '../../../../axon/js/Property.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';

export default class CalculusGrapherVisibleProperties extends PhetioObject {

  // Indicates if the reference line is visible. This is a reference to model.referenceLine.visibleProperty.
  public readonly referenceLineVisibleProperty: Property<boolean>;

  // Indicates if the graph grid is visible.
  public readonly gridVisibleProperty: Property<boolean>;

  /**
   * @param referenceLineVisibleProperty - ReferenceLine.visibleProperty
   * @param tandem
   */
  public constructor( referenceLineVisibleProperty: Property<boolean>, tandem: Tandem ) {

    super( {

      // PhetioObjectOptions
      tandem: tandem,
      phetioState: false
    } );

    this.referenceLineVisibleProperty = referenceLineVisibleProperty;
    this.addLinkedElement( referenceLineVisibleProperty, {
      tandem: tandem.createTandem( 'referenceLineVisibleProperty' )
    } );

    this.gridVisibleProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'gridVisibleProperty' )
    } );
  }

  public reset(): void {
    this.gridVisibleProperty.reset();
  }
}

calculusGrapher.register( 'CalculusGrapherVisibleProperties', CalculusGrapherVisibleProperties );
