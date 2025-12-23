// Copyright 2025, University of Colorado Boulder

/**
 * CurveDragListener is the drag listener for manipulating a transformable curve by dragging the CurveManipulator.
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
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import SoundRichDragListener from '../../../../scenery-phet/js/SoundRichDragListener.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import CurveManipulationMode from '../model/CurveManipulationMode.js';
import CurveManipulator from './CurveManipulator.js';
import TransformedCurveNode from './TransformedCurveNode.js';

// Minimum x distance between drag points when drawing in FREEFORM mode.
// See https://github.com/phetsims/calculus-grapher/issues/297
const FREEFORM_MIN_DX = 0.1;

export default class CurveDragListener extends SoundRichDragListener {

  public constructor(
    curveManipulator: CurveManipulator,
    interactiveCurveNodeProperty: TReadOnlyProperty<TransformedCurveNode>,
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
    const update = ( isEventFromPDOM: boolean, viewPoint: Vector2 ): void => {

      // Current modelPosition
      const modelPosition = chartTransform.viewToModelPosition( viewPoint );

      if ( !isEventFromPDOM || curveManipulator.isChangingCurveProperty.value ) {
        if ( curveManipulationModeProperty.value === CurveManipulationMode.FREEFORM ) {

          // Do not update the curve model if the drag points in (FREEFORM mode) are too close to each another,
          // to prevent noise in the derivative (see https://github.com/phetsims/calculus-grapher/issues/297 )
          if ( penultimatePosition === null || Math.abs( modelPosition.x - penultimatePosition.x ) > FREEFORM_MIN_DX ) {

            // Update the curve.
            interactiveCurveNodeProperty.value.transformedCurve.manipulateCurve(
              curveManipulationModeProperty.value,
              curveManipulationWidthProperty.value,
              modelPosition,
              penultimatePosition,
              antepenultimatePosition );

            // Update (model) antepenultimatePosition and penultimatePosition
            antepenultimatePosition = penultimatePosition;
            penultimatePosition = modelPosition;

            // Move the curve cursor to the new position.
            curveManipulator.positionProperty.value = modelPosition;
          }
        }
        else { // For any mode other than FREEFORM...

          // Update the curve.
          interactiveCurveNodeProperty.value.transformedCurve.manipulateCurve(
            curveManipulationModeProperty.value,
            curveManipulationWidthProperty.value,
            modelPosition );

          // Move the curve cursor to the new position.
          curveManipulator.positionProperty.value = modelPosition;
        }
      }
      else {

        // Move the curve cursor to the new position without modifying the curve.
        curveManipulator.positionProperty.value = modelPosition;
      }
    };

    super( {

      // Position in view coordinates because we have not provided the transform option.
      positionProperty: new Vector2Property( chartTransform.modelToViewPosition( curveManipulator.positionProperty.value ) ),

      // Drag bounds are in view coordinates because we have not provided the transform option.
      dragBoundsProperty: new Property( new Bounds2( 0, 0, chartTransform.viewWidth, chartTransform.viewHeight ) ),

      dragListenerOptions: {
        applyOffset: false // Because wherever we press in the graph is where the manipulation starts.
      },

      keyboardDragListenerOptions: {
        dragSpeed: 200,
        shiftDragSpeed: 30
      },

      start: ( event, listener ) => {

        // Save the current values of the CurvePoints for the next undo() call.
        // This must be called once at the start of dragging (and not on each micro drag-position change).
        interactiveCurveNodeProperty.value.transformedCurve.save();

        // Set the previous last positions to null, since it is a new drag.
        antepenultimatePosition = null;
        penultimatePosition = null;

        // listener.modelPoint is in view coordinates because we have not provided the transform option.
        update( event.isFromPDOM(), listener.modelPoint );
      },

      // listener.modelPoint is in view coordinates because we have not provided the transform option.
      drag: ( event, listener ) => update( event.isFromPDOM(), listener.modelPoint ),
      tandem: tandem
    } );

    // When isChangingCurveProperty becomes true, immediately update the curve.
    curveManipulator.isChangingCurveProperty.link( isChangingCurve => {
      if ( isChangingCurve ) {
        update( true, chartTransform.modelToViewPosition( curveManipulator.positionProperty.value ) );
      }
    } );
  }
}

calculusGrapher.register( 'CurveDragListener', CurveDragListener );