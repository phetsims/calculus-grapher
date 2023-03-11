// Copyright 2022-2023, University of Colorado Boulder

/**
 * CurveManipulationIconNode creates the Curve Manipulation Icons for the Radio Buttons
 *
 * @author Martin Veillette
 */

import calculusGrapher from '../../calculusGrapher.js';
import { Node, TColor } from '../../../../scenery/js/imports.js';
import CurveManipulationMode from '../model/CurveManipulationMode.js';
import TransformedCurve from '../model/TransformedCurve.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import ChartRectangle from '../../../../bamboo/js/ChartRectangle.js';
import CurveNode from './CurveNode.js';
import Tandem from '../../../../tandem/js/Tandem.js';

const CHART_TRANSFORM_OPTIONS = {
  viewWidth: 70,
  viewHeight: 7,
  modelXRange: CalculusGrapherConstants.CURVE_X_RANGE,
  modelYRange: CalculusGrapherConstants.CURVE_MANIPULATION_Y_RANGE
};

const TRANSFORMED_CURVE_OPTIONS = {
  numberOfPoints: 70,
  xRange: CalculusGrapherConstants.CURVE_X_RANGE,
  tandem: Tandem.OPT_OUT // curves for icons are not instrumented
};

export default class CurveManipulationIconNode extends Node {

  public constructor( mode: CurveManipulationMode, stroke: TColor ) {

    // Chart transform for the graph, the height and Y range will be updated later.
    const chartTransform = new ChartTransform( CHART_TRANSFORM_OPTIONS );

    // Chart Rectangle for the graph
    const chartRectangle = new ChartRectangle( chartTransform );

    // Create model for a solid curve.
    const solidCurve = new TransformedCurve( TRANSFORMED_CURVE_OPTIONS );

    // Create model for a dashed curve.
    const dashedCurve = new TransformedCurve( TRANSFORMED_CURVE_OPTIONS );

    // To improve readability
    const xCenter = chartTransform.modelXRange.getCenter();
    const xLength = chartTransform.modelXRange.getLength();
    const xMax = chartTransform.modelXRange.getMax();
    const yMax = chartTransform.modelYRange.getMax();
    const yMin = chartTransform.modelYRange.getMin();

    // Create the icon for the mode.
    if ( mode === CurveManipulationMode.TRIANGLE ||
         mode === CurveManipulationMode.PARABOLA ||
         mode === CurveManipulationMode.PEDESTAL ||
         mode === CurveManipulationMode.HILL ) {

      // The width of the curve is one quarter of the x-Range.
      const width = xLength / 4;
      solidCurve.widthManipulatedCurve( mode, width, xCenter, yMax );
    }
    else if ( mode === CurveManipulationMode.SINUSOID ) {

      // Ad hoc variables to create sine function
      const y = yMax / 2;
      const width = xLength / 4.5;
      solidCurve.widthManipulatedCurve( mode, width, xCenter, y );
      solidCurve.shiftToPosition( xCenter, y );
    }
    else if ( mode === CurveManipulationMode.SHIFT ||
              mode === CurveManipulationMode.TILT ) {

      solidCurve.positionManipulatedCurve( mode, xMax, yMax );
      dashedCurve.positionManipulatedCurve( mode, xMax, -yMax );
    }
    else if ( mode === CurveManipulationMode.FREEFORM ) {
      solidCurve.freeformIconCurve( yMin, yMax );
    }
    else {
      throw new Error( 'Unsupported Curve Manipulation Mode' );
    }

    // Create the solid curve node.
    const solidCurveNode = new CurveNode( solidCurve, chartTransform, {
      stroke: stroke,
      tandem: Tandem.OPT_OUT // CurveNodes for icons are not instrumented
    } );

    const children = [ chartRectangle, solidCurveNode ];

    // Create the dashed curve node for these modes only.
    if ( mode === CurveManipulationMode.TILT || mode === CurveManipulationMode.SHIFT ) {
      const dashedCurveNode = new CurveNode( dashedCurve, chartTransform, {
        stroke: stroke,
        continuousLinePlotOptions: {
          lineDash: [ 4.5, 2 ],
          lineWidth: 1
        },
        tandem: Tandem.OPT_OUT // CurveNodes for icons are not instrumented
      } );
      children.push( dashedCurveNode );
    }

    super( {
      children: children
    } );
  }
}

calculusGrapher.register( 'CurveManipulationIconNode', CurveManipulationIconNode );
