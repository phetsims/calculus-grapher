// Copyright 2020-2023, University of Colorado Boulder

/**
 * Top-level view for the 'Integral Lab' screen.
 *
 * @author Brandon Li
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherScreenView, { CalculusGrapherScreenViewOptions } from '../../common/view/CalculusGrapherScreenView.js';
import IntegralModel from '../model/IntegralModel.js';
import NetSignedAreaAccordionBox from '../../common/view/NetSignedAreaAccordionBox.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import AreaUnderCurveCheckbox from './AreaUnderCurveCheckbox.js';

type SelfOptions = EmptySelfOptions;

type IntroScreenViewOptions = SelfOptions & PickRequired<CalculusGrapherScreenViewOptions, 'tandem'>;

export default class IntegralScreenView extends CalculusGrapherScreenView {

  private readonly resetIntegralScreenView: () => void;

  public constructor( model: IntegralModel, providedOptions: IntroScreenViewOptions ) {

    const options = optionize<IntroScreenViewOptions, SelfOptions, CalculusGrapherScreenViewOptions>()( {

      // CalculusGrapherScreenViewOptions
      controlPanelOptions: {
        hasSmoothButton: false
      }
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
    this.graphsNode.boundsProperty.link( () => {
      netSignedAreaAccordionBox.centerX = this.layoutBounds.left + ( this.graphsNode.left - this.layoutBounds.left ) / 2;
      netSignedAreaAccordionBox.top = this.graphsNode.y + this.graphsNode.originalGraphNode.y;
    } );

    // Add 'Area Under Curve' checkbox to the bottom of the main control panel.
    const areaUnderCurveCheckbox = new AreaUnderCurveCheckbox( model.areaUnderCurveScrubber.visibleProperty,
      model.predictEnabledProperty, this.controlPanel.tandem.createTandem( 'areaUnderCurveCheckbox' ) );
    this.controlPanel.appendContent( areaUnderCurveCheckbox );

    this.resetIntegralScreenView = () => {
      netSignedAreaAccordionBox.reset();
    };
  }

  public override reset(): void {
    this.resetIntegralScreenView();
    super.reset();
  }
}

calculusGrapher.register( 'IntegralScreenView', IntegralScreenView );
