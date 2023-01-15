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
import Vector2 from '../../../../dot/js/Vector2.js';
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

    super( -options.arrowLength / 2,
      0,
      options.arrowLength / 2,
      0, options );


    const graphYProperty = ancillaryTool.getYProperty( graphType );
    const derivativeGraphYProperty = ancillaryTool.getYProperty( derivativeOfGraphType );

    // initial theta is zero since the super call is for a horizontal arrow
    let oldTheta = 0;
    const updateArrow = () => {
      const x = ancillaryTool.xProperty.value;
      const y = graphYProperty.value;
      const modelSlope = derivativeGraphYProperty.value;

      // must convert slope into viewCoordinates
      // slope is dY/dX: (sign of view slope will have its sign flipped but that is expected)
      const viewSlope = modelSlope * chartTransform.modelToViewDeltaY( 1 ) /
                        chartTransform.modelToViewDeltaX( 1 );
      const thetaView = Math.atan( viewSlope );

      this.x = chartTransform.modelToViewX( x );
      this.y = chartTransform.modelToViewY( y );

      // we rotate this node around in view coordinate, so we can use the thetaView for this purpose
      this.rotateAround( new Vector2( this.x, this.y ), thetaView - oldTheta );

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
