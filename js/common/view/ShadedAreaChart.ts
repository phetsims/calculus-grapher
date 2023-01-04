// Copyright 2022-2023, University of Colorado Boulder

/**
 * ShadedAreaChart is scenery class that creates two shaded area charts, one for the positive and the other
 * for the negative.
 *
 * @author Martin Veillette
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import { Node, NodeOptions, TColor } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import Curve from '../model/Curve.js';
import AreaChart, { AreaChartDataSet } from './AreaChart.js';
import CurvePoint from '../model/CurvePoint.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';

type SelfOptions = {

  positiveFill?: TColor;
  negativeFill?: TColor;
};
type CurvePointFunction = ( point: CurvePoint ) => boolean;
export type ShadedAreaChartOptions = SelfOptions & NodeOptions;

export default class ShadedAreaChart extends Node {

  /**
   *
   * @param curve - the curve model to which the area charts are added
   * @param chartTransform
   * @param xProperty - the property the limits the horizontal extent of the area chart
   * @param providedOptions
   */
  public constructor( curve: Curve,
                      chartTransform: ChartTransform,
                      xProperty: TReadOnlyProperty<number>,
                      providedOptions?: ShadedAreaChartOptions ) {

    const options = optionize<ShadedAreaChartOptions, SelfOptions, NodeOptions>()( {
      positiveFill: 'black',
      negativeFill: 'black'
    }, providedOptions );

    const isPositiveFunction: CurvePointFunction = point => point.y > 0;
    const isNegativeFunction: CurvePointFunction = point => point.y < 0;

    const positiveAreaChart = new AreaChart( chartTransform, getDataSet( isPositiveFunction ),
      { fill: options.positiveFill, opacity: 0.6 } );

    const negativeAreaChart = new AreaChart( chartTransform, getDataSet( isNegativeFunction ),
      { fill: options.negativeFill, opacity: 0.6 } );
    options.children = [ positiveAreaChart, negativeAreaChart ];

    super( options );

    curve.curveChangedEmitter.addListener( updateCharts );
    xProperty.link( updateCharts );

    function updateCharts(): void {
      positiveAreaChart.setDataSet( getDataSet( isPositiveFunction ) );
      negativeAreaChart.setDataSet( getDataSet( isNegativeFunction ) );
    }

    function getDataSet( pointFunction: CurvePointFunction ): AreaChartDataSet {
      return curve.points.map( point => {

        if ( pointFunction( point ) && point.x < xProperty.value ) {
          return point.toVector();
        }
        else {
          return null;
        }
      } );
    }
  }
}

calculusGrapher.register( 'ShadedAreaChart', ShadedAreaChart );
