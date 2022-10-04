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
import { Shape } from '../../../../kite/js/imports.js';

type SelfOptions = EmptySelfOptions;

type OriginalCurveNodeOptions = SelfOptions & CurveNodeOptions;

export default class OriginalCurveNode extends CurveNode {

  private chartTransform: ChartTransform;

  public constructor( curve: OriginalCurve, chartTransform: ChartTransform, providedOptions?: OriginalCurveNodeOptions ) {

    const options = optionize<OriginalCurveNodeOptions, SelfOptions, CurveNodeOptions>()( {
      // super-class options
      linePlotOptions: {
        cursor: 'pointer'
      }
    }, providedOptions );

    super( curve, chartTransform, options );


    this.chartTransform = chartTransform;

    //----------------------------------------------------------------------------------------
    // Add a DragListener to the linePlot for manipulating the OriginalCurve model. Listener is never removed since
    // OriginalCurveNodes are never disposed.
    // TODO: the listener should be on the linePlot instead (#see 59).
    this.addInputListener( new DragListener( {
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

  /**
   * Forwards response to super-class
   */
  public override updateCurveNode(): void {
    super.updateCurveNode();
    this.setTouchMouseArea();
  }

  /**
   * set the touch/mouse area of this node
   */
  public setTouchMouseArea(): void {

    const pathShape = this.getDilatedCurveShape();
    this.touchArea = pathShape;
    this.mouseArea = pathShape;
  }


  /**
   * Creates a (rough) dilated shape for a Curve.
   * //TODO simplify
   */
  private getDilatedCurveShape(): Shape {

    // in view coordinates
    const CURVE_DRAG_DILATION = 5;

    const pathShape = new Shape();

    const pointX = this.chartTransform.modelToViewX( this.curve.points[ 0 ].x );
    const pointY = this.chartTransform.modelToViewY( this.curve.points[ 0 ].y );

    pathShape.moveTo( pointX, pointY );

    // Draw the curve shape slightly BELOW the true y-value.
    this.curve.points.forEach( point => {
      if ( point.exists ) {
        const pointX = this.chartTransform.modelToViewX( point.x );
        const pointY = this.chartTransform.modelToViewY( point.y );

        pathShape.lineTo( pointX, pointY - CURVE_DRAG_DILATION );
      }
    } );

    // Draw the curve shape slightly ABOVE the true y-value.
    _.forEachRight( this.curve.points, point => {
      if ( point.exists ) {
        const pointX = this.chartTransform.modelToViewX( point.x );
        const pointY = this.chartTransform.modelToViewY( point.y );

        pathShape.lineTo( pointX, pointY + CURVE_DRAG_DILATION );
      }
    } );

    return pathShape.close().makeImmutable();
  }
}

calculusGrapher.register( 'OriginalCurveNode', OriginalCurveNode );
