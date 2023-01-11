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
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import CalculusGrapherConstants from '../../common/CalculusGrapherConstants.js';
import { RichText } from '../../../../scenery/js/imports.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import SlopeOfTangentAccordionBox from '../../common/view/SlopeOfTangentAccordionBox.js';

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
        tandem: ( model.tangentTool.tandem === Tandem.OPT_OUT ) ? Tandem.OPT_OUT : options.tandem.createTandem( 'tangentToolNode' )
      } );

    this.addChild( this.tangentToolNode );

    // The accordion box titled 'Slope Of Tangent'
    const slopeOfTangentAccordionBox = new SlopeOfTangentAccordionBox( model.tangentTool, {
      top: this.graphsNode.y,
      left: 10,
      visibleProperty: this.tangentToolNode.visibleProperty,
      tandem: ( model.tangentTool.tandem === Tandem.OPT_OUT ) ? Tandem.OPT_OUT : options.tandem.createTandem( 'slopeOfTangentAccordionBox' )
    } );
    this.screenViewRootNode.addChild( slopeOfTangentAccordionBox );

    // Add 'Tangent' checkbox to the bottom of the main control panel.
    this.controlPanel.addCheckbox( this.visibleProperties.tangentVisibleProperty,
      new RichText( CalculusGrapherStrings.checkbox.tangentStringProperty, {
        font: CalculusGrapherConstants.CONTROL_FONT,
        maxWidth: 100
      } ), {
        enabledProperty: DerivedProperty.not( model.predictModeEnabledProperty ),
        tandem: this.controlPanel.tandem.createTandem( 'tangentCheckbox' )
      } );
  }

  public override reset(): void {
    super.reset();
  }
}
calculusGrapher.register( 'DerivativeScreenView', DerivativeScreenView );
