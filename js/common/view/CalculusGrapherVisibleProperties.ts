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
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';

export default class CalculusGrapherVisibleProperties extends PhetioObject {

  // Indicates if the reference line is visible. This is a reference to model.referenceLine.visibleProperty.
  public readonly referenceLineVisibleProperty: Property<boolean>;

  // Indicates whether features related to the tangent are visible.
  public readonly tangentVisibleProperty: TReadOnlyProperty<boolean>;

  // Indicates whether features related to 'area under the curve' are visible.
  public readonly areaUnderCurveVisibleProperty: TReadOnlyProperty<boolean>;

  // Indicates if the graph grid is visible.
  public readonly gridVisibleProperty: Property<boolean>;

  // Indicates if the original curve is visible while in 'Predict' mode.
  // This Property is controlled by the 'Show f(x)' checkbox that is visible when the 'Predict' radio button is selected.
  public readonly showOriginalCurveProperty: Property<boolean>;

  /**
   * @param referenceLineVisibleProperty - ReferenceLine.visibleProperty
   * @param tangentScrubberVisibleProperty - TangentScrubber.visibleProperty
   * @param areaUnderCurveScrubberVisibleProperty - AreaUnderCurveScrubber.visibleProperty
   * @param predictEnabledProperty
   * @param tandem
   */
  public constructor( referenceLineVisibleProperty: Property<boolean>,
                      tangentScrubberVisibleProperty: Property<boolean>,
                      areaUnderCurveScrubberVisibleProperty: Property<boolean>,
                      predictEnabledProperty: Property<boolean>,
                      tandem: Tandem ) {

    super( {

      // PhetioObjectOptions
      tandem: tandem,
      phetioState: false
    } );

    this.referenceLineVisibleProperty = referenceLineVisibleProperty;
    this.addLinkedElement( referenceLineVisibleProperty, {
      tandem: tandem.createTandem( 'referenceLineVisibleProperty' )
    } );

    // Tangent features are visible if the TangentScrubber is visible, and we are not in predict mode.
    this.tangentVisibleProperty = new DerivedProperty(
      [ tangentScrubberVisibleProperty, predictEnabledProperty ],
      ( tangentScrubberVisible, predictEnabled ) => tangentScrubberVisible && !predictEnabled, {
        tandem: tandem.createTandem( 'tangentVisibleProperty' ),
        phetioValueType: BooleanIO
      } );

    // Area Under Curve features are visible if the AreaUnderCurveScrubber is visible, and we are not in predict mode.
    this.areaUnderCurveVisibleProperty = new DerivedProperty(
      [ areaUnderCurveScrubberVisibleProperty, predictEnabledProperty ],
      ( areaUnderCurveScrubberVisible, predictEnabled ) => areaUnderCurveScrubberVisible && !predictEnabled, {
        tandem: tandem.createTandem( 'areaUnderCurveVisibleProperty' ),
        phetioValueType: BooleanIO
      } );

    this.gridVisibleProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'gridVisibleProperty' )
    } );

    this.showOriginalCurveProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'showOriginalCurveProperty' ),
      phetioDocumentation: 'Indicates if the original curve is visible while the Predict radio button is selected.'
    } );
  }

  public reset(): void {
    this.gridVisibleProperty.reset();
    this.showOriginalCurveProperty.reset();
  }
}

calculusGrapher.register( 'CalculusGrapherVisibleProperties', CalculusGrapherVisibleProperties );
