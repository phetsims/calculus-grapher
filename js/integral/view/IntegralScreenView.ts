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
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import CalculusGrapherConstants from '../../common/CalculusGrapherConstants.js';
import { RichText } from '../../../../scenery/js/imports.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NetSignedAreaAccordionBox from '../../common/view/NetSignedAreaAccordionBox.js';
import Checkbox from '../../../../sun/js/Checkbox.js';

type SelfOptions = EmptySelfOptions;

type IntroScreenViewOptions = SelfOptions & CalculusGrapherScreenViewOptions;

export default class IntegralScreenView extends CalculusGrapherScreenView {

  public constructor( model: IntegralModel, providedOptions: IntroScreenViewOptions ) {

    const options = optionize<IntroScreenViewOptions, SelfOptions, CalculusGrapherScreenViewOptions>()( {

      // CalculusGrapherScreenViewOptions
      controlPanelOptions: {
        smoothButtonVisible: false
      }
    }, providedOptions );

    super( model, options );

    // Add decorations to the graphs for the AreaUnderCurveScrubber.
    this.graphsNode.addAreaUnderCurveView( model.areaUnderCurveScrubber, this.visibleProperties.areaUnderCurveVisibleProperty );

    // The accordion box titled 'Net Signed Area'
    const netSignedAreaAccordionBox = new NetSignedAreaAccordionBox( model.areaUnderCurveScrubber, {
      top: this.graphsNode.y + this.graphsNode.originalGraphNode.y,
      left: 10,
      visibleProperty: this.visibleProperties.areaUnderCurveVisibleProperty,
      tandem: options.tandem.createTandem( 'netSignedAreaAccordionBox' )
    } );
    this.screenViewRootNode.addChild( netSignedAreaAccordionBox );

    // Add 'Area Under Curve' checkbox to the bottom of the main control panel.
    const areaUnderCurveCheckbox = new Checkbox( model.areaUnderCurveScrubber.visibleProperty,
      new RichText( CalculusGrapherStrings.checkbox.areaUnderCurveStringProperty, {
        font: CalculusGrapherConstants.CONTROL_FONT,
        maxWidth: 100
      } ), {
        enabledProperty: DerivedProperty.not( model.predictModeEnabledProperty ),
        tandem: this.controlPanel.tandem.createTandem( 'areaUnderCurveCheckbox' )
      } );
    this.controlPanel.appendContent( areaUnderCurveCheckbox );
  }

  public override reset(): void {
    super.reset();
  }
}

calculusGrapher.register( 'IntegralScreenView', IntegralScreenView );
