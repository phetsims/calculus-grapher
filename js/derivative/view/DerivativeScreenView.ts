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
import TangentToolNode from '../../common/view/TangentToolNode.js';
import BarometerAccordionBox from '../../common/view/BarometerAccordionBox.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import Range from '../../../../dot/js/Range.js';
import CalculusGrapherColors from '../../common/CalculusGrapherColors.js';
import CalculusGrapherConstants from '../../common/CalculusGrapherConstants.js';
import { RichText } from '../../../../scenery/js/imports.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';

type SelfOptions = EmptySelfOptions;

type DerivativeScreenViewOptions = SelfOptions & CalculusGrapherScreenViewOptions;

export default class DerivativeScreenView extends CalculusGrapherScreenView {

  // indicates if checkbox of the tangent of f(x) is checked.
  private readonly tangentToolNode: TangentToolNode;

  public constructor( model: DerivativeModel, providedOptions: DerivativeScreenViewOptions ) {

    const options = optionize<DerivativeScreenViewOptions, SelfOptions, CalculusGrapherScreenViewOptions>()( {
      controlPanelOptions: {
        smoothButtonVisible: false
      }
    }, providedOptions );

    super( model, options );

    this.tangentToolNode = new TangentToolNode(
      model.tangentTool,
      'original',
      model.predictModeEnabledProperty,
      this.graphsNode, {
        visiblePropertiesTandem: this.visibleProperties.tandem,
        tandem: options.tandem.createTandem( 'tangentToolNode' )
      } );

    this.addChild( this.tangentToolNode );

    // create and add the barometer associated with the ancillaryTool appearing to the left of the graphs
    const barometer = new BarometerAccordionBox(
      model.tangentTool.getYProperty( 'derivative' ),
      CalculusGrapherStrings.barometer.slopeOfTangentStringProperty, {
        chartTransformOptions: {
          modelYRange: new Range( -10, 10 )
        },
        top: this.graphsNode.y,
        left: 20,
        visibleProperty: this.tangentToolNode.getAncillaryToolVisibleProperty( 'original' ),
        barometerStrokeProperty: CalculusGrapherColors.derivativeCurveStrokeProperty,
        tandem: options.tandem.createTandem( 'tangentAccordionBox' )
      } );
    this.screenViewRootNode.addChild( barometer );

    // add ancillaryTool checkbox to the bottom of the main control panel
    this.controlPanel.addCheckbox( this.tangentToolNode.ancillaryToolCheckboxProperty,
      new RichText( CalculusGrapherStrings.checkbox.tangentStringProperty, {
        font: CalculusGrapherConstants.CONTROL_FONT
      } ), {
        enabledProperty: DerivedProperty.not( model.predictModeEnabledProperty ),
        tandem: this.controlPanel.tandem.createTandem( 'tangentCheckbox' )
      } );
  }

  public override reset(): void {
    super.reset();
    this.tangentToolNode.reset();
  }
}
calculusGrapher.register( 'DerivativeScreenView', DerivativeScreenView );
