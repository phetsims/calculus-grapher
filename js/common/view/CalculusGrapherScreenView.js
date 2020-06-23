// Copyright 2020, University of Colorado Boulder

/**
 * Root class (to be subclassed) for the top-level view of every screen in the 'Calculus Grapher' simulation.
 *
 * @author Brandon Li
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import ScreenView from '../../../../joist/js/ScreenView.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherModel from '../model/CalculusGrapherModel.js';
import CalculusGrapherViewProperties from './CalculusGrapherViewProperties.js';
import GraphNode from './GraphNode.js';

class CalculusGrapherScreenView extends ScreenView {

  /**
   * @param {CalculusGrapherModel} model
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( model, tandem, options ) {
    assert && assert( model instanceof CalculusGrapherModel, `invalid model: ${model}` );
    assert && assert( tandem instanceof Tandem, `invalid tandem: ${tandem}` );

    super( options );

    // Create the view-specific properties for the screen.
    const viewProperties = new CalculusGrapherViewProperties();


    const graphNode = new GraphNode( new Bounds2( 0, -5, 30, 5 ), viewProperties.gridVisibleProrperty );
    graphNode.center = this.layoutBounds.center;
    this.addChild( graphNode );
  }
}

calculusGrapher.register( 'CalculusGrapherScreenView', CalculusGrapherScreenView );
export default CalculusGrapherScreenView;