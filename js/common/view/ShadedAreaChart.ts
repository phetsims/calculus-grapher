// Copyright 2022, University of Colorado Boulder

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

    const upFunction: CurvePointFunction = point => point.y > 0;
    const downFunction: CurvePointFunction = point => point.y < 0;

    const upAreaChart = new AreaChart( chartTransform, getDataSet( upFunction ),
      { fill: options.positiveFill } );

    const downAreaChart = new AreaChart( chartTransform, getDataSet( downFunction ),
      { fill: options.negativeFill } );
    options.children = [ upAreaChart, downAreaChart ];

    super( options );

    curve.curveChangedEmitter.addListener( updateCharts );
    xProperty.link( updateCharts );

    function updateCharts(): void {
      upAreaChart.setDataSet( getDataSet( upFunction ) );
      downAreaChart.setDataSet( getDataSet( downFunction ) );
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
