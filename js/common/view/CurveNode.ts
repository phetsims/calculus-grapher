// Copyright 2020-2022, University of Colorado Boulder

/**
 * CurveNode is the view representation of a single Curve, which appears in all screens of the 'Calculus Grapher'
 * simulation. CurveNodes are implemented to work for all Curve subtypes, so no CurveNode subtypes are needed.
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

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import { Shape } from '../../../../kite/js/imports.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { Circle, Node, NodeOptions, Path, PathOptions } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherUtils from '../CalculusGrapherUtils.js';
import Curve from '../model/Curve.js';
import CurvePoint from '../model/CurvePoint.js';

type SelfOptions = {
  pathOptions?: PathOptions;
};

export type CurveNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'>;

export default class CurveNode extends Node {

  // Path of the lines in between each CurvePoint.
  protected readonly path: Path;
  protected readonly curve: Curve;
  protected readonly modelViewTransformProperty: TReadOnlyProperty<ModelViewTransform2>;
  private readonly cuspContainer: Node;

  public constructor( curve: Curve, modelViewTransformProperty: TReadOnlyProperty<ModelViewTransform2>,
                      provideOptions?: CurveNodeOptions ) {

    const options = optionize<CurveNodeOptions, SelfOptions, NodeOptions>()( {

      // SelfOptions
      pathOptions: {
        lineWidth: 3
      }
    }, provideOptions );

    super( options );

    this.path = new Path( null, options.pathOptions );
    this.curve = curve;
    this.modelViewTransformProperty = modelViewTransformProperty;

    this.addChild( this.path );
    this.cuspContainer = new Node();
    this.addChild( this.cuspContainer );

    curve.curveChangedEmitter.addListener( this.updateCurveNode.bind( this ) );
    modelViewTransformProperty.link( this.updateCurveNode.bind( this ) );
  }

  /**
   * Updates the CurveNode
   */
  public updateCurveNode(): void { // TODO: pass modelViewTransformProperty value?

    const x = this.curve.points[ 0 ].x;
    const y = this.curve.points[ 0 ].y!;
    assert && assert( y !== null );

    const pathShape = new Shape().moveTo(
      this.modelViewTransformProperty.value.modelToViewX( x ),
      this.modelViewTransformProperty.value.modelToViewY( y )
    );

    // Loop through each pair of Points of the base Curve.
    CalculusGrapherUtils.forEachAdjacentPair( this.curve.points, ( point, previousPoint ) => {

      if ( point.exists && previousPoint.exists ) {
        pathShape.lineTo(
          this.modelViewTransformProperty.value.modelToViewX( point.x ),
          // @ts-ignore
          this.modelViewTransformProperty.value.modelToViewY( point.y )
        );
      }
      else if ( point.exists && !previousPoint.exists ) {
        pathShape.moveTo(
          this.modelViewTransformProperty.value.modelToViewX( point.x ),
          // @ts-ignore
          this.modelViewTransformProperty.value.modelToViewY( point.y )
        );
      }

    } );

    if ( this.curve.cusps ) {
      this.cuspContainer.removeAllChildren();
      this.curve.cusps.forEach( ( cusp: CurvePoint ) => {

        const x = cusp.x;
        const y = cusp.y!;
        assert && assert( y !== null );

        this.cuspContainer.addChild( new Circle( 2, {
          centerX: this.modelViewTransformProperty.value.modelToViewX( x ),
          centerY: this.modelViewTransformProperty.value.modelToViewY( y ),
          fill: null,
          stroke: 'red',
          lineWidth: 1
        } ) );
      } );

    }

    this.path.setShape( pathShape.makeImmutable() );
  }
}

calculusGrapher.register( 'CurveNode', CurveNode );
