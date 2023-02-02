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
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import CalculusGrapherConstants from '../../common/CalculusGrapherConstants.js';
import { RichText } from '../../../../scenery/js/imports.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NetSignedAreaAccordionBox from '../../common/view/NetSignedAreaAccordionBox.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';

type SelfOptions = EmptySelfOptions;

type IntroScreenViewOptions = SelfOptions & PickRequired<CalculusGrapherScreenViewOptions, 'tandem'>;

export default class IntegralScreenView extends CalculusGrapherScreenView {

  public constructor( model: IntegralModel, providedOptions: IntroScreenViewOptions ) {

    const options = optionize<IntroScreenViewOptions, SelfOptions, CalculusGrapherScreenViewOptions>()( {

      // CalculusGrapherScreenViewOptions
      controlPanelOptions: {
        hasSmoothButton: false
      }
    }, providedOptions );

    super( model, options );

    // Add decorations to the graphs for the AreaUnderCurveScrubber.
    this.graphsNode.addAreaUnderCurveView( model.areaUnderCurveScrubber, this.visibleProperties.areaUnderCurveVisibleProperty );

    // The accordion box titled 'Net Signed Area'
    const netSignedAreaAccordionBox = new NetSignedAreaAccordionBox( model.areaUnderCurveScrubber, {
      visibleProperty: this.visibleProperties.areaUnderCurveVisibleProperty,
      tandem: options.tandem.createTandem( 'netSignedAreaAccordionBox' )
    } );
    this.screenViewRootNode.addChild( netSignedAreaAccordionBox );

    // Center netSignedAreaAccordionBox in the negative space to the left of graphNode, top-aligned with graphNode.y.
    this.graphsNode.boundsProperty.link( () => {
      netSignedAreaAccordionBox.centerX = this.layoutBounds.left + ( this.graphsNode.left - this.layoutBounds.left ) / 2;
      netSignedAreaAccordionBox.top = this.graphsNode.y + this.graphsNode.originalGraphNode.y;
    } );

    // Add 'Area Under Curve' checkbox to the bottom of the main control panel.
    const areaUnderCurveCheckboxTandem = this.controlPanel.tandem.createTandem( 'areaUnderCurveCheckbox' );
    const areaUnderCurveCheckbox = new Checkbox( model.areaUnderCurveScrubber.visibleProperty,
      new RichText( CalculusGrapherStrings.checkbox.areaUnderCurveStringProperty, {
        font: CalculusGrapherConstants.CONTROL_FONT,
        maxWidth: 100,
        tandem: areaUnderCurveCheckboxTandem.createTandem( 'text' )
      } ), {
        boxWidth: CalculusGrapherConstants.CHECKBOX_WIDTH,
        enabledProperty: DerivedProperty.not( model.predictEnabledProperty ),
        tandem: areaUnderCurveCheckboxTandem
      } );
    this.controlPanel.appendContent( areaUnderCurveCheckbox );
  }

  public override reset(): void {
    super.reset();
  }
}

calculusGrapher.register( 'IntegralScreenView', IntegralScreenView );
