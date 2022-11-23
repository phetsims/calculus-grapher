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
import GraphSetRadioButtonGroup, { GraphSetRadioButtonGroupOptions } from '../../common/view/GraphSetRadioButtonGroup.js';
import CalculusGrapherColors from '../../common/CalculusGrapherColors.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';

type SelfOptions = EmptySelfOptions;

export type LabScreenViewOptions = SelfOptions & StrictOmit<CalculusGrapherScreenViewOptions, 'graphSets'>;

export default class LabScreenView extends CalculusGrapherScreenView {

  public constructor( model: LabModel, providedOptions?: LabScreenViewOptions ) {

    const options = optionize<LabScreenViewOptions, SelfOptions, CalculusGrapherScreenViewOptions>()( {
      graphSets: [
        [ 'integral', 'original', 'derivative' ],
        [ 'original', 'derivative', 'secondDerivative' ]
      ],
      controlPanelOptions: {
        curvePushButtonGroupOptions: {
          smoothButtonOptions: {
            visible: true
          }
        }
      }
    }, providedOptions );

    assert && assert( options.graphSets.length === 2, 'there must be two valid graphSets for this screen' );

    super( model, options );

    const graphSetRadioButtonGroup = new GraphSetRadioButtonGroup( this.graphSetProperty,
      options.graphSets,
      combineOptions<GraphSetRadioButtonGroupOptions>( {
        leftCenter: this.layoutBounds.leftCenter.addXY( 30, 0 ),
        spacing: 5,
        radioButtonOptions: {
          baseColor: CalculusGrapherColors.panelFillProperty
        },
        tandem: options.tandem.createTandem( 'graphsRadioButtonGroup' )
      }, options.graphsRadioButtonGroupOptions ) );

    this.addChild( graphSetRadioButtonGroup );

  }
}

calculusGrapher.register( 'LabScreenView', LabScreenView );
