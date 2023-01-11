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
import AncillaryTool from '../model/AncillaryTool.js';
import GraphsNode from './GraphsNode.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import AncillaryToolNode, { AncillaryToolNodeOptions } from './AncillaryToolNode.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import { GraphType } from '../model/GraphType.js';

type SelfOptions = EmptySelfOptions;

type TangentToolNodeOptions = SelfOptions &
  StrictOmit<AncillaryToolNodeOptions, 'mainFillProperty' | 'scrubberLineVisible'>;

export default class TangentToolNode extends AncillaryToolNode {

  public constructor( tangentTool: AncillaryTool,
                      graphType: GraphType,
                      predictModeEnabledProperty: TReadOnlyProperty<boolean>,
                      graphsNode: GraphsNode,
                      providedOptions: TangentToolNodeOptions ) {

    const options = optionize<TangentToolNodeOptions, SelfOptions, AncillaryToolNodeOptions>()( {

      // AncillaryToolNodeOptions
      mainFillProperty: CalculusGrapherColors.derivativeCurveStrokeProperty,
      scrubberLineVisible: false
    }, providedOptions );

    super( tangentTool, graphType, predictModeEnabledProperty, graphsNode, options );

    // add double-headed arrow to the graphNode
    const graphNode = this.getGraphNode( graphType );
    graphNode.addTangentArrowNode( tangentTool, {
      visibleProperty: this.visibleProperty
    } );
  }
}
calculusGrapher.register( 'TangentToolNode', TangentToolNode );
