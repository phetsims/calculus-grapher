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
import { GraphChoiceRadioButtonGroupOptions } from './GraphChoiceRadioButtonGroup.js';
import ToolsCheckboxGroup from './ToolsCheckboxGroup.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import Property from '../../../../axon/js/Property.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';

type GraphType = 'original' | 'integral' | 'derivative' | 'secondDerivative';
export type GraphChoice = GraphType[];
export type GraphChoices = GraphChoice[];

type SelfOptions = {
  visiblePropertiesOptions?: StrictOmit<CalculusGrapherVisiblePropertiesOptions, 'tandem'>;
  graphsRadioButtonGroupOptions?: StrictOmit<GraphChoiceRadioButtonGroupOptions, 'tandem'>;
  graphChoices: GraphChoices;
  controlPanelOptions?: CalculusGrapherControlPanelOptions;
};

export type CalculusGrapherScreenViewOptions = SelfOptions & ScreenViewOptions;

export default class CalculusGrapherScreenView extends ScreenView {

  protected readonly visibleProperties: CalculusGrapherVisibleProperties;
  private readonly model: CalculusGrapherModel;
  private readonly graphsNode: GraphsNode;
  protected readonly graphsSelectedProperty: Property<GraphChoice>;

  public constructor( model: CalculusGrapherModel, providedOptions: CalculusGrapherScreenViewOptions ) {

    const options = optionize<CalculusGrapherScreenViewOptions,
      StrictOmit<SelfOptions, 'visiblePropertiesOptions' | 'graphsRadioButtonGroupOptions' | 'graphChoices'>, ScreenViewOptions>()( {
      controlPanelOptions: {
        curvePushButtonGroupOptions: {
          smoothButtonOptions: {
            visibleProperty: new BooleanProperty( false )
          }
        }
      }
    }, providedOptions );

    super( options );

    assert && assert( options.graphChoices.length > 0, 'there must be at least one valid graphChoice' );

    assert && assert( options.graphChoices.filter( ( x, i, a ) => a.indexOf( x ) === i ).length === options.graphChoices.length, 'the graphChoices must be unique' );

    this.model = model;

    this.graphsSelectedProperty = new Property( options.graphChoices[ 0 ] );

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
      combineOptions<CalculusGrapherControlPanelOptions>( {
        bottom: toolsCheckboxGroup.top - 20,
        right: this.layoutBounds.right - 10,
        tandem: options.tandem.createTandem( 'calculusGrapherControlPanel' )
      }, options.controlPanelOptions ) );

    toolsCheckboxGroup.left = controlPanel.left;


    this.graphsNode = new GraphsNode( model,
      this.graphsSelectedProperty,
      this.visibleProperties.gridVisibleProperty,
      this.visibleProperties.referenceLineVisibleProperty, {
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
    this.graphsSelectedProperty.reset();
  }
}

calculusGrapher.register( 'CalculusGrapherScreenView', CalculusGrapherScreenView );
