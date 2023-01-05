// Copyright 2020-2023, University of Colorado Boulder

/**
 * Top-level view for the 'Integral Lab' screen.
 *
 * @author Brandon Li
 * @author Martin Veillette
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherScreenView, { CalculusGrapherScreenViewOptions } from '../../common/view/CalculusGrapherScreenView.js';
import IntegralModel from '../model/IntegralModel.js';
import AreaUnderCurveToolNode from '../../common/view/AreaUnderCurveToolNode.js';
import BarometerAccordionBox from '../../common/view/BarometerAccordionBox.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import CalculusGrapherColors from '../../common/CalculusGrapherColors.js';
import Range from '../../../../dot/js/Range.js';
import CalculusGrapherConstants from '../../common/CalculusGrapherConstants.js';
import { RichText } from '../../../../scenery/js/imports.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { getIntegralOf } from '../../common/model/GraphType.js';

type SelfOptions = EmptySelfOptions;

export type IntroScreenViewOptions = SelfOptions & CalculusGrapherScreenViewOptions;

export default class IntegralScreenView extends CalculusGrapherScreenView {

  private readonly areaUnderCurveToolNode: AreaUnderCurveToolNode;

  public constructor( model: IntegralModel, providedOptions: IntroScreenViewOptions ) {

    const options = optionize<IntroScreenViewOptions, SelfOptions, CalculusGrapherScreenViewOptions>()( {
      controlPanelOptions: {
        smoothButtonVisible: false
      }
    }, providedOptions );

    super( model, options );

    const integralOfGraphType = getIntegralOf( 'original' );

    this.areaUnderCurveToolNode = new AreaUnderCurveToolNode(
      model.areaUnderCurveTool,
      'original',
      model.predictModeEnabledProperty,
      this.graphsNode, {
        visiblePropertiesTandem: this.visibleProperties.tandem,
        tandem: options.tandem.createTandem( 'areaUnderCurveToolNode' )
      } );
    this.addChild( this.areaUnderCurveToolNode );

    // value property associated with the barometer
    const barometerYProperty = model.areaUnderCurveTool.getYProperty( integralOfGraphType );

    // color associated with barometer rectangle: changes according to value of barometer
    const barometerStrokeProperty = new DerivedProperty( [ barometerYProperty,
        CalculusGrapherColors.integralPositiveFillProperty,
        CalculusGrapherColors.integralNegativeFillProperty ],
      ( yValue, positiveFill, negativeFill ) => yValue > 0 ? positiveFill : negativeFill );

    // create and add the barometer associated with the ancillaryTool appearing to the left of the graphs
    const barometer = new BarometerAccordionBox(
      model.areaUnderCurveTool.getYProperty( 'integral' ),
      CalculusGrapherStrings.barometer.areaUnderCurveStringProperty, {
        chartTransformOptions: {
          modelYRange: new Range( -200, 200 )
        },
        top: this.graphsNode.y + this.graphsNode.getGraphNode( 'original' ).y,
        left: 20,
        visibleProperty: this.areaUnderCurveToolNode.getAncillaryToolVisibleProperty( 'original' ),
        barometerStrokeProperty: barometerStrokeProperty,
        tandem: options.tandem.createTandem( 'areaUnderCurveAccordionBox' )
      } );
    this.screenViewRootNode.addChild( barometer );

    // add ancillaryTool checkbox to the bottom of the main control panel
    this.controlPanel.addCheckbox( this.areaUnderCurveToolNode.ancillaryToolCheckboxProperty,
      new RichText( CalculusGrapherStrings.checkbox.areaUnderCurveStringProperty, {
        font: CalculusGrapherConstants.CONTROL_FONT
      } ), {
        enabledProperty: DerivedProperty.not( model.predictModeEnabledProperty ),
        tandem: this.controlPanel.tandem.createTandem( 'areaUnderCurveCheckbox' )
      } );
  }

  public override reset(): void {
    super.reset();
    this.areaUnderCurveToolNode.reset();
  }
}

calculusGrapher.register( 'IntegralScreenView', IntegralScreenView );
