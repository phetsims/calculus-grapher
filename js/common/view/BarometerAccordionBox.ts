// Copyright 2022, University of Colorado Boulder

/**
 * BarometerAccordionBox is panel that shows a vertical axis with a barometer indicator
 *
 * @author Martin Veillette
 */

import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import AccordionBox, { AccordionBoxOptions } from '../../../../sun/js/AccordionBox.js';
import calculusGrapher from '../../calculusGrapher.js';
import { Line, LineOptions, Node, RichText, Text, TextOptions } from '../../../../scenery/js/imports.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import ChartTransform, { ChartTransformOptions } from '../../../../bamboo/js/ChartTransform.js';
import AxisLine from '../../../../bamboo/js/AxisLine.js';
import TickMarkSet from '../../../../bamboo/js/TickMarkSet.js';
import TickLabelSet from '../../../../bamboo/js/TickLabelSet.js';
import Orientation from '../../../../phet-core/js/Orientation.js';
import Range from '../../../../dot/js/Range.js';
import Utils from '../../../../dot/js/Utils.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';

type SelfOptions = {
  lineOptions?: LineOptions;

  textOptions?: TextOptions;

  chartTransformOptions?: ChartTransformOptions;

  tickMarkSetExtent?: number;

  // spacing of ticks in model coordinate
  tickSpacing?: number;
};

export type BarometerAccordionBoxOptions = SelfOptions & StrictOmit<AccordionBoxOptions, 'titleNode'>;

export default class BarometerAccordionBox extends AccordionBox {

  public constructor( valueProperty: TReadOnlyProperty<number>,
                      labelString: TReadOnlyProperty<string>,
                      providedOptions: BarometerAccordionBoxOptions ) {

    const options = optionize<BarometerAccordionBoxOptions, SelfOptions, AccordionBoxOptions>()(
      {
        lineOptions: {
          stroke: 'red',
          lineWidth: 10
        },
        textOptions: {
          font: CalculusGrapherConstants.ACCORDION_BOX_TITLE_FONT,
          maxWidth: 100 // determined empirically
        },
        chartTransformOptions: {
          viewHeight: 200,
          modelYRange: new Range( -10, 10 )
        },
        tickMarkSetExtent: 20,
        tickSpacing: 30,

        resize: true,

        // AccordionBoxOptions
        stroke: CalculusGrapherColors.panelStrokeProperty,
        fill: CalculusGrapherColors.panelFillProperty
      }, providedOptions );

    const orientation = Orientation.VERTICAL;

    const chartTransform = new ChartTransform( options.chartTransformOptions );

    const titleNode = new RichText( labelString, options.textOptions );

    const axisLine = new AxisLine( chartTransform, orientation );

    const tickMarkSet = new TickMarkSet( chartTransform, orientation, options.tickSpacing, {
      extent: options.tickMarkSetExtent
    } );

    const tickLabelSet = new TickLabelSet( chartTransform, orientation, options.tickSpacing, {
      createLabel: ( value: number ) => new Text( value, options.textOptions ),
      extent: options.tickMarkSetExtent
    } );

    const plusText = new Text( '+', combineOptions<TextOptions>( {
      right: tickLabelSet.right,
      top: axisLine.top + 5
    }, options.textOptions ) );
    const minusText = new Text( '-', combineOptions<TextOptions>( {
      right: tickLabelSet.right,
      bottom: axisLine.bottom - 5
    }, options.textOptions ) );

    const barRectangle = new Line(
      combineOptions<LineOptions>( {
          y1: chartTransform.modelToViewY( 0 ),
          y2: chartTransform.modelToViewY( valueProperty.value ),
          left: axisLine.right
        },
        options.lineOptions ) );

    const barometerNode = new Node(
      { children: [ axisLine, plusText, minusText, tickMarkSet, tickLabelSet, barRectangle ] } );

    options.titleNode = titleNode;
    super( barometerNode, options );

    const yRange = options.chartTransformOptions.modelYRange!;

    valueProperty.link( value => {
      const clampedValue = Utils.clamp( value, yRange.min, yRange.max );
      barRectangle.y2 = chartTransform.modelToViewY( clampedValue );
    } );
  }
}
calculusGrapher.register( 'BarometerAccordionBox', BarometerAccordionBox );
