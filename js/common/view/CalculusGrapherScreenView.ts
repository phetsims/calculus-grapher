// Copyright 2020-2022, University of Colorado Boulder

/**
 * Base class for the top-level view of every screen in the 'Calculus Grapher' simulation.
 *
 * @author Brandon Li
 * @author Martin Veillette
 */

import ScreenView, { ScreenViewOptions } from '../../../../joist/js/ScreenView.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherModel from '../model/CalculusGrapherModel.js';
import CalculusGrapherControlPanel, { CalculusGrapherControlPanelOptions } from './CalculusGrapherControlPanel.js';
import CalculusGrapherVisibleProperties from './CalculusGrapherVisibleProperties.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import GraphsNode from './GraphsNode.js';
import ToolsCheckboxGroup from './ToolsCheckboxGroup.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import Property from '../../../../axon/js/Property.js';
import { GraphSet } from '../model/GraphType.js';
import GraphSetRadioButtonGroup, { GraphSetRadioButtonGroupItem } from './GraphSetRadioButtonGroup.js';
import { Node, VBox } from '../../../../scenery/js/imports.js';

type SelfOptions = {
  graphSets: GraphSet[];
  graphSetRadioButtonGroupItems?: GraphSetRadioButtonGroupItem[];
  controlPanelOptions?: CalculusGrapherControlPanelOptions;
};

export type CalculusGrapherScreenViewOptions = SelfOptions & ScreenViewOptions;

export default class CalculusGrapherScreenView extends ScreenView {

  protected readonly visibleProperties: CalculusGrapherVisibleProperties;
  private readonly model: CalculusGrapherModel;
  private readonly graphsNode: GraphsNode;
  protected readonly graphSetProperty: Property<GraphSet>;

  protected constructor( model: CalculusGrapherModel, providedOptions: CalculusGrapherScreenViewOptions ) {

    const options = optionize<CalculusGrapherScreenViewOptions,
      StrictOmit<SelfOptions, 'controlPanelOptions'>,
      ScreenViewOptions>()( {

      // SelfOptions
      graphSetRadioButtonGroupItems: []
    }, providedOptions );

    super( options );

    assert && assert( options.graphSets.length > 0, 'there must be at least one valid graphSet' );

    assert && assert( options.graphSets.every( graphSet =>
      graphSet.length === _.uniq( graphSet ).length ), 'each element of the graphSet must be unique' );

    assert && assert( ( options.graphSets.length === 1 && options.graphSetRadioButtonGroupItems.length === 0 ) ||
                      ( options.graphSets.length === options.graphSetRadioButtonGroupItems.length ),
      'If > 1 graphSets, then there must be a radio button item for each graphSet' );

    this.model = model;

    this.graphSetProperty = new Property( options.graphSets[ 0 ] );

    // Create the view-specific properties for the screen.
    this.visibleProperties = new CalculusGrapherVisibleProperties( {
      tandem: options.tandem.createTandem( 'visibleProperties' )
    } );

    const resetAllButton = new ResetAllButton( {
      rightBottom: this.layoutBounds.rightBottom.minusXY( 10, 10 ),
      listener: () => this.reset(),
      tandem: options.tandem.createTandem( 'resetAllButton' )
    } );

    const controlPanel = new CalculusGrapherControlPanel(
      model.curveManipulationProperties,
      model.predictModeEnabledProperty,
      this.visibleProperties,
      combineOptions<CalculusGrapherControlPanelOptions>( {
        tandem: options.tandem.createTandem( 'controlPanel' )
      }, options.controlPanelOptions ) );

    const toolsCheckboxGroup = new ToolsCheckboxGroup( this.visibleProperties, {
      tandem: options.tandem.createTandem( 'toolsCheckboxGroup' )
    } );

    const rightVBox = new VBox( {
      children: [ controlPanel, toolsCheckboxGroup ],
      spacing: 20,
      align: 'left'
    } );

    rightVBox.boundsProperty.link( () => {
      rightVBox.right = this.layoutBounds.right - 10;
      rightVBox.bottom = resetAllButton.top - 10;
    } );

    this.graphsNode = new GraphsNode( model,
      this.graphSetProperty,
      this.visibleProperties, {
        graphSets: options.graphSets,
        centerTop: this.layoutBounds.centerTop.plusXY( -10, 10 ),
        tandem: options.tandem.createTandem( 'graphsNode' )
      } );

    const children: Node[] = [
      this.graphsNode,
      rightVBox,
      resetAllButton
    ];

    if ( options.graphSetRadioButtonGroupItems.length > 0 ) {
      const graphSetRadioButtonGroup = new GraphSetRadioButtonGroup( this.graphSetProperty,
        options.graphSetRadioButtonGroupItems, {
          leftCenter: this.layoutBounds.leftCenter.addXY( 30, 0 ),
          tandem: options.tandem.createTandem( 'graphSetRadioButtonGroup' )
        } );
      children.push( graphSetRadioButtonGroup );
    }

    // Instead of adding children directly to the ScreenView, add them to a parent Node, so that we can set
    // pdomOrder on this Node.  See https://github.com/phetsims/calculus-grapher/issues/123
    const screenViewRootNode = new Node( {
      children: children
    } );
    this.addChild( screenViewRootNode );
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
