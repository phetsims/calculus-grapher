// Copyright 2020, University of Colorado Boulder

/**
 * OriginalCurveNode is a CurveNode sub-type for the main curve that the user interacts with and manipulates, which then
 * triggers a change in the model OriginalCurve's points.
 *
 * Like CurveNode, OriginalCurveNode is created at the start and persists for the lifetime of the simulation. Links
 * are left as-is and OriginalCurves are never disposed.
 *
 * @author Brandon Li
 */

import Shape from '../../../../kite/js/Shape.js';
import merge from '../../../../phet-core/js/merge.js';
import AssertUtils from '../../../../phetcommon/js/AssertUtils.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import DragListener from '../../../../scenery/js/listeners/DragListener.js';
import calculusGrapher from '../../calculusGrapher.js';
import CurveManipulationModes from '../model/CurveManipulationModes.js';
import OriginalCurve from '../model/OriginalCurve.js';
import CurveNode from './CurveNode.js';

// constants
const CURVE_DRAG_DILATION = 0.4; // in model units

class OriginalCurveNode extends CurveNode {

  /**
   * @param {OriginalCurve} curve - the model Curve.
   * @param {Property.<ModelViewTransform2>} modelViewTransformProperty
   * @param {Object} [options]
   */
  constructor( curve, modelViewTransformProperty, options ) {
    assert && assert( curve instanceof OriginalCurve, `invalid curve: ${curve}` );
    assert && AssertUtils.assertPropertyOf( modelViewTransformProperty, ModelViewTransform2 );

    options = merge( {

      // super-class options
      pathOptions: {
        cursor: 'pointer'
      }
    }, options );

    super( curve, modelViewTransformProperty, options );

    //----------------------------------------------------------------------------------------

    // Add a DragListener to the path for manipulating the OriginalCurve model. Listener is never removed since
    // OriginalCurveNodes are never disposed.
    this.path.addInputListener( new DragListener( {
      applyOffset: false,
      drag( event, listener ) {
        const modelPosition = modelViewTransformProperty.value.viewToModelPosition( listener.modelPoint );

        if ( curve.curveManipulationMode === CurveManipulationModes.HILL ) {
          curve.createHillAt( modelPosition );
        }
        if ( curve.curveManipulationMode === CurveManipulationModes.PARABOLA ) {
          curve.parabola( modelPosition );
        }
        if ( curve.curveManipulationMode === CurveManipulationModes.PEDESTAL ) {
          curve.pedestal( modelPosition );
        }
        if ( curve.curveManipulationMode === CurveManipulationModes.TRIANGLE ) {
          curve.createTriangleAt( modelPosition );
        }
        if ( curve.curveManipulationMode === CurveManipulationModes.TILT ) {
          curve.tiltToPosition( modelPosition );
        }
        if ( curve.curveManipulationMode === CurveManipulationModes.SHIFT ) {
          curve.shiftToPosition( modelPosition );
        }
        if ( curve.curveManipulationMode === CurveManipulationModes.FREEFORM ) {
          curve.drawFreeformToPosition( modelPosition );
        }
        if ( curve.curveManipulationMode === CurveManipulationModes.SINE ) {
          curve.sine( modelPosition );
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
   * @override
   * Forwards response to super-class, except this adds a dilation to the touch/mouse area of the Path.
   * @public
   */
   updateCurveNode() {
    super.updateCurveNode();

    const dilatedPathShape = OriginalCurveNode.createDilatedCurvePath( this.curve );
    const dilatedPathShapeView = this.modelViewTransformProperty.value.modelToViewShape( dilatedPathShape );

    this.path.touchArea = dilatedPathShapeView;
    this.path.mouseArea = dilatedPathShapeView;
  }

  /**
   * Creates a (rough) dilated shape for a Curve.
   * @public
   *
   * @param {OriginalCurve} curve - the model Curve.
   * @returns {Shape} - in model units
   */
  static createDilatedCurvePath( curve ) {

    const pathShape = new Shape().moveTo( curve.points[ 0 ].x, curve.points[ 0 ].y - CURVE_DRAG_DILATION );

    // Draw the curve shape slightly BELLOW the true y-value.
    curve.points.forEach( point => {
      if ( point.exists ) {
        pathShape.lineTo( point.x, point.y - CURVE_DRAG_DILATION );
      }
    } );

    // Draw the curve shape slightly ABOVE the true y-value.
    _.forEachRight( curve.points, point => {
      if ( point.exists ) {
        pathShape.lineTo( point.x, point.y + CURVE_DRAG_DILATION );
      }
    } );

    return pathShape.close().makeImmutable();
  }
}

calculusGrapher.register( 'OriginalCurveNode', OriginalCurveNode );
export default OriginalCurveNode;