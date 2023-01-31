// Copyright 2022-2023, University of Colorado Boulder

/**
 * PlottedPoint is a representation of a point located at (x,y) in model Coordinates.
 * A chartTransform is used to convert from model position to view.
 * It is responsible for updating its position
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import { Circle, CircleOptions } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';

type SelfOptions = EmptySelfOptions;

export type PlottedPointOptions = SelfOptions & PickOptional<CircleOptions, 'fill' | 'visibleProperty' | 'tandem'>;

export default class PlottedPoint extends Circle {

  public constructor( xProperty: TReadOnlyProperty<number>,
                      yProperty: TReadOnlyProperty<number>,
                      chartTransform: ChartTransform,
                      providedOptions: PlottedPointOptions ) {

    const options = optionize<PlottedPointOptions, SelfOptions, CircleOptions>()( {

      // CircleOptions
      stroke: null,
      fill: 'black',
      radius: 4
    }, providedOptions );

    super( options );

    const updatePosition = () => {

      const x = xProperty.value;
      const y = yProperty.value;
      this.center = chartTransform.modelToViewXY( x, y );
    };

    xProperty.link( updatePosition );
    yProperty.link( updatePosition );
    chartTransform.changedEmitter.addListener( updatePosition );
  }
}
calculusGrapher.register( 'PlottedPoint', PlottedPoint );
