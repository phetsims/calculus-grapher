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
import { GraphsRectangularRadioButtonGroupOptions } from './GraphsRectangularRadioButtonGroup.js';
import ToolsCheckboxGroup from './ToolsCheckboxGroup.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import Property from '../../../../axon/js/Property.js';

export type GraphType = 'original' | 'integral' | 'derivative' | 'secondDerivative';
export type GraphArrangement = GraphType[];
export type GraphChoice = { value: string; graphs: GraphArrangement };
export type GraphChoices = GraphChoice[];

type SelfOptions = {
  visiblePropertiesOptions?: StrictOmit<CalculusGrapherVisiblePropertiesOptions, 'tandem'>;
  graphsRadioButtonGroupOptions?: StrictOmit<GraphsRectangularRadioButtonGroupOptions, 'tandem'>;
  graphChoices: GraphChoices;
};

export type CalculusGrapherScreenViewOptions = SelfOptions & ScreenViewOptions;

export default class CalculusGrapherScreenView extends ScreenView {

  protected readonly visibleProperties: CalculusGrapherVisibleProperties;
  private readonly model: CalculusGrapherModel;
  private readonly graphsNode: GraphsNode;
  protected readonly graphsSelectedProperty: Property<GraphChoice>;

  public constructor( model: CalculusGrapherModel, providedOptions: CalculusGrapherScreenViewOptions ) {

    const options = optionize<CalculusGrapherScreenViewOptions,
      StrictOmit<SelfOptions, 'visiblePropertiesOptions' | 'graphsRadioButtonGroupOptions' | 'graphChoices'>, ScreenViewOptions>()( {}, providedOptions );

    super( options );

    // Create the view-specific properties for the screen.
    this.visibleProperties = new CalculusGrapherVisibleProperties( combineOptions<CalculusGrapherVisiblePropertiesOptions>( {
      tandem: options.tandem.createTandem( 'visibleProperties' )
    }, options.visiblePropertiesOptions ) );
    this.model = model;

    const controlPanel = new CalculusGrapherControlPanel( model.originalCurve, {
      rightCenter: this.layoutBounds.rightCenter.minusXY( 10, 0 ),
      tandem: options.tandem.createTandem( 'calculusGrapherControlPanel' )
    } );

    this.graphsSelectedProperty = new Property( options.graphChoices[ 0 ] );

    this.graphsNode = new GraphsNode( model, this.graphsSelectedProperty, options.graphChoices, this.visibleProperties.gridVisibleProperty, {
      tandem: options.tandem.createTandem( 'graphsNode' )
    } );
    //TODO this doesn't work correctly if done via options
    this.graphsNode.rightCenter = controlPanel.leftCenter.minusXY( 50, 0 );


    const toolsCheckboxGroup = new ToolsCheckboxGroup( this.visibleProperties,
      {
        right: this.layoutBounds.right - 10,
        top: controlPanel.bottom + 10,
        tandem: options.tandem.createTandem( 'toolsCheckboxGroup' )
      } );


    const resetAllButton = new ResetAllButton( {
      rightBottom: this.layoutBounds.rightBottom.minusXY( 10, 10 ),
      listener: () => this.reset(),
      tandem: options.tandem.createTandem( 'resetAllButton' )
    } );

    this.addChild( this.graphsNode );
    this.addChild( controlPanel );
    this.addChild( toolsCheckboxGroup );
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
