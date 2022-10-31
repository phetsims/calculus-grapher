// Copyright 2020-2022, University of Colorado Boulder

/**
 * Top level view for the 'Lab' screen.
 *
 * @author Martin Veillette
 */

import optionize, { combineOptions, EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherScreenView, { CalculusGrapherScreenViewOptions } from '../../common/view/CalculusGrapherScreenView.js';
import LabModel from '../model/LabModel.js';
import GraphsRectangularRadioButtonGroup, { GraphsRectangularRadioButtonGroupOptions } from '../../common/view/GraphsRectangularRadioButtonGroup.js';
import CalculusGrapherColors from '../../common/CalculusGrapherColors.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';

type SelfOptions = EmptySelfOptions;

export type LabScreenViewOptions = SelfOptions & StrictOmit<CalculusGrapherScreenViewOptions, 'graphChoices'>;

export default class LabScreenView extends CalculusGrapherScreenView {

  public constructor( model: LabModel, providedOptions?: LabScreenViewOptions ) {

    const options = optionize<LabScreenViewOptions, SelfOptions, CalculusGrapherScreenViewOptions>()( {
      graphChoices: [
        [ 'integral', 'original', 'derivative' ],
        [ 'original', 'derivative', 'secondDerivative' ]
      ],
      controlPanelOptions: {
        smoothButtonOptions: {
          visibleProperty: new BooleanProperty( true )
        }
      }
    }, providedOptions );

    assert && assert( options.graphChoices.length === 2, 'there must be two valid graphChoices for this screen' );

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

calculusGrapher.register( 'LabScreenView', LabScreenView );
