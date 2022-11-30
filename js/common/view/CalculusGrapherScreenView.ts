// Copyright 2020-2022, University of Colorado Boulder

/**
 * Root class (to be subclassed) for the top-level view of every screen in the 'Calculus Grapher' simulation.
 *
 * @author Brandon Li
 * @author Martin Veillette
 */

import ScreenView, { ScreenViewOptions } from '../../../../joist/js/ScreenView.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherModel from '../model/CalculusGrapherModel.js';
import CalculusGrapherControlPanel, { CalculusGrapherControlPanelOptions } from './CalculusGrapherControlPanel.js';
import CalculusGrapherVisibleProperties, { CalculusGrapherVisiblePropertiesOptions } from './CalculusGrapherVisibleProperties.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import GraphsNode from './GraphsNode.js';
import { GraphSetRadioButtonGroupOptions } from './GraphSetRadioButtonGroup.js';
import ToolsCheckboxGroup from './ToolsCheckboxGroup.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import Property from '../../../../axon/js/Property.js';
import { GraphSet } from '../model/GraphType.js';

type SelfOptions = {
  graphSets: GraphSet[];
  visiblePropertiesOptions?: StrictOmit<CalculusGrapherVisiblePropertiesOptions, 'tandem'>;
  graphsRadioButtonGroupOptions?: StrictOmit<GraphSetRadioButtonGroupOptions, 'tandem'>;
  controlPanelOptions?: CalculusGrapherControlPanelOptions;
};

export type CalculusGrapherScreenViewOptions = SelfOptions & ScreenViewOptions;

export default class CalculusGrapherScreenView extends ScreenView {

  protected readonly visibleProperties: CalculusGrapherVisibleProperties;
  private readonly model: CalculusGrapherModel;
  private readonly graphsNode: GraphsNode;
  protected readonly graphSetProperty: Property<GraphSet>;

  public constructor( model: CalculusGrapherModel, providedOptions: CalculusGrapherScreenViewOptions ) {

    const options = optionize<CalculusGrapherScreenViewOptions,
      StrictOmit<SelfOptions, 'visiblePropertiesOptions' | 'graphsRadioButtonGroupOptions' | 'controlPanelOptions'>,
      ScreenViewOptions>()( {}, providedOptions );

    super( options );

    assert && assert( options.graphSets.length > 0, 'there must be at least one valid graphSet' );

    assert && assert( options.graphSets.every( graphSet =>
      graphSet.length === _.uniq( graphSet ).length ), 'each element of the graphSet must be unique' );

    this.model = model;

    this.graphSetProperty = new Property( options.graphSets[ 0 ] );

    // Create the view-specific properties for the screen.
    this.visibleProperties = new CalculusGrapherVisibleProperties( combineOptions<CalculusGrapherVisiblePropertiesOptions>( {
      tandem: options.tandem.createTandem( 'visibleProperties' )
    }, options.visiblePropertiesOptions ) );

    const resetAllButton = new ResetAllButton( {
      rightBottom: this.layoutBounds.rightBottom.minusXY( 10, 10 ),
      listener: () => this.reset(),
      tandem: options.tandem.createTandem( 'resetAllButton' )
    } );

    const toolsCheckboxGroup = new ToolsCheckboxGroup( this.visibleProperties,
      {
        bottom: resetAllButton.top - 10,
        tandem: options.tandem.createTandem( 'toolsCheckboxGroup' )
      } );

    const controlPanel = new CalculusGrapherControlPanel( model.originalCurve,
      model.curveManipulationProperties,
      this.visibleProperties,
      combineOptions<CalculusGrapherControlPanelOptions>( {
        bottom: toolsCheckboxGroup.top - 20,
        right: this.layoutBounds.right - 10,
        tandem: options.tandem.createTandem( 'calculusGrapherControlPanel' )
      }, options.controlPanelOptions ) );

    toolsCheckboxGroup.left = controlPanel.left;

    this.graphsNode = new GraphsNode( model,
      this.graphSetProperty,
      this.visibleProperties.gridVisibleProperty,
      this.visibleProperties.referenceLineVisibleProperty, {
        graphSets: options.graphSets,
        centerTop: this.layoutBounds.centerTop.plusXY( -10, 10 ),
        tandem: options.tandem.createTandem( 'graphsNode' )
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
    this.graphSetProperty.reset();
  }
}

calculusGrapher.register( 'CalculusGrapherScreenView', CalculusGrapherScreenView );
