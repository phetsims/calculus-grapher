// Copyright 2020-2022, University of Colorado Boulder

/**
 * Top level view for the 'Advanced' screen.
 *
 * @author Brandon Li
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherScreenView, { CalculusGrapherScreenViewOptions } from '../../common/view/CalculusGrapherScreenView.js';
import AdvancedModel from '../model/AdvancedModel.js';
import GraphSetRadioButtonGroup from '../../common/view/GraphSetRadioButtonGroup.js';

type SelfOptions = EmptySelfOptions;

export type AdvancedScreenViewOptions = SelfOptions & CalculusGrapherScreenViewOptions;

export default class AdvancedScreenView extends CalculusGrapherScreenView {

  public constructor( model: AdvancedModel, providedOptions?: AdvancedScreenViewOptions ) {

    const options = optionize<AdvancedScreenViewOptions, SelfOptions, CalculusGrapherScreenViewOptions>()( {}, providedOptions );

    assert && assert( options.graphSets.length === 2, 'there must be two valid graphSets for this screen' );

    super( model, options );

    const graphSetRadioButtonGroup = new GraphSetRadioButtonGroup( this.graphSetProperty,
      options.graphSets,
      {
        leftCenter: this.layoutBounds.leftCenter.addXY( 30, 0 ),
        tandem: options.tandem.createTandem( 'graphsRadioButtonGroup' )
      } );

    this.addChild( graphSetRadioButtonGroup );
  }
}

calculusGrapher.register( 'AdvancedScreenView', AdvancedScreenView );
