// Copyright 2022-2023, University of Colorado Boulder

/**
 * TangentArrowNode is a double-headed arrow that represents the tangent of the original curve at a point.
 * It updates its angle and position, based on the tangentScrubber model.
 *
 *  @author Martin Veillette
 */

import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import optionize from '../../../../phet-core/js/optionize.js';
import calculusGrapher from '../../calculusGrapher.js';
import ArrowNode, { ArrowNodeOptions } from '../../../../scenery-phet/js/ArrowNode.js';
import TangentScrubber from '../model/TangentScrubber.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import Multilink from '../../../../axon/js/Multilink.js';

type SelfOptions = {

  // Length from tip to tip, in view coordinates
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
      headWidth: 10,
      headHeight: 10,
      tailWidth: 2,
      fractionalHeadHeight: 0.5,
      stroke: null,
      doubleHead: true,
      pickable: false // optimization, see https://github.com/phetsims/calculus-grapher/issues/210
    }, providedOptions );

    // Initial arrow is horizontal: the middle of the arrow is located at 0,0
    super( -options.arrowLength / 2, 0, options.arrowLength / 2, 0, options );

    // Initial angle of the arrow in view coordinates
    let oldTheta = Math.atan( this.tipY / this.tipX );

    // Updates the position and orientation of the arrow if this Node is visible.
    // The double-headed arrow pivots around its center.
    const updateArrow = () => {
      if ( this.visible ) {
        const x = tangentScrubber.originalCurvePointProperty.value.x;
        const y = tangentScrubber.originalCurvePointProperty.value.y;
        const modelSlope = tangentScrubber.derivativeCurvePointProperty.value.y;

        // View position for the center of the tangent arrow
        const point = chartTransform.modelToViewXY( x, y );

        // We must convert the slope into viewCoordinates
        // Slope is dY/dX: (sign of viewSlope will have its sign flipped but that is expected)
        const viewSlope = modelSlope * chartTransform.modelToViewDeltaY( 1 ) /
                          chartTransform.modelToViewDeltaX( 1 );
        const thetaView = Math.atan( viewSlope );

        // Moves this point
        this.translation = point;

        // We rotate this node around in view coordinates, so model angles must be reversed
        // Fortunately thetaView already takes into account the fact that we are using an inverted y-axis
        this.rotateAround( point, thetaView - oldTheta );

        // Updates the value of old theta
        oldTheta = thetaView;
      }
    };

    // Update when this Node becomes visible.
    this.visibleProperty.link( visible => {
      visible && updateArrow();
    } );

    chartTransform.changedEmitter.addListener( () => updateArrow() );
    Multilink.multilink(
      [ tangentScrubber.xProperty, tangentScrubber.originalCurvePointProperty, tangentScrubber.derivativeCurvePointProperty ],
      () => updateArrow() );

    this.addLinkedElement( tangentScrubber, {
      tandem: options.tandem.createTandem( tangentScrubber.tandem.name )
    } );
  }
}

calculusGrapher.register( 'TangentArrowNode', TangentArrowNode );
