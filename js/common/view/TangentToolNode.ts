// Copyright 2022, University of Colorado Boulder

/**
 * TangentToolNode is the tangent tool.
 * Its responsibilities include:
 * - Creating and adding a focus circle to the derivative curve
 * - Creating and adding a double-headed tangent arrow to the original curve
 *
 * @author Martin Veillette
 */

import optionize from '../../../../phet-core/js/optionize.js';
import calculusGrapher from '../../calculusGrapher.js';
import AncillaryTool from '../model/AncillaryTool.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import { getGraphTypeStroke } from '../model/GraphType.js';
import CalculusGrapherControlPanel from './CalculusGrapherControlPanel.js';
import GraphsNode from './GraphsNode.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Range from '../../../../dot/js/Range.js';
import AncillaryToolNode, { AncillaryToolNodeOptions } from './AncillaryToolNode.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';

type SelfOptions = {
  visiblePropertiesTandem: Tandem;
};

export type TangentToolNodeOptions = SelfOptions & StrictOmit<AncillaryToolNodeOptions,
  'barometerStringProperty' | 'checkboxStringProperty' | 'mainFillProperty'>;

export default class TangentToolNode extends AncillaryToolNode {

  public constructor( tangentTool: AncillaryTool,
                      predictModeEnabledProperty: TReadOnlyProperty<boolean>,
                      controlPanel: CalculusGrapherControlPanel,
                      graphsNode: GraphsNode,
                      providedOptions: TangentToolNodeOptions ) {

    const options = optionize<TangentToolNodeOptions, SelfOptions, AncillaryToolNodeOptions>()( {

      // AncillaryToolNodeOptions
      barometerStringProperty: CalculusGrapherStrings.barometer.slopeOfTangentStringProperty,
      checkboxStringProperty: CalculusGrapherStrings.checkbox.tangentStringProperty,
      mainFillProperty: CalculusGrapherColors.derivativeCurveStrokeProperty,
      scrubberLineVisible: true,
      barometerModelYRange: new Range( -100, 100 )

    }, providedOptions );

    super( tangentTool, predictModeEnabledProperty, controlPanel, graphsNode, options );

    // add double-headed arrow to the original graph
    graphsNode.originalGraphNode.addTangentArrowNode(
      tangentTool, {
        visibleProperty: this.ancillaryToolVisibleProperty
      } );

    // add focus circle (disk) to the derivative curve
    graphsNode.derivativeGraphNode.addFocusCircle(
      tangentTool.xProperty,
      tangentTool.yDerivativeProperty, {
        visibleProperty: this.ancillaryToolVisibleProperty,
        fill: getGraphTypeStroke( 'derivative' )
      } );
  }

  public override reset(): void {
    super.reset();
  }
}
calculusGrapher.register( 'TangentToolNode', TangentToolNode );
