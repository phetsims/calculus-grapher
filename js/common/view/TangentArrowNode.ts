// Copyright 2022-2023, University of Colorado Boulder

/**
 * TangentArrowNode is double-headed arrow that represents the tangent of a curve at a point.
 *
 * @author Martin Veillette
 */

import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import optionize from '../../../../phet-core/js/optionize.js';
import calculusGrapher from '../../calculusGrapher.js';
import ArrowNode, { ArrowNodeOptions } from '../../../../scenery-phet/js/ArrowNode.js';
import TangentScrubber from '../model/TangentScrubber.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import Multilink from '../../../../axon/js/Multilink.js';

type SelfOptions = {
  arrowLength?: number;
};

export type TangentArrowNodeOptions = SelfOptions & PickRequired<ArrowNodeOptions, 'tandem' | 'visibleProperty'>;

export default class TangentArrowNode extends ArrowNode {

  public constructor( tangentScrubber: TangentScrubber,
                      chartTransform: ChartTransform,
                      providedOptions: TangentArrowNodeOptions ) {

    const options = optionize<TangentArrowNodeOptions, SelfOptions, ArrowNodeOptions>()( {

      // SelfOptions
      arrowLength: 100,

      // ArrowNodeOptions
      fill: tangentScrubber.colorProperty,
      headWidth: 6,
      headHeight: 6,
      tailWidth: 2,
      fractionalHeadHeight: 0.5,
      stroke: null,
      doubleHead: true
    }, providedOptions );

    // initial arrow is horizontal: middle of the arrow is located at 0,0
    super( -options.arrowLength / 2, 0, options.arrowLength / 2, 0, options );

    // initial angle of the arrow in view coordinates
    let oldTheta = Math.atan( this.tipY / this.tipX );
    const updateArrow = () => {
      const x = tangentScrubber.xProperty.value;
      const y = tangentScrubber.yOriginalProperty.value;
      const modelSlope = tangentScrubber.yDerivativeProperty.value;

      // view position for center of the tangent arrow
      const point = chartTransform.modelToViewXY( x, y );

      // must convert slope into viewCoordinates
      // slope is dY/dX: (sign of view slope will have its sign flipped but that is expected)
      const viewSlope = modelSlope * chartTransform.modelToViewDeltaY( 1 ) /
                        chartTransform.modelToViewDeltaX( 1 );
      const thetaView = Math.atan( viewSlope );

      // move this point
      this.translation = point;

      // we rotate this node around in view coordinates, so we use angle in view coordinates
      // thetaView already took into account the fact that we are using an inverted y-axis
      this.rotateAround( point, thetaView - oldTheta );

      // update the value of old theta
      oldTheta = thetaView;
    };

    chartTransform.changedEmitter.addListener( () => updateArrow() );
    Multilink.multilink(
      [ tangentScrubber.xProperty, tangentScrubber.yOriginalProperty, tangentScrubber.yDerivativeProperty ],
      () => updateArrow() );

    this.addLinkedElement( tangentScrubber, {
      tandem: options.tandem.createTandem( tangentScrubber.tandem.name )
    } );
  }
}

calculusGrapher.register( 'TangentArrowNode', TangentArrowNode );
