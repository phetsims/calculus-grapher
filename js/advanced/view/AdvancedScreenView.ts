// Copyright 2020-2022, University of Colorado Boulder

/**
 * Top level view for the 'Advanced' screen.
 *
 * @author BrandonLi
 */

import optionize, { combineOptions, EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherScreenView, { CalculusGrapherScreenViewOptions } from '../../common/view/CalculusGrapherScreenView.js';
import AdvancedModel from '../model/AdvancedModel.js';
import GraphsRectangularRadioButtonGroup, { GraphsRectangularRadioButtonGroupOptions } from '../../common/view/GraphsRectangularRadioButtonGroup.js';
import CalculusGrapherColors from '../../common/CalculusGrapherColors.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';

type SelfOptions = EmptySelfOptions;

export type AdvancedScreenViewOptions = SelfOptions & StrictOmit<CalculusGrapherScreenViewOptions, 'graphChoices'>;

export default class AdvancedScreenView extends CalculusGrapherScreenView {

  public constructor( model: AdvancedModel, providedOptions?: AdvancedScreenViewOptions ) {

    const options = optionize<AdvancedScreenViewOptions, SelfOptions, CalculusGrapherScreenViewOptions>()( {
      graphsRadioButtonGroupOptions: {},
      visiblePropertiesOptions: {},
      graphChoices: [
        {
          value: 'derivative',
          graphs: [ 'original', 'derivative' ]
        },
        {
          value: 'integral',
          graphs: [ 'integral', 'original' ]
        }
      ]
    }, providedOptions );

    super( model, options );

    const graphsRectangularRadioButtonGroup = new GraphsRectangularRadioButtonGroup( this.graphsSelectedProperty,
      options.graphChoices,
      combineOptions<GraphsRectangularRadioButtonGroupOptions>( {
        leftCenter: this.layoutBounds.leftCenter.addXY( 30, 0 ),
        spacing: 5,
        radioButtonOptions: {
          baseColor: CalculusGrapherColors.panelFillProperty
        },
        tandem: options.tandem.createTandem( 'graphsRadioButtonGroup' )
      }, options.graphsRadioButtonGroupOptions ) );

    this.addChild( graphsRectangularRadioButtonGroup );
  }
}

calculusGrapher.register( 'AdvancedScreenView', AdvancedScreenView );
