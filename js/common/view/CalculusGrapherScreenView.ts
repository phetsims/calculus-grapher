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
import GraphNode from './GraphNode.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';


type SelfOptions = EmptySelfOptions;
export type CalculusGrapherScreenViewOptions = SelfOptions & ScreenViewOptions;


export default class CalculusGrapherScreenView extends ScreenView {

  public constructor( model: CalculusGrapherModel, providedOptions?: CalculusGrapherScreenViewOptions ) {

    const options = optionize<CalculusGrapherScreenViewOptions, SelfOptions, ScreenViewOptions>()( {}, providedOptions );

    super( options );

    // Create the view-specific properties for the screen.
    const viewProperties = new CalculusGrapherViewProperties( options );

    const originalGraphNode = new GraphNode( model.originalCurve, viewProperties.gridVisibleProperty,
      {
        visibleProperty: viewProperties.originalGraphNodeVisibleProperty,
        tandem: options.tandem.createTandem( 'originalGraphNode' ),
        phetioDocumentation: 'PhET-iO only, not settable in the sim'
      } );
    originalGraphNode.center = this.layoutBounds.center;

    const integralGraphNode = new GraphNode( model.integralCurve, viewProperties.gridVisibleProperty,
      {
        visibleProperty: viewProperties.integralGraphNodeVisibleProperty,
        tandem: options.tandem.createTandem( 'integralGraphNode' )
      } );
    integralGraphNode.centerBottom = originalGraphNode.centerTop.minusXY( 0, 10 );

    const derivativeGraphNode = new GraphNode( model.derivativeCurve, viewProperties.gridVisibleProperty,
      {
        visibleProperty: viewProperties.derivativeGraphNodeVisibleProperty,
        tandem: options.tandem.createTandem( 'derivativeGraphNode' )
      } );
    derivativeGraphNode.centerTop = originalGraphNode.centerBottom.addXY( 0, 10 );

    const controlPanel = new CalculusGrapherControlPanel( model.originalCurve, {
      rightCenter: this.layoutBounds.rightCenter,
      tandem: options.tandem.createTandem( 'calculusGrapherControlPanel' )
    } );

    this.addChild( integralGraphNode );
    this.addChild( derivativeGraphNode );
    this.addChild( originalGraphNode );
    this.addChild( controlPanel );
  }
}

calculusGrapher.register( 'CalculusGrapherScreenView', CalculusGrapherScreenView );
