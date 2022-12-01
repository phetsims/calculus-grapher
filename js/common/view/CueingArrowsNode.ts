// Copyright 2022, University of Colorado Boulder

/**
 * CueingArrowsNode is a representation of two arrows pointing in opposite direction, often used to provide a cue
 * to the user that a nearby object is draggable
 *
 * @author Martin Veillette
 */

import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import ArrowNode, { ArrowNodeOptions } from '../../../../scenery-phet/js/ArrowNode.js';
import { VBox, VBoxOptions } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';

type SelfOptions = {
  arrowNodeOptions?: ArrowNodeOptions;
};

export type CueingArrowsNodeOptions = SelfOptions & VBoxOptions;

export default class CueingArrowsNode extends VBox {

  public constructor( providedOptions?: CueingArrowsNodeOptions ) {

    const options = optionize<CueingArrowsNodeOptions, SelfOptions, VBoxOptions>()(
      {
        arrowNodeOptions: {
          fill: CalculusGrapherColors.arrowFillProperty,
          stroke: null
        },

        // VBox Options
        spacing: 15
      }, providedOptions );

    // arrow options
    const arrowOptions = combineOptions<ArrowNodeOptions>(
      CalculusGrapherConstants.ARROW_NODE_OPTIONS,
      options.arrowNodeOptions );

    const upArrow = new ArrowNode( 0, 0, 0, -CalculusGrapherConstants.ARROW_LENGTH, arrowOptions );
    const downArrow = new ArrowNode( 0, 0, 0, CalculusGrapherConstants.ARROW_LENGTH, arrowOptions );

    super( combineOptions<VBoxOptions>( {
      children: [ upArrow, downArrow ]
    }, options ) );
  }
}

calculusGrapher.register( 'CueingArrowsNode', CueingArrowsNode );
