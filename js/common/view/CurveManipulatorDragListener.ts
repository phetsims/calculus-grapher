// Copyright 2025-2026, University of Colorado Boulder

/**
 * CurveManipulatorDragListener is the drag listener for manipulating a transformable curve by dragging the CurveManipulatorNode.
 * It supports both pointer and keyboard dragging, with sound feedback.
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
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import SoundRichDragListener from '../../../../scenery-phet/js/SoundRichDragListener.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import CurveManipulationType from '../model/CurveManipulationType.js';
import TransformedCurve from '../model/TransformedCurve.js';
import CurveManipulatorNode from './CurveManipulatorNode.js';

// Minimum x distance between drag points when drawing with FREEFORM.
// See https://github.com/phetsims/calculus-grapher/issues/297
const FREEFORM_MIN_DX = 0.1;

export default class CurveManipulatorDragListener extends SoundRichDragListener {

  public constructor( curveManipulatorNode: CurveManipulatorNode,
                      transformedCurve: TransformedCurve,
                      chartTransform: ChartTransform,
                      curveManipulationModeProperty: TReadOnlyProperty<CurveManipulationType>,
                      curveManipulationWidthProperty: TReadOnlyProperty<number>,
                      tandem: Tandem ) {

    // Variables to keep track of old model positions associated with the dragListener.
    // Set them to null as no drag event has occurred yet.
    // These are relevant only for CurveManipulationType.FREEFORM.
    let penultimatePosition: Vector2 | null = null; // second to last position
    let antepenultimatePosition: Vector2 | null = null; // third to last position

    const curveManipulator = curveManipulatorNode.curveManipulator;

    // Update whichever curve is currently interactive.
    const update = ( isEventFromPDOM: boolean, modelPosition: Vector2 ): void => {

      // When the manipulator is first moved with the keyboard, disable the keyboard cue so
      // that we do not see it until Reset All is pressed.
      if ( isEventFromPDOM ) {
        curveManipulator.keyboardCueEnabledProperty.value = false;
      }

      if ( !isEventFromPDOM || curveManipulator.keyboardModeProperty.value === 'grabbed' ) {
        if ( curveManipulationModeProperty.value === CurveManipulationType.FREEFORM ) {

          // Do not update the curve model if the drag points in (FREEFORM mode) are too close to each another,
          // to prevent noise in the derivative (see https://github.com/phetsims/calculus-grapher/issues/297 )
          if ( penultimatePosition === null || Math.abs( modelPosition.x - penultimatePosition.x ) > FREEFORM_MIN_DX ) {

            // Update the curve.
            transformedCurve.manipulateCurve(
              curveManipulationModeProperty.value,
              curveManipulationWidthProperty.value,
              modelPosition,
              penultimatePosition,
              antepenultimatePosition );

            // Update (model) antepenultimatePosition and penultimatePosition
            antepenultimatePosition = penultimatePosition;
            penultimatePosition = modelPosition;

            // Move to the new position.
            curveManipulator.positionProperty.value = modelPosition;
          }
        }
        else { // For any CurveManipulationType other than FREEFORM...

          // Update the curve.
          transformedCurve.manipulateCurve(
            curveManipulationModeProperty.value,
            curveManipulationWidthProperty.value,
            modelPosition );

          // Move to the new position.
          curveManipulator.positionProperty.value = modelPosition;
        }
      }
      else {

        // Move the manipulator to the new position without modifying the curve.
        curveManipulator.positionProperty.value = modelPosition;
      }
    };

    const start = ( isFromPDOM: boolean ) => {
      // Save the current values of the CurvePoints for the next undo() call.
      // This must be called once at the start of dragging (and not on each micro drag-position change).
      transformedCurve.save();

      // Set the previous last positions to null, since it is a new drag.
      antepenultimatePosition = null;
      penultimatePosition = null;

      update( isFromPDOM, curveManipulator.positionProperty.value );
    };

    super( {

      // Synthesize a ModelViewTransform2 from the ChartTransform.
      transform: ModelViewTransform2.createOffsetXYScaleMapping(
        new Vector2( 0, chartTransform.viewHeight / 2 ), // offset of the origin in view coordinates
        chartTransform.viewWidth / chartTransform.modelXRange.getLength(), // xScale, model to view
        -( chartTransform.viewHeight / chartTransform.modelYRange.getLength() ) // yScale, model to view
      ),

      // Position in model coordinates.
      positionProperty: curveManipulator.positionProperty,

      // Drag bounds in model coordinates.
      dragBoundsProperty: new Property( new Bounds2(
        chartTransform.modelXRange.min, chartTransform.modelYRange.min,
        chartTransform.modelXRange.max, chartTransform.modelYRange.max ) ),

      dragListenerOptions: {
        applyOffset: false // Because wherever we press in the graph is where the manipulation starts.
      },

      keyboardDragListenerOptions: {
        dragSpeed: 200,
        shiftDragSpeed: 30
      },

      start: ( event, listener ) => start( event.isFromPDOM() ),

      drag: ( event, listener ) => update( event.isFromPDOM(), curveManipulator.positionProperty.value ),

      end: ( event, listener ) => {
        // Fuzzing does not provide an event.
        event && curveManipulatorNode.doAccessibleObjectResponseMoved( event.isFromPDOM() );
      },

      tandem: tandem
    } );

    // When the curve is grabbed using the keyboard, treat this as the start of a drag.
    curveManipulator.keyboardModeProperty.link( keyboardMode => {
      if ( keyboardMode === 'grabbed' ) {
        start( true /* isFromPDOM */ );
      }
    } );
  }
}

calculusGrapher.register( 'CurveManipulatorDragListener', CurveManipulatorDragListener );