// Copyright 2022, University of Colorado Boulder

/**
 * AreaUnderCurveToolNode is the area under the curve tool
 *  Its responsibilities include:
 * - Creating and adding a focus circle to the integral curve
 * - Creating and adding the shaded area chart to the original curve
 *
 * @author Martin Veillette
 */

import optionize from '../../../../phet-core/js/optionize.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import CalculusGrapherColors from '../../common/CalculusGrapherColors.js';
import Range from '../../../../dot/js/Range.js';
import { getGraphTypeStroke } from '../../common/model/GraphType.js';
import AncillaryTool from '../../common/model/AncillaryTool.js';
import CalculusGrapherControlPanel from '../../common/view/CalculusGrapherControlPanel.js';
import GraphsNode from '../../common/view/GraphsNode.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import AncillaryToolNode, { AncillaryToolNodeOptions } from '../../common/view/AncillaryToolNode.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';

type SelfOptions = {
  visiblePropertiesTandem: Tandem;
};

export type AreaUnderCurveToolNodeOptions = SelfOptions & StrictOmit<AncillaryToolNodeOptions,
  'barometerStringProperty' | 'checkboxStringProperty' | 'mainFillProperty'>;

export default class AreaUnderCurveToolNode extends AncillaryToolNode {

  public constructor( areaUnderCurveTool: AncillaryTool,
                      predictModeEnabledProperty: TReadOnlyProperty<boolean>,
                      controlPanel: CalculusGrapherControlPanel,
                      graphsNode: GraphsNode,
                      providedOptions: AreaUnderCurveToolNodeOptions ) {

    const options = optionize<AreaUnderCurveToolNodeOptions, SelfOptions, AncillaryToolNodeOptions>()( {

      // AncillaryToolNodeOptions
      barometerStringProperty: CalculusGrapherStrings.barometer.areaUnderCurveStringProperty,
      checkboxStringProperty: CalculusGrapherStrings.checkbox.areaUnderCurveStringProperty,
      mainFillProperty: CalculusGrapherColors.integralCurveStrokeProperty,
      scrubberLineVisible: true,
      barometerModelYRange: new Range( -100, 100 )

    }, providedOptions );

    super( areaUnderCurveTool, predictModeEnabledProperty, controlPanel, graphsNode, options );

    // add shaded area chart to the original curve
    graphsNode.originalGraphNode.addShadedAreaChart(
      areaUnderCurveTool, {
        visibleProperty: this.ancillaryToolVisibleProperty,
        upFill: new DerivedProperty(
          [ CalculusGrapherColors.integralCurveStrokeProperty ],
          color => color.brighterColor( 0.6 ) ),
        downFill: new DerivedProperty(
          [ CalculusGrapherColors.integralCurveStrokeProperty ],
          color => color.brighterColor( 0.8 ) )
      } );

    // add focus circle (disk) to the integral curve
    graphsNode.integralGraphNode.addFocusCircle(
      areaUnderCurveTool.xProperty,
      areaUnderCurveTool.yIntegralProperty,
      {
        visibleProperty: this.ancillaryToolVisibleProperty,
        fill: getGraphTypeStroke( 'integral' )
      } );

  }

  public override reset(): void {
    super.reset();
  }
}
calculusGrapher.register( 'AreaUnderCurveToolNode', AreaUnderCurveToolNode );
