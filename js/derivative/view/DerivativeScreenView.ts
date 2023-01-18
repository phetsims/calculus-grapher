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
        smoothButtonVisible: false
      }
    }, providedOptions );

    super( model, options );

    // Add decorations to the graphs for the TangentScrubber.
    this.graphsNode.addTangentView( model.tangentScrubber, this.visibleProperties.tangentVisibleProperty );

    // The accordion box titled 'Slope Of Tangent'
    const slopeOfTangentAccordionBox = new SlopeOfTangentAccordionBox( model.tangentScrubber, {
      top: this.graphsNode.y,
      left: 10,
      visibleProperty: this.visibleProperties.tangentVisibleProperty,
      tandem: options.tandem.createTandem( 'slopeOfTangentAccordionBox' )
    } );
    this.screenViewRootNode.addChild( slopeOfTangentAccordionBox );

    // Add 'Tangent' checkbox to the bottom of the main control panel.
    const tangentCheckbox = new Checkbox( model.tangentScrubber.visibleProperty,
      new RichText( CalculusGrapherStrings.checkbox.tangentStringProperty, {
        font: CalculusGrapherConstants.CONTROL_FONT,
        maxWidth: 100
      } ), {
        enabledProperty: DerivedProperty.not( model.predictModeEnabledProperty ),
        tandem: this.controlPanel.tandem.createTandem( 'tangentCheckbox' )
      } );
    this.controlPanel.appendContent( tangentCheckbox );
  }

  public override reset(): void {
    super.reset();
  }
}
calculusGrapher.register( 'DerivativeScreenView', DerivativeScreenView );
