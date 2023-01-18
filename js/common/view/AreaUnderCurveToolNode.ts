// Copyright 2022-2023, University of Colorado Boulder

/**
 * AreaUnderCurveToolNode is the area under the curve tool
 *  Its responsibilities include:
 * - Creating and adding the shaded area chart to the graph node associated with `graphType`
 *
 * @author Martin Veillette
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import GraphsNode from './GraphsNode.js';
import AncillaryToolNode, { AncillaryToolNodeOptions } from './AncillaryToolNode.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import AreaUnderCurveTool from '../model/AreaUnderCurveTool.js';

type SelfOptions = EmptySelfOptions;

type AreaUnderCurveToolNodeOptions = SelfOptions &
  StrictOmit<AncillaryToolNodeOptions, 'mainFillProperty' | 'scrubberLineVisible'>;

export default class AreaUnderCurveToolNode extends AncillaryToolNode {

  public constructor( areaUnderCurveTool: AreaUnderCurveTool,
                      graphsNode: GraphsNode,
                      providedOptions: AreaUnderCurveToolNodeOptions ) {

    const options = optionize<AreaUnderCurveToolNodeOptions, SelfOptions, AncillaryToolNodeOptions>()( {

      // AncillaryToolNodeOptions
      mainFillProperty: CalculusGrapherColors.integralCurveStrokeProperty,
      scrubberLineVisible: true
    }, providedOptions );

    super( areaUnderCurveTool, areaUnderCurveTool.graphType, graphsNode, options );

    // add shaded area chart to the graphNode
    const graphNode = this.getGraphNode( areaUnderCurveTool.graphType );
    graphNode.addShadedAreaChart( areaUnderCurveTool, {
      visibleProperty: this.visibleProperty,
      positiveFill: areaUnderCurveTool.positiveFillProperty,
      negativeFill: areaUnderCurveTool.negativeFillProperty
    } );

    this.addLinkedElement( areaUnderCurveTool, {
      tandem: options.tandem.createTandem( areaUnderCurveTool.tandem.name )
    } );
  }
}
calculusGrapher.register( 'AreaUnderCurveToolNode', AreaUnderCurveToolNode );
