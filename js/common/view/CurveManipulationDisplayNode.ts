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
import CurveManipulationProperties from '../model/CurveManipulationProperties.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import { Node, TColor } from '../../../../scenery/js/imports.js';

export default class CurveManipulationDisplayNode extends Node {

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

    const curveNode = new CurveNode( curve, chartTransform, {
      plotBoundsMethod: 'accurate', // see https://github.com/phetsims/calculus-grapher/issues/226
      clipArea: chartRectangle.getShape(),
      stroke: curveManipulationStroke,
      tandem: tandem.createTandem( 'curveNode' )
    } );

    super( {
      children: [ chartRectangle, curveNode ],
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
          curve.positionManipulatedCurve( mode, xMax, yMax );
        }
        else if ( mode === CurveManipulationMode.TRIANGLE ||
                  mode === CurveManipulationMode.PARABOLA ||
                  mode === CurveManipulationMode.PEDESTAL ||
                  mode === CurveManipulationMode.HILL ) {
          curve.widthManipulatedCurve( mode, width, xCenter, yMax );
        }
        else if ( mode === CurveManipulationMode.FREEFORM ) {
          curve.freeformIconCurve( yMin, yMax );
        }
        else if ( mode === CurveManipulationMode.SINE ) {
          curve.widthManipulatedCurve( mode, width, xCenter, yMax / 2 );
          curve.shiftToPosition( xCenter, yMax );
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
