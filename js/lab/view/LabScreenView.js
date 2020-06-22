// Copyright 2020, University of Colorado Boulder

/**
 * Top level view for the 'Lab' screen.
 *
 * @author BrandonLi
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherScreenView from '../../common/view/CalculusGrapherScreenView.js';
import LabModel from '../model/LabModel.js';

class LabScreenView extends CalculusGrapherScreenView {

  /**
   * @param {LabModel} model
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( model, tandem, options ) {
    assert && assert( model instanceof LabModel, `invalid model: ${model}` );
    assert && assert( tandem instanceof Tandem, `invalid tandem: ${tandem}` );

    super( model, tandem, options );
  }
}

calculusGrapher.register( 'LabScreenView', LabScreenView );
export default LabScreenView;