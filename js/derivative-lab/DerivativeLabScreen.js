[object Promise]

/**
 * The 'Derivative Lab' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Brandon Li
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import Tandem from '../../../tandem/js/Tandem.js';
import calculusGrapher from '../calculusGrapher.js';
import calculusGrapherStrings from '../calculusGrapherStrings.js';
import CalculusGrapherColors from '../common/CalculusGrapherColors.js';
import DerivativeLabModel from './model/DerivativeLabModel.js';
import DerivativeLabScreenView from './view/DerivativeLabScreenView.js';

class DerivativeLabScreen extends Screen {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {
    assert && assert( tandem instanceof Tandem, `invalid tandem: ${tandem}` );

    const createModel = () => new DerivativeLabModel( tandem.createTandem( 'model' ) );
    const createView = model => new DerivativeLabScreenView( model, tandem.createTandem( 'view' ) );

    super( createModel, createView, {
      name: calculusGrapherStrings.screen.derivativeLab,
      backgroundColorProperty: new Property( CalculusGrapherColors.SCREEN_BACKGROUND ),
      tandem: tandem
    } );
  }
}

calculusGrapher.register( 'DerivativeLabScreen', DerivativeLabScreen );
export default DerivativeLabScreen;