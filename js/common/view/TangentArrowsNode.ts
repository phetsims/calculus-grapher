// Copyright 2022, University of Colorado Boulder

/**
 * TangentArrowsNode is double-headed arrow that represents
 *  the tangent of the original curve at a point.
 *
 * @author Martin Veillette
 */

import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import { Node, NodeOptions } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import ArrowNode, { ArrowNodeOptions } from '../../../../scenery-phet/js/ArrowNode.js';
import AncillaryTools from '../model/AncillaryTools.js';

type SelfOptions = {
  arrowNodeOptions?: ArrowNodeOptions;
};

export type TangentArrowsNodeOptions = SelfOptions & NodeOptions;

export default class TangentArrowsNode extends Node {

  public constructor( ancillaryTools: AncillaryTools,
                      chartTransform: ChartTransform,
                      providedOptions: TangentArrowsNodeOptions ) {

    const options = optionize<TangentArrowsNodeOptions, SelfOptions, NodeOptions>()(
      {
        arrowNodeOptions: {
          fill: CalculusGrapherColors.arrowFillProperty,
          stroke: null,
          doubleHead: true
        }
      }, providedOptions );

    // arrow options
    const arrowOptions = combineOptions<ArrowNodeOptions>(
      CalculusGrapherConstants.ARROW_NODE_OPTIONS,
      options.arrowNodeOptions );

    const doubleHeadedArrowNode = new ArrowNode(
      -CalculusGrapherConstants.ARROW_LENGTH / 2,
      0,
      CalculusGrapherConstants.ARROW_LENGTH / 2,
      0, arrowOptions );

    options.children = [ doubleHeadedArrowNode ];

    const updateArrow = () => {
      const x = ancillaryTools.xCoordinateProperty.value;
      const y = ancillaryTools.originalProperty.value;
      const m = ancillaryTools.tangentProperty.value;

      const theta = Math.atan( m );
      doubleHeadedArrowNode.center = chartTransform.modelToViewXY( x, y );
      doubleHeadedArrowNode.rotateAround( doubleHeadedArrowNode.center, theta );
    };

    chartTransform.changedEmitter.addListener( updateArrow );
    ancillaryTools.xCoordinateProperty.link( updateArrow );
    ancillaryTools.tangentProperty.link( updateArrow );
    ancillaryTools.originalProperty.link( updateArrow );

    super( options );
  }
}

calculusGrapher.register( 'TangentArrowsNode', TangentArrowsNode );
