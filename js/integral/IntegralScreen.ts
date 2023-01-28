// Copyright 2020-2023, University of Colorado Boulder

/**
 * The 'Integral Lab' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Brandon Li
 */

import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import calculusGrapher from '../calculusGrapher.js';
import CalculusGrapherStrings from '../CalculusGrapherStrings.js';
import CalculusGrapherColors from '../common/CalculusGrapherColors.js';
import IntegralModel from './model/IntegralModel.js';
import IntegralScreenView from './view/IntegralScreenView.js';
import { EmptySelfOptions } from '../../../phet-core/js/optionize.js';
import GraphType, { GraphSet } from '../common/model/GraphType.js';
import CalculusGrapherScreenIcon from '../common/view/CalculusGrapherScreenIcon.js';

type SelfOptions = EmptySelfOptions;

type IntegralScreenOptions = SelfOptions & ScreenOptions;

export default class IntegralScreen extends Screen<IntegralModel, IntegralScreenView> {

  public constructor( providedOptions: IntegralScreenOptions ) {

    const options = providedOptions;

    const graphSets: GraphSet[] = [
      [ GraphType.INTEGRAL, GraphType.ORIGINAL ]
    ];

    const createModel = () => new IntegralModel( {
      graphSets: graphSets,
      tandem: options.tandem.createTandem( 'model' )
    } );

    const createView = ( model: IntegralModel ) => new IntegralScreenView( model, {
      tandem: options.tandem.createTandem( 'view' )
    } );

    super( createModel, createView, {
      name: CalculusGrapherStrings.screen.integralStringProperty,
      backgroundColorProperty: CalculusGrapherColors.screenBackgroundColorProperty,
      homeScreenIcon: new CalculusGrapherScreenIcon( graphSets ),
      tandem: options.tandem
    } );
  }
}

calculusGrapher.register( 'IntegralScreen', IntegralScreen );
