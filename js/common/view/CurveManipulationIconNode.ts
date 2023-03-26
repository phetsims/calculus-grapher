// Copyright 2022-2023, University of Colorado Boulder

/**
 * CurveManipulationIconNode creates the Curve Manipulation Icons for the Radio Buttons
 *
 * @author Martin Veillette
 */

import calculusGrapher from '../../calculusGrapher.js';
import { AlignBox, AlignGroup, Color, Node, Path, TColor } from '../../../../scenery/js/imports.js';
import Range from '../../../../dot/js/Range.js';
import CurveManipulationMode from '../model/CurveManipulationMode.js';
import TransformedCurve from '../model/TransformedCurve.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import ChartRectangle from '../../../../bamboo/js/ChartRectangle.js';
import CurveNode from './CurveNode.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import pencilAltSolidShape from '../../../../sherpa/js/fontawesome-5/pencilAltSolidShape.js';

const CHART_TRANSFORM_OPTIONS = {
  viewWidth: 50,
  viewHeight: 28,
  modelXRange: CalculusGrapherConstants.CURVE_X_RANGE,
  modelYRange: new Range( 0, 1 )
};

const TRANSFORMED_CURVE_OPTIONS = {
  numberOfPoints: 70,
  xRange: CalculusGrapherConstants.CURVE_X_RANGE,
  tandem: Tandem.OPT_OUT // curves for icons are not instrumented
};

// To make all icons have the same effective size, for all screens.
const ALIGN_BOX_OPTIONS = {
  group: new AlignGroup()
};

export default class CurveManipulationIconNode extends AlignBox {

  public constructor( mode: CurveManipulationMode, stroke: TColor ) {

    // Chart transform for the graph, the height and Y range will be updated later.
    const chartTransform = new ChartTransform( CHART_TRANSFORM_OPTIONS );

    // Chart Rectangle for the graph
    const chartRectangle = new ChartRectangle( chartTransform, {
      stroke: phet.chipper.queryParameters.dev ? 'red' : null // if running with ?dev, stroke the ChartRectangle
    } );

    // Create model for a solid curve.
    const solidCurve = new TransformedCurve( TRANSFORMED_CURVE_OPTIONS );

    // Create model for a dashed curve.
    const dashedCurve = new TransformedCurve( TRANSFORMED_CURVE_OPTIONS );

    // To improve readability
    const xCenter = chartTransform.modelXRange.getCenter();
    const yCenter = chartTransform.modelYRange.getCenter();
    const xLength = chartTransform.modelXRange.getLength();
    const xMin = chartTransform.modelXRange.getMin();
    const xMax = chartTransform.modelXRange.getMax();
    const yMax = chartTransform.modelYRange.getMax();
    const yMin = chartTransform.modelYRange.getMin();

    // Create the icon for the mode.
    if ( mode === CurveManipulationMode.HILL ||
         mode === CurveManipulationMode.TRIANGLE ||
         mode === CurveManipulationMode.PEDESTAL ||
         mode === CurveManipulationMode.PARABOLA ) {

      const width = 0.5 * xLength;
      solidCurve.widthManipulatedCurve( mode, width, xCenter, yMax );
    }
    else if ( mode === CurveManipulationMode.SINUSOID ) {

      // Ad hoc variables to create sine function
      const width = 0.08 * xLength;
      const y = 0.5 * yMax;
      solidCurve.widthManipulatedCurve( mode, width, xCenter, y );
      solidCurve.saveCurrentPoints();
      solidCurve.shiftToPosition( xMin, yCenter );
    }
    else if ( mode === CurveManipulationMode.FREEFORM ) {
      solidCurve.freeformIconCurve( yMin, yMax );
    }
    else if ( mode === CurveManipulationMode.SHIFT ) {

      const yOffset = 0.25 * yMax;
      solidCurve.shiftToPosition( xMax, yMax - yOffset );
      dashedCurve.shiftToPosition( xMax, yMin + yOffset );
    }
    else if ( mode === CurveManipulationMode.TILT ) {

      const y = 0.5 * yMax;
      solidCurve.tiltToPosition( xMax, y );
      solidCurve.saveCurrentPoints();
      solidCurve.shiftToPosition( xMin, yCenter );

      dashedCurve.tiltToPosition( xMax, -y );
      dashedCurve.saveCurrentPoints();
      dashedCurve.shiftToPosition( xMin, yCenter );
    }
    else {
      throw new Error( `unsupported mode: ${mode}` );
    }

    // Create the solid curve node.
    const solidCurveNode = new CurveNode( solidCurve, chartTransform, {
      stroke: stroke,
      discontinuousPointsFill: CalculusGrapherColors.panelFillProperty,
      tandem: Tandem.OPT_OUT // CurveNodes for icons are not instrumented
    } );

    const children: Node[] = [ chartRectangle, solidCurveNode ];

    // Create the dashed curve node for these modes only.
    if ( mode === CurveManipulationMode.TILT || mode === CurveManipulationMode.SHIFT ) {
      const dashedCurveNode = new CurveNode( dashedCurve, chartTransform, {
        stroke: stroke,
        discontinuousPointsFill: CalculusGrapherColors.panelFillProperty,
        continuousLinePlotOptions: {
          lineDash: [ 4.5, 2 ],
          lineWidth: 1
        },
        tandem: Tandem.OPT_OUT // CurveNodes for icons are not instrumented
      } );
      children.push( dashedCurveNode );
    }
    else if ( mode === CurveManipulationMode.FREEFORM ) {

      // Scale down in the x dimension, so that we have room to add pencil icon. This makes the stroke with a
      // little inconsistent in x vs y dimensions, but looks OK for an icon. More importantly, we want the
      // solidCurveNode part of this icon to match what is shown by CurveManipulationDisplayNode.
      solidCurveNode.setScaleMagnitude( 0.5, 1 );

      // Pencil to the right of solidCurveNode, with tip of the pencil at the rightmost end of the curve
      // the solidCurveNode renders.
      const pencilNode = new Path( pencilAltSolidShape, {
        scale: 0.05,
        fill: Color.grayColor( 75 ),
        left: solidCurveNode.right,
        bottom: solidCurveNode.bottom
      } );
      children.push( pencilNode );
    }

    const node = new Node( {
      children: children
    } );

    super( node, ALIGN_BOX_OPTIONS );
  }
}

calculusGrapher.register( 'CurveManipulationIconNode', CurveManipulationIconNode );
