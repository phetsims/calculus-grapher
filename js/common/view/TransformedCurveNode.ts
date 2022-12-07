// Copyright 2020-2022, University of Colorado Boulder

/**
 * TransformedCurveNode is a CurveNode sub-type for the main curve that the user interacts with and manipulates, which then
 * triggers a change in the model TransformedCurve's points.
 *
 * Like CurveNode, TransformedCurveNode is created at the start and persists for the lifetime of the simulation. Links
 * are left as-is and TransformedCurves are never disposed.
 *
 * @author Brandon Li
 */

import { DragListener } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import TransformedCurve from '../model/TransformedCurve.js';
import CurveNode, { CurveNodeOptions } from './CurveNode.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import { Shape } from '../../../../kite/js/imports.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import CurveManipulationProperties from '../model/CurveManipulationProperties.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import CueingArrowsNode from './CueingArrowsNode.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';

type SelfOptions = EmptySelfOptions;

export type TransformedCurveNodeOptions = SelfOptions & CurveNodeOptions;

export default class TransformedCurveNode extends CurveNode {

  // has this node ever been userDragged, used for tracking the visibility of the cueingArrows
  private readonly undraggedProperty: BooleanProperty;

  private readonly chartTransform: ChartTransform;

  public constructor( curve: TransformedCurve,
                      curveManipulationProperties: CurveManipulationProperties,
                      chartTransform: ChartTransform,
                      providedOptions?: TransformedCurveNodeOptions ) {

    const options = optionize<TransformedCurveNodeOptions, SelfOptions, CurveNodeOptions>()( {
      // super-class options
      continuousLinePlotOptions: {
        cursor: 'pointer'
      }
    }, providedOptions );

    super( curve, chartTransform, options );

    this.undraggedProperty = new BooleanProperty( true, {
      tandem: options.tandem.createTandem( 'undraggedProperty' )
    } );

    // xPosition for cueing arrows in model coordinate
    const centerX = CalculusGrapherConstants.CURVE_X_RANGE.getCenter();

    // create cueing arrows, y position will be set later
    const cueingArrowsNode = new CueingArrowsNode( {
      center: chartTransform.modelToViewXY( centerX, 0 ),

      // cueing arrow should not be visible if this node is not enabled
      visibleProperty: DerivedProperty.and( [ this.undraggedProperty, this.enabledProperty ] ),
      tandem: options.tandem.createTandem( 'cueingArrowsNode' )
    } );

    this.addChild( cueingArrowsNode );

    // set the visibility of cueingArrowsNode to invisible if the curve has been touched once.
    curve.curveChangedEmitter.addListener( () => {
      this.undraggedProperty.value = false;
    } );

    //----------------------------------------------------------------------------------------
    // Add a DragListener to the linePlot for manipulating the TransformedCurve model. Listener is never removed since
    // TransformedCurveNodes are never disposed.

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

        // update curve based on mode and width
        curve.userManipulatedCurve(
          curveManipulationProperties.mode,
          curveManipulationProperties.width,
          modelPosition,
          penultimatePosition,
          antepenultimatePosition );

        // update antepenultimatePosition
        antepenultimatePosition = penultimatePosition;

      }
    } ) );

    this.chartTransform = chartTransform;
  }

  /**
   * Reset all
   */
  public override reset(): void {
    super.reset();
    this.undraggedProperty.reset();
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
      if ( point.isFinite ) {
        const viewPoint = this.chartTransform.modelToViewXY( point.x, point.y );

        pathShape.lineToPoint( viewPoint.addXY( 0, CURVE_DRAG_DILATION ) );
      }
    } );

    // Draw the curve shape slightly ABOVE the true y-value.
    _.forEachRight( this.curve.points, point => {
      if ( point.isFinite ) {
        const viewPoint = this.chartTransform.modelToViewXY( point.x, point.y );

        pathShape.lineToPoint( viewPoint.addXY( 0, -CURVE_DRAG_DILATION ) );

      }
    } );

    return pathShape.close().makeImmutable();
  }
}

calculusGrapher.register( 'TransformedCurveNode', TransformedCurveNode );
