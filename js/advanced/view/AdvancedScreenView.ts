// Copyright 2020-2022, University of Colorado Boulder

/**
 * Top level view for the 'Advanced' screen.
 *
 * @author Brandon Li
 */

import optionize, { combineOptions, EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherScreenView, { CalculusGrapherScreenViewOptions } from '../../common/view/CalculusGrapherScreenView.js';
import AdvancedModel from '../model/AdvancedModel.js';
import GraphSetRadioButtonGroup, { GraphSetRadioButtonGroupOptions } from '../../common/view/GraphSetRadioButtonGroup.js';
import CalculusGrapherColors from '../../common/CalculusGrapherColors.js';

type SelfOptions = EmptySelfOptions;

export type AdvancedScreenViewOptions = SelfOptions & CalculusGrapherScreenViewOptions;

export default class AdvancedScreenView extends CalculusGrapherScreenView {

  public constructor( model: AdvancedModel, providedOptions?: AdvancedScreenViewOptions ) {

    const options = optionize<AdvancedScreenViewOptions, SelfOptions, CalculusGrapherScreenViewOptions>()( {
      graphsRadioButtonGroupOptions: {},
      visiblePropertiesOptions: {},
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

calculusGrapher.register( 'AdvancedScreenView', AdvancedScreenView );
