// Copyright 2020-2023, University of Colorado Boulder

/**
 * CurveNode is the view representation of a single Curve, which appears in all screens of the 'Calculus Grapher'
 * simulation. CurveNode is implemented to work for all Curve subtypes, so no CurveNode subtypes are needed.
 *
 * Primary responsibilities are:
 *  - Create a LinePlot from the curve points
 *  - Create a dataSet of curve points that can be consumed by LinePlot
 *  - Update itself when curveChangeEmitter sends a signal
 *  - Create a scatterPlot representing cusps points
 *
 * For the 'Calculus Grapher' sim, the same Curves instances are used throughout the lifetime of the simulation. Thus,
 * CurveNodes persist for the lifetime of the simulation and links are left as-is. See Curve.js for more background.
 *
 * @author Brandon Li
 * @author Martin Veillette
 */

import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import { Color, Node, NodeOptions, ProfileColorProperty, TColor } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import Curve from '../model/Curve.js';
import LinePlot, { LinePlotOptions } from '../../../../bamboo/js/LinePlot.js';
import ScatterPlot, { ScatterPlotOptions } from '../../../../bamboo/js/ScatterPlot.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import CalculusGrapherQueryParameters from '../CalculusGrapherQueryParameters.js';
import CalculusGrapherPreferences from '../model/CalculusGrapherPreferences.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';

type LinePlotDataSet = ( Vector2 | null )[];
type ScatterPlotDataSet = ( Vector2 )[];

type SelfOptions = {

  stroke?: TColor;

  // line plots
  continuousLinePlotOptions?: StrictOmit<LinePlotOptions, 'stroke'>;
  discontinuousLinePlotOptions?: StrictOmit<LinePlotOptions, 'stroke'>;

  // scatter plots
  discontinuousPointsScatterPlotOptions?: StrictOmit<ScatterPlotOptions, 'stroke'>;
  cuspsScatterPlotOptions?: ScatterPlotOptions;
  allPointsScatterPlotOptions?: ScatterPlotOptions;
};

export type CurveNodeOptions = SelfOptions & NodeOptions;

export default class CurveNode extends Node {

  protected readonly continuousLinePlot: LinePlot;
  private readonly discontinuousLinePlot: LinePlot;
  private readonly discontinuousPointsScatterPlot: ScatterPlot;

  // These plots are created conditionally for debugging. See ?allPoints and ?cuspPoints.
  private readonly allPointsScatterPlot?: ScatterPlot;
  private readonly cuspsScatterPlot?: ScatterPlot;

  protected readonly curve: Curve;

  public constructor( curve: Curve, chartTransform: ChartTransform, providedOptions?: CurveNodeOptions ) {

    const options = optionize<CurveNodeOptions, SelfOptions, NodeOptions>()( {

      // SelfOptions
      stroke: 'black',
      continuousLinePlotOptions: {
        lineWidth: 2
      },

      discontinuousLinePlotOptions: {
        lineWidth: 2,
        lineDash: [ 2, 2 ],
        visibleProperty: new DerivedProperty( [ CalculusGrapherPreferences.connectDiscontinuitiesProperty ],
          connectDiscontinuities => connectDiscontinuities === 'dashedLine' )
      },

      discontinuousPointsScatterPlotOptions: {
        fill: null,
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

      // NodeOptions
      phetioVisiblePropertyInstrumented: false

    }, providedOptions );

    super( options );

    this.curve = curve;

    const allPointsScatterPlotDataSet = this.getAllPointsScatterPlotDataSet();
    const cuspsScatterPlotDataSet = this.getCuspsScatterPlotDataSet();
    const discontinuousLinePlotDataSet = this.getDiscontinuousLinePlotDataSet();
    const continuousLinePlotDataSet = this.getContinuousLinePlotDataSet();
    const discontinuousPointScatterPlotDataSet = this.getDiscontinuousPointsScatterPlotDataSet();

    this.continuousLinePlot = new LinePlot( chartTransform, continuousLinePlotDataSet,
      combineOptions<LinePlotOptions>( {
        stroke: options.stroke
      }, options.continuousLinePlotOptions ) );
    this.discontinuousLinePlot = new LinePlot( chartTransform, discontinuousLinePlotDataSet,
      combineOptions<LinePlotOptions>( {
        stroke: options.stroke
      }, options.discontinuousLinePlotOptions ) );
    this.discontinuousPointsScatterPlot = new ScatterPlot( chartTransform, discontinuousPointScatterPlotDataSet,
      combineOptions<ScatterPlotOptions>( {
        stroke: options.stroke
      }, options.discontinuousPointsScatterPlotOptions ) );
    this.addChild( this.continuousLinePlot );
    this.addChild( this.discontinuousLinePlot );
    this.addChild( this.discontinuousPointsScatterPlot );

    if ( CalculusGrapherQueryParameters.allPoints ) {
      this.allPointsScatterPlot = new ScatterPlot( chartTransform, allPointsScatterPlotDataSet, options.allPointsScatterPlotOptions );
      this.addChild( this.allPointsScatterPlot );
    }

    if ( CalculusGrapherQueryParameters.cuspsPoints ) {
      this.cuspsScatterPlot = new ScatterPlot( chartTransform, cuspsScatterPlotDataSet, options.cuspsScatterPlotOptions );
      this.addChild( this.cuspsScatterPlot );
    }

    curve.curveChangedEmitter.addListener( this.updateCurveNode.bind( this ) );

    // If stroke is something we can link to, create a linked element.
    const strokeProperty = options.stroke;
    if ( strokeProperty instanceof ProfileColorProperty ) {
      this.addLinkedElement( strokeProperty, {
        tandem: options.tandem.createTandem( 'stroke' )
      } );
    }
  }

  public reset(): void {
    // GraphNode does not know what specific subclass of CurveNode it creates, so its necessary to have
    // a reset method in the base class, even though it does nothing.
  }

  protected updateCurveNode(): void {
    this.continuousLinePlot.setDataSet( this.getContinuousLinePlotDataSet() );
    this.discontinuousLinePlot.setDataSet( this.getDiscontinuousLinePlotDataSet() );
    this.discontinuousPointsScatterPlot.setDataSet( this.getDiscontinuousPointsScatterPlotDataSet() );
    this.allPointsScatterPlot && this.allPointsScatterPlot.setDataSet( this.getAllPointsScatterPlotDataSet() );
    this.cuspsScatterPlot && this.cuspsScatterPlot.setDataSet( this.getCuspsScatterPlotDataSet() );
  }

  // data set for continuous portion of curve
  private getContinuousLinePlotDataSet(): LinePlotDataSet {
    return this.curve.points.map( ( point, index, points ) => {

      // in the model, a discontinuity is marked by tagging two adjacent points as discontinuous (the real discontinuity is in between the two)
      // we need to insert a null value between two such adjacent points to break the continuous segments.
      // the actual points of the discontinuities are included such that the continuous line goes right up to the discontinuity points.

      const isNextPointWithinRange = index + 1 < points.length;
      if ( isNextPointWithinRange && point.isDiscontinuous && points[ index + 1 ].isDiscontinuous ) {
        return [ point.toVector(), null ];
      }
      else {
        return point.toVector();
      }
    } ).flat();
  }

  // data set for discontinuous line plot (a set of vertical lines)
  private getDiscontinuousLinePlotDataSet(): LinePlotDataSet {
    return this.curve.points.map( point => {

      // In the curve model, a discontinuity tag is never unique but will be tagged for
      // an adjacent pair of points.
      // This ensures that we will have two adjacent vectors in the LinePlotDataSet
      return point.isDiscontinuous ? point.toVector() : null;
    } );
  }

  // data set for discontinuous scatter plot ( sets of circles )
  private getDiscontinuousPointsScatterPlotDataSet(): ScatterPlotDataSet {
    return this.curve.points.filter( point => point.isDiscontinuous )
      .map( point => point.toVector() );
  }

  // data set for cusps points
  private getCuspsScatterPlotDataSet(): ScatterPlotDataSet {
    return this.curve.points.filter( point => point.isCusp )
      .map( point => point.toVector() );
  }

  // data set for all points
  private getAllPointsScatterPlotDataSet(): ScatterPlotDataSet {
    return this.curve.points.map( point => point.toVector() );
  }
}

calculusGrapher.register( 'CurveNode', CurveNode );
