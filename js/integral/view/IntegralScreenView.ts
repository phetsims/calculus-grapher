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
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import CalculusGrapherConstants from '../../common/CalculusGrapherConstants.js';
import { RichText } from '../../../../scenery/js/imports.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import AccumulatedAreaAccordionBox from '../../common/view/AccumulatedAreaAccordionBox.js';

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

    this.areaUnderCurveToolNode = new AreaUnderCurveToolNode(
      model.areaUnderCurveTool,
      'original',
      model.predictModeEnabledProperty,
      this.graphsNode, {
        tandem: options.tandem.createTandem( 'areaUnderCurveToolNode' )
      } );
    this.addChild( this.areaUnderCurveToolNode );

    // The accordion box titled 'Accumulated Area'
    const accumulatedAreaAccordionBox = new AccumulatedAreaAccordionBox( model.areaUnderCurveTool, {
      top: this.graphsNode.y + this.graphsNode.getGraphNode( 'original' ).y,
      left: 10,
      visibleProperty: this.areaUnderCurveToolNode.visibleProperty,
      tandem: options.tandem.createTandem( 'accumulatedAreaAccordionBox' )
    } );
    this.screenViewRootNode.addChild( accumulatedAreaAccordionBox );

    // Add 'Area Under Curve' checkbox to the bottom of the main control panel.
    this.controlPanel.addCheckbox( this.visibleProperties.areaUnderCurveVisibleProperty,
      new RichText( CalculusGrapherStrings.checkbox.areaUnderCurveStringProperty, {
        font: CalculusGrapherConstants.CONTROL_FONT,
        maxWidth: 100
      } ), {
        enabledProperty: DerivedProperty.not( model.predictModeEnabledProperty ),
        tandem: this.controlPanel.tandem.createTandem( 'areaUnderCurveCheckbox' )
      } );
  }

  public override reset(): void {
    super.reset();
  }
}

calculusGrapher.register( 'IntegralScreenView', IntegralScreenView );
