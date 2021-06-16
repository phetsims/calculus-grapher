// Copyright 2020-2021, University of Colorado Boulder

/**
 * Top level view for the 'Integral Lab' screen.
 *
 * @author BrandonLi
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherScreenView from '../../common/view/CalculusGrapherScreenView.js';
import IntegralLabModel from '../model/IntegralLabModel.js';

class IntegralLabScreenView extends CalculusGrapherScreenView {

  /**
   * @param {IntegralLabModel} model
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( model, tandem, options ) {
    assert && assert( model instanceof IntegralLabModel, `invalid model: ${model}` );
    assert && assert( tandem instanceof Tandem, `invalid tandem: ${tandem}` );

    super( model, tandem, options );
  }
}

calculusGrapher.register( 'IntegralLabScreenView', IntegralLabScreenView );
export default IntegralLabScreenView;