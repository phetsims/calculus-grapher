// Copyright 2022-2023, University of Colorado Boulder

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
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';

type SelfOptions = {
  arrowNodeOptions?: ArrowNodeOptions;
};

type CueingArrowsNodeOptions = SelfOptions & PickRequired<VBoxOptions, 'tandem'> & StrictOmit<VBoxOptions, 'children'>;

export default class CueingArrowsNode extends VBox {

  public constructor( providedOptions?: CueingArrowsNodeOptions ) {

    const options = optionize<CueingArrowsNodeOptions, SelfOptions, VBoxOptions>()( {

      // SelfOptions
      arrowNodeOptions: {
        fill: CalculusGrapherColors.cueingArrowsFillProperty,
        stroke: null
      },

      // VBox Options
      spacing: 15
    }, providedOptions );

    // arrow options
    const arrowOptions = combineOptions<ArrowNodeOptions>(
      CalculusGrapherConstants.CUEING_ARROW_NODE_OPTIONS,
      options.arrowNodeOptions );

    const upArrow = new ArrowNode( 0, 0, 0, -CalculusGrapherConstants.ARROW_LENGTH, arrowOptions );
    const downArrow = new ArrowNode( 0, 0, 0, CalculusGrapherConstants.ARROW_LENGTH, arrowOptions );

    options.children = [ upArrow, downArrow ];
    super( options );
  }
}

calculusGrapher.register( 'CueingArrowsNode', CueingArrowsNode );
