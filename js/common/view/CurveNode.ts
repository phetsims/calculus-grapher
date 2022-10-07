// Copyright 2020-2022, University of Colorado Boulder

/**
 * CurveNode is the view representation of a single Curve, which appears in all screens of the 'Calculus Grapher'
 * simulation. CurveNode is implemented to work for all Curve subtypes, so no CurveNode subtypes are needed.
 *
 * Primary responsibilities are:
 *  - Create a LinePlot from the curve points
 *  - Create a dataSet of curve points that can be consumed by LinePlot
 *  - Update itself when curveChangeEmitter sends a signal
 *  - Create a scatterPlot representing cusps points
 *  - Create a
 *
 * For the 'Calculus Grapher' sim, the same Curves instances are used throughout the lifetime of the simulation. Thus,
 * CurveNodes persist for the lifetime of the simulation and links are left as-is. See Curve.js for more background.
 *
 * @author Brandon Li
 */

import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { Node, NodeOptions, PathOptions, TColor } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import Curve from '../model/Curve.js';
import LinePlot from '../../../../bamboo/js/LinePlot.js';
import ScatterPlot from '../../../../bamboo/js/ScatterPlot.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';

type LinePlotDataSet = ( Vector2 | null )[];
type ScatterPlotDataSet = ( Vector2 )[];

type SelfOptions = {
  scatterPlotOptions?: {
    fill: TColor;
    stroke: TColor;
    lineWidth: number;
  };
  linePlotOptions?: PathOptions;
};

export type CurveNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'>;

export default class CurveNode extends Node {

  protected readonly linePlot: LinePlot;
  protected readonly curve: Curve;
  protected readonly scatterPlot: ScatterPlot;

  public constructor( curve: Curve, chartTransform: ChartTransform,
                      provideOptions?: CurveNodeOptions ) {

    const options = optionize<CurveNodeOptions, SelfOptions, NodeOptions>()( {
      scatterPlotOptions: {
        fill: null,
        stroke: 'green',
        lineWidth: 1
      },

      linePlotOptions: {
        stroke: CalculusGrapherColors.defaultCurveStrokeProperty,
        lineWidth: 2
      }
    }, provideOptions );

    super( options );

    this.curve = curve;

    const linePlotDataSet = this.getLinePlotDataSet();
    const scatterPlotDataSet = this.getScatterPlotDataSet();

    this.scatterPlot = new ScatterPlot( chartTransform, scatterPlotDataSet, options.scatterPlotOptions );
    this.linePlot = new LinePlot( chartTransform, linePlotDataSet, options.linePlotOptions );

    // this.addChild( this.scatterPlot );
    this.addChild( this.linePlot );

    curve.curveChangedEmitter.addListener( this.updateCurveNode.bind( this ) );

  }

  protected updateCurveNode(): void {
    this.scatterPlot.setDataSet( this.getScatterPlotDataSet() );
    this.linePlot.setDataSet( this.getLinePlotDataSet() );
  }

  private getScatterPlotDataSet(): ScatterPlotDataSet {
    return this.curve.cusps.map( point => new Vector2( point.x, point.y ) );
  }

  private getLinePlotDataSet(): LinePlotDataSet {
    return this.curve.points.map( point => new Vector2( point.x, point.y ) );
  }
}

calculusGrapher.register( 'CurveNode', CurveNode );
