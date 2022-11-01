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
import Vector2 from '../../../../dot/js/Vector2.js';

type SelfOptions = EmptySelfOptions;

export type OriginalCurveNodeOptions = SelfOptions & CurveNodeOptions;

export default class OriginalCurveNode extends CurveNode {

  private readonly chartTransform: ChartTransform;

  public constructor( curve: OriginalCurve, chartTransform: ChartTransform, providedOptions?: OriginalCurveNodeOptions ) {

    const options = optionize<OriginalCurveNodeOptions, SelfOptions, CurveNodeOptions>()( {
      // super-class options
      continuousLinePlotOptions: {
        cursor: 'pointer'
      }
    }, providedOptions );

    super( curve, chartTransform, options );

    this.chartTransform = chartTransform;

    //----------------------------------------------------------------------------------------
    // Add a DragListener to the linePlot for manipulating the OriginalCurve model. Listener is never removed since
    // OriginalCurveNodes are never disposed.

    let penultimatePosition: Vector2;
    let antepenultimatePosition: Vector2 | null = null;

    this.addInputListener( new DragListener( {
      tandem: options.tandem.createTandem( 'dragListener' ),
      dragBoundsProperty: this.dragBoundsProperty,
      applyOffset: false,
      start() {
        // Save the current values of the Points for the next undoToLastSave call.
        // This must be called once at the start of dragging (and not on each micro drag-position change).
        curve.saveCurrentPoints();

        // set the second to last position to null, since it is a new drag.
        antepenultimatePosition = null;
      },
      drag( event, listener ) {

        // current modelPosition
        const modelPosition = chartTransform.viewToModelPosition( listener.modelPoint );

        // previous (model) position the drag
        penultimatePosition = chartTransform.viewToModelPosition( listener.modelPoint.minus( listener.modelDelta ) );

        if ( curve.curveManipulationMode === CurveManipulationMode.HILL ) {
          curve.createHillAt( modelPosition );
        }
        else if ( curve.curveManipulationMode === CurveManipulationMode.PARABOLA ) {
          curve.createParabolaAt( modelPosition );
        }
        else if ( curve.curveManipulationMode === CurveManipulationMode.PEDESTAL ) {
          curve.createPedestalAt( modelPosition );
        }
        else if ( curve.curveManipulationMode === CurveManipulationMode.TRIANGLE ) {
          curve.createTriangleAt( modelPosition );
        }
        else if ( curve.curveManipulationMode === CurveManipulationMode.TILT ) {

          // Don't try to tilt if it would cause a divide by zero error, see https://github.com/phetsims/calculus-grapher/issues/69
          if ( modelPosition.x !== 0 ) {
            curve.tiltToPosition( modelPosition );
          }
        }
        else if ( curve.curveManipulationMode === CurveManipulationMode.SHIFT ) {
          curve.shiftToPosition( modelPosition );
        }
        else if ( curve.curveManipulationMode === CurveManipulationMode.FREEFORM ) {

          curve.drawFreeformToPosition( modelPosition, penultimatePosition, antepenultimatePosition );
        }
        else if ( curve.curveManipulationMode === CurveManipulationMode.SINE ) {
          curve.createSineAt( modelPosition );
        }
        else {
          throw new Error( 'Unsupported Curve Manipulation Mode' );
        }

        // update antepenultimatePosition
        antepenultimatePosition = penultimatePosition;

      }
    } ) );

  }

  /**
   * Forwards response to super-class
   */
  public override updateCurveNode(): void {
    super.updateCurveNode();
    this.setPointerAreas();
  }

  /**
   * set the touch/mouse area of this node
   */
  public override setPointerAreas(): void {

    const pathShape = this.getDilatedCurveShape();
    this.touchArea = pathShape;
    this.mouseArea = pathShape;
  }

  /**
   * Creates a (rough) dilated shape for a Curve.
   * TODO simplify: Talk to JO about why this is necessary in the first place.
   */
  private getDilatedCurveShape(): Shape {

    // in view coordinates
    const CURVE_DRAG_DILATION = 5;

    const pathShape = new Shape();

    const point = this.chartTransform.modelToViewXY( this.curve.points[ 0 ].x, this.curve.points[ 0 ].y );

    pathShape.moveToPoint( point );

    // Draw the curve shape slightly BELOW the true y-value.
    this.curve.points.forEach( point => {
      if ( point.exists ) {
        const viewPoint = this.chartTransform.modelToViewXY( point.x, point.y );

        pathShape.lineToPoint( viewPoint.addXY( 0, CURVE_DRAG_DILATION ) );
      }
    } );

    // Draw the curve shape slightly ABOVE the true y-value.
    _.forEachRight( this.curve.points, point => {
      if ( point.exists ) {
        const viewPoint = this.chartTransform.modelToViewXY( point.x, point.y );

        pathShape.lineToPoint( viewPoint.addXY( 0, -CURVE_DRAG_DILATION ) );

      }
    } );

    return pathShape.close().makeImmutable();
  }
}

calculusGrapher.register( 'OriginalCurveNode', OriginalCurveNode );
