// Copyright 2022, University of Colorado Boulder

/**
 * FocusCircle is a representation of a circle located on a curve point.
 * Given an x-position, it positions a circle on the y value of a curve
 *
 * @author Martin Veillette
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import { Circle, CircleOptions } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import Curve from '../model/Curve.js';

type SelfOptions = EmptySelfOptions;

export type FocusPointNodeOptions = SelfOptions & CircleOptions;

export default class FocusCircle extends Circle {

  public constructor( xCoordinateProperty: NumberProperty,
                      curve: Curve,
                      chartTransform: ChartTransform,
                      providedOptions: FocusPointNodeOptions ) {

    const options = optionize<FocusPointNodeOptions, SelfOptions, CircleOptions>()(
      {
        stroke: null,
        fill: 'black',
        radius: 3
      }, providedOptions );

    super( options );


    const updatePosition = () => {

      const x = xCoordinateProperty.value;
      const y = curve.getYAt( x );
      this.center = chartTransform.modelToViewXY( x, y );
    };

    xCoordinateProperty.link( updatePosition );
    chartTransform.changedEmitter.addListener( updatePosition );
    curve.curveChangedEmitter.addListener( updatePosition );
  }
}
calculusGrapher.register( 'FocusCircle', FocusCircle );
