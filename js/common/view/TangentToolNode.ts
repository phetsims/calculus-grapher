// Copyright 2022-2023, University of Colorado Boulder

/**
 * TangentToolNode is the tangent tool.
 * Its responsibilities include:
 * - Creating and adding a double-headed tangent arrow to the graph Node associated with graphType
 *
 * @author Martin Veillette
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import calculusGrapher from '../../calculusGrapher.js';
import GraphsNode from './GraphsNode.js';
import AncillaryToolNode, { AncillaryToolNodeOptions } from './AncillaryToolNode.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import TangentTool from '../model/TangentTool.js';

type SelfOptions = EmptySelfOptions;

type TangentToolNodeOptions = SelfOptions &
  StrictOmit<AncillaryToolNodeOptions, 'mainFillProperty' | 'scrubberLineVisible'>;

export default class TangentToolNode extends AncillaryToolNode {

  public constructor( tangentTool: TangentTool,
                      graphsNode: GraphsNode,
                      providedOptions: TangentToolNodeOptions ) {

    const options = optionize<TangentToolNodeOptions, SelfOptions, AncillaryToolNodeOptions>()( {

      // AncillaryToolNodeOptions
      mainFillProperty: tangentTool.colorProperty,
      scrubberLineVisible: false
    }, providedOptions );

    super( tangentTool, tangentTool.graphType, graphsNode, options );

    // add double-headed arrow to the graphNode
    const graphNode = this.getGraphNode( tangentTool.graphType );
    graphNode.addTangentArrowNode( tangentTool, {
      visibleProperty: this.visibleProperty
    } );

    this.addLinkedElement( tangentTool, {
      tandem: options.tandem.createTandem( tangentTool.tandem.name )
    } );
  }
}
calculusGrapher.register( 'TangentToolNode', TangentToolNode );
