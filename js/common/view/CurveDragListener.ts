// Copyright 2025, University of Colorado Boulder

/**
 * CurveDragListener is the drag listener for manipulating a transformable curve.
 *
 * Instead of having a DragListener on each TransformedCurveNode, we have a single DragListener on the chartRectangle.
 * This saves us the costly operation of creating pointer areas that match the Shapes of the curves.  And it allows
 * the user to modify a curve by doing a 'pointer down' anywhere in the chartRectangle.
 * ee https://github.com/phetsims/calculus-grapher/issues/210 and https://github.com/phetsims/calculus-grapher/issues/74.
 *
 * @author Martin Veillette
 * @author Brandon Li
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import SoundDragListener from '../../../../scenery-phet/js/SoundDragListener.js';
import { PressedDragListener } from '../../../../scenery/js/listeners/DragListener.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import CurveManipulationMode from '../model/CurveManipulationMode.js';
import TransformedCurveNode from './TransformedCurveNode.js';

// Minimum x distance between drag points when drawing in FREEFORM mode.
// See https://github.com/phetsims/calculus-grapher/issues/297
const FREEFORM_MIN_DX = 0.1;

export default class CurveDragListener extends SoundDragListener {

  public constructor( interactiveCurveNodeProperty: TReadOnlyProperty<TransformedCurveNode>,
                      chartTransform: ChartTransform,
                      curveManipulationModeProperty: TReadOnlyProperty<CurveManipulationMode>,
                      curveManipulationWidthProperty: TReadOnlyProperty<number>,
                      tandem: Tandem ) {

    // Variables to keep track of old model positions associated with the dragListener.
    // Set them to null as no drag event has occurred yet.
    // These are relevant only for CurveManipulationMode.FREEFORM.
    let penultimatePosition: Vector2 | null = null;
    let antepenultimatePosition: Vector2 | null = null;

    // Update whichever curve is currently interactive.
    const updateCurve = ( listener: PressedDragListener ): void => {

      // This listener 'field' is actually an ES5 getter that allocates a Vector2, so call it only once.
      const modelPoint = listener.modelPoint;

      // Current modelPosition
      const modelPosition = chartTransform.viewToModelPosition( modelPoint );

      if ( curveManipulationModeProperty.value === CurveManipulationMode.FREEFORM ) {

        // Do not update the curve model if the drag points in (FREEFORM mode) are too close from one another,
        // to prevent noise in the derivative (see https://github.com/phetsims/calculus-grapher/issues/297 )
        if ( penultimatePosition === null || Math.abs( modelPosition.x - penultimatePosition.x ) > FREEFORM_MIN_DX ) {

          interactiveCurveNodeProperty.value.transformedCurve.manipulateCurve(
            curveManipulationModeProperty.value,
            curveManipulationWidthProperty.value,
            modelPosition,
            penultimatePosition,
            antepenultimatePosition );

          // Update (model) antepenultimatePosition and penultimatePosition
          antepenultimatePosition = penultimatePosition;
          penultimatePosition = modelPosition;
        }
      }
      else {

        // For any mode other than FREEFORM...
        interactiveCurveNodeProperty.value.transformedCurve.manipulateCurve(
          curveManipulationModeProperty.value,
          curveManipulationWidthProperty.value,
          modelPosition );
      }
    };

    super( {
      dragBoundsProperty: new Property( new Bounds2( 0, 0, chartTransform.viewWidth, chartTransform.viewHeight ) ),
      applyOffset: false,
      start: ( event, listener ) => {

        // Save the current values of the CurvePoints for the next undo() call.
        // This must be called once at the start of dragging (and not on each micro drag-position change).
        interactiveCurveNodeProperty.value.transformedCurve.save();

        // Set the previous last positions to null, since it is a new drag.
        antepenultimatePosition = null;
        penultimatePosition = null;
        updateCurve( listener );
      },
      drag: ( event, listener ) => updateCurve( listener ),
      tandem: tandem
    } );
  }
}

calculusGrapher.register( 'CurveDragListener', CurveDragListener );