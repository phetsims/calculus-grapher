// Copyright 2023, University of Colorado Boulder

/**
 * TangentScrubberNode is a subclass of ScrubberNode that sets the appropriate colors for the scrubber.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import LineToolNode, { LineToolNodeOptions } from './LineToolNode.js';
import calculusGrapher from '../../calculusGrapher.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import TangentScrubber from '../model/TangentScrubber.js';

type SelfOptions = EmptySelfOptions;

export type TangentScrubberNodeOptions = SelfOptions & PickRequired<LineToolNodeOptions, 'tandem' | 'visibleProperty'>;

export default class TangentScrubberNode extends LineToolNode {

  public constructor( tangetScrubber: TangentScrubber,
                      chartTransform: ChartTransform,
                      providedOptions?: TangentScrubberNodeOptions ) {

    const options = optionize<TangentScrubberNodeOptions, SelfOptions, LineToolNodeOptions>()( {

      // LineToolNodeOptions
      handleColor: CalculusGrapherColors.derivativeCurveStrokeProperty,
      lineStroke: CalculusGrapherColors.derivativeCurveStrokeProperty
    }, providedOptions );

    super( tangetScrubber, chartTransform, options );
  }
}

calculusGrapher.register( 'TangentScrubberNode', TangentScrubberNode );