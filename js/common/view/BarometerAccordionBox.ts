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
import CalculusGrapherPreferences from '../model/CalculusGrapherPreferences.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';

type SelfOptions = {
  lineOptions?: LineOptions;

  textOptions?: TextOptions;

  chartTransformOptions?: ChartTransformOptions;

  tickMarkSetExtent?: number;

  // number of ticks
  numberOfTicks?: number;
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
        tickMarkSetExtent: 10,
        numberOfTicks: 10,

        resize: true,

        // AccordionBoxOptions
        stroke: CalculusGrapherColors.panelStrokeProperty,
        fill: CalculusGrapherColors.panelFillProperty
      }, providedOptions );

    const orientation = Orientation.VERTICAL;

    const chartTransform = new ChartTransform( options.chartTransformOptions );

    const titleNode = new RichText( labelString, options.textOptions );

    const axisLine = new AxisLine( chartTransform, orientation );

    const tickSpacing = Utils.toFixedNumber(
      options.chartTransformOptions.modelYRange!.getLength() / options.numberOfTicks, 0 );

    const majorTickMarkSet = new TickMarkSet( chartTransform, orientation, tickSpacing, {
      extent: options.tickMarkSetExtent
    } );

    const minorTickMarkSet = new TickMarkSet( chartTransform, orientation, tickSpacing / 4, {
      extent: options.tickMarkSetExtent / 2
    } );

    const tickLabelSet = new TickLabelSet( chartTransform, orientation, tickSpacing, {
      createLabel: ( value: number ) => new Text( value, options.textOptions ),
      extent: options.tickMarkSetExtent
    } );

    const quantitativeLayer = new Node( {
      children: [ tickLabelSet, majorTickMarkSet, minorTickMarkSet ],
      visibleProperty: CalculusGrapherPreferences.valuesVisibleProperty
    } );

    function createLabelText( string: string, yPosition: number ): Node {
      return new Text( string, combineOptions<TextOptions>( {
        right: zeroX - options.tickMarkSetExtent - 10,
        centerY: yPosition
      }, options.textOptions ) );
    }

    const viewHeight = options.chartTransformOptions.viewHeight!;
    const zeroY = chartTransform.modelToViewY( 0 );
    const zeroX = chartTransform.modelToViewX( 0 );

    const qualitativeLabels = new Node( {
      children: [
        createLabelText( '+', 10 ),
        createLabelText( '0', zeroY ),
        createLabelText( '-', viewHeight - 10 )
      ]
    } );

    const zeroTickMark = new Line( zeroX - options.tickMarkSetExtent, zeroY,
      zeroX + options.tickMarkSetExtent, zeroY, {
        stroke: 'black',
        lineWidth: 1
      } );

    const qualitativeLayer = new Node( {
      children: [ qualitativeLabels, zeroTickMark ],
      visibleProperty: DerivedProperty.not( CalculusGrapherPreferences.valuesVisibleProperty )
    } );

    const barRectangle = new Line(
      combineOptions<LineOptions>( {
          y1: chartTransform.modelToViewY( 0 ),
          y2: chartTransform.modelToViewY( valueProperty.value ),
          left: axisLine.right
        },
        options.lineOptions ) );

    const barometerNode = new Node(
      { children: [ axisLine, quantitativeLayer, qualitativeLayer, barRectangle ] } );

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
