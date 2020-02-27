// Copyright 2015-2019, University of Colorado Boulder

/**
 *
 * @author 0
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import inherit from '../../../phet-core/js/inherit.js';
import calculusGrapher from '../calculusGrapher.js';
import CalculusGrapherModel from './model/CalculusGrapherModel.js';
import CalculusGrapherScreenView from './view/CalculusGrapherScreenView.js';

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

inherit( Screen, CalculusGrapherScreen );
export default CalculusGrapherScreen;