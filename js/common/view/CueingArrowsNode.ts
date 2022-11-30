// Copyright 2022, University of Colorado Boulder

/**
 * CueingArrowsNode is a representation of two arrows pointing in opposite direction, often used to provide a cue
 * to the user that a nearby object is draggable
 *
 * @author Martin Veillette
 */

import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import ArrowNode, { ArrowNodeOptions } from '../../../../scenery-phet/js/ArrowNode.js';
import { Node, NodeOptions, TColor, VBox } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';

type SelfOptions = {
  fill?: TColor; // {Color|string} background fill
  stroke?: TColor; // {Color|string} background stroke
};

export type CueingArrowsNodeOptions = SelfOptions & NodeOptions;

export default class CueingArrowsNode extends Node {

  public constructor( providedOptions?: CueingArrowsNodeOptions ) {

    const options = optionize<CueingArrowsNodeOptions, SelfOptions, NodeOptions>()(
      {
        fill: CalculusGrapherColors.arrowFillProperty,
        stroke: null
      }, providedOptions );

    // arrow options
    const arrowOptions = combineOptions<ArrowNodeOptions>( {
        fill: options.fill,
        stroke: options.stroke
      }, CalculusGrapherConstants.ARROW_NODE_OPTIONS
    );

    const upArrow = new ArrowNode( 0, 0, 0, -CalculusGrapherConstants.ARROW_LENGTH, arrowOptions );
    const downArrow = new ArrowNode( 0, 0, 0, CalculusGrapherConstants.ARROW_LENGTH, arrowOptions );

    options.children = [ new VBox( {
      children: [ upArrow, downArrow ],
      spacing: 5
    } ) ];

    super( options );
  }
}

calculusGrapher.register( 'CueingArrowsNode', CueingArrowsNode );
