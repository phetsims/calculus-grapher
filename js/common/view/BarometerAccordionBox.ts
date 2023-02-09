// Copyright 2022-2023, University of Colorado Boulder

/**
 * BarometerAccordionBox is the base class accordion box that shows a vertical axis with a barometer indicator
 * The barometer ticks and labels can toggle between a quantitative or a qualitative layer
 * depending on the state of valuesVisibleProperty
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
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

  // Color of the vertical bar in the barometer
  barColorProperty: TReadOnlyProperty<Color>;

  // bamboo ChartTransform
  chartTransformOptions?: ChartTransformOptions;

  // options for the accordion box's title Text
  titleTextOptions?: StrictOmit<RichTextOptions, 'tandem'>;

  // number of ticks for the quantitative layer (visible when valuesVisible is set to true)
  numberOfTicks?: number;
};

export type BarometerAccordionBoxOptions = SelfOptions & StrictOmit<AccordionBoxOptions, 'titleNode'>;

export default class BarometerAccordionBox extends AccordionBox {

  protected constructor( valueProperty: TReadOnlyProperty<number>,
                         labelStringProperty: TReadOnlyProperty<string>,
                         ancillaryToolVisibleProperty: TReadOnlyProperty<boolean>,
                         predictEnabledProperty: TReadOnlyProperty<boolean>,
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
      titleXSpacing: 10,

      // visible if the associate tool is visible and the 'Predict' radio button is not selected
      visibleProperty: new DerivedProperty(
        [ ancillaryToolVisibleProperty, predictEnabledProperty ],
        ( ancillaryToolVisible, predictEnabled ) => ( ancillaryToolVisible && !predictEnabled ), {
          // No PhET-iO instrumentation because this is more complicated than is useful for clients.
        } )
    }, providedOptions );

    const orientation = Orientation.VERTICAL;

    const chartTransform = new ChartTransform( options.chartTransformOptions );

    options.titleNode = new RichText( labelStringProperty, combineOptions<RichTextOptions>( {
      tandem: options.tandem.createTandem( 'titleText' )
    }, options.titleTextOptions ) );

    const axisLine = new AxisLine( chartTransform, orientation );

    //---------quantitative mode with numerical values--------

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
      createLabel: ( value: number ) => new Text( value, {
        font: CalculusGrapherConstants.ACCORDION_BOX_VALUE_FONT
        // No PhET-iO instrumentation is desired.
      } ),
      extent: TICK_MARK_EXTENT
    } );

    // Creates a layer for all the quantitative components, with appropriate visibility
    const quantitativeLayer = new Node( {
      children: [ tickLabelSet, minorTickMarkSet, majorTickMarkSet ],
      visibleProperty: CalculusGrapherPreferences.valuesVisibleProperty
    } );

    //---------qualitative mode with plus and minus symbols--------

    // Convenience variables for the position of zeros
    const zeroX = chartTransform.modelToViewX( 0 );
    const zeroY = chartTransform.modelToViewY( 0 );

    const qualitativeLabels = new Node( {
      children: [
        createLabelText( '+', zeroX, 10 ),
        createLabelText( '0', zeroX, zeroY ),
        createLabelText( '-', zeroX, chartTransform.viewHeight - 10 )
      ]
    } );

    const zeroTickMark = new Line( zeroX - TICK_MARK_EXTENT / 2, zeroY, zeroX + TICK_MARK_EXTENT / 2, zeroY, {
      stroke: 'black',
      lineWidth: 1
    } );

    // Creates a layer for all the qualitative components, with appropriate visibility
    const qualitativeLayer = new Node( {
      children: [ qualitativeLabels, zeroTickMark ],
      visibleProperty: DerivedProperty.not( CalculusGrapherPreferences.valuesVisibleProperty )
    } );

    // Creates a very wide line to represent a barometer
    const barLine = new Line( {
      y1: zeroY,
      y2: chartTransform.modelToViewY( valueProperty.value ),
      left: axisLine.right,
      stroke: options.barColorProperty,
      lineWidth: 10
    } );

    // Adds axisLine and barometer (always visible), and qualitative and quantitative layers.
    // barLine has to be last in z-order
    const barometerNode = new Node( {
      children: [ axisLine, quantitativeLayer, qualitativeLayer, barLine ]
    } );

    super( barometerNode, options );

    // Adds a listener to the value Property. The range of the
    // barometer line is clamped to prevent excessively high lines.
    const yRange = options.chartTransformOptions.modelYRange!;
    valueProperty.link( value => {
      const clampedValue = Utils.clamp( value, yRange.min, yRange.max );
      barLine.y2 = chartTransform.modelToViewY( clampedValue );
    } );
  }
}

function createLabelText( string: string, zeroX: number, yPosition: number ): Node {
  return new Text( string, {
    font: CalculusGrapherConstants.ACCORDION_BOX_FONT,
    maxWidth: 50, // determined empirically
    right: zeroX - ( TICK_MARK_EXTENT / 2 ) - 10,
    centerY: yPosition
    // No PhET-iO instrumentation is desired.
  } );
}

calculusGrapher.register( 'BarometerAccordionBox', BarometerAccordionBox );
