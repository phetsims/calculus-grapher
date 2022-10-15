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
import { Color, Node, NodeOptions, PathOptions } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import Curve from '../model/Curve.js';
import LinePlot from '../../../../bamboo/js/LinePlot.js';
import ScatterPlot from '../../../../bamboo/js/ScatterPlot.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import CalculusGrapherQueryParameters from '../CalculusGrapherQueryParameters.js';

type LinePlotDataSet = ( Vector2 | null )[];
type ScatterPlotDataSet = ( Vector2 )[];

type radiusOptions = {
  radius?: number;
};
type ScatterPlotOptions = radiusOptions & PathOptions;

type SelfOptions = {
  discontinuousPointsScatterPlotOptions?: ScatterPlotOptions;
  cuspsScatterPlotOptions?: ScatterPlotOptions;
  allPointsScatterPlotOptions?: ScatterPlotOptions;
  continuousLinePlotOptions?: PathOptions;
  discontinuousLinePlotOptions?: PathOptions;
};

export type CurveNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'>;

export default class CurveNode extends Node {

  private readonly continuousLinePlot: LinePlot;
  private readonly discontinuousLinePlot: LinePlot;
  private readonly discontinuousPointsScatterPlot: ScatterPlot;
  private readonly allPointsScatterPlot: ScatterPlot;
  private readonly cuspsScatterPlot: ScatterPlot;
  protected readonly curve: Curve;

  public constructor( curve: Curve, chartTransform: ChartTransform,
                      provideOptions?: CurveNodeOptions ) {

    const options = optionize<CurveNodeOptions, SelfOptions, NodeOptions>()( {
      discontinuousPointsScatterPlotOptions: {
        fill: null,
        stroke: Color.MAGENTA,
        lineWidth: 2
      },

      cuspsScatterPlotOptions: {
        fill: Color.BLACK,
        stroke: Color.GREEN,
        lineWidth: 1,
        radius: 2
      },

      allPointsScatterPlotOptions: {
        fill: Color.RED,
        stroke: Color.YELLOW,
        radius: 1
      },

      continuousLinePlotOptions: {
        stroke: CalculusGrapherColors.defaultCurveStrokeProperty,
        lineWidth: 2
      },

      discontinuousLinePlotOptions: {
        stroke: Color.ORANGE,
        lineWidth: 3
      }
    }, provideOptions );

    super( options );

    this.curve = curve;

    const allPointsScatterPlotDataSet = this.getAllPointsScatterPlotDataSet();
    const cuspsScatterPlotDataSet = this.getCuspsScatterPlotDataSet();
    const discontinuousLinePlotDataSet = this.getDiscontinuousLinePlotDataSet();
    const continuousLinePlotDataSet = this.getContinuousLinePlotDataSet();
    const discontinuousPointScatterPlotDataSet = this.getDiscontinuousPointsScatterPlotDataSet();

    this.allPointsScatterPlot = new ScatterPlot( chartTransform, allPointsScatterPlotDataSet, options.allPointsScatterPlotOptions );
    this.cuspsScatterPlot = new ScatterPlot( chartTransform, cuspsScatterPlotDataSet, options.cuspsScatterPlotOptions );
    this.discontinuousPointsScatterPlot = new ScatterPlot( chartTransform, discontinuousPointScatterPlotDataSet, options.discontinuousPointsScatterPlotOptions );
    this.continuousLinePlot = new LinePlot( chartTransform, continuousLinePlotDataSet, options.continuousLinePlotOptions );
    this.discontinuousLinePlot = new LinePlot( chartTransform, discontinuousLinePlotDataSet, options.discontinuousLinePlotOptions );

    this.addChild( this.continuousLinePlot );
    this.addChild( this.discontinuousLinePlot );

    if ( CalculusGrapherQueryParameters.allPoints ) {
      this.addChild( this.allPointsScatterPlot );
    }
    if ( CalculusGrapherQueryParameters.cuspsPoints ) {
      this.addChild( this.cuspsScatterPlot );
    }
    this.addChild( this.discontinuousPointsScatterPlot );


    curve.curveChangedEmitter.addListener( this.updateCurveNode.bind( this ) );
  }

  public updateCurveNode(): void {
    this.discontinuousPointsScatterPlot.setDataSet( this.getDiscontinuousPointsScatterPlotDataSet() );
    this.continuousLinePlot.setDataSet( this.getContinuousLinePlotDataSet() );
    this.discontinuousLinePlot.setDataSet( this.getDiscontinuousLinePlotDataSet() );

    if ( CalculusGrapherQueryParameters.allPoints ) {
      this.allPointsScatterPlot.setDataSet( this.getAllPointsScatterPlotDataSet() );
    }

    if ( CalculusGrapherQueryParameters.cuspsPoints ) {
      this.cuspsScatterPlot.setDataSet( this.getCuspsScatterPlotDataSet() );
    }


  }

  // data set for continuous portion of curve
  private getContinuousLinePlotDataSet(): LinePlotDataSet {
    return this.curve.points.map( ( point, index, points ) => {
      if ( point.isDiscontinuous && index + 1 < points.length ) {
        return [ new Vector2( point.x, point.y ), null ];
      }
      else {
        return new Vector2( point.x, point.y );
      }
    } ).flat();
  }

  // data set for discontinuous line plot (a set of vertical lines)
  private getDiscontinuousLinePlotDataSet(): LinePlotDataSet {
    return this.curve.points.map( point => {
      if ( point.isDiscontinuous ) {
        return new Vector2( point.x, point.y );
      }
      else {
        return null;
      }
    } );
  }

  // data set for discontinuous scatter plot ( sets of circles )
  private getDiscontinuousPointsScatterPlotDataSet(): ScatterPlotDataSet {
    return this.curve.points.filter( point => point.isDiscontinuous )
      .map( point => new Vector2( point.x, point.y ) );
  }

  // data set for cusps points
  private getCuspsScatterPlotDataSet(): ScatterPlotDataSet {
    return this.curve.cusps.map( point => new Vector2( point.x, point.y ) );
  }

  // data set for all points
  private getAllPointsScatterPlotDataSet(): ScatterPlotDataSet {
    return this.curve.points.map( point => new Vector2( point.x, point.y ) );
  }

  public setPointerAreas(): void {
    throw new Error( 'Set Pointer Areas not handled on base class' );
  }
}

calculusGrapher.register( 'CurveNode', CurveNode );
