// Copyright 2015-2017, University of Colorado Boulder

/**
 *
 * @author 0
 */
define( require => {
  'use strict';

  // modules
  const calculusGrapher = require( 'CALCULUS_GRAPHER/calculusGrapher' );
  const inherit = require( 'PHET_CORE/inherit' );
  const ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  const ScreenView = require( 'JOIST/ScreenView' );

  /**
   * @param {CalculusGrapherModel} calculusGrapherModel
   * @constructor
   */
  function CalculusGrapherScreenView( calculusGrapherModel ) {

    ScreenView.call( this );

    // Create and add the Reset All Button in the bottom right, which resets the model
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        calculusGrapherModel.reset();
      },
      right: this.layoutBounds.maxX - 10,
      bottom: this.layoutBounds.maxY - 10
    } );
    this.addChild( resetAllButton );
  }

  calculusGrapher.register( 'CalculusGrapherScreenView', CalculusGrapherScreenView );

  return inherit( ScreenView, CalculusGrapherScreenView );
} );