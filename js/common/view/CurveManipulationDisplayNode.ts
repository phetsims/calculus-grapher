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
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import CurveManipulationIconNode from './CurveManipulationIconNode.js';

export default class CurveManipulationDisplayNode extends Node {

  public constructor( curveManipulationProperties: CurveManipulationProperties,
                      curveManipulationStroke: TColor,
                      tandem: Tandem ) {

    const curve = new TransformedCurve( {
      numberOfPoints: 300,
      xRange: CalculusGrapherConstants.CURVE_X_RANGE,

      // The curve for CurveManipulationDisplayNode is not instrumented. If you decide to instrument in the future,
      // be aware that instrumenting has performance implications, and it's not sufficient to simply add a tandem here.
      // Proceed with caution!
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
      renderer: 'canvas', // address aliasing on iPad, see https://github.com/phetsims/calculus-grapher/issues/242
      clipArea: chartRectangle.getShape(),
      stroke: curveManipulationStroke,
      discontinuousPointsFill: CalculusGrapherColors.panelFillProperty,
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

        if ( mode === CurveManipulationMode.HILL ) {
          curve.hill( width, xCenter, yMax );
          curve.shift( 0, -yMax / 2 );
        }
        else if ( mode === CurveManipulationMode.TRIANGLE ) {
          curve.triangle( width, xCenter, yMax );
          curve.shift( 0, -yMax / 2 );
        }
        else if ( mode === CurveManipulationMode.PEDESTAL ) {
          curve.pedestal( width, xCenter, yMax );
          curve.shift( 0, -yMax / 2 );
        }
        else if ( mode === CurveManipulationMode.PARABOLA ) {
          curve.parabola( width, xCenter, yMax );
          curve.shift( 0, -yMax / 2 );
        }
        else if ( mode === CurveManipulationMode.SINUSOID ) {
          curve.sinusoid( width, xCenter, -yMax );
        }
        else if ( mode === CurveManipulationMode.FREEFORM ) {
          CurveManipulationIconNode.freeformIconCurve( curve, yMin, 2 * yMax );
          curve.shift( 0, -yMax );
        }
        else if ( mode === CurveManipulationMode.TILT ) {
          curve.tilt( xMax, 2 * yMax );
          curve.shift( 0, -yMax );
        }
        else if ( mode === CurveManipulationMode.SHIFT ) {
          curve.shift( xMax, yMin );
        }
        else {
          throw new Error( `unsupported mode: ${mode}` );
        }

        curve.curveChangedEmitter.emit();
      }
    );
  }
}

calculusGrapher.register( 'CurveManipulationDisplayNode', CurveManipulationDisplayNode );
