// Copyright 2015-2020, University of Colorado Boulder

/**
 *
 * @author 0
 */

import ScreenView from '../../../../joist/js/ScreenView.js';
import inherit from '../../../../phet-core/js/inherit.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import calculusGrapher from '../../calculusGrapher.js';

/**
 * @param {CalculusGrapherModel} calculusGrapherModel
 * @constructor
 */
function CalculusGrapherScreenView( calculusGrapherModel ) {

  ScreenView.call( this );

  // Create and add the Reset All Button in the bottom right, which resets the model
  const resetAllButton = new ResetAllButton( {
    listener: function() {
      calculusGrapherModel.reset();
    },
    right: this.layoutBounds.maxX - 10,
    bottom: this.layoutBounds.maxY - 10
  } );
  this.addChild( resetAllButton );
}

calculusGrapher.register( 'CalculusGrapherScreenView', CalculusGrapherScreenView );

inherit( ScreenView, CalculusGrapherScreenView );
export default CalculusGrapherScreenView;