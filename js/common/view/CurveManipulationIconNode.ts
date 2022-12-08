// Copyright 2022, University of Colorado Boulder

/**
 * CurveManipulationIconNode creates the Curve Manipulation Icons for the Radio Buttons
 *
 * @author Martin Veillette
 * */

import calculusGrapher from '../../calculusGrapher.js';
import { Node, NodeOptions, TColor } from '../../../../scenery/js/imports.js';
import CurveManipulationMode from '../model/CurveManipulationMode.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import TransformedCurve, { TransformedCurveOptions } from '../model/TransformedCurve.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import ChartTransform, { ChartTransformOptions } from '../../../../bamboo/js/ChartTransform.js';
import Range from '../../../../dot/js/Range.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ChartRectangle from '../../../../bamboo/js/ChartRectangle.js';
import CurveNode, { CurveNodeOptions } from './CurveNode.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import Tandem from '../../../../tandem/js/Tandem.js';

type SelfOptions = {
  stroke: TColor;
  solidCurveNodeOptions?: StrictOmit<CurveNodeOptions, 'stroke' | 'tandem'>;
  dashedCurveNodeOptions?: StrictOmit<CurveNodeOptions, 'stroke' | 'tandem'>;
  transformedCurveOptions?: TransformedCurveOptions;
  chartTransformOptions?: ChartTransformOptions;
};

export type CurveManipulationIconNodeOptions = SelfOptions & StrictOmit<NodeOptions, 'children'>;

export default class CurveManipulationIconNode extends Node {

  public constructor( mode: CurveManipulationMode,
                      providedOptions?: CurveManipulationIconNodeOptions ) {

    const options = optionize<CurveManipulationIconNodeOptions, StrictOmit<SelfOptions, 'solidCurveNodeOptions'>, NodeOptions>()(
      {
        dashedCurveNodeOptions: {
          continuousLinePlotOptions: {
            lineDash: [ 4.5, 2 ],
            lineWidth: 1
          }
        },
        transformedCurveOptions: {
          pointsPerCoordinate: 3,
          xRange: CalculusGrapherConstants.CURVE_X_RANGE
        },
        chartTransformOptions: {
          viewWidth: 70,
          viewHeight: 7,
          modelXRange: CalculusGrapherConstants.CURVE_X_RANGE,
          modelYRange: new Range( -1, 6 )
        }
      }, providedOptions );

    assert && assert( options.chartTransformOptions.modelXRange === options.transformedCurveOptions.xRange, ' x range should be the same' );

    // chart transform for the graph, the height and Y range will be updated later
    const chartTransform = new ChartTransform( options.chartTransformOptions );

    // chart Rectangle for the graph
    const chartRectangle = new ChartRectangle( chartTransform );

    // create model for solid curve
    const solidCurve = new TransformedCurve( combineOptions<TransformedCurveOptions>( {
        tandem: Tandem.OPT_OUT
      },
      options.transformedCurveOptions ) );

    // create model for icon curve
    const dashedCurve = new TransformedCurve( combineOptions<TransformedCurveOptions>( {
        tandem: Tandem.OPT_OUT
      },
      options.transformedCurveOptions ) );

    const xCenter = chartTransform.modelXRange.getCenter();
    const xLength = chartTransform.modelXRange.getLength();
    const xMax = chartTransform.modelXRange.getMax();
    const yMax = chartTransform.modelYRange.getMax();
    const yMin = chartTransform.modelYRange.getMin();

    if ( mode === CurveManipulationMode.TRIANGLE ||
         mode === CurveManipulationMode.PARABOLA ||
         mode === CurveManipulationMode.PEDESTAL ||
         mode === CurveManipulationMode.HILL ) {

      const position = new Vector2( xCenter, yMax );
      const width = xLength / 4;
      solidCurve.widthManipulatedCurve( mode, width, position );
    }
    else if ( mode === CurveManipulationMode.SINE ) {

      const position = new Vector2( xCenter, yMax / 2 );
      const width = xLength / 4.5;
      solidCurve.widthManipulatedCurve( mode, width, position );
      solidCurve.shiftToPosition( position );
    }
    else if ( mode === CurveManipulationMode.SHIFT ||
              mode === CurveManipulationMode.TILT ) {

      solidCurve.positionManipulatedCurve( mode, new Vector2( xMax, yMax ) );
      dashedCurve.positionManipulatedCurve( mode, new Vector2( xMax, -yMax ) );

    }
    else if ( mode === CurveManipulationMode.FREEFORM ) {

      solidCurve.freeformIconCurve( yMin, yMax );
    }
    else {
      throw new Error( 'Unsupported Curve Manipulation Mode' );
    }

    // create the solid curve node
    const solidCurveNode = new CurveNode( solidCurve, chartTransform, combineOptions<CurveNodeOptions>( {
      stroke: options.stroke,
      tandem: Tandem.OPT_OUT
    }, options.solidCurveNodeOptions ) );

    const dashedCurveNode = new CurveNode( dashedCurve, chartTransform, combineOptions<CurveNodeOptions>( {
      stroke: options.stroke,
      tandem: Tandem.OPT_OUT
    }, options.dashedCurveNodeOptions ) );

    const children = [ chartRectangle, solidCurveNode ];

    if ( mode === CurveManipulationMode.TILT || mode === CurveManipulationMode.SHIFT ) {
      children.push( dashedCurveNode );
    }
    options.children = children;

    super( options );
  }
}

calculusGrapher.register( 'CurveManipulationIconNode', CurveManipulationIconNode );
