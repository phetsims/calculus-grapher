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
                      providedOptions?: AreaUnderCurvePlotOptions ) {

    const options = optionize<AreaUnderCurvePlotOptions, SelfOptions, NodeOptions>()( {
      // we're setting options.children below
    }, providedOptions );

    const isPositiveFunction: CurvePointFunction = point => point.y > 0;
    const isNegativeFunction: CurvePointFunction = point => point.y < 0;

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

    const positiveAreaPlot = new AreaPlot( chartTransform, getDataSet( isPositiveFunction ), {
      fill: areaUnderCurveScrubber.positiveFillProperty
    } );

    const negativeAreaPlot = new AreaPlot( chartTransform, getDataSet( isNegativeFunction ), {
      fill: areaUnderCurveScrubber.negativeFillProperty
    } );

    options.children = [ positiveAreaPlot, negativeAreaPlot ];

    super( options );

    const updateDataSets = () => {
      positiveAreaPlot.setDataSet( getDataSet( isPositiveFunction ) );
      negativeAreaPlot.setDataSet( getDataSet( isNegativeFunction ) );
    };
    curve.curveChangedEmitter.addListener( updateDataSets );
    xProperty.link( updateDataSets );

    this.addLinkedElement( areaUnderCurveScrubber, {
      tandem: options.tandem.createTandem( areaUnderCurveScrubber.tandem.name )
    } );
  }
}

calculusGrapher.register( 'AreaUnderCurvePlot', AreaUnderCurvePlot );
