// Copyright 2020-2025, University of Colorado Boulder

/**
 * IntegralScreenView is the top-level view for the 'Integral' screen.
 *
 * @author Brandon Li
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import calculusGrapher from '../../calculusGrapher.js';
import AreaUnderCurveCheckbox from '../../common/view/AreaUnderCurveCheckbox.js';
import CalculusGrapherScreenView, { CalculusGrapherScreenViewOptions } from '../../common/view/CalculusGrapherScreenView.js';
import NetSignedAreaAccordionBox from '../../common/view/NetSignedAreaAccordionBox.js';
import IntegralModel from '../model/IntegralModel.js';
import IntegralScreenSummaryContent from './IntegralScreenSummaryContent.js';

type SelfOptions = EmptySelfOptions;

type IntroScreenViewOptions = SelfOptions & PickRequired<CalculusGrapherScreenViewOptions, 'tandem'>;

export default class IntegralScreenView extends CalculusGrapherScreenView {

  private readonly resetIntegralScreenView: () => void;

  public constructor( model: IntegralModel, providedOptions: IntroScreenViewOptions ) {

    const options = optionize<IntroScreenViewOptions, SelfOptions, CalculusGrapherScreenViewOptions>()( {

      // CalculusGrapherScreenViewOptions
      controlPanelOptions: {
        hasSmoothButton: false
      },
      screenSummaryContent: new IntegralScreenSummaryContent()
    }, providedOptions );

    super( model, options );

    // Add decorations to the graphs for the AreaUnderCurveScrubber.
    this.graphsNode.addAreaUnderCurveView( model.areaUnderCurveScrubber, model.predictEnabledProperty );

    // The accordion box titled 'Net Signed Area'
    const netSignedAreaAccordionBox = new NetSignedAreaAccordionBox( model.areaUnderCurveScrubber,
      model.predictEnabledProperty, {
        tandem: options.tandem.createTandem( 'netSignedAreaAccordionBox' )
      } );
    this.screenViewRootNode.addChild( netSignedAreaAccordionBox );

    // Center netSignedAreaAccordionBox in the negative space to the left of graphNode, top-aligned with graphNode.y.
    Multilink.multilink( [ this.graphsNode.boundsProperty, netSignedAreaAccordionBox.boundsProperty ],
      () => {
        const eyeToggleButtonLeft = this.graphsNode.x + this.graphsNode.getEyeToggleButtonXOffset();
        netSignedAreaAccordionBox.centerX = this.layoutBounds.left + ( eyeToggleButtonLeft - this.layoutBounds.left ) / 2;
        netSignedAreaAccordionBox.top = this.graphsNode.y + this.graphsNode.originalGraphNode.y;
      } );

    // Add 'Area Under Curve' checkbox to the top of the checkbox group.
    const areaUnderCurveCheckbox = new AreaUnderCurveCheckbox( model.areaUnderCurveScrubber.visibleProperty,
      model.predictEnabledProperty, this.checkboxGroup.tandem.createTandem( 'areaUnderCurveCheckbox' ) );
    this.checkboxGroup.insertChild( 0, areaUnderCurveCheckbox );

    this.resetIntegralScreenView = () => {
      netSignedAreaAccordionBox.reset();
    };

    // Play Area focus order
    affirm( !this.graphSetRadioButtonGroup, 'This screen is not expected to have a graphSetRadioButtonGroup.' );
    this.pdomPlayAreaNode.pdomOrder = [
      this.graphsNode,
      this.rightVBox,
      this.graphsNode.scrubberNodesParent,
      netSignedAreaAccordionBox
    ];

    // Control Area focus order
    this.pdomControlAreaNode.pdomOrder = [
      this.resetAllButton
    ];
  }

  public override reset(): void {
    this.resetIntegralScreenView();
    super.reset();
  }
}

calculusGrapher.register( 'IntegralScreenView', IntegralScreenView );