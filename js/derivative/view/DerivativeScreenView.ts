// Copyright 2020-2023, University of Colorado Boulder

/**
 * DerivativeScreenView is the top-level view for the 'Derivative' screen.
 *
 * @author Brandon Li
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherScreenView, { CalculusGrapherScreenViewOptions } from '../../common/view/CalculusGrapherScreenView.js';
import DerivativeModel from '../model/DerivativeModel.js';
import SlopeOfTangentAccordionBox from '../../common/view/SlopeOfTangentAccordionBox.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import TangentCheckbox from '../../common/view/TangentCheckbox.js';
import Multilink from '../../../../axon/js/Multilink.js';

type SelfOptions = EmptySelfOptions;

type DerivativeScreenViewOptions = SelfOptions & PickRequired<CalculusGrapherScreenViewOptions, 'tandem'>;

export default class DerivativeScreenView extends CalculusGrapherScreenView {

  private readonly resetDerivativeScreenView: () => void;

  public constructor( model: DerivativeModel, providedOptions: DerivativeScreenViewOptions ) {

    const options = optionize<DerivativeScreenViewOptions, SelfOptions, CalculusGrapherScreenViewOptions>()( {

      // CalculusGrapherScreenViewOptions
      controlPanelOptions: {
        hasSmoothButton: false
      }
    }, providedOptions );

    super( model, options );

    // Add decorations to the graphs for the TangentScrubber.
    this.graphsNode.addTangentView( model.tangentScrubber, model.predictEnabledProperty );

    // The accordion box titled 'Slope Of Tangent'
    const slopeOfTangentAccordionBox = new SlopeOfTangentAccordionBox( model.tangentScrubber, model.predictEnabledProperty, {
      tandem: options.tandem.createTandem( 'slopeOfTangentAccordionBox' )
    } );
    this.screenViewRootNode.addChild( slopeOfTangentAccordionBox );

    // Center slopeOfTangentAccordionBox in the negative space to the left of graphNode, top-aligned with graphNode.y.
    Multilink.multilink( [ this.graphsNode.boundsProperty, slopeOfTangentAccordionBox.boundsProperty ],
      () => {
        const eyeToggleButtonLeft = this.graphsNode.x + this.graphsNode.getEyeToggleButtonXOffset();
        slopeOfTangentAccordionBox.centerX = this.layoutBounds.left + ( eyeToggleButtonLeft - this.layoutBounds.left ) / 2;
        slopeOfTangentAccordionBox.top = this.graphsNode.y + this.graphsNode.originalGraphNode.y;
      } );

    // Add 'Tangent' checkbox to the top of the checkbox group.
    const tangentCheckbox = new TangentCheckbox( model.tangentScrubber.visibleProperty, model.predictEnabledProperty,
      this.checkboxGroup.tandem.createTandem( 'tangentCheckbox' ) );
    this.checkboxGroup.insertChild( 0, tangentCheckbox );

    this.resetDerivativeScreenView = () => {
      slopeOfTangentAccordionBox.reset();
    };
  }

  public override reset(): void {
    this.resetDerivativeScreenView();
    super.reset();
  }
}
calculusGrapher.register( 'DerivativeScreenView', DerivativeScreenView );
