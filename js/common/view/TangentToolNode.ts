// Copyright 2022-2023, University of Colorado Boulder

/**
 * TangentToolNode is the tangent tool.
 * Its responsibilities include:
 * - Creating and adding a double-headed tangent arrow to the graph Node associated with graphType
 *
 * @author Martin Veillette
 */

import optionize from '../../../../phet-core/js/optionize.js';
import calculusGrapher from '../../calculusGrapher.js';
import AncillaryTool from '../model/AncillaryTool.js';
import GraphsNode from './GraphsNode.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import AncillaryToolNode, { AncillaryToolNodeOptions } from './AncillaryToolNode.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import { GraphType } from '../model/GraphType.js';

type SelfOptions = {
  visiblePropertiesTandem: Tandem;
};

export type TangentToolNodeOptions = SelfOptions & StrictOmit<AncillaryToolNodeOptions,
  | 'mainFillProperty'>;

export default class TangentToolNode extends AncillaryToolNode {

  public constructor( tangentTool: AncillaryTool,
                      ancillaryToolCheckboxProperty: TReadOnlyProperty<boolean>,
                      graphType: GraphType,
                      predictModeEnabledProperty: TReadOnlyProperty<boolean>,
                      graphsNode: GraphsNode,
                      providedOptions: TangentToolNodeOptions ) {


    const options = optionize<TangentToolNodeOptions, SelfOptions, AncillaryToolNodeOptions>()( {

      // AncillaryToolNodeOptions
      mainFillProperty: CalculusGrapherColors.derivativeCurveStrokeProperty,
      scrubberLineVisible: false

    }, providedOptions );

    super( tangentTool, ancillaryToolCheckboxProperty, graphType, predictModeEnabledProperty, graphsNode, options );

    const graphNode = this.getGraphNode( graphType );

    // add double-headed arrow to the graphNode
    graphNode.addTangentArrowNode(
      tangentTool, {
        visibleProperty: this.getAncillaryToolVisibleProperty( graphType )
      } );

  }
}
calculusGrapher.register( 'TangentToolNode', TangentToolNode );
