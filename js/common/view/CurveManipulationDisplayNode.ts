// Copyright 2022-2023, University of Colorado Boulder

/**
 * Scenery Node that displays a representation of curve mode being manipulated by slider
 *
 * @author Martin Veillette
 */

import CurveNode from './CurveNode.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import ChartRectangle from '../../../../bamboo/js/ChartRectangle.js';
import CurveManipulationMode from '../model/CurveManipulationMode.js';
import TransformedCurve from '../model/TransformedCurve.js';
import Multilink from '../../../../axon/js/Multilink.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import CurveManipulationProperties from '../model/CurveManipulationProperties.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import { TColor } from '../../../../scenery/js/imports.js';

export default class CurveManipulationDisplayNode extends CurveNode {

  public constructor( curveManipulationProperties: CurveManipulationProperties,
                      curveManipulationStroke: TColor,
                      tandem: Tandem ) {

    const curve = new TransformedCurve( {
      numberOfPoints: 300,
      xRange: CalculusGrapherConstants.CURVE_X_RANGE,
      tandem: Tandem.OPT_OUT
    } );

    // chart transform for the curve
    const chartTransform = new ChartTransform( {
      viewWidth: 100,
      viewHeight: 40,
      modelXRange: CalculusGrapherConstants.CURVE_X_RANGE,
      modelYRange: CalculusGrapherConstants.CURVE_MANIPULATION_Y_RANGE
    } );

    const chartRectangle = new ChartRectangle( chartTransform );

    super( curve, chartTransform, {
      children: [ chartRectangle ],
      clipArea: chartRectangle.getShape(),
      stroke: curveManipulationStroke,
      tandem: tandem
    } );

    // convenience variables for drawing curves, making sure the
    // curves will not be clipped  (see #89)
    const verticalMargin = 0.25;
    const xCenter = chartTransform.modelXRange.getCenter();
    const xMax = chartTransform.modelXRange.getMax();
    const yMax = chartTransform.modelYRange.getMax() - verticalMargin;
    const yMin = chartTransform.modelYRange.getMin() + verticalMargin;
    assert && assert( yMax > yMin, 'yMax value should be greater than yMin' );

    Multilink.multilink(
      [ curveManipulationProperties.modeProperty, curveManipulationProperties.widthProperty ],
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
  }
}

calculusGrapher.register( 'CurveManipulationDisplayNode', CurveManipulationDisplayNode );
