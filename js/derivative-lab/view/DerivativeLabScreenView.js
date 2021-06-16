[object Promise]

/**
 * Top level view for the 'Derivative Lab' screen.
 *
 * @author BrandonLi
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherScreenView from '../../common/view/CalculusGrapherScreenView.js';
import DerivativeLabModel from '../model/DerivativeLabModel.js';

class DerivativeLabScreenView extends CalculusGrapherScreenView {

  /**
   * @param {DerivativeLabModel} model
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( model, tandem, options ) {
    assert && assert( model instanceof DerivativeLabModel, `invalid model: ${model}` );
    assert && assert( tandem instanceof Tandem, `invalid tandem: ${tandem}` );

    super( model, tandem, options );
  }
}

calculusGrapher.register( 'DerivativeLabScreenView', DerivativeLabScreenView );
export default DerivativeLabScreenView;