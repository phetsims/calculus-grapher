// Copyright 2022-2023, University of Colorado Boulder

/**
 * AreaUnderCurveScrubberNode is a subclass of ScrubberNode. In addition to setting the appropriate colors for
 * the scrubber, it adds a horizontal 'accumulation line' from x=0 to the x position of the scrubber.
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { Line } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import ScrubberNode, { ScrubberNodeOptions } from './ScrubberNode.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import AreaUnderCurveScrubber from '../model/AreaUnderCurveScrubber.js';

type SelfOptions = EmptySelfOptions;

type AreaUnderCurveScrubberNodeOptions = SelfOptions &
  PickRequired<ScrubberNodeOptions, 'lineTop' | 'lineBottom' | 'tandem' | 'visibleProperty'>;

export default class AreaUnderCurveScrubberNode extends ScrubberNode {

  public constructor( areaUnderCurveScrubber: AreaUnderCurveScrubber,
                      chartTransform: ChartTransform,
                      providedOptions?: AreaUnderCurveScrubberNodeOptions ) {

    const options = optionize<AreaUnderCurveScrubberNodeOptions, SelfOptions, ScrubberNodeOptions>()( {

      // ScrubberNodeOptions
      handleColor: CalculusGrapherColors.integralCurveStrokeProperty,
      lineStroke: CalculusGrapherColors.integralCurveStrokeProperty
    }, providedOptions );

    super( areaUnderCurveScrubber, chartTransform, options );

    // Horizontal 'accumulation line' that extends from x=0 to the drag handle's position
    const accumulationLine = new Line( 0, 0, this.handleNode.centerX, 0, {
      stroke: CalculusGrapherColors.integralCurveStrokeProperty,
      lineWidth: 3,
      pickable: false // optimization, see https://github.com/phetsims/calculus-grapher/issues/210
    } );
    this.addChild( accumulationLine );
    accumulationLine.moveToBack();

    // Resizes the horizontal line to match the drag handle's x position.
    this.handleNode.boundsProperty.link( () => {
      accumulationLine.x2 = this.handleNode.centerX;
      accumulationLine.centerY = this.handleNode.centerY;
    } );
  }
}

calculusGrapher.register( 'AreaUnderCurveScrubberNode', AreaUnderCurveScrubberNode );
