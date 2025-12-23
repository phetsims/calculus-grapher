// Copyright 2025, University of Colorado Boulder

/**
 * CurveManipulator is a draggable point used to manipulate the curve.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import AccessibleDraggableOptions from '../../../../scenery-phet/js/accessibility/grab-drag/AccessibleDraggableOptions.js';
import ShadedSphereNode, { ShadedSphereNodeOptions } from '../../../../scenery-phet/js/ShadedSphereNode.js';
import InteractiveHighlighting from '../../../../scenery/js/accessibility/voicing/InteractiveHighlighting.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import TransformedCurve from '../model/TransformedCurve.js';

// The default position is at the center of the graph.
const DEFAULT_POSITION = new Vector2(
  CalculusGrapherConstants.CURVE_X_RANGE.getCenter(),
  CalculusGrapherConstants.CURVE_MANIPULATION_Y_RANGE.getCenter()
);

export default class CurveManipulator extends InteractiveHighlighting( ShadedSphereNode ) {

  // Position of the cursor, in model coordinates.
  public readonly positionProperty: Property<Vector2>;

  public constructor(
    originalCurve: TransformedCurve,
    predictCurve: TransformedCurve,
    predictSelectedProperty: TReadOnlyProperty<boolean>,
    chartTransform: ChartTransform,
    tandem: Tandem ) {

    // Color matches the curve that is being manipulated.
    const mainColorProperty = new DerivedProperty( [
        predictSelectedProperty,
        CalculusGrapherColors.predictCurveStrokeProperty,
        CalculusGrapherColors.originalCurveStrokeProperty
      ],
      ( predictSelected, predictCurveStroke, originalCurveStroke ) =>
        predictSelected ? predictCurveStroke : originalCurveStroke );

    const options = combineOptions<ShadedSphereNodeOptions>( {}, AccessibleDraggableOptions, {
      isDisposable: false,
      mainColor: mainColorProperty,
      cursor: 'pointer',
      tandem: tandem
    } );

    super( 2 * CalculusGrapherConstants.SCRUBBER_RADIUS, options );

    this.positionProperty = new Vector2Property( DEFAULT_POSITION, {
      tandem: tandem.createTandem( 'positionProperty' )
    } );

    this.positionProperty.link( position => {
      this.center = chartTransform.modelToViewPosition( position );
    } );

    // When switching between curves, update the y-coordinate of the cursor so that it is on a curve.
    predictSelectedProperty.lazyLink( predictSelected => {
      const x = this.positionProperty.value.x;
      const selectedCurve = predictSelected ? predictCurve : originalCurve;
      this.positionProperty.value = selectedCurve.getClosestPointAt( x ).getVector();
    } );
  }

  public reset(): void {
    this.positionProperty.reset();
  }
}

calculusGrapher.register( 'CurveManipulator', CurveManipulator );