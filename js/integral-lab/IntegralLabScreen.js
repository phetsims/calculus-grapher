// Copyright 2020-2022, University of Colorado Boulder
// @ts-nocheck
/**
 * The 'Integral Lab' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Brandon Li
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import calculusGrapher from '../calculusGrapher.js';
import CalculusGrapherStrings from '../CalculusGrapherStrings.js';
import CalculusGrapherColors from '../common/CalculusGrapherColors.js';
import IntegralLabModel from './model/IntegralLabModel.js';
import IntegralLabScreenView from './view/IntegralLabScreenView.js';

class IntegralLabScreen extends Screen {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    const createModel = () => new IntegralLabModel( { tandem: options.tandem.createTandem( 'model' ) } );
    const createView = model => new IntegralLabScreenView( model, { tandem: options.tandem.createTandem( 'view' ) } );

    super( createModel, createView, {
      name: CalculusGrapherStrings.screen.integralLabStringProperty,
      backgroundColorProperty: new Property( CalculusGrapherColors.SCREEN_BACKGROUND ),
      tandem: options.tandem
    } );
  }
}

calculusGrapher.register( 'IntegralLabScreen', IntegralLabScreen );
export default IntegralLabScreen;
