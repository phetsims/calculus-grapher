// Copyright 2020-2023, University of Colorado Boulder

/**
 * The 'Integral Lab' screen.
 *
 * @author Brandon Li
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Screen from '../../../joist/js/Screen.js';
import calculusGrapher from '../calculusGrapher.js';
import CalculusGrapherStrings from '../CalculusGrapherStrings.js';
import CalculusGrapherColors from '../common/CalculusGrapherColors.js';
import IntegralModel from './model/IntegralModel.js';
import IntegralScreenView from './view/IntegralScreenView.js';
import GraphType from '../common/model/GraphType.js';
import Tandem from '../../../tandem/js/Tandem.js';
import GraphSet from '../common/model/GraphSet.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import { Text } from '../../../scenery/js/imports.js';

export default class IntegralScreen extends Screen<IntegralModel, IntegralScreenView> {

  public constructor( tandem: Tandem ) {

    const graphSets: GraphSet[] = [
      new GraphSet( [ GraphType.INTEGRAL, GraphType.ORIGINAL ] )
    ];

    const createModel = () => new IntegralModel( {
      graphSets: graphSets,
      tandem: tandem.createTandem( 'model' )
    } );

    const createView = ( model: IntegralModel ) => new IntegralScreenView( model, {
      tandem: tandem.createTandem( 'view' )
    } );

    super( createModel, createView, {
      name: CalculusGrapherStrings.screen.integralStringProperty,
      backgroundColorProperty: CalculusGrapherColors.screenBackgroundColorProperty,
      homeScreenIcon: createScreenIcon(),
      tandem: tandem
    } );
  }
}

/**
 * Creates the icon for this screen.
 */
function createScreenIcon(): ScreenIcon {
  const iconNode = new Text( '?', { font: new PhetFont( 32 ) } );
  return new ScreenIcon( iconNode, {
    fill: CalculusGrapherColors.screenBackgroundColorProperty
  } );
}

calculusGrapher.register( 'IntegralScreen', IntegralScreen );
