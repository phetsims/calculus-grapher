// Copyright 2022, University of Colorado Boulder

/**
 * ShadedAreaChart is
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

  upFill?: TColor;
  downFill?: TColor;
};
type CurvePointFunction = ( point: CurvePoint ) => boolean;
export type ShadedAreaChartOptions = SelfOptions & NodeOptions;

export default class ShadedAreaChart extends Node {

  public constructor( curve: Curve,
                      chartTransform: ChartTransform,
                      xCoordinateProperty: TReadOnlyProperty<number>,
                      providedOptions?: ShadedAreaChartOptions ) {

    const options = optionize<ShadedAreaChartOptions, SelfOptions, NodeOptions>()(
      {

        upFill: 'black',
        downFill: 'black'

      }, providedOptions );


    const upFunction: CurvePointFunction = point => point.y > 0;
    const downFunction: CurvePointFunction = point => point.y < 0;

    const upAreaChart = new AreaChart( chartTransform, getDataSet( upFunction ),
      { fill: options.upFill } );

    const downAreaChart = new AreaChart( chartTransform, getDataSet( downFunction ),
      { fill: options.downFill } );
    options.children = [ upAreaChart, downAreaChart ];

    super( options );

    curve.curveChangedEmitter.addListener( updateCharts );
    xCoordinateProperty.link( updateCharts );

    function updateCharts(): void {
      upAreaChart.setDataSet( getDataSet( upFunction ) );
      downAreaChart.setDataSet( getDataSet( downFunction ) );
    }

    function getDataSet( pointFunction: CurvePointFunction ): AreaChartDataSet {
      return curve.points.map( point => {
        if ( pointFunction( point ) && point.x < xCoordinateProperty.value ) {
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
