// Copyright 2020-2022, University of Colorado Boulder

/**
 * The 'Lab' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Martin Veillette
 */

import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import calculusGrapher from '../calculusGrapher.js';
import CalculusGrapherStrings from '../CalculusGrapherStrings.js';
import CalculusGrapherColors from '../common/CalculusGrapherColors.js';
import LabModel from './model/LabModel.js';
import LabScreenView from './view/LabScreenView.js';
import optionize, { EmptySelfOptions } from '../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;
export type LabScreenOptions = SelfOptions & ScreenOptions;

export default class LabScreen extends Screen {

  public constructor( providedOptions: LabScreenOptions ) {

    const options = optionize<LabScreenOptions, SelfOptions, ScreenOptions>()( {}, providedOptions );

    const createModel = () => new LabModel( { tandem: options.tandem.createTandem( 'model' ) } );

    const createView = ( model: LabModel ) => new LabScreenView( model, { tandem: options.tandem.createTandem( 'view' ) } );

    super( createModel, createView, {
      name: CalculusGrapherStrings.screen.labStringProperty,
      backgroundColorProperty: CalculusGrapherColors.screenBackgroundColorProperty,
      tandem: options.tandem
    } );
  }
}

calculusGrapher.register( 'LabScreen', LabScreen );
