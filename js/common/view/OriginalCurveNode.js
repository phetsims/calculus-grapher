// Copyright 2020, University of Colorado Boulder

/**
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

class OriginalCurveNode extends CurveNode {

  /**
   * @param {Curve} curve - the model for the Curve.
   * @param {Property.<ModelViewTransform2>} modelViewTransformProperty
   * @param {Object} [options]
   */
  constructor( curve, modelViewTransformProperty, options ) {
    assert && assert( curve instanceof OriginalCurve, `invalid curve: ${curve}` );
    assert && AssertUtils.assertPropertyOf( modelViewTransformProperty, ModelViewTransform2 );


    options = merge( {

      // {Object} - passed to the main Path instance
      pathOptions: {
        cursor: 'pointer'
      }

    }, options );

    super( curve, modelViewTransformProperty, options );

    //----------------------------------------------------------------------------------------

    this.addInputListener( new DragListener( {
      applyOffset: false,
      drag: ( event, listener ) => {
        if ( curve.curveManipulationMode === CurveManipulationModes.HILL ) {
          curve.hill( modelViewTransformProperty.value.viewToModelPosition( listener.modelPoint ) );
        }
        if ( curve.curveManipulationMode === CurveManipulationModes.LINE ) {
          curve.line( modelViewTransformProperty.value.viewToModelPosition( listener.modelPoint ) );
        }
        if ( curve.curveManipulationMode === CurveManipulationModes.TILT ) {
          curve.tiltToPosition( modelViewTransformProperty.value.viewToModelPosition( listener.modelPoint ) );
        }
        if ( curve.curveManipulationMode === CurveManipulationModes.SHIFT ) {
          curve.shiftToPosition( modelViewTransformProperty.value.viewToModelPosition( listener.modelPoint ) );
        }
        if ( curve.curveManipulationMode === CurveManipulationModes.FREEFORM ) {
          curve.drawFreeformToPosition( modelViewTransformProperty.value.viewToModelPosition( listener.modelPoint ) );
        }
      },
      start() {
        curve.saveCurrentPoints();

      }

    } ) );

    window.addEventListener( 'keydown', () => {
      curve.smooth();
    } );

  }

  /**
   * Updates the CurveNode
   * @public
   */
   updateCurveNode() { // TODO: pass modelViewTransformProperty value?

    super.updateCurveNode();

    this.touchArea = OriginalCurveNode.createDilatedHead( this.curve, this.modelViewTransformProperty.value );
    this.mouseArea = this.touchArea;
  }

  /**
   * Creates a (rough) dilated shape for a vector head.  The head is pointing to the right.
   * @public
   *
   * @param {number} headWidth
   * @param {number} headHeight
   * @param {number} dilation
   * @returns {Shape} - in view units
   */
  static createDilatedHead( curve, modelViewTransform ) {
    const dilation = 0.4;

    const pathShape = new Shape().moveTo( curve.points[ 0 ].x, curve.points[ 0 ].y - dilation );

    // Bellow
    curve.points.forEach( point => {
      if ( point.exists ) {
        pathShape.lineTo( point.x, point.y - dilation );
      }
    } );

    // Above
    _.forEachRight( curve.points, point => {
      if ( point.exists ) {
        pathShape.lineTo( point.x, point.y + dilation );
      }
    } );

    pathShape.close().makeImmutable();

    return modelViewTransform.modelToViewShape( pathShape );
  }
}

calculusGrapher.register( 'OriginalCurveNode', OriginalCurveNode );
export default OriginalCurveNode;