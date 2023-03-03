// Copyright 2023, University of Colorado Boulder

/**
 * ScrubberLineNode is a vertical line that passes through all graphs, and follows the x position of a scrubber.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import LineToolNode from './LineToolNode.js';
import calculusGrapher from '../../calculusGrapher.js';
import AncillaryTool from '../model/AncillaryTool.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import { TColor } from '../../../../scenery/js/imports.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';

export default class ScrubberLineNode extends LineToolNode {

  public constructor( scrubber: AncillaryTool, chartTransform: ChartTransform, lineStroke: TColor,
                      visibleProperty: TReadOnlyProperty<boolean> ) {
    super( scrubber.xProperty, chartTransform, {
      visibleProperty: visibleProperty,
      lineStroke: lineStroke,
      lineWidth: 0.5,
      lineDash: [ 6, 6 ],
      tandem: Tandem.OPT_OUT
    } );
  }
}

calculusGrapher.register( 'ScrubberLineNode', ScrubberLineNode );