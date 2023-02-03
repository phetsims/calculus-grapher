// Copyright 2020-2023, University of Colorado Boulder

/**
 * The 'Advanced' screen.
 *
 * @author Brandon Li
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Screen from '../../../joist/js/Screen.js';
import calculusGrapher from '../calculusGrapher.js';
import CalculusGrapherStrings from '../CalculusGrapherStrings.js';
import CalculusGrapherColors from '../common/CalculusGrapherColors.js';
import AdvancedModel from './model/AdvancedModel.js';
import AdvancedScreenView from './view/AdvancedScreenView.js';
import GraphType from '../common/model/GraphType.js';
import GraphSetRadioButtonGroup from '../common/view/GraphSetRadioButtonGroup.js';
import { AlignGroup } from '../../../scenery/js/imports.js';
import CalculusGrapherScreenIcon from '../common/view/CalculusGrapherScreenIcon.js';
import Tandem from '../../../tandem/js/Tandem.js';
import GraphSet from '../common/model/GraphSet.js';

export default class AdvancedScreen extends Screen<AdvancedModel, AdvancedScreenView> {

  public constructor( tandem: Tandem ) {

    const modelTandem = tandem.createTandem( 'model' );

    let graphSetIndex = 0;
    const graphSets: GraphSet[] = [
      new GraphSet( [ GraphType.INTEGRAL, GraphType.ORIGINAL ],
        modelTandem.createTandem( `${GraphSet.TANDEM_NAME_PREFIX}${graphSetIndex++}` ) ),
      new GraphSet( [ GraphType.ORIGINAL, GraphType.DERIVATIVE ],
        modelTandem.createTandem( `${GraphSet.TANDEM_NAME_PREFIX}${graphSetIndex++}` ) )
    ];

    const labelAlignGroup = new AlignGroup(); // to give labels the same effective size
    const graphSetRadioButtonGroupItems = [
      GraphSetRadioButtonGroup.createItem( graphSets[ 0 ], GraphType.INTEGRAL, labelAlignGroup ),
      GraphSetRadioButtonGroup.createItem( graphSets[ 1 ], GraphType.DERIVATIVE, labelAlignGroup )
    ];

    const createModel = () => new AdvancedModel( {
      graphSets: graphSets,
      tandem: modelTandem
    } );

    const createView = ( model: AdvancedModel ) => new AdvancedScreenView( model, {
      graphSetRadioButtonGroupItems: graphSetRadioButtonGroupItems,
      tandem: tandem.createTandem( 'view' )
    } );

    super( createModel, createView, {
      name: CalculusGrapherStrings.screen.advancedStringProperty,
      backgroundColorProperty: CalculusGrapherColors.screenBackgroundColorProperty,
      homeScreenIcon: new CalculusGrapherScreenIcon( graphSets ),
      tandem: tandem
    } );
  }
}

calculusGrapher.register( 'AdvancedScreen', AdvancedScreen );
