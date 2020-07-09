// Copyright 2020, University of Colorado Boulder

/**
 * CurveNode is the view representation of a single Curve, which appears in all screens of the 'Calculus Grapher'
 * simulation. CurveNodes are implemented to work for all Curve sub-types, so no CurveNode sub-types are needed.
 *
 * Primary responsibilities are:
 *  - TODO
 *
 *
 * For the 'Calculus Grapher' sim, the same Curves instances are used throughout the lifetime of the simulation. Thus,
 * CurveNodes persist for the lifetime of the simulation and links are left as-is. See Curve.js for more background.
 *
 * @author Brandon Li
 */

import Shape from '../../../../kite/js/Shape.js';
import merge from '../../../../phet-core/js/merge.js';
import AssertUtils from '../../../../phetcommon/js/AssertUtils.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherUtils from '../CalculusGrapherUtils.js';
import Curve from '../model/Curve.js';

class CurveNode extends Node {

  /**
   * @param {Curve} curve - the model for the Curve.
   * @param {Property.<ModelViewTransform2>} modelViewTransformProperty
   * @param {Object} [options]
   */
  constructor( curve, modelViewTransformProperty, options ) {
    assert && assert( curve instanceof Curve, `invalid curve: ${curve}` );
    assert && AssertUtils.assertPropertyOf( modelViewTransformProperty, ModelViewTransform2 );

    options = merge( {

      // {Object} - passed to the main Path instance
      pathOptions: {
        lineWidth: 3
      }

    }, options );

    super( options );

    //----------------------------------------------------------------------------------------

    // @private {Path} - Path of the lines in between each CurvePoint.
    this.path = new Path( null, options.pathOptions );

    // @private
    this.curve = curve;
    this.modelViewTransformProperty = modelViewTransformProperty;

    // Observe
    curve.curveChangedEmitter.addListener( this.updateCurveNode.bind( this ) );
    modelViewTransformProperty.link( this.updateCurveNode.bind( this ) );

    this.addChild( this.path );
  }

  /**
   * Updates the CurveNode
   * @public
   */
   updateCurveNode() { // TODO: pass modelViewTransformProperty value?

    const pathShape = new Shape().moveTo(
      this.modelViewTransformProperty.value.modelToViewX( this.curve.points[ 0 ].x ),
      this.modelViewTransformProperty.value.modelToViewY( this.curve.points[ 0 ].y )
    );

    // Loop through each pair of Points of the base Curve.
    CalculusGrapherUtils.forEachAdjacentPair( this.curve.points, ( point, previousPoint ) => {

      if ( point.exists && previousPoint.exists ) {
        pathShape.lineTo(
          this.modelViewTransformProperty.value.modelToViewX( point.x ),
          this.modelViewTransformProperty.value.modelToViewY( point.y )
        );
      }
      else if ( point.exists && !previousPoint.exists ) {
        pathShape.moveTo(
          this.modelViewTransformProperty.value.modelToViewX( point.x ),
          this.modelViewTransformProperty.value.modelToViewY( point.y )
        );
      }

    } );

    this.path.setShape( pathShape.makeImmutable() );
  }
}

calculusGrapher.register( 'CurveNode', CurveNode );
export default CurveNode;