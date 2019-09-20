// Copyright 2015-2019, University of Colorado Boulder

/**
 *
 * @author 0
 */
define( require => {
  'use strict';

  // modules
  const calculusGrapher = require( 'CALCULUS_GRAPHER/calculusGrapher' );
  const CalculusGrapherModel = require( 'CALCULUS_GRAPHER/calculus-grapher/model/CalculusGrapherModel' );
  const CalculusGrapherScreenView = require( 'CALCULUS_GRAPHER/calculus-grapher/view/CalculusGrapherScreenView' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Property = require( 'AXON/Property' );
  const Screen = require( 'JOIST/Screen' );

  /**
   * @constructor
   */
  function CalculusGrapherScreen() {
    Screen.call( this,
      function() { return new CalculusGrapherModel(); },
      function( model ) { return new CalculusGrapherScreenView( model ); },
      { backgroundColorProperty: new Property( 'white' ) }
    );
  }

  calculusGrapher.register( 'CalculusGrapherScreen', CalculusGrapherScreen );

  return inherit( Screen, CalculusGrapherScreen );
} );
