// Copyright 2020-2021, University of Colorado Boulder

/**
 * Top level view for the 'Integral Lab' screen.
 *
 * @author BrandonLi
 */

import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherScreenView from '../../common/view/CalculusGrapherScreenView.js';
import IntegralLabModel from '../model/IntegralLabModel.js';

class IntegralLabScreenView extends CalculusGrapherScreenView {

  /**
   * @param {IntegralLabModel} model
   * @param {Object} [options]
   */
  constructor( model, options ) {
    assert && assert( model instanceof IntegralLabModel, `invalid model: ${model}` );

    super( model, options );
  }
}

calculusGrapher.register( 'IntegralLabScreenView', IntegralLabScreenView );
export default IntegralLabScreenView;
