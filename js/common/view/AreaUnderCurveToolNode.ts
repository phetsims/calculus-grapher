// Copyright 2022-2023, University of Colorado Boulder

/**
 * AreaUnderCurveToolNode is the area under the curve tool
 *  Its responsibilities include:
 * - Creating and adding the shaded area chart to the graph node associated with `graphType`
 *
 * @author Martin Veillette
 */

import optionize from '../../../../phet-core/js/optionize.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import { GraphType } from '../model/GraphType.js';
import AncillaryTool from '../model/AncillaryTool.js';
import GraphsNode from './GraphsNode.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import AncillaryToolNode, { AncillaryToolNodeOptions } from './AncillaryToolNode.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';

type SelfOptions = {
  visiblePropertiesTandem: Tandem;

};

export type AreaUnderCurveToolNodeOptions = SelfOptions & StrictOmit<AncillaryToolNodeOptions,
  'mainFillProperty'>;

export default class AreaUnderCurveToolNode extends AncillaryToolNode {

  public constructor( areaUnderCurveTool: AncillaryTool,
                      ancillaryToolCheckboxProperty: TReadOnlyProperty<boolean>,
                      graphType: GraphType,
                      predictModeEnabledProperty: TReadOnlyProperty<boolean>,
                      graphsNode: GraphsNode,
                      providedOptions: AreaUnderCurveToolNodeOptions ) {

    const options = optionize<AreaUnderCurveToolNodeOptions, SelfOptions, AncillaryToolNodeOptions>()( {

      // AncillaryToolNodeOptions
      mainFillProperty: CalculusGrapherColors.integralCurveStrokeProperty,
      scrubberLineVisible: true

    }, providedOptions );

    super( areaUnderCurveTool, ancillaryToolCheckboxProperty, graphType, predictModeEnabledProperty, graphsNode, options );

    const graphNode = this.getGraphNode( graphType );

    // add shaded area chart to the graphNode
    graphNode.addShadedAreaChart(
      areaUnderCurveTool, {
        visibleProperty: this.getAncillaryToolVisibleProperty( graphType ),
        positiveFill: CalculusGrapherColors.integralPositiveFillProperty,
        negativeFill: CalculusGrapherColors.integralNegativeFillProperty
      } );
  }
}
calculusGrapher.register( 'AreaUnderCurveToolNode', AreaUnderCurveToolNode );
