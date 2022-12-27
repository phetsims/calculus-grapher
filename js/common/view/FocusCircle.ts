// Copyright 2022, University of Colorado Boulder

/**
 * FocusCircle is a representation of a circle located at (x,y).
 *
 * @author Martin Veillette
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import { Circle, CircleOptions } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';

type SelfOptions = EmptySelfOptions;

export type FocusPointNodeOptions = SelfOptions & CircleOptions;

export default class FocusCircle extends Circle {

  public constructor( xCoordinateProperty: TReadOnlyProperty<number>,
                      yCoordinateProperty: TReadOnlyProperty<number>,
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
      const y = yCoordinateProperty.value;
      this.center = chartTransform.modelToViewXY( x, y );
    };

    xCoordinateProperty.link( updatePosition );
    yCoordinateProperty.link( updatePosition );
    chartTransform.changedEmitter.addListener( updatePosition );

  }
}
calculusGrapher.register( 'FocusCircle', FocusCircle );
