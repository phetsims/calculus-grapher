// Copyright 2020-2021, University of Colorado Boulder
// @ts-nocheck
/**
 * Top level view for the 'Derivative Lab' screen.
 *
 * @author BrandonLi
 */

import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherScreenView from '../../common/view/CalculusGrapherScreenView.js';
import DerivativeLabModel from '../model/DerivativeLabModel.js';

class DerivativeLabScreenView extends CalculusGrapherScreenView {

  /**
   * @param {DerivativeLabModel} model
   * @param {Object} [options]
   */
  constructor( model, options ) {
    assert && assert( model instanceof DerivativeLabModel, `invalid model: ${model}` );

    super( model, options );
  }
}

calculusGrapher.register( 'DerivativeLabScreenView', DerivativeLabScreenView );
export default DerivativeLabScreenView;
