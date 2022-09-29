// Copyright 2020-2022, University of Colorado Boulder

/**
 * OriginalCurveNode is a CurveNode sub-type for the main curve that the user interacts with and manipulates, which then
 * triggers a change in the model OriginalCurve's points.
 *
 * Like CurveNode, OriginalCurveNode is created at the start and persists for the lifetime of the simulation. Links
 * are left as-is and OriginalCurves are never disposed.
 *
 * @author Brandon Li
 */

import { DragListener } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import CurveManipulationMode from '../model/CurveManipulationMode.js';
import OriginalCurve from '../model/OriginalCurve.js';
import CurveNode, { CurveNodeOptions } from './CurveNode.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';

type SelfOptions = EmptySelfOptions;

type OriginalCurveNodeOptions = SelfOptions & CurveNodeOptions;

export default class OriginalCurveNode extends CurveNode {

  public constructor( curve: OriginalCurve, chartTransform: ChartTransform, providedOptions?: OriginalCurveNodeOptions ) {

    const options = optionize<OriginalCurveNodeOptions, SelfOptions, CurveNodeOptions>()( {
      // super-class options
      pathOptions: {
        cursor: 'pointer'
      }
    }, providedOptions );

    super( curve, chartTransform, options );

    //----------------------------------------------------------------------------------------
    // Add a DragListener to the linePlot for manipulating the OriginalCurve model. Listener is never removed since
    // OriginalCurveNodes are never disposed.
    // TODO: the listener should be on the linePlot instead (#see 55).
    this.scatterPlot.addInputListener( new DragListener( {
      tandem: options.tandem.createTandem( 'dragListener' ),
      applyOffset: false,
      drag( event, listener ) {

        // current modelPosition
        const modelPosition = chartTransform.viewToModelPosition( listener.modelPoint );

        // previous (model) position the drag
        const oldModelPosition = chartTransform.viewToModelPosition( listener.modelPoint.minus( listener.modelDelta ) );

        if ( curve.curveManipulationMode === CurveManipulationMode.HILL ) {
          curve.createHillAt( modelPosition );
        }
        if ( curve.curveManipulationMode === CurveManipulationMode.PARABOLA ) {
          curve.createParabolaAt( modelPosition );
        }
        if ( curve.curveManipulationMode === CurveManipulationMode.PEDESTAL ) {
          curve.createPedestalAt( modelPosition );
        }
        if ( curve.curveManipulationMode === CurveManipulationMode.TRIANGLE ) {
          curve.createTriangleAt( modelPosition );
        }
        if ( curve.curveManipulationMode === CurveManipulationMode.TILT ) {
          curve.tiltToPosition( modelPosition );
        }
        if ( curve.curveManipulationMode === CurveManipulationMode.SHIFT ) {
          curve.shiftToPosition( modelPosition );
        }
        if ( curve.curveManipulationMode === CurveManipulationMode.FREEFORM ) {
          curve.drawFreeformToPosition( modelPosition, oldModelPosition );
        }
        if ( curve.curveManipulationMode === CurveManipulationMode.SINE ) {
          curve.createSineAt( modelPosition );
        }

      },
      start() {
        // Save the current values of the Points for the next undoToLastSave call.
        // This must be called once at the start of dragging (and not on each micro drag-position change).
        curve.saveCurrentPoints();
      }
    } ) );
  }

}

calculusGrapher.register( 'OriginalCurveNode', OriginalCurveNode );
