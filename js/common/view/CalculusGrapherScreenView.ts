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
import CalculusGrapherViewProperties from './CalculusGrapherViewProperties.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import GraphsNode, { GraphNodesOptions } from './GraphsNode.js';

type SelfOptions = EmptySelfOptions;
export type CalculusGrapherScreenViewOptions = SelfOptions & GraphNodesOptions & ScreenViewOptions;


export default class CalculusGrapherScreenView extends ScreenView {

  protected readonly viewProperties: CalculusGrapherViewProperties;
  private model: CalculusGrapherModel;
  private graphsNode: GraphsNode;

  public constructor( model: CalculusGrapherModel, providedOptions?: CalculusGrapherScreenViewOptions ) {

    const options = optionize<CalculusGrapherScreenViewOptions, SelfOptions, ScreenViewOptions>()( {}, providedOptions );

    super( options );

    // Create the view-specific properties for the screen.
    this.viewProperties = new CalculusGrapherViewProperties( options );
    this.model = model;

    const controlPanel = new CalculusGrapherControlPanel( model.originalCurve, {
      rightCenter: this.layoutBounds.rightCenter,
      tandem: options.tandem.createTandem( 'calculusGrapherControlPanel' )
    } );

    this.graphsNode = new GraphsNode( model, this.viewProperties,
      {
        isGraphIncluded: options.isGraphIncluded,
        tandem: options.tandem.createTandem( 'graphsNode' )
      } );
    this.graphsNode.rightCenter = controlPanel.leftCenter.minusXY( 50, 0 );


    const resetAllButton = new ResetAllButton( {
      rightBottom: this.layoutBounds.rightBottom.minusXY( 10, 10 ),
      listener: () => this.reset(),
      tandem: options.tandem.createTandem( 'resetAllButton' )
    } );

    this.addChild( this.graphsNode );
    this.addChild( controlPanel );
    this.addChild( resetAllButton );
  }

  /**
   * Reset all
   */
  public reset(): void {
    this.model.reset();
    this.graphsNode.reset();
  }
}

calculusGrapher.register( 'CalculusGrapherScreenView', CalculusGrapherScreenView );
