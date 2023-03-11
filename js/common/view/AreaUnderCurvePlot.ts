// Copyright 2022-2023, University of Colorado Boulder

/**
 * AreaUnderCurvePlot creates two AreaPlots, for positive area and negative area under a curve.
 *
 * @author Martin Veillette
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import { Node, NodeOptions } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import Curve from '../model/Curve.js';
import AreaPlot from '../../../../bamboo/js/AreaPlot.js';
import CurvePoint from '../model/CurvePoint.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import AreaUnderCurveScrubber from '../model/AreaUnderCurveScrubber.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';

type SelfOptions = EmptySelfOptions;

export type AreaUnderCurvePlotOptions = SelfOptions & PickRequired<NodeOptions, 'tandem' | 'visibleProperty'>;

// A function that will be used for filtering points from a dataSet
type CurvePointFunction = ( point: CurvePoint ) => boolean;

export default class AreaUnderCurvePlot extends Node {

  /**
   * @param areaUnderCurveScrubber
   * @param curve - the curve model to which the area plots are added
   * @param chartTransform
   * @param xProperty - the Property that limits the horizontal extent of the area plot
   * @param providedOptions
   */
  public constructor( areaUnderCurveScrubber: AreaUnderCurveScrubber,
                      curve: Curve,
                      chartTransform: ChartTransform,
                      xProperty: TReadOnlyProperty<number>,
                      providedOptions: AreaUnderCurvePlotOptions ) {

    const options = optionize<AreaUnderCurvePlotOptions, SelfOptions, NodeOptions>()( {

      // NodeOptions
      pickable: false // optimization, see https://github.com/phetsims/calculus-grapher/issues/210
    }, providedOptions );

    // A curvePoint function to determine if the y-value of a curvePoint is positive
    const isPositiveFunction: CurvePointFunction = point => point.y > 0;

    // A curvePoint function to determine if the y-value of a curvePoint is negative
    const isNegativeFunction: CurvePointFunction = point => point.y < 0;

    // Function that returns a dataSet, filtered by a curvePointFunction
    // All curve points that have an x-value greater than xProperty are filtered out
    const getDataSet = ( pointFunction: CurvePointFunction ) => {
      return curve.points.map( point => {
        if ( pointFunction( point ) && point.x <= xProperty.value ) {
          return point.getVector();
        }
        else {
          return null;
        }
      } );
    };

    // AreaPlot for the points with positive y values
    const positiveAreaPlot = new AreaPlot( chartTransform, getDataSet( isPositiveFunction ), {
      fill: areaUnderCurveScrubber.positiveFillProperty
    } );

    // AreaPlot for the points with negative y values
    const negativeAreaPlot = new AreaPlot( chartTransform, getDataSet( isNegativeFunction ), {
      fill: areaUnderCurveScrubber.negativeFillProperty
    } );

    options.children = [ positiveAreaPlot, negativeAreaPlot ];

    super( options );

    // Update the plot if its visible
    const updateDataSets = () => {
      if ( this.visible ) {
        positiveAreaPlot.setDataSet( getDataSet( isPositiveFunction ) );
        negativeAreaPlot.setDataSet( getDataSet( isNegativeFunction ) );
      }
    };
    curve.curveChangedEmitter.addListener( updateDataSets );
    xProperty.link( updateDataSets );

    // Update when this plot becomes visible
    this.visibleProperty.link( visible => {
      visible && updateDataSets();
    } );

    this.addLinkedElement( areaUnderCurveScrubber, {
      tandem: options.tandem.createTandem( areaUnderCurveScrubber.tandem.name )
    } );
  }
}

calculusGrapher.register( 'AreaUnderCurvePlot', AreaUnderCurvePlot );
