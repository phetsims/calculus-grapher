// Copyright 2020-2022, University of Colorado Boulder

/**
 * Root class (to be subclassed) for the top-level view of every screen in the 'Calculus Grapher' simulation.
 *
 * @author Brandon Li
 */

import ScreenView, { ScreenViewOptions } from '../../../../joist/js/ScreenView.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherModel from '../model/CalculusGrapherModel.js';
import CalculusGrapherControlPanel from './CalculusGrapherControlPanel.js';
import CalculusGrapherVisibleProperties, { CalculusGrapherVisiblePropertiesOptions } from './CalculusGrapherVisibleProperties.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import GraphsNode from './GraphsNode.js';
import CalculusGrapherCheckboxGroup, { CalculusGrapherCheckboxGroupOptions } from './CalculusGrapherCheckboxGroup.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';

type SelfOptions = {
  visiblePropertiesOptions?: StrictOmit<CalculusGrapherVisiblePropertiesOptions, 'tandem'>;
  checkboxGroupOptions?: StrictOmit<CalculusGrapherCheckboxGroupOptions, 'tandem'>;
};

export type CalculusGrapherScreenViewOptions = SelfOptions & ScreenViewOptions;

export default class CalculusGrapherScreenView extends ScreenView {

  protected readonly visibleProperties: CalculusGrapherVisibleProperties;
  private model: CalculusGrapherModel;
  private readonly graphsNode: GraphsNode;

  public constructor( model: CalculusGrapherModel, providedOptions: CalculusGrapherScreenViewOptions ) {

    const options = optionize<CalculusGrapherScreenViewOptions,
      StrictOmit<SelfOptions, 'visiblePropertiesOptions' | 'checkboxGroupOptions'>, ScreenViewOptions>()( {
    }, providedOptions );

    super( options );

    // Create the view-specific properties for the screen.
    this.visibleProperties = new CalculusGrapherVisibleProperties( combineOptions<CalculusGrapherVisiblePropertiesOptions>( {
      tandem: options.tandem.createTandem( 'visibleProperties' )
    }, options.visiblePropertiesOptions ) );
    this.model = model;

    const controlPanel = new CalculusGrapherControlPanel( model.originalCurve, {
      rightCenter: this.layoutBounds.rightCenter,
      tandem: options.tandem.createTandem( 'calculusGrapherControlPanel' )
    } );

    this.graphsNode = new GraphsNode( model, this.visibleProperties, {
      tandem: options.tandem.createTandem( 'graphsNode' )
    } );
    //TODO this doesn't work correctly if done via options
    this.graphsNode.rightCenter = controlPanel.leftCenter.minusXY( 50, 0 );

    const checkboxGroup = new CalculusGrapherCheckboxGroup( this.visibleProperties,
      combineOptions<CalculusGrapherCheckboxGroupOptions>( {
        leftCenter: this.layoutBounds.leftCenter.addXY( 30, 0 ),
        tandem: options.tandem.createTandem( 'checkboxGroup' )
      }, options.checkboxGroupOptions ) );

    const resetAllButton = new ResetAllButton( {
      rightBottom: this.layoutBounds.rightBottom.minusXY( 10, 10 ),
      listener: () => this.reset(),
      tandem: options.tandem.createTandem( 'resetAllButton' )
    } );

    this.addChild( this.graphsNode );
    this.addChild( checkboxGroup );
    this.addChild( controlPanel );
    this.addChild( resetAllButton );
  }

  /**
   * Reset all
   */
  public reset(): void {
    this.model.reset();
    this.visibleProperties.reset();
    this.graphsNode.reset();
  }
}

calculusGrapher.register( 'CalculusGrapherScreenView', CalculusGrapherScreenView );
