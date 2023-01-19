// Copyright 2020-2023, University of Colorado Boulder

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
import { EmptySelfOptions } from '../../../phet-core/js/optionize.js';
import GraphType, { GraphSet } from '../common/model/GraphType.js';
import GraphSetRadioButtonGroup from '../common/view/GraphSetRadioButtonGroup.js';
import { AlignGroup } from '../../../scenery/js/imports.js';

type SelfOptions = EmptySelfOptions;

type LabScreenOptions = SelfOptions & ScreenOptions;

export default class LabScreen extends Screen<LabModel, LabScreenView> {

  public constructor( providedOptions: LabScreenOptions ) {

    const options = providedOptions;

    const graphSets: GraphSet[] = [
      [ GraphType.INTEGRAL, GraphType.ORIGINAL, GraphType.DERIVATIVE ],
      [ GraphType.ORIGINAL, GraphType.DERIVATIVE, GraphType.SECOND_DERIVATIVE ]
    ];

    const labelAlignGroup = new AlignGroup(); // to give labels the same effective size
    const graphSetRadioButtonGroupItems = [
      GraphSetRadioButtonGroup.createItem( graphSets[ 0 ], GraphType.INTEGRAL, labelAlignGroup ),
      GraphSetRadioButtonGroup.createItem( graphSets[ 1 ], GraphType.SECOND_DERIVATIVE, labelAlignGroup )
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
