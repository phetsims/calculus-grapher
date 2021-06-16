[object Promise]

/**
 * Top level model for the 'Integral Lab' screen.
 *
 * @author Brandon Li
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherModel from '../../common/model/CalculusGrapherModel.js';

class IntegralLabModel extends CalculusGrapherModel {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {
    assert && assert( tandem instanceof Tandem, `invalid tandem: ${tandem}` );

    super( tandem );
  }
}

calculusGrapher.register( 'IntegralLabModel', IntegralLabModel );
export default IntegralLabModel;