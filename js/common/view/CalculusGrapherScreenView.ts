// Copyright 2020-2022, University of Colorado Boulder

/**
 * Root class (to be subclassed) for the top-level view of every screen in the 'Calculus Grapher' simulation.
 *
 * @author Brandon Li
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
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

    // TODO the bounds should depends on the number of graphs as well as zoom level (see #43)
    const modelBounds = new Bounds2( 0, -5, 30, 5 );

    const graphNode = new GraphNode( model.originalCurve, modelBounds, viewProperties.gridVisibleProperty, true,
      {
        tandem: options.tandem.createTandem( 'originalGraphNode' )
      } );
    graphNode.center = this.layoutBounds.center;
    this.addChild( graphNode );


    const integral = new GraphNode( model.integralCurve, modelBounds, viewProperties.gridVisibleProperty, false,
      {
        tandem: options.tandem.createTandem( 'integralGraphNode' )
      } );
    integral.centerBottom = graphNode.centerTop.minusXY( 0, 10 );
    this.addChild( integral );


    const derivative = new GraphNode( model.derivativeCurve, modelBounds, viewProperties.gridVisibleProperty, false,
      {
        tandem: options.tandem.createTandem( 'derivativeGraphNode' )
      } );
    derivative.centerTop = graphNode.centerBottom.addXY( 0, 10 );
    this.addChild( derivative );

    const controlPanel = new CalculusGrapherControlPanel( model.originalCurve, {
      tandem: options.tandem.createTandem( 'calculusGrapherControlPanel' )
    } );
    controlPanel.rightCenter = this.layoutBounds.rightCenter;
    this.addChild( controlPanel );
  }
}

calculusGrapher.register( 'CalculusGrapherScreenView', CalculusGrapherScreenView );
