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
  'barometerStringProperty' | 'checkboxStringProperty' | 'mainFillProperty' | 'barometerYProperty' | 'barometerStrokeProperty'>;

export default class AreaUnderCurveToolNode extends AncillaryToolNode {

  public constructor( areaUnderCurveTool: AncillaryTool,
                      graphType: GraphType,
                      predictModeEnabledProperty: TReadOnlyProperty<boolean>,
                      controlPanel: CalculusGrapherControlPanel,
                      graphsNode: GraphsNode,
                      providedOptions: AreaUnderCurveToolNodeOptions ) {

    const integralOfGraphType = getIntegralOf( graphType );

    // value property associated with the barometer
    const barometerYProperty = areaUnderCurveTool.getYProperty( integralOfGraphType );


    // color associated with barometer rectangle: changes according to value of barometer
    const barometerStrokeProperty = new DerivedProperty( [ barometerYProperty,
        CalculusGrapherColors.integralPositiveFillProperty,
        CalculusGrapherColors.integralNegativeFillProperty ],
      ( yValue, positiveFill, negativeFill ) => yValue > 0 ? positiveFill : negativeFill );

    const options = optionize<AreaUnderCurveToolNodeOptions, SelfOptions, AncillaryToolNodeOptions>()( {

      // AncillaryToolNodeOptions
      barometerStringProperty: CalculusGrapherStrings.barometer.areaUnderCurveStringProperty,
      barometerYProperty: barometerYProperty,
      barometerStrokeProperty: barometerStrokeProperty,
      checkboxStringProperty: CalculusGrapherStrings.checkbox.areaUnderCurveStringProperty,
      mainFillProperty: CalculusGrapherColors.integralCurveStrokeProperty,
      scrubberLineVisible: true,
      barometerModelYRange: new Range( -300, 300 )

    }, providedOptions );

    super( areaUnderCurveTool, graphType, predictModeEnabledProperty, controlPanel, graphsNode, options );

    const graphNode = this.getGraphNode( graphType );

    // add shaded area chart to the graphNode
    graphNode.addShadedAreaChart(
      areaUnderCurveTool, {
        visibleProperty: this.getAncillaryToolVisibleProperty( graphType ),
        positiveFill: CalculusGrapherColors.integralPositiveFillProperty,
        negativeFill: CalculusGrapherColors.integralNegativeFillProperty
      } );
  }


  public override reset(): void {
    super.reset();
  }
}
calculusGrapher.register( 'AreaUnderCurveToolNode', AreaUnderCurveToolNode );
