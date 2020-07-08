// Copyright 2020, University of Colorado Boulder

/**
 *
 * @author Brandon Li
 */

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

        if ( curve.curveManipulationMode === CurveManipulationModes.TILT ) {
          curve.tiltToPosition( modelViewTransformProperty.value.viewToModelPosition( listener.modelPoint ) );
        }
        if ( curve.curveManipulationMode === CurveManipulationModes.SHIFT ) {
          curve.shiftToPosition( modelViewTransformProperty.value.viewToModelPosition( listener.modelPoint ) );
        }
      }

    } ) );

  }
}

calculusGrapher.register( 'OriginalCurveNode', OriginalCurveNode );
export default OriginalCurveNode;