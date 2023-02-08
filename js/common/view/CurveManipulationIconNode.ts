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
  tandem: Tandem.OPT_OUT
};

export default class CurveManipulationIconNode extends Node {

  public constructor( mode: CurveManipulationMode, stroke: TColor ) {

    // chart transform for the graph, the height and Y range will be updated later
    const chartTransform = new ChartTransform( CHART_TRANSFORM_OPTIONS );

    // chart Rectangle for the graph
    const chartRectangle = new ChartRectangle( chartTransform );

    // create model for solid curve
    const solidCurve = new TransformedCurve( TRANSFORMED_CURVE_OPTIONS );

    // create model for icon curve
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

      const width = xLength / 4;
      solidCurve.widthManipulatedCurve( mode, width, xCenter, yMax );
    }
    else if ( mode === CurveManipulationMode.SINE ) {

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
      plotBoundsMethod: 'accurate', // see https://github.com/phetsims/calculus-grapher/issues/226
      stroke: stroke,
      tandem: Tandem.OPT_OUT
    } );

    const children = [ chartRectangle, solidCurveNode ];

    // Create the dashed curve node for these modes only.
    if ( mode === CurveManipulationMode.TILT || mode === CurveManipulationMode.SHIFT ) {
      const dashedCurveNode = new CurveNode( dashedCurve, chartTransform, {
        plotBoundsMethod: 'accurate', // see https://github.com/phetsims/calculus-grapher/issues/226
        stroke: stroke,
        continuousLinePlotOptions: {
          lineDash: [ 4.5, 2 ],
          lineWidth: 1
        },
        tandem: Tandem.OPT_OUT
      } );
      children.push( dashedCurveNode );
    }

    super( {
      children: children
    } );
  }
}

calculusGrapher.register( 'CurveManipulationIconNode', CurveManipulationIconNode );
