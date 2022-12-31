// Copyright 2022, University of Colorado Boulder

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
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import CalculusGrapherControlPanel from './CalculusGrapherControlPanel.js';
import GraphsNode from './GraphsNode.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Range from '../../../../dot/js/Range.js';
import AncillaryToolNode, { AncillaryToolNodeOptions } from './AncillaryToolNode.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import { getDerivativeOf, GraphType } from '../model/GraphType.js';

type SelfOptions = {
  visiblePropertiesTandem: Tandem;
};

export type TangentToolNodeOptions = SelfOptions & StrictOmit<AncillaryToolNodeOptions,
  'barometerStringProperty' | 'checkboxStringProperty' | 'mainFillProperty' | 'barometerYProperty'>;

export default class TangentToolNode extends AncillaryToolNode {

  public constructor( tangentTool: AncillaryTool,
                      graphType: GraphType,
                      predictModeEnabledProperty: TReadOnlyProperty<boolean>,
                      controlPanel: CalculusGrapherControlPanel,
                      graphsNode: GraphsNode,
                      providedOptions: TangentToolNodeOptions ) {


    const derivativeType = getDerivativeOf( graphType );

    const options = optionize<TangentToolNodeOptions, SelfOptions, AncillaryToolNodeOptions>()( {

      // AncillaryToolNodeOptions
      barometerYProperty: tangentTool.getYProperty( derivativeType ),
      barometerStringProperty: CalculusGrapherStrings.barometer.slopeOfTangentStringProperty,
      checkboxStringProperty: CalculusGrapherStrings.checkbox.tangentStringProperty,
      mainFillProperty: CalculusGrapherColors.derivativeCurveStrokeProperty,
      scrubberLineVisible: true,
      barometerModelYRange: new Range( -10, 10 )

    }, providedOptions );

    super( tangentTool, graphType, predictModeEnabledProperty, controlPanel, graphsNode, options );

    const graphNode = this.getGraphNode( graphType );

    // add double-headed arrow to the graphNode
    graphNode.addTangentArrowNode(
      tangentTool, {
        visibleProperty: this.ancillaryToolVisibleProperty
      } );
  }

  public override reset(): void {
    super.reset();
  }
}
calculusGrapher.register( 'TangentToolNode', TangentToolNode );
