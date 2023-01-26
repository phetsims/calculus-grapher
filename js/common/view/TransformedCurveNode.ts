// Copyright 2020-2023, University of Colorado Boulder

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
import { LineStyles } from '../../../../kite/js/imports.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import CurveManipulationProperties from '../model/CurveManipulationProperties.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import CueingArrowsNode from './CueingArrowsNode.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';

type SelfOptions = EmptySelfOptions;

type TransformedCurveNodeOptions = SelfOptions & CurveNodeOptions;

export default class TransformedCurveNode extends CurveNode {

  // has this node ever been userDragged, used for tracking the visibility of the cueingArrows
  private readonly wasDraggedProperty: BooleanProperty;

  public constructor( curve: TransformedCurve,
                      curveManipulationProperties: CurveManipulationProperties,
                      chartTransform: ChartTransform,
                      providedOptions?: TransformedCurveNodeOptions ) {

    const options = optionize<TransformedCurveNodeOptions, SelfOptions, CurveNodeOptions>()( {

      // CurveNodeOptions
      continuousLinePlotOptions: {
        cursor: 'pointer'
      }
    }, providedOptions );

    super( curve, chartTransform, options );

    this.wasDraggedProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'wasDraggedProperty' ),
      phetioReadOnly: true
    } );

    // xPosition for cueing arrows in model coordinate
    const centerX = CalculusGrapherConstants.CURVE_X_RANGE.getCenter();

    // create cueing arrows, y position will be set later
    const cueingArrowsNode = new CueingArrowsNode( {
      center: chartTransform.modelToViewXY( centerX, 0 ),

      // cueing arrow should not be visible if this node is not enabled
      visibleProperty: new DerivedProperty( [ this.wasDraggedProperty, this.enabledProperty ],
        ( wasDragged, enabled ) => !wasDragged && enabled ),
      tandem: options.tandem.createTandem( 'cueingArrowsNode' )
    } );

    this.addChild( cueingArrowsNode );

    //----------------------------------------------------------------------------------------
    // Add a DragListener to the linePlot for manipulating the TransformedCurve model. Listener is never removed since
    // TransformedCurveNodes are never disposed.

    let penultimatePosition: Vector2;
    let antepenultimatePosition: Vector2 | null = null;

    this.continuousLinePlot.addInputListener( new DragListener( {
      tandem: options.tandem.createTandem( 'dragListener' ),
      dragBoundsProperty: new Property( new Bounds2( 0, 0, chartTransform.viewWidth, chartTransform.viewHeight ) ),
      applyOffset: false,
      start: () => {

        // Indicate that we've touched the curve, and hide the cueing arrows.
        this.wasDraggedProperty.value = true;

        // Save the current values of the Points for the next undoToLastSave call.
        // This must be called once at the start of dragging (and not on each micro drag-position change).
        curve.saveCurrentPoints();

        // set the second to last position to null, since it is a new drag.
        antepenultimatePosition = null;
      },
      drag: ( event, listener ) => {

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

  }

  /**
   * Reset all
   */
  public override reset(): void {
    super.reset();
    this.wasDraggedProperty.reset();
  }

  /**
   * Forwards response to super-class
   */
  public override updateCurveNode(): void {
    super.updateCurveNode();
    this.setPointerAreas();
  }

  /**
   * Sets the touch/mouse area of the drag Handler
   */
  public override setPointerAreas(): void {

    // create a dilated shape based on the continuous line plot shape
    const lineStyles = new LineStyles( { lineWidth: 10 } );
    const dilatedCurveShape = this.continuousLinePlot.shape!.getStrokedShape( lineStyles );

    this.continuousLinePlot.touchArea = dilatedCurveShape;
    this.continuousLinePlot.mouseArea = dilatedCurveShape;
  }
}

calculusGrapher.register( 'TransformedCurveNode', TransformedCurveNode );
