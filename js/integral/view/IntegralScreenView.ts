// Copyright 2020-2022, University of Colorado Boulder

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
import AreaUnderCurveToolNode from '../../common/view/AreaUnderCurveToolNode.js';

type SelfOptions = EmptySelfOptions;

export type IntroScreenViewOptions = SelfOptions & CalculusGrapherScreenViewOptions;

export default class IntegralScreenView extends CalculusGrapherScreenView {

  private readonly areaUnderCurveToolNode: AreaUnderCurveToolNode;

  public constructor( model: IntegralModel, providedOptions: IntroScreenViewOptions ) {

    const options = optionize<IntroScreenViewOptions, SelfOptions, CalculusGrapherScreenViewOptions>()( {
      controlPanelOptions: {
        smoothButtonVisible: false
      }
    }, providedOptions );

    super( model, options );

    this.areaUnderCurveToolNode = new AreaUnderCurveToolNode(
      model.areaUnderCurveTool,
      model.predictModeEnabledProperty,
      this.controlPanel,
      this.graphsNode, {
        visiblePropertiesTandem: this.visibleProperties.tandem,
        tandem: options.tandem.createTandem( 'areaUnderCurveToolNode' )
      } );

    this.addChild( this.areaUnderCurveToolNode );
  }

  public override reset(): void {
    super.reset();
    this.areaUnderCurveToolNode.reset();
  }
}

calculusGrapher.register( 'IntegralScreenView', IntegralScreenView );
