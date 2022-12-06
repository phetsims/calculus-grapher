// Copyright 2022, University of Colorado Boulder

/**
 * Scenery Node that displays a representation of curve mode being manipulated by slider
 *
 * @author Martin Veillette
 */

import CurveNode, { CurveNodeOptions } from './CurveNode.js';
import calculusGrapher from '../../calculusGrapher.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import ChartTransform, { ChartTransformOptions } from '../../../../bamboo/js/ChartTransform.js';
import ChartRectangle from '../../../../bamboo/js/ChartRectangle.js';
import CurveManipulationMode from '../model/CurveManipulationMode.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import TransformedCurve, { TransformedCurveOptions } from '../model/TransformedCurve.js';
import Multilink from '../../../../axon/js/Multilink.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Range from '../../../../dot/js/Range.js';
import CurveManipulationProperties from '../model/CurveManipulationProperties.js';
import PredictModeEnabledProperty from '../model/PredictModeEnabledProperty.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import Tandem from '../../../../tandem/js/Tandem.js';

type SelfOptions = {
  curveNodeOptions?: StrictOmit<CurveNodeOptions, 'tandem'>;
  transformedCurveOptions?: TransformedCurveOptions;
  chartTransformOptions?: ChartTransformOptions;
};
type CurveManipulationDisplayOptions = SelfOptions & PickRequired<CurveNodeOptions, 'tandem'>;

export default class CurveManipulationDisplayNode extends CurveNode {

  public constructor( curveManipulationProperties: CurveManipulationProperties,
                      predictModeEnabledProperty: PredictModeEnabledProperty,
                      providedOptions?: CurveManipulationDisplayOptions ) {

    const options = optionize<CurveManipulationDisplayOptions, SelfOptions, CurveNodeOptions>()(
      {
        curveNodeOptions: {
          continuousLinePlotOptions: {
            stroke: predictModeEnabledProperty.colorStrokeProperty,
            lineWidth: 2
          }
        },
        transformedCurveOptions: {
          pointsPerCoordinate: 3,
          xRange: CalculusGrapherConstants.CURVE_X_RANGE
        },
        chartTransformOptions: {
          viewWidth: 100,
          viewHeight: 40,
          modelXRange: CalculusGrapherConstants.CURVE_X_RANGE,
          modelYRange: new Range( -1, 6 )
        }
      }, providedOptions );

    const curve = new TransformedCurve(
      combineOptions<TransformedCurveOptions>( {
          tandem: Tandem.OPT_OUT
        },
        options.transformedCurveOptions ) );

    // chart transform for the curve
    const chartTransform = new ChartTransform( options.chartTransformOptions );

    // convenience variables for drawing curves, making sure the
    // curves will not be clipped  (see #89)
    const verticalMargin = 1;
    const xCenter = chartTransform.modelXRange.getCenter();
    const xMax = chartTransform.modelXRange.getMax();
    const yMax = chartTransform.modelYRange.getMax() - verticalMargin;
    const yMin = chartTransform.modelYRange.getMin() + verticalMargin;

    assert && assert( yMax > yMin, 'yMax value should be greater than yMin' );

    Multilink.multilink( [
        curveManipulationProperties.modeProperty,
        curveManipulationProperties.widthProperty ],
      ( mode, width ) => {

        curve.reset();

        if ( mode === CurveManipulationMode.TILT || mode === CurveManipulationMode.SHIFT ) {

          curve.positionManipulatedCurve( mode, new Vector2( xMax, yMax ) );
        }
        else if ( mode === CurveManipulationMode.TRIANGLE ||
                  mode === CurveManipulationMode.PARABOLA ||
                  mode === CurveManipulationMode.PEDESTAL ||
                  mode === CurveManipulationMode.HILL ) {

          const middlePosition = new Vector2( xCenter, yMax );
          curve.widthManipulatedCurve( mode, width, middlePosition );
        }
        else if ( mode === CurveManipulationMode.FREEFORM ) {

          curve.freeformIconCurve( yMin, yMax );
        }
        else if ( mode === CurveManipulationMode.SINE ) {

          const position = new Vector2( xCenter, yMax / 2 );
          curve.widthManipulatedCurve( mode, width, position );
          curve.shiftToPosition( new Vector2( xCenter, yMax ) );
        }
        else {

          throw new Error( 'Unsupported Curve Manipulation Mode' );
        }

        curve.curveChangedEmitter.emit();
      }
    );

    // chart Rectangle for the graph
    const chartRectangle = new ChartRectangle( chartTransform, {} );


    super( curve, chartTransform, combineOptions<CurveNodeOptions>( {
      tandem: options.tandem.createTandem( 'curveNode' )
    }, options.curveNodeOptions ) );

    this.clipArea = chartRectangle.getShape();
    this.addChild( chartRectangle );
  }
}

calculusGrapher.register( 'CurveManipulationDisplayNode', CurveManipulationDisplayNode );
