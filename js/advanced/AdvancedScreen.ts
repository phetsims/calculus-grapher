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
import Tandem from '../../../tandem/js/Tandem.js';
import GraphSet from '../common/model/GraphSet.js';
import CalculusGrapherScreenIconFactory from '../common/view/CalculusGrapherScreenIconFactory.js';

export default class AdvancedScreen extends Screen<AdvancedModel, AdvancedScreenView> {

  public constructor( tandem: Tandem ) {

    const modelTandem = tandem.createTandem( 'model' );

    // In the order that they will appear in radio buttons
    const graphSets: GraphSet[] = [
      new GraphSet( [ GraphType.INTEGRAL, GraphType.ORIGINAL ], {
        tandem: modelTandem.createTandem( 'graphSet0' ),
        phetioDocumentation: 'Choosing this GraphSet shows the integral and original graphs.'
      } ),
      new GraphSet( [ GraphType.ORIGINAL, GraphType.DERIVATIVE ], {
        tandem: modelTandem.createTandem( 'graphSet1' ),
        phetioDocumentation: 'Choosing this GraphSet shows the original and derivative graphs.'
      } )
    ];

    const labelAlignGroup = new AlignGroup(); // to give radio-button labels the same effective size
    const graphSetRadioButtonGroupItems = [
      GraphSetRadioButtonGroup.createItem( graphSets[ 0 ], GraphType.INTEGRAL, labelAlignGroup ),
      GraphSetRadioButtonGroup.createItem( graphSets[ 1 ], GraphType.DERIVATIVE, labelAlignGroup )
    ];

    const createModel = () => new AdvancedModel( {
      graphSets: graphSets,
      graphSet: graphSets[ 1 ], // see https://github.com/phetsims/calculus-grapher/issues/250
      tandem: modelTandem
    } );

    const createView = ( model: AdvancedModel ) => new AdvancedScreenView( model, {
      graphSetRadioButtonGroupItems: graphSetRadioButtonGroupItems,
      tandem: tandem.createTandem( 'view' )
    } );

    super( createModel, createView, {
      name: CalculusGrapherStrings.screen.advancedStringProperty,
      backgroundColorProperty: CalculusGrapherColors.screenBackgroundColorProperty,
      homeScreenIcon: CalculusGrapherScreenIconFactory.createAdvancedScreenIcon(),
      tandem: tandem
    } );
  }
}

calculusGrapher.register( 'AdvancedScreen', AdvancedScreen );
