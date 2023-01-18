// Copyright 2022-2023, University of Colorado Boulder

/**
 * ShadedAreaChart is scenery class that creates two shaded area charts, one for the positive and the other
 * for the negative.
 *
 * @author Martin Veillette
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import { Node, NodeOptions } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import Curve from '../model/Curve.js';
import AreaPlot from './AreaPlot.js';
import CurvePoint from '../model/CurvePoint.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import AreaUnderCurveTool from '../model/AreaUnderCurveTool.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';

type SelfOptions = EmptySelfOptions;

export type ShadedAreaChartOptions = SelfOptions & PickRequired<NodeOptions, 'tandem' | 'visibleProperty'>;

type CurvePointFunction = ( point: CurvePoint ) => boolean;

export default class ShadedAreaChart extends Node {

  /**
   * @param areaUnderCurveTool
   * @param curve - the curve model to which the area charts are added
   * @param chartTransform
   * @param xProperty - the Property that limits the horizontal extent of the area plot
   * @param providedOptions
   */
  public constructor( areaUnderCurveTool: AreaUnderCurveTool,
                      curve: Curve,
                      chartTransform: ChartTransform,
                      xProperty: TReadOnlyProperty<number>,
                      providedOptions?: ShadedAreaChartOptions ) {

    const options = optionize<ShadedAreaChartOptions, SelfOptions, NodeOptions>()( {
      // we're setting options.children below
    }, providedOptions );

    const isPositiveFunction: CurvePointFunction = point => point.y > 0;
    const isNegativeFunction: CurvePointFunction = point => point.y < 0;

    const getDataSet = ( pointFunction: CurvePointFunction ) => {
      return curve.points.map( point => {
        if ( pointFunction( point ) && point.x < xProperty.value ) {
          return point.toVector();
        }
        else {
          return null;
        }
      } );
    };

    const positiveAreaPlot = new AreaPlot( chartTransform, getDataSet( isPositiveFunction ), {
      fill: areaUnderCurveTool.positiveFillProperty
    } );

    const negativeAreaPlot = new AreaPlot( chartTransform, getDataSet( isNegativeFunction ), {
      fill: areaUnderCurveTool.negativeFillProperty
    } );

    options.children = [ positiveAreaPlot, negativeAreaPlot ];

    super( options );

    const updateDataSets = () => {
      positiveAreaPlot.setDataSet( getDataSet( isPositiveFunction ) );
      negativeAreaPlot.setDataSet( getDataSet( isNegativeFunction ) );
    };
    curve.curveChangedEmitter.addListener( updateDataSets );
    xProperty.link( updateDataSets );

    this.addLinkedElement( areaUnderCurveTool, {
      tandem: options.tandem.createTandem( areaUnderCurveTool.tandem.name )
    } );
  }
}

calculusGrapher.register( 'ShadedAreaChart', ShadedAreaChart );
