// Copyright 2020-2023, University of Colorado Boulder

/**
 * Properties that are only used within the view hierarchy of the 'Calculus Grapher' simulation.
 *
 * @author Brandon Li
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

  // Indicates if the original curve and predict curve are both visible.
  // This Property is controlled by a checkbox that is visible when the 'Predict' checkbox is checked.
  public readonly allOriginalCurvesVisibleProperty: Property<boolean>;

  /**
   * @param referenceLineVisibleProperty - ReferenceLine.visibleProperty
   * @param tangentToolVisibleProperty - TangentTool.visibleProperty
   * @param areaUnderCurveToolVisibleProperty - AreaUnderCurveTool.visibleProperty
   * @param predictModeEnabledProperty
   * @param tandem
   */
  public constructor( referenceLineVisibleProperty: Property<boolean>,
                      tangentToolVisibleProperty: Property<boolean>,
                      areaUnderCurveToolVisibleProperty: Property<boolean>,
                      predictModeEnabledProperty: Property<boolean>,
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

    // Tangent features are visible if the TangentTool is visible, and we are not in predict mode.
    this.tangentVisibleProperty = new DerivedProperty(
      [ tangentToolVisibleProperty, predictModeEnabledProperty ],
      ( tangentToolVisible, predictModeEnabled ) => tangentToolVisible && !predictModeEnabled, {
        tandem: tandem.createTandem( 'tangentVisibleProperty' ),
        phetioValueType: BooleanIO
      } );

    // Area Under Curve features are visible if the AreaUnderCurveTool is visible, and we are not in predict mode.
    this.areaUnderCurveVisibleProperty = new DerivedProperty(
      [ areaUnderCurveToolVisibleProperty, predictModeEnabledProperty ],
      ( areaUnderCurveToolVisible, predictModeEnabled ) => areaUnderCurveToolVisible && !predictModeEnabled, {
        tandem: tandem.createTandem( 'areaUnderCurveVisibleProperty' ),
        phetioValueType: BooleanIO
      } );

    this.gridVisibleProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'gridVisibleProperty' )
    } );

    this.allOriginalCurvesVisibleProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'allOriginalCurvesVisibleProperty' ),
      phetioDocumentation: 'Indicates if originalCurve and predictCurve are both visible.'
    } );
  }

  public reset(): void {
    this.gridVisibleProperty.reset();
    this.allOriginalCurvesVisibleProperty.reset();
  }
}

calculusGrapher.register( 'CalculusGrapherVisibleProperties', CalculusGrapherVisibleProperties );
