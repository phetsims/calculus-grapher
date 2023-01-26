// Copyright 2022-2023, University of Colorado Boulder

/**
 * BarometerAccordionBox is panel that shows a vertical axis with a barometer indicator
 *
 * @author Martin Veillette
 */

import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import AccordionBox, { AccordionBoxOptions } from '../../../../sun/js/AccordionBox.js';
import calculusGrapher from '../../calculusGrapher.js';
import { Color, Line, Node, RichText, RichTextOptions, Text } from '../../../../scenery/js/imports.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import ChartTransform, { ChartTransformOptions } from '../../../../bamboo/js/ChartTransform.js';
import AxisLine from '../../../../bamboo/js/AxisLine.js';
import TickMarkSet from '../../../../bamboo/js/TickMarkSet.js';
import TickLabelSet from '../../../../bamboo/js/TickLabelSet.js';
import Orientation from '../../../../phet-core/js/Orientation.js';
import Utils from '../../../../dot/js/Utils.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import CalculusGrapherPreferences from '../model/CalculusGrapherPreferences.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';

const TICK_MARK_EXTENT = 20;

type SelfOptions = {
  barometerStrokeProperty: TReadOnlyProperty<Color>;
  chartTransformOptions?: ChartTransformOptions;
  titleTextOptions?: StrictOmit<RichTextOptions, 'tandem'>;
  numberOfTicks?: number;
};

export type BarometerAccordionBoxOptions = SelfOptions & StrictOmit<AccordionBoxOptions, 'titleNode'>;

export default class BarometerAccordionBox extends AccordionBox {

  public constructor( valueProperty: TReadOnlyProperty<number>,
                      labelStringProperty: TReadOnlyProperty<string>,
                      providedOptions: BarometerAccordionBoxOptions ) {

    const options = optionize<BarometerAccordionBoxOptions, SelfOptions, AccordionBoxOptions>()( {

      // SelfOptions
      chartTransformOptions: {
        viewHeight: 175
      },
      titleTextOptions: {
        font: CalculusGrapherConstants.ACCORDION_BOX_FONT
      },
      numberOfTicks: 5,

      // AccordionBoxOptions
      stroke: CalculusGrapherColors.panelStrokeProperty,
      fill: CalculusGrapherColors.panelFillProperty,
      resize: true,
      titleAlignX: 'left',
      cornerRadius: CalculusGrapherConstants.CORNER_RADIUS,
      contentXMargin: CalculusGrapherConstants.PANEL_X_MARGIN,
      contentYMargin: CalculusGrapherConstants.PANEL_Y_MARGIN,
      buttonXMargin: CalculusGrapherConstants.PANEL_X_MARGIN,
      buttonYMargin: CalculusGrapherConstants.PANEL_Y_MARGIN,
      titleXMargin: CalculusGrapherConstants.PANEL_X_MARGIN,
      titleYMargin: CalculusGrapherConstants.PANEL_Y_MARGIN,
      titleXSpacing: 10
    }, providedOptions );

    const orientation = Orientation.VERTICAL;

    const chartTransform = new ChartTransform( options.chartTransformOptions );

    const titleNode = new RichText( labelStringProperty, combineOptions<RichTextOptions>( {
      tandem: options.tandem.createTandem( 'titleText' )
    }, options.titleTextOptions ) );

    const axisLine = new AxisLine( chartTransform, orientation );

    const tickSpacing = Utils.toFixedNumber(
      options.chartTransformOptions.modelYRange!.getLength() / ( options.numberOfTicks - 1 ), 0 );

    const majorTickMarkSet = new TickMarkSet( chartTransform, orientation, tickSpacing, {
      extent: TICK_MARK_EXTENT
    } );

    const minorTickMarkSet = new TickMarkSet( chartTransform, orientation, tickSpacing / 4, {
      extent: TICK_MARK_EXTENT / 2,
      stroke: 'gray',
      lineWidth: 0.5
    } );

    const tickLabelSet = new TickLabelSet( chartTransform, orientation, tickSpacing, {
      createLabel: ( value: number ) => new Text( value, { font: CalculusGrapherConstants.ACCORDION_BOX_VALUE_FONT } ),
      extent: TICK_MARK_EXTENT
    } );

    const quantitativeLayer = new Node( {
      children: [ tickLabelSet, minorTickMarkSet, majorTickMarkSet ],
      visibleProperty: CalculusGrapherPreferences.valuesVisibleProperty
    } );

    function createLabelText( string: string, yPosition: number ): Node {
      return new Text( string, {
        font: CalculusGrapherConstants.ACCORDION_BOX_FONT,
        maxWidth: 50, // determined empirically
        right: zeroX - TICK_MARK_EXTENT / 2 - 10,
        centerY: yPosition
      } );
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

    const zeroTickMark = new Line( zeroX - TICK_MARK_EXTENT / 2, zeroY, zeroX + TICK_MARK_EXTENT / 2, zeroY, {
      stroke: 'black',
      lineWidth: 1
    } );

    const qualitativeLayer = new Node( {
      children: [ qualitativeLabels, zeroTickMark ],
      visibleProperty: DerivedProperty.not( CalculusGrapherPreferences.valuesVisibleProperty )
    } );

    const barRectangle = new Line( {
      y1: chartTransform.modelToViewY( 0 ),
      y2: chartTransform.modelToViewY( valueProperty.value ),
      left: axisLine.right,
      stroke: options.barometerStrokeProperty,
      lineWidth: 10
    } );

    const barometerNode = new Node( {
      children: [ axisLine, quantitativeLayer, qualitativeLayer, barRectangle ]
    } );

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
