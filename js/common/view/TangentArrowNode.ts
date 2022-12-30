// Copyright 2022, University of Colorado Boulder

/**
 * TangentArrowNode is double-headed arrow that represents
 *  the tangent of the original curve at a point.
 *
 * @author Martin Veillette
 */

import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import optionize from '../../../../phet-core/js/optionize.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import ArrowNode, { ArrowNodeOptions } from '../../../../scenery-phet/js/ArrowNode.js';
import AncillaryTool from '../model/AncillaryTool.js';
import Vector2 from '../../../../dot/js/Vector2.js';

type SelfOptions = {
  arrowLength?: number;
};

export type TangentArrowNodeOptions = SelfOptions & ArrowNodeOptions;

export default class TangentArrowNode extends ArrowNode {

  public constructor( ancillaryTool: AncillaryTool,
                      chartTransform: ChartTransform,
                      providedOptions: TangentArrowNodeOptions ) {

    const options = optionize<TangentArrowNodeOptions, SelfOptions, ArrowNodeOptions>()(
      {
        arrowLength: 100,
        fill: CalculusGrapherColors.derivativeCurveStrokeProperty,
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

    // initial theta is zero since the super call is for a horizontal arrow
    let oldTheta = 0;
    const updateArrow = () => {
      const x = ancillaryTool.xProperty.value;
      const y = ancillaryTool.yOriginalProperty.value;
      const m = ancillaryTool.yDerivativeProperty.value;
      const theta = Math.atan( m );
      this.x = chartTransform.modelToViewX( x );
      this.y = chartTransform.modelToViewY( y );

      // y is positive as one goes down in the view so the rotation must be reversed
      this.rotateAround( new Vector2( this.x, this.y ), -( theta - oldTheta ) );

      // update the value of old theta
      oldTheta = theta;
    };

    chartTransform.changedEmitter.addListener( updateArrow );
    ancillaryTool.xProperty.link( updateArrow );
    ancillaryTool.yDerivativeProperty.link( updateArrow );
    ancillaryTool.yOriginalProperty.link( updateArrow );
  }
}

calculusGrapher.register( 'TangentArrowNode', TangentArrowNode );
