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

import { Shape } from '../../../../kite/js/imports.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { DragListener } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import CurveManipulationMode from '../model/CurveManipulationMode.js';
import OriginalCurve from '../model/OriginalCurve.js';
import CurveNode, { CurveNodeOptions } from './CurveNode.js';
import Property from '../../../../axon/js/Property.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import Curve from '../model/Curve.js';

type SelfOptions = EmptySelfOptions;

type OriginalCurveNodeOptions = SelfOptions & CurveNodeOptions;

// constants
const CURVE_DRAG_DILATION = 0.4; // in model units

export default class OriginalCurveNode extends CurveNode {

  public constructor( curve: OriginalCurve, modelViewTransformProperty: Property<ModelViewTransform2>, providedOptions?: OriginalCurveNodeOptions ) {

    const options = optionize<OriginalCurveNodeOptions, SelfOptions, CurveNodeOptions>()( {
      // super-class options
      pathOptions: {
        cursor: 'pointer',
        stroke: 'black'
      }
    }, providedOptions );

    super( curve, modelViewTransformProperty, options );

    //----------------------------------------------------------------------------------------
    // Add a DragListener to the path for manipulating the OriginalCurve model. Listener is never removed since
    // OriginalCurveNodes are never disposed.
    this.path.addInputListener( new DragListener( {
      tandem: options.tandem.createTandem( 'dragListener' ),
      applyOffset: false,
      drag( event, listener ) {

        // current modelPosition
        const modelPosition = modelViewTransformProperty.value.viewToModelPosition( listener.modelPoint );

        // previous (model) position the drag
        const oldModelPosition = modelViewTransformProperty.value.viewToModelPosition( listener.modelPoint.minus( listener.modelDelta ) );

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
   * Creates a (rough) dilated shape for a Curve.
   *
   * @param  curve - the model Curve.
   * @returns shape in model units
   */
  public static createDilatedCurvePath( curve: Curve ): Shape {

    const pathShape = new Shape().moveTo( curve.points[ 0 ].x, curve.points[ 0 ].y - CURVE_DRAG_DILATION );

    // Draw the curve shape slightly BELOW the true y-value.
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

  /**
   * Forwards response to super-class, except this adds a dilation to the touch/mouse area of the Path.
   */
  public override updateCurveNode(): void {
    super.updateCurveNode();

    const dilatedPathShape = OriginalCurveNode.createDilatedCurvePath( this.curve );

    const dilatedPathShapeView = this.modelViewTransformProperty.value.modelToViewShape( dilatedPathShape );

    this.path.touchArea = dilatedPathShapeView;
    this.path.mouseArea = dilatedPathShapeView;
  }
}

calculusGrapher.register( 'OriginalCurveNode', OriginalCurveNode );
