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
import { GraphSet } from '../common/model/GraphType.js';
import GraphSetRadioButtonGroup from '../common/view/GraphSetRadioButtonGroup.js';
import { AlignGroup } from '../../../scenery/js/imports.js';

type SelfOptions = EmptySelfOptions;
export type LabScreenOptions = SelfOptions & ScreenOptions;

export default class LabScreen extends Screen<LabModel, LabScreenView> {

  public constructor( providedOptions: LabScreenOptions ) {

    const options = optionize<LabScreenOptions, SelfOptions, ScreenOptions>()( {}, providedOptions );

    const graphSets: GraphSet[] = [
      [ 'integral', 'original', 'derivative' ],
      [ 'original', 'derivative', 'secondDerivative' ]
    ];

    const labelAlignGroup = new AlignGroup();
    const graphSetRadioButtonGroupItems = [
      GraphSetRadioButtonGroup.createItem( graphSets[ 0 ], 'integral', labelAlignGroup ),
      GraphSetRadioButtonGroup.createItem( graphSets[ 1 ], 'secondDerivative', labelAlignGroup )
    ];

    const createModel = () => new LabModel( {
      graphSets: graphSets,
      tandem: options.tandem.createTandem( 'model' )
    } );

    const createView = ( model: LabModel ) => new LabScreenView( model, {
      graphSets: graphSets,
      graphSetRadioButtonGroupItems: graphSetRadioButtonGroupItems,
      tandem: options.tandem.createTandem( 'view' )
    } );

    super( createModel, createView, {
      name: CalculusGrapherStrings.screen.labStringProperty,
      backgroundColorProperty: CalculusGrapherColors.screenBackgroundColorProperty,
      tandem: options.tandem
    } );
  }
}

calculusGrapher.register( 'LabScreen', LabScreen );
