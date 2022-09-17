// Copyright 2020-2022, University of Colorado Boulder
// @ts-nocheck
/**
 * Top level view for the 'Intro' screen.
 *
 * @author BrandonLi
 */

import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherScreenView from '../../common/view/CalculusGrapherScreenView.js';
import IntroModel from '../model/IntroModel.js';

class IntroScreenView extends CalculusGrapherScreenView {

  /**
   * @param {IntroModel} model
   * @param {Object} [options]
   */
  constructor( model, options ) {
    assert && assert( model instanceof IntroModel, `invalid model: ${model}` );

    super( model, options );
  }
}

calculusGrapher.register( 'IntroScreenView', IntroScreenView );
export default IntroScreenView;
