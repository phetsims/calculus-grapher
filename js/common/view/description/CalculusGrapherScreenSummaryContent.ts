// Copyright 2026, University of Colorado Boulder

/**
 * CalculusGrapherScreenSummaryContent is the base class for all screen summaries.  It handles the parts of the
 * screen summary that are common to all screens.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenSummaryContent, { ScreenSummaryContentOptions } from '../../../../../joist/js/ScreenSummaryContent.js';
import optionize, { EmptySelfOptions } from '../../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../../phet-core/js/types/PickRequired.js';
import calculusGrapher from '../../../calculusGrapher.js';
import CalculusGrapherFluent from '../../../CalculusGrapherFluent.js';
import CalculusGrapherModel from '../../model/CalculusGrapherModel.js';
import GraphsNode from '../GraphsNode.js';
import CurrentDetailsAccessibleListNode from './CurrentDetailsAccessibleListNode.js';

type SelfOptions = EmptySelfOptions;

type CalculusGrapherScreenSummaryContentOptions = SelfOptions &
  PickRequired<ScreenSummaryContentOptions, 'playAreaContent' | 'interactionHintContent'>;

export default class CalculusGrapherScreenSummaryContent extends ScreenSummaryContent {

  protected constructor( model: CalculusGrapherModel, graphsNode: GraphsNode, providedOptions: CalculusGrapherScreenSummaryContentOptions ) {

    const options = optionize<CalculusGrapherScreenSummaryContentOptions, SelfOptions, ScreenSummaryContentOptions>()( {
      controlAreaContent: CalculusGrapherFluent.a11y.allScreens.screenSummary.controlAreaStringProperty,
      currentDetailsContent: new CurrentDetailsAccessibleListNode( model, graphsNode )
    }, providedOptions );

    super( options );
  }
}

calculusGrapher.register( 'CalculusGrapherScreenSummaryContent', CalculusGrapherScreenSummaryContent );
