// Copyright 2026, University of Colorado Boulder

/**
 * ScrubberDragListener is the drag listener for scrubbers (Reference Line, Tangent, Area Under Curve).
 * It handles both pointer and keyboard dragging, with sound feedback. The scrubber is constrained to
 * dragging horizontally within the range of the chart.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import TRangedProperty from '../../../../axon/js/TRangedProperty.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import SoundRichDragListener from '../../../../scenery-phet/js/SoundRichDragListener.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import ScrubberNode from './ScrubberNode.js';

export default class ScrubberDragListener extends SoundRichDragListener {

  public constructor( scrubberNode: ScrubberNode,
                      xProperty: TRangedProperty,
                      positionProperty: Property<Vector2>,
                      chartTransform: ChartTransform,
                      tandem: Tandem ) {

    // Constrain to the chart range.
    const dragBoundsProperty = new Property( new Bounds2(
      chartTransform.modelXRange.min, chartTransform.modelYRange.min,
      chartTransform.modelXRange.max, chartTransform.modelYRange.max ) );

    // Value of xProperty at the start of the drag.
    let xStart: number;

    super( {

      // Synthesize a ModelViewTransform2 from the ChartTransform.
      transform: ModelViewTransform2.createOffsetXYScaleMapping(
        new Vector2( 0, chartTransform.viewHeight / 2 ), // offset of the origin in view coordinates
        chartTransform.viewWidth / chartTransform.modelXRange.getLength(), // xScale, model to view
        -( chartTransform.viewHeight / chartTransform.modelYRange.getLength() ) // yScale, model to view
      ),

      positionProperty: positionProperty,
      dragBoundsProperty: dragBoundsProperty,

      keyboardDragListenerOptions: {
        dragDelta: chartTransform.modelToViewDeltaX( 0.1 ),
        shiftDragDelta: chartTransform.modelToViewDeltaX( 0.01 ),
        moveOnHoldInterval: 50
      },

      start: ( event, listener ) => {
        xStart = xProperty.value;
      },

      drag: ( event, listener ) => {
        xProperty.value = positionProperty.value.x;
      },

      end: () => {

        // So that we don't get a response if upArrow and downArrow are used.
        if ( xProperty.value !== xStart ) {
          scrubberNode.doAccessibleObjectResponse();
        }
      },

      tandem: tandem
    } );
  }
}

calculusGrapher.register( 'ScrubberDragListener', ScrubberDragListener );