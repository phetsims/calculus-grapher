// Copyright 2023, University of Colorado Boulder

/**
 * TangentScrubberNode is a subclass of ScrubberNode that sets the appropriate colors for the scrubber.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Node } from '../../../../scenery/js/imports.js';
import ScrubberNode, { ScrubberNodeOptions } from './ScrubberNode.js';
import calculusGrapher from '../../calculusGrapher.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import TangentScrubber from '../model/TangentScrubber.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';

type SelfOptions = EmptySelfOptions;

export type TangentScrubberNodeOptions = SelfOptions &
  PickRequired<ScrubberNodeOptions, 'lineTop' | 'lineBottom' | 'tandem' | 'visibleProperty'>;

export default class TangentScrubberNode extends ScrubberNode {

  public constructor( tangentScrubber: TangentScrubber,
                      chartTransform: ChartTransform,
                      providedOptions: TangentScrubberNodeOptions ) {

    const options = optionize<TangentScrubberNodeOptions, SelfOptions, ScrubberNodeOptions>()( {

      // ScrubberNodeOptions
      handleColor: tangentScrubber.colorProperty,
      lineStroke: tangentScrubber.colorProperty
    }, providedOptions );

    super( tangentScrubber, chartTransform, options );
  }

  /**
   * Creates an icon for the tangent scrubber.
   */
  public static override createIcon(): Node {
    return ScrubberNode.createIcon( CalculusGrapherColors.derivativeCurveStrokeProperty );
  }
}

calculusGrapher.register( 'TangentScrubberNode', TangentScrubberNode );