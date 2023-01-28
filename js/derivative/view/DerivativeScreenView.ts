// Copyright 2020-2023, University of Colorado Boulder

/**
 * Top-level view for the 'Derivative Lab' screen.
 *
 * @author Brandon Li
 * @author Martin Veillette
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherScreenView, { CalculusGrapherScreenViewOptions } from '../../common/view/CalculusGrapherScreenView.js';
import DerivativeModel from '../model/DerivativeModel.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import CalculusGrapherConstants from '../../common/CalculusGrapherConstants.js';
import { RichText } from '../../../../scenery/js/imports.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import SlopeOfTangentAccordionBox from '../../common/view/SlopeOfTangentAccordionBox.js';
import Checkbox from '../../../../sun/js/Checkbox.js';

type SelfOptions = EmptySelfOptions;

type DerivativeScreenViewOptions = SelfOptions & CalculusGrapherScreenViewOptions;

export default class DerivativeScreenView extends CalculusGrapherScreenView {

  public constructor( model: DerivativeModel, providedOptions: DerivativeScreenViewOptions ) {

    const options = optionize<DerivativeScreenViewOptions, SelfOptions, CalculusGrapherScreenViewOptions>()( {

      // CalculusGrapherScreenViewOptions
      controlPanelOptions: {
        hasSmoothButton: false
      }
    }, providedOptions );

    super( model, options );

    // Add decorations to the graphs for the TangentScrubber.
    this.graphsNode.addTangentView( model.tangentScrubber, this.visibleProperties.tangentVisibleProperty );

    // The accordion box titled 'Slope Of Tangent'
    const slopeOfTangentAccordionBox = new SlopeOfTangentAccordionBox( model.tangentScrubber, {
      visibleProperty: this.visibleProperties.tangentVisibleProperty,
      tandem: options.tandem.createTandem( 'slopeOfTangentAccordionBox' )
    } );
    this.screenViewRootNode.addChild( slopeOfTangentAccordionBox );

    // Center slopeOfTangentAccordionBox in the negative space to the left of graphNode, top-aligned with graphNode.y.
    this.graphsNode.boundsProperty.link( () => {
      slopeOfTangentAccordionBox.centerX = this.layoutBounds.left + ( this.graphsNode.left - this.layoutBounds.left ) / 2;
      slopeOfTangentAccordionBox.top = this.graphsNode.y + this.graphsNode.originalGraphNode.y;
    } );

    // Add 'Tangent' checkbox to the bottom of the main control panel.
    const tangentCheckboxTandem = this.controlPanel.tandem.createTandem( 'tangentCheckbox' );
    const tangentCheckbox = new Checkbox( model.tangentScrubber.visibleProperty,
      new RichText( CalculusGrapherStrings.checkbox.tangentStringProperty, {
        font: CalculusGrapherConstants.CONTROL_FONT,
        maxWidth: 100,
        tandem: tangentCheckboxTandem.createTandem( 'text' )
      } ), {
        boxWidth: CalculusGrapherConstants.CHECKBOX_WIDTH,
        enabledProperty: DerivedProperty.not( model.predictModeEnabledProperty ),
        tandem: tangentCheckboxTandem
      } );
    this.controlPanel.appendContent( tangentCheckbox );
  }

  public override reset(): void {
    super.reset();
  }
}
calculusGrapher.register( 'DerivativeScreenView', DerivativeScreenView );
