// Copyright 2020-2022, University of Colorado Boulder

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
import TangentToolNode from './TangentToolNode.js';

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
      model.predictModeEnabledProperty,
      this.controlPanel,
      this.graphsNode, {
        visiblePropertiesTandem: this.visibleProperties.tandem,
        tandem: options.tandem.createTandem( 'tangentToolNode' )
      } );

    this.addChild( this.tangentToolNode );
  }

  public override reset(): void {
    super.reset();
    this.tangentToolNode.reset();
  }
}
calculusGrapher.register( 'DerivativeScreenView', DerivativeScreenView );
