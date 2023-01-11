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

export default class CalculusGrapherVisibleProperties extends PhetioObject {

  // Indicates if the reference line is visible. This is a reference to model.referenceLine.visibleProperty.
  public readonly referenceLineVisibleProperty: Property<boolean>;

  // Indicates if the tangent checkbox is checked. This is a reference to model.tangentTool.visibleProperty.
  public readonly tangentVisibleProperty: Property<boolean>;

  // Indicates if the area under curve checkbox is checked. This is a reference to model.areaUnderCurveTool.visibleProperty.
  public readonly areaUnderCurveVisibleProperty: Property<boolean>;

  // Indicates if the graph grid is visible.
  public readonly gridVisibleProperty: Property<boolean>;

  // Indicates if the predict curve and original curve are both visible.
  // This Property is controlled by a checkbox that is visible when the 'Predict' checkbox is checked.
  public readonly allOriginalCurvesVisibleProperty: Property<boolean>;

  public constructor( referenceLineVisibleProperty: Property<boolean>,
                      tangentVisibleProperty: Property<boolean>,
                      areaUnderCurveVisibleProperty: Property<boolean>,
                      tandem: Tandem ) {

    super( {
      
      // PhetioObjectOptions
      tandem: tandem,
      phetioState: false
    } );

    this.referenceLineVisibleProperty = referenceLineVisibleProperty;
    this.tangentVisibleProperty = tangentVisibleProperty;
    this.areaUnderCurveVisibleProperty = areaUnderCurveVisibleProperty;

    this.gridVisibleProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'gridVisibleProperty' )
    } );

    this.allOriginalCurvesVisibleProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'allOriginalCurvesVisibleProperty' )
    } );

    // Link to the Properties that were provided as constructor arguments.
    this.addLinkedElement( referenceLineVisibleProperty, {
      tandem: tandem.createTandem( 'referenceLineVisibleProperty' )
    } );
    this.addLinkedElement( tangentVisibleProperty, {
      tandem: tandem.createTandem( 'tangentVisibleProperty' )
    } );
    this.addLinkedElement( areaUnderCurveVisibleProperty, {
      tandem: tandem.createTandem( 'areaUnderCurveVisibleProperty' )
    } );
  }

  public reset(): void {
    this.gridVisibleProperty.reset();
    this.allOriginalCurvesVisibleProperty.reset();
  }
}

calculusGrapher.register( 'CalculusGrapherVisibleProperties', CalculusGrapherVisibleProperties );
