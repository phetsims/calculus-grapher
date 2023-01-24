// Copyright 2022-2023, University of Colorado Boulder

/**
 * AreaPlot is a plot that combines a line plot and a bar plot. An area plot is distinguished from a line plot by
 * the addition of shading between lines and a baseline, like in a bar plot.
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

export type AreaChartDataSet = ( Vector2 | null )[];

type SelfOptions = {
  baseline?: number; // y-value representing the foundation of the plot
};

export type AreaChartOptions = SelfOptions & PathOptions;

export default class AreaPlot extends Path {

  // if you change this directly, you are responsible for calling update
  public dataSet: AreaChartDataSet;

  // a y-value that serves as foundation for the area plot.
  public baseline: number;

  private chartTransform: ChartTransform;
  private readonly disposeAreaChart: () => void;

  public constructor( chartTransform: ChartTransform,
                      dataSet: AreaChartDataSet,
                      providedOptions?: AreaChartOptions ) {

    const options = optionize<AreaChartOptions, SelfOptions, PathOptions>()( {

      // SelfOptions
      baseline: 0,

      // PathOptions
      fill: 'black'
    }, providedOptions );

    super( null, options );

    this.chartTransform = chartTransform;
    this.dataSet = dataSet;
    this.baseline = options.baseline;

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

      if ( dataPoint ) {
        const viewPoint = this.chartTransform.modelToViewPosition( dataPoint );

        if ( moveToNextPoint ) {

          // basePoint for the shape
          const startBasePoint = this.chartTransform.modelToViewXY( dataPoint.x, this.baseline );
          shape.moveToPoint( startBasePoint );

          // move to the actual data point
          shape.lineToPoint( viewPoint );
          moveToNextPoint = false;
        }
        else {

          shape.lineToPoint( viewPoint );
        }

        // keep a record of the last datapoint
        oldDataPoint = dataPoint;
      }
      else {

        // if oldDataPoint exists, it must be the first null value of dataPoint,
        if ( oldDataPoint ) {

          // go straight down to baseline using the last valid value and close the shape.
          this.closeShape( oldDataPoint, shape );
        }

        // set oldDataPoint to null
        oldDataPoint = null;

        moveToNextPoint = true;
      }
    }

    // close the shape associated with the last point (if non-null)
    if ( oldDataPoint ) {
      this.closeShape( oldDataPoint, shape );
    }

    this.shape = shape.makeImmutable();
  }

  /**
   * Given a point and a shape, first go to the baseline of the point and then close the shape.
   */
  private closeShape( dataPoint: Vector2, shape: Shape ): void {
    const endBasePoint = this.chartTransform.modelToViewXY( dataPoint.x, this.baseline );
    shape.lineToPoint( endBasePoint );
    shape.close();
  }

  /**
   * Sets the dataSet and redraws the plot. If instead the dataSet array is mutated, it is the client's responsibility
   * to call `update` or make sure `update` is called elsewhere (say, if the chart scrolls in that frame).
   */
  public setDataSet( dataSet: AreaChartDataSet ): void {
    this.dataSet = dataSet;
    this.update();
  }

  /**
   * Sets the baseline value for the area plot.
   */
  public setBaseline( baseline: number ): void {
    this.baseline = baseline;
    this.update();
  }
}
calculusGrapher.register( 'AreaPlot', AreaPlot );
