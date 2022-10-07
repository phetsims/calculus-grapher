// Copyright 2022, University of Colorado Boulder

/**
 * GraphNode is the view representation of a Graph, which includes a curve, a chart ( grid and axes) and zoom buttons
 *
 * Primary responsibilities are:
 * - Create an associated CurveNode
 * - Create a zoomButtonGroup with an associated property
 * - Create AxisLines, GridLines and Rectangle Chart
 * - Create a Chart Transform
 * - Updating the model y Range of the graph based on the zoom level
 * - Toggling the visibility of the gridlines
 * - Set the height of the graph
 *
 * @author Martin Veillette
 * @author Brandon Li
 */

import Property from '../../../../axon/js/Property.js';
import calculusGrapher from '../../calculusGrapher.js';
import OriginalCurveNode, { OriginalCurveNodeOptions } from './OriginalCurveNode.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import OriginalCurve from '../model/OriginalCurve.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import GraphNode, { GraphNodeOptions } from './GraphNode.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import { Node } from '../../../../scenery/js/imports.js';

type SelfOptions = EmptySelfOptions;

type OriginalGraphNodeOptions = SelfOptions & GraphNodeOptions;

export default class OriginalGraphNode extends GraphNode {

  public constructor( curve: OriginalCurve,
                      gridVisibleProperty: Property<boolean>,
                      graphHeightProperty: TReadOnlyProperty<number>,
                      labelNode: Node,
                      providedOptions: GraphNodeOptions ) {

    const options = optionize<OriginalGraphNodeOptions, SelfOptions, GraphNodeOptions>()( {

      chartRectangleOptions: {
        fill: CalculusGrapherColors.originalChartBackgroundFillProperty,
        stroke: CalculusGrapherColors.originalChartBackgroundStrokeProperty
      },
      curveNodeOptions: {
        tandem: providedOptions.tandem.createTandem( 'originalCurveNode' )
      }
    }, providedOptions );

    super( curve, gridVisibleProperty, graphHeightProperty, labelNode, options );

    graphHeightProperty.link( height => {

      // @ts-ignore (see #66)
      this.curveNode.dragBoundsProperty.value = this.curveNode.dragBoundsProperty.value.setMaxY( height );
    } );

  }

  /**
   * Reset all
   */
  public override reset(): void {
    super.reset();
  }

  public override getCurveNode( curve: OriginalCurve,
                                chartTransform: ChartTransform,
                                options: OriginalCurveNodeOptions ): OriginalCurveNode {

    return new OriginalCurveNode( curve, chartTransform, options );
  }
}

calculusGrapher.register( 'OriginalGraphNode', OriginalGraphNode );
