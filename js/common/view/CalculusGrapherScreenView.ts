// Copyright 2020-2023, University of Colorado Boulder

/**
 * Base class for the top-level view of every screen in the 'Calculus Grapher' simulation.
 *
 * @author Brandon Li
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenView, { ScreenViewOptions } from '../../../../joist/js/ScreenView.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherModel from '../model/CalculusGrapherModel.js';
import CalculusGrapherControlPanel, { CalculusGrapherControlPanelOptions } from './CalculusGrapherControlPanel.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import GraphsNode from './GraphsNode.js';
import CalculusGrapherCheckboxGroup from './CalculusGrapherCheckboxGroup.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import GraphSetRadioButtonGroup, { GraphSetRadioButtonGroupItem } from './GraphSetRadioButtonGroup.js';
import { Node, VBox } from '../../../../scenery/js/imports.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import CalculusGrapherQueryParameters from '../CalculusGrapherQueryParameters.js';
import PresetFunctions from '../model/PresetFunctions.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';

type SelfOptions = {

  // Items to include in the GraphSetRadioButtonGroupItem
  graphSetRadioButtonGroupItems?: GraphSetRadioButtonGroupItem[];

  // Options for the main control panel
  controlPanelOptions?: Partial<CalculusGrapherControlPanelOptions>;
};

export type CalculusGrapherScreenViewOptions = SelfOptions & PickRequired<ScreenViewOptions, 'tandem'>;

export default class CalculusGrapherScreenView extends ScreenView {

  private readonly model: CalculusGrapherModel;

  // Node responsible for displaying all graphs and their decorations
  public readonly graphsNode: GraphsNode;

  // The main control panel
  protected readonly controlPanel: CalculusGrapherControlPanel;

  // Instead of adding children directly to the ScreenView, add them to this parent Node, so that keyboard traversal
  // can be supported by setting pdomOrder on this Node.  See https://github.com/phetsims/calculus-grapher/issues/123
  protected readonly screenViewRootNode: Node;

  protected constructor( model: CalculusGrapherModel, providedOptions: CalculusGrapherScreenViewOptions ) {

    const options = optionize<CalculusGrapherScreenViewOptions,
      StrictOmit<SelfOptions, 'controlPanelOptions'>,
      ScreenViewOptions>()( {

      // SelfOptions
      graphSetRadioButtonGroupItems: []
    }, providedOptions );

    assert && assert( ( model.graphSets.length === 1 && options.graphSetRadioButtonGroupItems.length === 0 ) ||
                      ( model.graphSets.length === options.graphSetRadioButtonGroupItems.length ),
      'If > 1 graphSets, then there must be a radio button for each graphSet' );

    super( options );

    this.model = model;

    const resetAllButton = new ResetAllButton( {
      right: this.layoutBounds.right - CalculusGrapherConstants.SCREEN_VIEW_X_MARGIN,
      bottom: this.layoutBounds.bottom - CalculusGrapherConstants.SCREEN_VIEW_Y_MARGIN,
      listener: () => this.reset(),
      tandem: options.tandem.createTandem( 'resetAllButton' )
    } );

    this.controlPanel = new CalculusGrapherControlPanel(
      model.curveManipulationProperties,
      model.predictCurveSelectedProperty,
      model.predictEnabledProperty,
      model.interactiveCurveProperty,
      combineOptions<CalculusGrapherControlPanelOptions>( {
        tandem: options.tandem.createTandem( 'controlPanel' )
      }, options.controlPanelOptions ) );

    const checkboxGroup = new CalculusGrapherCheckboxGroup( model.gridVisibleProperty,
      model.referenceLine.visibleProperty, options.tandem.createTandem( 'checkboxGroup' ) );

    const rightVBox = new VBox( {
      children: [ this.controlPanel, checkboxGroup ],
      spacing: 20,
      align: 'left'
    } );

    this.graphsNode = new GraphsNode( model, {
      centerX: this.layoutBounds.centerX - 25,
      y: this.layoutBounds.top + 40,
      tandem: options.tandem.createTandem( 'graphsNode' )
    } );

    // Put control panel in the negative space to the right of graphsNode, top-aligned with graphsNode.y.
    rightVBox.boundsProperty.link( () => {
      rightVBox.centerX = this.layoutBounds.right - ( this.layoutBounds.right - this.graphsNode.right ) / 2;
      rightVBox.top = this.graphsNode.y;
    } );

    const children: Node[] = [
      this.graphsNode,
      rightVBox,
      resetAllButton
    ];

    if ( options.graphSetRadioButtonGroupItems.length > 0 ) {
      const graphSetRadioButtonGroup = new GraphSetRadioButtonGroup( model.graphSetProperty,
        options.graphSetRadioButtonGroupItems, options.tandem.createTandem( 'graphSetRadioButtonGroup' ) );
      children.push( graphSetRadioButtonGroup );

      // Center graphSetRadioButtonGroup in the negative space to the left of graphNode. We're only adjusting centerX
      // dynamically so that GraphSetsAnimation doesn't cause tiny shifts in y.
      graphSetRadioButtonGroup.centerY = this.graphsNode.centerY;
      this.graphsNode.boundsProperty.link( () => {
        graphSetRadioButtonGroup.centerX = this.layoutBounds.left + ( this.graphsNode.left - this.layoutBounds.left ) / 2;
      } );
    }

    this.screenViewRootNode = new Node( {
      children: children
    } );
    this.addChild( this.screenViewRootNode );

    // Cycle through preset functions using the left/right arrow keys.
    // See https://github.com/phetsims/calculus-grapher/issues/193
    if ( CalculusGrapherQueryParameters.presetFunctions ) {
      PresetFunctions.addKeyboardEventListener( this.visibleProperty, model.originalCurve );
    }
  }

  /**
   * Reset all
   */
  public reset(): void {
    this.model.reset();
    this.graphsNode.reset();
  }

  public override step( dt: number ): void {
    this.graphsNode.step( dt );
    super.step( dt );
  }
}

calculusGrapher.register( 'CalculusGrapherScreenView', CalculusGrapherScreenView );
