// Copyright 2022-2023, University of Colorado Boulder

/**
 * TangentArrowNode is double-headed arrow that represents
 *  the tangent of a curve at a point.
 *
 * @author Martin Veillette
 */

import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import optionize from '../../../../phet-core/js/optionize.js';
import calculusGrapher from '../../calculusGrapher.js';
import ArrowNode, { ArrowNodeOptions } from '../../../../scenery-phet/js/ArrowNode.js';
import AncillaryTool from '../model/AncillaryTool.js';
import { getDerivativeOf, getGraphTypeStrokeProperty, GraphType } from '../model/GraphType.js';

type SelfOptions = {
  arrowLength?: number;
};

export type TangentArrowNodeOptions = SelfOptions & ArrowNodeOptions;

export default class TangentArrowNode extends ArrowNode {

  public constructor( ancillaryTool: AncillaryTool,
                      graphType: GraphType,
                      chartTransform: ChartTransform,
                      providedOptions: TangentArrowNodeOptions ) {

    const derivativeOfGraphType = getDerivativeOf( graphType );

    const options = optionize<TangentArrowNodeOptions, SelfOptions, ArrowNodeOptions>()( {

      // SelfOptions
      arrowLength: 100,

      // ArrowNodeOptions
      fill: getGraphTypeStrokeProperty( derivativeOfGraphType ),
      headWidth: 6,
      headHeight: 6,
      tailWidth: 2,
      fractionalHeadHeight: 0.5,
      stroke: null,
      doubleHead: true
    }, providedOptions );


    // initial arrow is horizontal: middle of the arrow is located at 0,0
    super( -options.arrowLength / 2,
      0,
      options.arrowLength / 2,
      0, options );

    const graphYProperty = ancillaryTool.getYProperty( graphType );
    const derivativeGraphYProperty = ancillaryTool.getYProperty( derivativeOfGraphType );

    // initial angle of the arrow in view coordinates
    let oldTheta = Math.atan( this.tipY / this.tipX );
    const updateArrow = () => {
      const x = ancillaryTool.xProperty.value;
      const y = graphYProperty.value;
      const modelSlope = derivativeGraphYProperty.value;

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

    chartTransform.changedEmitter.addListener( updateArrow );
    ancillaryTool.xProperty.link( updateArrow );
    graphYProperty.link( updateArrow );
    derivativeGraphYProperty.link( updateArrow );
  }
}

calculusGrapher.register( 'TangentArrowNode', TangentArrowNode );
