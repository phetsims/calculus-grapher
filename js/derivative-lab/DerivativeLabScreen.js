// Copyright 2020-2022, University of Colorado Boulder
// @ts-nocheck
/**
 * The 'Derivative Lab' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Brandon Li
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import calculusGrapher from '../calculusGrapher.js';
import CalculusGrapherStrings from '../CalculusGrapherStrings.js';
import CalculusGrapherColors from '../common/CalculusGrapherColors.js';
import DerivativeLabModel from './model/DerivativeLabModel.js';
import DerivativeLabScreenView from './view/DerivativeLabScreenView.js';

class DerivativeLabScreen extends Screen {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    const createModel = () => new DerivativeLabModel( { tandem: options.tandem.createTandem( 'model' ) } );
    const createView = model => new DerivativeLabScreenView( model, { tandem: options.tandem.createTandem( 'view' ) } );

    super( createModel, createView, {
      name: CalculusGrapherStrings.screen.derivativeLabStringProperty,
      backgroundColorProperty: new Property( CalculusGrapherColors.SCREEN_BACKGROUND ),
      tandem: options.tandem
    } );
  }
}

calculusGrapher.register( 'DerivativeLabScreen', DerivativeLabScreen );
export default DerivativeLabScreen;
