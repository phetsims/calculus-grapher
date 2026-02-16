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
import CurveManipulator from '../model/CurveManipulator.js';
import TransformedCurve from '../model/TransformedCurve.js';
import CurveManipulatorNode from './CurveManipulatorNode.js';

// Minimum x distance between drag points when drawing with FREEFORM.
// See https://github.com/phetsims/calculus-grapher/issues/297
const FREEFORM_MIN_DX = 0.1;

export default class CurveManipulatorDragListener extends SoundRichDragListener {

  // Constructor args used in methods.
  private readonly curveManipulator: CurveManipulator;
  private readonly transformedCurve: TransformedCurve;
  private readonly curveManipulationModeProperty: TReadOnlyProperty<CurveManipulationType>;
  private readonly curveManipulationWidthProperty: TReadOnlyProperty<number>;

  // Variables to keep track of old model positions associated with the dragListener.
  // Set them to null as no drag event has occurred yet.
  // These are relevant only for CurveManipulationType.FREEFORM.
  private penultimatePosition: Vector2 | null; // second to last position
  private antepenultimatePosition: Vector2 | null; // third to last position

  public constructor( curveManipulatorNode: CurveManipulatorNode,
                      transformedCurve: TransformedCurve,
                      chartTransform: ChartTransform,
                      curveManipulationModeProperty: TReadOnlyProperty<CurveManipulationType>,
                      curveManipulationWidthProperty: TReadOnlyProperty<number>,
                      tandem: Tandem ) {

    super( {

      // Synthesize a ModelViewTransform2 from the ChartTransform.
      transform: ModelViewTransform2.createOffsetXYScaleMapping(
        new Vector2( 0, chartTransform.viewHeight / 2 ), // offset of the origin in view coordinates
        chartTransform.viewWidth / chartTransform.modelXRange.getLength(), // xScale, model to view
        -( chartTransform.viewHeight / chartTransform.modelYRange.getLength() ) // yScale, model to view
      ),

      // Position in model coordinates.
      positionProperty: curveManipulatorNode.curveManipulator.positionProperty,

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

      start: ( event, listener ) => this.start( event.isFromPDOM() ),

      drag: ( event, listener ) => this.update( event.isFromPDOM() ),

      end: ( event, listener ) => {
        // Fuzzing does not provide an event.
        event && curveManipulatorNode.doAccessibleObjectResponseMoved( event.isFromPDOM() );
      },

      tandem: tandem
    } );

    this.curveManipulator = curveManipulatorNode.curveManipulator;
    this.transformedCurve = transformedCurve;
    this.curveManipulationModeProperty = curveManipulationModeProperty;
    this.curveManipulationWidthProperty = curveManipulationWidthProperty;
    this.penultimatePosition = null;
    this.antepenultimatePosition = null;

    // When the curve is grabbed using the keyboard, treat this as the start of a drag.
    this.curveManipulator.keyboardModeProperty.link( keyboardMode => {
      if ( keyboardMode === 'grabbed' ) {
        this.start( true /* isFromPDOM */ );
      }
    } );
  }

  /**
   * Starts a drag cycle for all forms of input.
   */
  private start( isFromPDOM: boolean ): void {

    // Save the current values of the CurvePoints for the next undo() call.
    // This must be called once at the start of dragging (and not on each micro drag-position change).
    this.transformedCurve.save();

    // Set the previous last positions to null, since it is a new drag.
    this.antepenultimatePosition = null;
    this.penultimatePosition = null;

    this.update( isFromPDOM );
  }

  /**
   * Updates the curve model at the manipulator's current position, applying the selected manipulation type and width
   * as is appropriate.
   */
  private update( isEventFromPDOM: boolean ): void {

    // When the manipulator is first moved with the keyboard, disable the keyboard cue so
    // that we do not see it until Reset All is pressed.
    if ( isEventFromPDOM ) {
      this.curveManipulator.keyboardCueEnabledProperty.value = false;
    }

    const modelPosition = this.curveManipulator.positionProperty.value;

    if ( !isEventFromPDOM || this.curveManipulator.keyboardModeProperty.value === 'grabbed' ) {

      if ( this.curveManipulationModeProperty.value === CurveManipulationType.FREEFORM ) {

        // Do not update the curve model if the drag points in (FREEFORM mode) are too close to each another,
        // to prevent noise in the derivative (see https://github.com/phetsims/calculus-grapher/issues/297 )
        if ( this.penultimatePosition === null || Math.abs( modelPosition.x - this.penultimatePosition.x ) > FREEFORM_MIN_DX ) {

          // Update the curve.
          this.transformedCurve.manipulateCurve(
            this.curveManipulationModeProperty.value,
            this.curveManipulationWidthProperty.value,
            modelPosition,
            this.penultimatePosition,
            this.antepenultimatePosition );

          // Update (model) antepenultimatePosition and penultimatePosition
          this.antepenultimatePosition = this.penultimatePosition;
          this.penultimatePosition = modelPosition;

          // Move to the new position.
          this.curveManipulator.positionProperty.value = modelPosition;
        }
      }
      else { // For any CurveManipulationType other than FREEFORM...

        // Update the curve.
        this.transformedCurve.manipulateCurve(
          this.curveManipulationModeProperty.value,
          this.curveManipulationWidthProperty.value,
          modelPosition );

        // Move to the new position.
        this.curveManipulator.positionProperty.value = modelPosition;
      }
    }
    else {

      // Move the manipulator to the new position without modifying the curve.
      this.curveManipulator.positionProperty.value = modelPosition;
    }
  }
}

calculusGrapher.register( 'CurveManipulatorDragListener', CurveManipulatorDragListener );