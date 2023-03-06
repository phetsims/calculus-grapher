// Copyright 2020-2023, University of Colorado Boulder

/**
 * CurveNode is the view representation of a single Curve, which appears in all screens of the 'Calculus Grapher'
 * simulation. CurveNode is implemented to work for all Curve subclasses, so no CurveNode subclasses are needed.
 *
 * Primary responsibilities are:
 *  - Create a LinePlot from the curve points
 *  - Create a dataSet of curve points that can be consumed by LinePlot
 *  - Update itself when curveChangeEmitter sends a signal
 *  - Create a scatterPlot representing cusp points
 *
 * For the 'Calculus Grapher' sim, the same Curves instances are used throughout the lifetime of the simulation. Thus,
 * CurveNodes persist for the lifetime of the simulation and links are left as-is. See Curve.js for more background.
 *
 * @author Brandon Li
 * @author Martin Veillette
 */

import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import { Color, Node, NodeOptions, PathBoundsMethod, ProfileColorProperty, TColor } from '../../../../scenery/js/imports.js';
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
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';

// dateset types associated with LinePlot and ScatterPlot
type LinePlotDataSet = ( Vector2 | null )[];
type ScatterPlotDataSet = ( Vector2 )[];

type SelfOptions = {

  // Color used to stroke the curve path.
  stroke: TColor;

  // Line plots
  continuousLinePlotOptions?: StrictOmit<LinePlotOptions, 'stroke'>;
  discontinuousLinePlotOptions?: StrictOmit<LinePlotOptions, 'stroke'>;

  // Scatter plots, with optional plots for debugging
  discontinuousPointsScatterPlotOptions?: StrictOmit<ScatterPlotOptions, 'stroke'>;
  cuspsScatterPlotOptions?: ScatterPlotOptions;
  allPointsScatterPlotOptions?: ScatterPlotOptions;

  // boundsMethod to be used with bamboo plots. Override this where performance optimization is needed.
  // See https://github.com/phetsims/calculus-grapher/issues/210 and https://github.com/phetsims/calculus-grapher/issues/226
  plotBoundsMethod?: PathBoundsMethod;
};

export type CurveNodeOptions = SelfOptions &
  PickOptional<NodeOptions, 'visibleProperty' | 'clipArea' | 'phetioInputEnabledPropertyInstrumented' | 'renderer'> &
  PickRequired<NodeOptions, 'tandem'>;

export default class CurveNode extends Node {

  // The curve that this Node displays
  public readonly curve: Curve;

  // plots
  protected readonly continuousLinePlot: LinePlot;
  private readonly discontinuousLinePlot: LinePlot;
  private readonly discontinuousPointsScatterPlot: ScatterPlot;

  // These plots are created conditionally for debugging. See ?allPoints and ?cuspPoints.
  private readonly allPointsScatterPlot?: ScatterPlot;
  private readonly cuspsScatterPlot?: ScatterPlot;

  public constructor( curve: Curve, chartTransform: ChartTransform, providedOptions: CurveNodeOptions ) {

    const options = optionize<CurveNodeOptions, SelfOptions, NodeOptions>()( {

      // SelfOptions
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
        fill: 'white', //TODO https://github.com/phetsims/calculus-grapher/issues/256 use ChartRectangle.fill
        lineWidth: 2,
        radius: 2.5
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
      plotBoundsMethod: 'accurate'

    }, providedOptions );

    super( options );

    this.curve = curve;

    this.continuousLinePlot = new LinePlot( chartTransform, this.getContinuousLinePlotDataSet(),
      combineOptions<LinePlotOptions>( {
        stroke: options.stroke,
        boundsMethod: options.plotBoundsMethod
      }, options.continuousLinePlotOptions ) );
    this.addChild( this.continuousLinePlot );

    this.discontinuousLinePlot = new LinePlot( chartTransform, this.getDiscontinuousLinePlotDataSet(),
      combineOptions<LinePlotOptions>( {
        stroke: options.stroke,
        boundsMethod: options.plotBoundsMethod
      }, options.discontinuousLinePlotOptions ) );
    this.addChild( this.discontinuousLinePlot );

    this.discontinuousPointsScatterPlot = new ScatterPlot( chartTransform, this.getDiscontinuousPointsScatterPlotDataSet(),
      combineOptions<ScatterPlotOptions>( {
        stroke: options.stroke,
        boundsMethod: options.plotBoundsMethod
      }, options.discontinuousPointsScatterPlotOptions ) );
    this.addChild( this.discontinuousPointsScatterPlot );

    // For debug purposes
    if ( CalculusGrapherQueryParameters.allPoints ) {
      this.allPointsScatterPlot = new ScatterPlot( chartTransform, this.getAllPointsScatterPlotDataSet(), options.allPointsScatterPlotOptions );
      this.addChild( this.allPointsScatterPlot );
    }

    // For debug purposes
    if ( CalculusGrapherQueryParameters.cuspPoints ) {
      this.cuspsScatterPlot = new ScatterPlot( chartTransform, this.getCuspsScatterPlotDataSet(), options.cuspsScatterPlotOptions );
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

    // optional plots, for debugging
    this.allPointsScatterPlot && this.allPointsScatterPlot.setDataSet( this.getAllPointsScatterPlotDataSet() );
    this.cuspsScatterPlot && this.cuspsScatterPlot.setDataSet( this.getCuspsScatterPlotDataSet() );
  }

  // Gets a dataset for continuous portion of curve
  private getContinuousLinePlotDataSet(): LinePlotDataSet {
    const dataSet = [];
    const points = this.curve.points;
    for ( let i = 0; i < points.length; i++ ) {
      const point = points[ i ];
      dataSet.push( point.getVector() );

      //  in the model, a discontinuity is marked by tagging two adjacent points as discontinuous (the real discontinuity is in between the two)
      //  we need to insert a null value between two such adjacent points to break the continuous segments.
      //  the actual points of the discontinuities are included such that the continuous line goes right up to the discontinuity points.
      const isNextPointWithinRange = i + 1 < points.length;
      if ( isNextPointWithinRange && point.isDiscontinuous && points[ i + 1 ].isDiscontinuous ) {
        dataSet.push( null );
      }
    }
    return dataSet;
  }

  // Gets a dataset for discontinuous line plot (a set of vertical lines)
  private getDiscontinuousLinePlotDataSet(): LinePlotDataSet {
    const dataSet = [];
    const points = this.curve.points;
    let previousDataPointWasNull = false;
    for ( let i = 0; i < points.length; i++ ) {
      const point = points[ i ];
      if ( point.isDiscontinuous ) {
        dataSet.push( point.getVector() );
        previousDataPointWasNull = false;
      }
      else if ( !previousDataPointWasNull ) {
        dataSet.push( null );
        previousDataPointWasNull = true;
      }
    }
    return dataSet;
  }

  // Gets a dataset for discontinuous scatter plot ( sets of circles )
  private getDiscontinuousPointsScatterPlotDataSet(): ScatterPlotDataSet {
    const dataSet = [];
    const points = this.curve.points;
    for ( let i = 0; i < points.length; i++ ) {
      const point = points[ i ];
      if ( point.isDiscontinuous ) {
        dataSet.push( point.getVector() );
      }
    }
    return dataSet;
  }

  // Gets a dataset for cusp points
  private getCuspsScatterPlotDataSet(): ScatterPlotDataSet {
    const dataSet = [];
    const points = this.curve.points;
    for ( let i = 0; i < points.length; i++ ) {
      const point = points[ i ];
      if ( point.isCusp ) {
        dataSet.push( point.getVector() );
      }
    }
    return dataSet;
  }

  // Gets a dataset for all points
  private getAllPointsScatterPlotDataSet(): ScatterPlotDataSet {
    return this.curve.points.map( point => point.getVector() );
  }
}

calculusGrapher.register( 'CurveNode', CurveNode );
