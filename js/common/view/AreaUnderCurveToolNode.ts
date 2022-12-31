// Copyright 2022, University of Colorado Boulder

/**
 * AreaUnderCurveToolNode is the area under the curve tool
 *  Its responsibilities include:
 * - Creating and adding the shaded area chart to the graph node associated with `graphType`
 *
 * @author Martin Veillette
 */

import optionize from '../../../../phet-core/js/optionize.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import Range from '../../../../dot/js/Range.js';
import { getIntegralOf, GraphType } from '../model/GraphType.js';
import AncillaryTool from '../model/AncillaryTool.js';
import CalculusGrapherControlPanel from './CalculusGrapherControlPanel.js';
import GraphsNode from './GraphsNode.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import AncillaryToolNode, { AncillaryToolNodeOptions } from './AncillaryToolNode.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';

type SelfOptions = {
  visiblePropertiesTandem: Tandem;

};

export type AreaUnderCurveToolNodeOptions = SelfOptions & StrictOmit<AncillaryToolNodeOptions,
  'barometerStringProperty' | 'checkboxStringProperty' | 'mainFillProperty' | 'barometerYProperty'>;

export default class AreaUnderCurveToolNode extends AncillaryToolNode {

  public constructor( areaUnderCurveTool: AncillaryTool,
                      graphType: GraphType,
                      predictModeEnabledProperty: TReadOnlyProperty<boolean>,
                      controlPanel: CalculusGrapherControlPanel,
                      graphsNode: GraphsNode,
                      providedOptions: AreaUnderCurveToolNodeOptions ) {

    const integralOfGraphType = getIntegralOf( graphType );

    const options = optionize<AreaUnderCurveToolNodeOptions, SelfOptions, AncillaryToolNodeOptions>()( {

      // AncillaryToolNodeOptions
      barometerStringProperty: CalculusGrapherStrings.barometer.areaUnderCurveStringProperty,
      barometerYProperty: areaUnderCurveTool.getYProperty( integralOfGraphType ),
      checkboxStringProperty: CalculusGrapherStrings.checkbox.areaUnderCurveStringProperty,
      mainFillProperty: CalculusGrapherColors.integralCurveStrokeProperty,
      scrubberLineVisible: true,
      barometerModelYRange: new Range( -100, 100 )

    }, providedOptions );

    super( areaUnderCurveTool, graphType, predictModeEnabledProperty, controlPanel, graphsNode, options );

    const graphNode = this.getGraphNode( graphType );

    // add shaded area chart to the graphNode
    graphNode.addShadedAreaChart(
      areaUnderCurveTool, {
        visibleProperty: this.getAncillaryToolVisibleProperty( graphType ),
        upFill: new DerivedProperty(
          [ CalculusGrapherColors.integralCurveStrokeProperty ],
          color => color.brighterColor( 0.6 ) ),
        downFill: new DerivedProperty(
          [ CalculusGrapherColors.integralCurveStrokeProperty ],
          color => color.brighterColor( 0.8 ) )
      } );

  }

  public override reset(): void {
    super.reset();
  }
}
calculusGrapher.register( 'AreaUnderCurveToolNode', AreaUnderCurveToolNode );
