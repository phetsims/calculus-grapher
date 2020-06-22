// Copyright 2020, University of Colorado Boulder

/**
 * Top level model for the 'Lab' screen.
 *
 * @author Brandon Li
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherModel from '../../common/model/CalculusGrapherModel.js';

class LabModel extends CalculusGrapherModel {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {
    assert && assert( tandem instanceof Tandem, `invalid tandem: ${tandem}` );

    super( tandem );
  }
}

calculusGrapher.register( 'LabModel', LabModel );
export default LabModel;