// Copyright 2022, University of Colorado Boulder

/**
 * AreaChart is a chart that combines a line chart and a bar chart.
 * An area chart is distinguished from a line chart by the addition of shading between
 * lines and a baseline, like in a bar chart.
 *
 * Null values are skipped and allow you to create separate shaded regions.
 *
 * @author Martin Veillette
 */

import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { Shape } from '../../../../kite/js/imports.js';
import optionize from '../../../../phet-core/js/optionize.js';
import { Path, PathOptions } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';

type SelfOptions = {

  // y-value representing the foundation of the chart
  baseline?: number;
};

export type AreaChartDataSet = ( Vector2 | null )[];

export type AreaChartOptions = SelfOptions & PathOptions;


export default class AreaChart extends Path {

  // if you change this directly, you are responsible for calling update
  public dataSet: AreaChartDataSet;

  // a y-value that serves as foundation for the area chart.
  public baseline: number;

  private chartTransform: ChartTransform;
  private readonly disposeAreaChart: () => void;

  public constructor( chartTransform: ChartTransform,
                      dataSet: AreaChartDataSet,
                      providedOptions?: AreaChartOptions ) {

    const options = optionize<AreaChartOptions, SelfOptions, PathOptions>()(
      {
        baseline: 0
      }, providedOptions );

    super( null, options );

    this.baseline = options.baseline;
    this.chartTransform = chartTransform;
    this.dataSet = dataSet;

    // Initialize
    this.update();

    // Update when the transform changes.
    const changedListener = () => this.update();
    chartTransform.changedEmitter.addListener( changedListener );

    this.disposeAreaChart = () => chartTransform.changedEmitter.removeListener( changedListener );
  }


  public override dispose(): void {
    this.disposeAreaChart();
    super.dispose();
  }

  // Recomputes the rendered shape.
  public update(): void {
    const shape = new Shape();
    let moveToNextPoint = true;

    // previous dataPoint
    let oldDataPoint: Vector2 | null = null;

    for ( let i = 0; i < this.dataSet.length; i++ ) {

      const dataPoint = this.dataSet[ i ];

      assert && assert( dataPoint === null || dataPoint.isFinite(), 'data points must be finite Vector2 or null' );

      // Draw a line segment to the next non-null value.
      // Null values result in a gap (via move) in the plot.
      if ( dataPoint ) {
        const viewPoint = this.chartTransform.modelToViewPosition( dataPoint );

        if ( moveToNextPoint ) {
          const startBasePoint = this.chartTransform.modelToViewPosition( this.setToBaseline( dataPoint ) );
          shape.moveToPoint( startBasePoint );
          shape.lineToPoint( viewPoint );
          moveToNextPoint = false;
        }
        else {
          shape.lineToPoint( viewPoint );
        }

        oldDataPoint = dataPoint;
      }
      else {
        if ( oldDataPoint ) {
          const endBasePoint = this.chartTransform.modelToViewPosition( this.setToBaseline( oldDataPoint ) );
          shape.lineToPoint( endBasePoint );
          shape.close();
          oldDataPoint = null;
        }
        moveToNextPoint = true;
      }


    }

    this.shape = shape.makeImmutable();
  }

  /**
   * Sets the dataSet and redraws the plot. If instead the dataSet array is mutated, it is the client's responsibility
   * to call `update` or make sure `update` is called elsewhere (say, if the chart scrolls in that frame).
   */
  public setDataSet( dataSet: AreaChartDataSet ): void {
    this.dataSet = dataSet;
    this.update();
  }

  // set the baseline value for the area chart
  public setBaseline( baseline: number ): void {
    this.baseline = baseline;
    this.update();
  }

  private setToBaseline( dataPoint: Vector2 ): Vector2 {
    return new Vector2( dataPoint.x, this.baseline );
  }

}
calculusGrapher.register( 'AreaChart', AreaChart );
