// Copyright 2020-2023, University of Colorado Boulder

/**
 * The 'Lab' screen.
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Screen from '../../../joist/js/Screen.js';
import calculusGrapher from '../calculusGrapher.js';
import CalculusGrapherStrings from '../CalculusGrapherStrings.js';
import CalculusGrapherColors from '../common/CalculusGrapherColors.js';
import LabModel from './model/LabModel.js';
import LabScreenView from './view/LabScreenView.js';
import GraphType from '../common/model/GraphType.js';
import GraphSetRadioButtonGroup from '../common/view/GraphSetRadioButtonGroup.js';
import { AlignGroup } from '../../../scenery/js/imports.js';
import Tandem from '../../../tandem/js/Tandem.js';
import GraphSet from '../common/model/GraphSet.js';
import CalculusGrapherScreenIconFactory from '../common/view/CalculusGrapherScreenIconFactory.js';

export default class LabScreen extends Screen<LabModel, LabScreenView> {

  public constructor( tandem: Tandem ) {

    const modelTandem = tandem.createTandem( 'model' );

    // In the order that they will appear in radio buttons
    const graphSets: GraphSet[] = [
      new GraphSet( [ GraphType.INTEGRAL, GraphType.ORIGINAL, GraphType.DERIVATIVE ], {
        tandem: modelTandem.createTandem( 'graphSet0' ),
        phetioDocumentation: 'Choosing this GraphSet shows the integral, original, and derivative graphs.'
      } ),
      new GraphSet( [ GraphType.ORIGINAL, GraphType.DERIVATIVE, GraphType.SECOND_DERIVATIVE ], {
        tandem: modelTandem.createTandem( 'graphSet1' ),
        phetioDocumentation: 'Choosing this GraphSet shows the original, derivative, and second derivative graphs.'
      } )
    ];

    const labelAlignGroup = new AlignGroup(); // to give radio-button labels the same effective size
    const graphSetRadioButtonGroupItems = [
      GraphSetRadioButtonGroup.createItem( graphSets[ 0 ], GraphType.INTEGRAL, labelAlignGroup ),
      GraphSetRadioButtonGroup.createItem( graphSets[ 1 ], GraphType.SECOND_DERIVATIVE, labelAlignGroup )
    ];

    const createModel = () => new LabModel( {
      graphSets: graphSets,
      tandem: modelTandem
    } );

    const createView = ( model: LabModel ) => new LabScreenView( model, {
      graphSetRadioButtonGroupItems: graphSetRadioButtonGroupItems,
      tandem: tandem.createTandem( 'view' )
    } );

    super( createModel, createView, {
      name: CalculusGrapherStrings.screen.labStringProperty,
      backgroundColorProperty: CalculusGrapherColors.screenBackgroundColorProperty,
      homeScreenIcon: CalculusGrapherScreenIconFactory.createLabScreenIcon(),
      tandem: tandem
    } );
  }
}

calculusGrapher.register( 'LabScreen', LabScreen );
