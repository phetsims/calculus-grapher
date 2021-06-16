[object Promise]

/**
 * Top level view for the 'Intro' screen.
 *
 * @author BrandonLi
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherScreenView from '../../common/view/CalculusGrapherScreenView.js';
import IntroModel from '../model/IntroModel.js';

class IntroScreenView extends CalculusGrapherScreenView {

  /**
   * @param {IntroModel} model
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( model, tandem, options ) {
    assert && assert( model instanceof IntroModel, `invalid model: ${model}` );
    assert && assert( tandem instanceof Tandem, `invalid tandem: ${tandem}` );

    super( model, tandem, options );
  }
}

calculusGrapher.register( 'IntroScreenView', IntroScreenView );
export default IntroScreenView;