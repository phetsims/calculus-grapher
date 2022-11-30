// Copyright 2022, University of Colorado Boulder

/**
 * OriginalGraphNode is the view representation of an Original Graph, which includes two curves,
 *  an
 *
 * @author Martin Veillette
 * @author Brandon Li
 */

import Property from '../../../../axon/js/Property.js';
import calculusGrapher from '../../calculusGrapher.js';
import TransformedCurveNode from './TransformedCurveNode.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import GraphNode, { GraphNodeOptions } from './GraphNode.js';
import { Node } from '../../../../scenery/js/imports.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import CueingArrowsNode from './CueingArrowsNode.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import TransformedCurve from '../model/TransformedCurve.js';
import CurveManipulationProperties from '../model/CurveManipulationProperties.js';
import { CurveNodeOptions } from './CurveNode.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';

type SelfOptions = EmptySelfOptions;

type OriginalGraphNodeOptions = SelfOptions & GraphNodeOptions;

export default class OriginalGraphNode extends GraphNode {

  // property that tracks the visibility of the cueingArrows
  private readonly cueingArrowsNodeVisibleProperty: BooleanProperty;

  public constructor( originalCurve: TransformedCurve,
                      predictCurve: TransformedCurve,
                      curveManipulationProperties: CurveManipulationProperties,
                      gridVisibleProperty: Property<boolean>,
                      graphHeightProperty: TReadOnlyProperty<number>,
                      labelNode: Node,
                      providedOptions: GraphNodeOptions ) {


    const options = optionize<OriginalGraphNodeOptions, SelfOptions, GraphNodeOptions>()( {

        createCurveNode: ( chartTransform: ChartTransform,
                           providedOptions?: CurveNodeOptions ) => new TransformedCurveNode( originalCurve,
          curveManipulationProperties, chartTransform, providedOptions ),
        curveNodeOptions: {
          tandem: providedOptions.tandem.createTandem( 'originalCurveNode' )
        },
        chartRectangleOptions: {
          fill: CalculusGrapherColors.originalChartBackgroundFillProperty,
          stroke: CalculusGrapherColors.originalChartBackgroundStrokeProperty,
          opacity: 1
        },
        plusMinusZoomButtonGroupOptions: {
          visibleProperty: new BooleanProperty( false )
        }
      },
      providedOptions
    );
    super( originalCurve, gridVisibleProperty, graphHeightProperty, labelNode, options );

    // create a predictCurveNode
    const predictCurveNode = new TransformedCurveNode( predictCurve, curveManipulationProperties, this.chartTransform,
      {
        tandem: providedOptions.tandem.createTandem( 'predictCurveNode' ),

        // temporary
        visible: false
      } );

    this.addChild( predictCurveNode );

    this.cueingArrowsNodeVisibleProperty = new BooleanProperty( true );

    // xPosition for cueing arrows in model coordinate
    const centerX = CalculusGrapherConstants.CURVE_X_RANGE.getCenter();

    // create cueing arrows, y position will be set later
    const cueingArrowsNode = new CueingArrowsNode( {
      centerX: this.chartTransform.modelToViewX( centerX ),
      visibleProperty: this.cueingArrowsNodeVisibleProperty
    } );

    // attach the cueingArrowsNode to the curveNode to inherit its visibility.
    this.curveNode.addChild( cueingArrowsNode );

    // set the visibility of cueingArrowsNode  to invisible if the curve has been touched once.
    originalCurve.curveChangedEmitter.addListener( () => {
      this.cueingArrowsNodeVisibleProperty.value = false;
    } );

    graphHeightProperty.link( height => {

      this.curveNode.dragBoundsProperty.value.setMaxY( height );

      // center the vertical position of the cueingArrows
      cueingArrowsNode.centerY = this.chartTransform.modelToViewY( 0 );

      // TODO: find a way to update touch/mouse area without resorting to this
      this.curveNode.setPointerAreas();
      predictCurveNode.setPointerAreas();
    } );

    this.zoomLevelProperty.link( () => {

      // TODO: find a way to update touch/mouse area without resorting to this
      this.curveNode.setPointerAreas();
      predictCurveNode.setPointerAreas();
    } );


  }

  /**
   * Reset all
   */
  public override reset(): void {
    super.reset();
    this.cueingArrowsNodeVisibleProperty.reset();
  }
}

calculusGrapher.register( 'OriginalGraphNode', OriginalGraphNode );
