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
  isIntegralGraphVisible?: boolean;
  isDerivativeGraphVisible?: boolean;
  isSecondDerivativeGraphVisible?: boolean;
};
export type CalculusGrapherViewPropertiesOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class CalculusGrapherViewProperties {

  // indicates if the graph grid is visible.
  public readonly gridVisibleProperty: Property<boolean>;

  //indicates if the reference line is visible.
  public readonly referenceLineVisibleProperty: Property<boolean>;

  //indicates if the original curve is visible.
  public readonly originalGraphNodeVisibleProperty: Property<boolean>;

  //indicates if the integral curve is visible.
  public readonly integralGraphNodeVisibleProperty: Property<boolean>;

  // indicates if the derivative curve is visible.
  public readonly derivativeGraphNodeVisibleProperty: Property<boolean>;

  //indicates if the second derivative curve is visible.
  public readonly secondDerivativeGraphNodeVisibleProperty: Property<boolean>;

  public constructor( providedOptions: CalculusGrapherViewPropertiesOptions ) {

    const options = optionize<CalculusGrapherViewPropertiesOptions, SelfOptions>()( {
      isGridVisible: true,
      isReferenceLineVisible: false,
      isIntegralGraphVisible: false,
      isDerivativeGraphVisible: true,
      isSecondDerivativeGraphVisible: false
    }, providedOptions );

    this.gridVisibleProperty = new BooleanProperty( options.isGridVisible, {
      tandem: options.tandem.createTandem( 'gridVisibleProperty' )
    } );

    this.referenceLineVisibleProperty = new BooleanProperty( options.isReferenceLineVisible, {
      tandem: options.tandem.createTandem( 'referenceLineVisibleProperty' )
    } );

    this.originalGraphNodeVisibleProperty = new BooleanProperty( true,
      {
        tandem: options.tandem.createTandem( 'originalGraphNodeVisibleProperty' ),
        phetioDocumentation: 'PhET-iO only, not settable in the sim'
      } );

    this.integralGraphNodeVisibleProperty = new BooleanProperty( options.isIntegralGraphVisible,
      {
        tandem: options.tandem.createTandem( 'integralGraphNodeVisibleProperty' )
      } );

    this.derivativeGraphNodeVisibleProperty = new BooleanProperty( options.isDerivativeGraphVisible,
      {
        tandem: options.tandem.createTandem( 'derivativeGraphNodeVisibleProperty' )
      } );

    this.secondDerivativeGraphNodeVisibleProperty = new BooleanProperty( options.isSecondDerivativeGraphVisible,
      {
        tandem: options.tandem.createTandem( 'secondDerivativeGraphNodeVisibleProperty' )
      } );
  }

  /**
   * Resets all the CalculusGrapherViewProperties.
   */
  public reset(): void {
    this.gridVisibleProperty.reset();
    this.referenceLineVisibleProperty.reset();
    this.integralGraphNodeVisibleProperty.reset();
    this.originalGraphNodeVisibleProperty.reset();
    this.derivativeGraphNodeVisibleProperty.reset();
    this.secondDerivativeGraphNodeVisibleProperty.reset();
  }
}

calculusGrapher.register( 'CalculusGrapherViewProperties', CalculusGrapherViewProperties );
