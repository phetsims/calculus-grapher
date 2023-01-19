// Copyright 2020-2023, University of Colorado Boulder

/**
 * The 'Advanced' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Brandon Li
 */

import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import calculusGrapher from '../calculusGrapher.js';
import CalculusGrapherStrings from '../CalculusGrapherStrings.js';
import CalculusGrapherColors from '../common/CalculusGrapherColors.js';
import AdvancedModel from './model/AdvancedModel.js';
import AdvancedScreenView from './view/AdvancedScreenView.js';
import { EmptySelfOptions } from '../../../phet-core/js/optionize.js';
import GraphType, { GraphSet } from '../common/model/GraphType.js';
import GraphSetRadioButtonGroup from '../common/view/GraphSetRadioButtonGroup.js';
import { AlignGroup } from '../../../scenery/js/imports.js';

type SelfOptions = EmptySelfOptions;

type AdvancedScreenOptions = SelfOptions & ScreenOptions;

export default class AdvancedScreen extends Screen<AdvancedModel, AdvancedScreenView> {

  public constructor( providedOptions: AdvancedScreenOptions ) {

    const options = providedOptions;

    const graphSets: GraphSet[] = [
      [ GraphType.INTEGRAL, GraphType.ORIGINAL ],
      [ GraphType.ORIGINAL, GraphType.DERIVATIVE ]
    ];

    const labelAlignGroup = new AlignGroup(); // to give labels the same effective size
    const graphSetRadioButtonGroupItems = [
      GraphSetRadioButtonGroup.createItem( graphSets[ 0 ], GraphType.INTEGRAL, labelAlignGroup ),
      GraphSetRadioButtonGroup.createItem( graphSets[ 1 ], GraphType.DERIVATIVE, labelAlignGroup )
    ];

    const createModel = () => new AdvancedModel( {
      graphSets: graphSets,
      tandem: options.tandem.createTandem( 'model' )
    } );

    const createView = ( model: AdvancedModel ) => new AdvancedScreenView( model, {
      graphSets: graphSets,
      graphSetRadioButtonGroupItems: graphSetRadioButtonGroupItems,
      tandem: options.tandem.createTandem( 'view' )
    } );

    super( createModel, createView, {
      name: CalculusGrapherStrings.screen.advancedStringProperty,
      backgroundColorProperty: CalculusGrapherColors.screenBackgroundColorProperty,
      tandem: options.tandem
    } );
  }
}

calculusGrapher.register( 'AdvancedScreen', AdvancedScreen );
