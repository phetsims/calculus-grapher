// Copyright 2023, University of Colorado Boulder

//TODO https://github.com/phetsims/bamboo/issues/63 replace with ScatterPlot when it works correctly with fill and stroke
/**
 * DiscontinuousPointsPlot plots discontinuity points for a curve. We wanted to use ScatterPlot here, but it has
 * problems drawing points that overlap. So this implementation is essentially a workaround. It uses scenery.Circle
 * to draw each point. Note that this is not a scalable approach, so not appropriate for bamboo. But the number of
 * discontinuity points is relatively small, so it's an acceptable workaround/trade-off for this sim.
 * See https://github.com/phetsims/calculus-grapher/issues/256 and https://github.com/phetsims/bamboo/issues/63.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import { Circle, CircleOptions, Node, PathOptions, TPaint } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';

// These are specific to Calculus Grapher, and not appropriate if migrated to bamboo.
const RADIUS = 2.5;
const LINE_WIDTH = 2;

type SelfOptions = PickOptional<CircleOptions, 'fill' | 'stroke' | 'boundsMethod'>;

export type DiscontinuousPointsPlotOptions = SelfOptions;

export default class DiscontinuousPointsPlot extends Node {

  private chartTransform: ChartTransform;
  private dataSet: Vector2[];
  private readonly fill: TPaint;
  private readonly stroke: TPaint;
  private readonly circles: Circle[];
  private readonly circlesParent: Node;

  private readonly disposeDiscontinuousPointsPlot: () => void;

  public constructor( chartTransform: ChartTransform, dataSet: Vector2[], providedOptions?: DiscontinuousPointsPlotOptions ) {

    const options = optionize<DiscontinuousPointsPlotOptions, SelfOptions, PathOptions>()( {

      // SelfOptions
      fill: 'white',
      stroke: 'black',
      boundsMethod: 'accurate'
    }, providedOptions );

    super( options );

    this.chartTransform = chartTransform;
    this.dataSet = dataSet;
    this.fill = options.fill;
    this.stroke = options.stroke;
    this.circles = [];

    this.circlesParent = new Node();
    this.addChild( this.circlesParent );

    // Initialize
    this.update();

    // Update when the transform changes.
    const changedListener = () => this.update();
    chartTransform.changedEmitter.addListener( changedListener );

    this.disposeDiscontinuousPointsPlot = () => {
      if ( chartTransform.changedEmitter.hasListener( changedListener ) ) {
        chartTransform.changedEmitter.removeListener( changedListener );
      }
    };
  }

  /**
   * Sets the dataSet and redraws the plot.
   */
  public setDataSet( dataSet: Vector2[] ): void {
    this.dataSet = dataSet;
    this.update();
  }

  // Redraws the plot.
  private update(): void {

    const numberOfPoints = this.dataSet.length;

    // Remove unneeded Circles from the beginning of the array
    if ( this.circles.length > numberOfPoints ) {
      this.circles.splice( 0, this.circles.length - numberOfPoints );
    }

    for ( let i = 0; i < numberOfPoints; i++ ) {

      const modelPoint = this.dataSet[ i ];
      assert && assert( modelPoint.isFinite(), 'dataSet must contain finite points' );

      const viewPoint = this.chartTransform.modelToViewPosition( modelPoint );

      if ( i > this.circles.length - 1 ) {

        // Create a new Circle
        this.circles.push( new Circle( {
          radius: RADIUS,
          lineWidth: LINE_WIDTH,
          translation: viewPoint,
          fill: this.fill,
          stroke: this.stroke
        } ) );
      }
      else {

        // Reposition an existing Circle
        this.circles[ i ].translation = viewPoint;
      }
    }

    this.circlesParent.children = this.circles;
  }

  public override dispose(): void {
    this.disposeDiscontinuousPointsPlot();
    super.dispose();
  }
}

calculusGrapher.register( 'DiscontinuousPointsPlot', DiscontinuousPointsPlot );