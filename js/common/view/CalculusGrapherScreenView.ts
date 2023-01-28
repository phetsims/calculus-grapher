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
import CalculusGrapherVisibleProperties from './CalculusGrapherVisibleProperties.js';
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

type SelfOptions = {
  graphSetRadioButtonGroupItems?: GraphSetRadioButtonGroupItem[];
  controlPanelOptions?: CalculusGrapherControlPanelOptions;
};

export type CalculusGrapherScreenViewOptions = SelfOptions & ScreenViewOptions;

export default class CalculusGrapherScreenView extends ScreenView {

  protected readonly visibleProperties: CalculusGrapherVisibleProperties;
  private readonly model: CalculusGrapherModel;
  public readonly graphsNode: GraphsNode;
  protected readonly controlPanel: CalculusGrapherControlPanel;
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

    // Visibility Properties for the screen that are controllable via the UI
    this.visibleProperties = new CalculusGrapherVisibleProperties(
      model.referenceLine.visibleProperty,
      model.tangentScrubber.visibleProperty,
      model.areaUnderCurveScrubber.visibleProperty,
      model.predictModeEnabledProperty,
      options.tandem.createTandem( 'visibleProperties' )
    );

    const resetAllButton = new ResetAllButton( {
      right: this.layoutBounds.right - CalculusGrapherConstants.SCREEN_VIEW_X_MARGIN,
      bottom: this.layoutBounds.bottom - CalculusGrapherConstants.SCREEN_VIEW_Y_MARGIN,
      listener: () => this.reset(),
      tandem: options.tandem.createTandem( 'resetAllButton' )
    } );

    this.controlPanel = new CalculusGrapherControlPanel(
      model.curveManipulationProperties,
      model.predictModeEnabledProperty,
      model.curveToTransformProperty,
      this.visibleProperties,
      combineOptions<CalculusGrapherControlPanelOptions>( {
        tandem: options.tandem.createTandem( 'controlPanel' )
      }, options.controlPanelOptions ) );

    const checkboxGroup = new CalculusGrapherCheckboxGroup( this.visibleProperties,
      options.tandem.createTandem( 'checkboxGroup' ) );

    const rightVBox = new VBox( {
      children: [ this.controlPanel, checkboxGroup ],
      spacing: 20,
      align: 'left'
    } );

    this.graphsNode = new GraphsNode( model, this.visibleProperties, {
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

      // Center in the negative space to the left of graphNode.
      this.graphsNode.boundsProperty.link( () => {
        graphSetRadioButtonGroup.centerX = this.layoutBounds.left + ( this.graphsNode.left - this.layoutBounds.left ) / 2;
        graphSetRadioButtonGroup.centerY = this.graphsNode.centerY;
      } );
    }

    // Instead of adding children directly to the ScreenView, add them to a parent Node, so that we can set
    // pdomOrder on this Node.  See https://github.com/phetsims/calculus-grapher/issues/123
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
    this.visibleProperties.reset();
    this.graphsNode.reset();
  }
}

calculusGrapher.register( 'CalculusGrapherScreenView', CalculusGrapherScreenView );
