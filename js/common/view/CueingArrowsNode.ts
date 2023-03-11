// Copyright 2022-2023, University of Colorado Boulder

/**
 * CueingArrowsNode is a representation of two arrows pointing in opposite direction, often used to provide a cue
 * to the user that a nearby object is draggable
 *
 * @author Martin Veillette
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import { NodeTranslationOptions, VBox, VBoxOptions } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';

const ARROW_LENGTH = 50;
const ARROW_NODE_OPTIONS = {
  fill: CalculusGrapherColors.cueingArrowsFillProperty,
  stroke: null,
  headWidth: 25,
  headHeight: 21,
  tailWidth: 12,
  fractionalHeadHeight: 0.5
};

type SelfOptions = EmptySelfOptions;

type CueingArrowsNodeOptions = SelfOptions & NodeTranslationOptions &
  PickRequired<VBoxOptions, 'tandem' | 'phetioDocumentation' | 'visibleProperty'>;

export default class CueingArrowsNode extends VBox {

  public constructor( providedOptions: CueingArrowsNodeOptions ) {

    const upArrow = new ArrowNode( 0, 0, 0, -ARROW_LENGTH, ARROW_NODE_OPTIONS );
    const downArrow = new ArrowNode( 0, 0, 0, ARROW_LENGTH, ARROW_NODE_OPTIONS );

    const options = optionize<CueingArrowsNodeOptions, SelfOptions, VBoxOptions>()( {

      // VBox Options
      spacing: 15,
      children: [ upArrow, downArrow ],
      pickable: false // performance optimization
    }, providedOptions );

    super( options );
  }
}

calculusGrapher.register( 'CueingArrowsNode', CueingArrowsNode );
