// Copyright 2022-2025, University of Colorado Boulder

/**
 * CueingArrowsNode is a representation of two arrows pointing in opposite directions (up and down), used to provide
 * a cue to the user that a nearby object is draggable. In this sim, the cueing arrows are applied to the curve
 * manipulator.
 *
 * @author Martin Veillette
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import GatedVisibleProperty from '../../../../axon/js/GatedVisibleProperty.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import VBox, { VBoxOptions } from '../../../../scenery/js/layout/nodes/VBox.js';
import { NodeTranslationOptions } from '../../../../scenery/js/nodes/Node.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import CalculusGrapherQueryParameters from '../CalculusGrapherQueryParameters.js';
import CurveManipulatorNode from './CurveManipulatorNode.js';

const ARROW_LENGTH = 50;
const ARROW_NODE_OPTIONS = {
  fill: CalculusGrapherColors.cueingArrowsFillProperty,
  stroke: 'rgb( 100, 100, 100 )',
  headWidth: 25,
  headHeight: 21,
  tailWidth: 12,
  fractionalHeadHeight: 0.5
};

type SelfOptions = EmptySelfOptions;

type CueingArrowsNodeOptions = SelfOptions & NodeTranslationOptions &
  PickRequired<VBoxOptions, 'tandem' | 'phetioDocumentation'>;

export default class CueingArrowsNode extends VBox {

  public constructor( curveManipulatorNode: CurveManipulatorNode,
                      chartTransform: ChartTransform,
                      providedOptions: CueingArrowsNodeOptions ) {

    const upArrow = new ArrowNode( 0, 0, 0, -ARROW_LENGTH, ARROW_NODE_OPTIONS );
    const downArrow = new ArrowNode( 0, 0, 0, ARROW_LENGTH, ARROW_NODE_OPTIONS );

    const visibleProperty = new DerivedProperty(
      [ curveManipulatorNode.curveManipulator.wasMovedProperty, curveManipulatorNode.visibleProperty ],
      ( wasMoved, nodeVisible ) => !wasMoved && nodeVisible && CalculusGrapherQueryParameters.cueingArrowsEnabled );

    // Provide PhET-iO clients with the ability to permanently hide the cueing arrows.
    const gatedVisibleProperty = new GatedVisibleProperty( visibleProperty, providedOptions.tandem );

    const options = optionize<CueingArrowsNodeOptions, SelfOptions, VBoxOptions>()( {

      // VBox Options
      isDisposable: false,
      spacing: 32,
      children: [ upArrow, downArrow ],
      pickable: false, // performance optimization
      visibleProperty: gatedVisibleProperty
    }, providedOptions );

    super( options );

    // Center the arrows on the curve manipulator's position.
    curveManipulatorNode.curveManipulator.positionProperty.link( position => {
      this.center = chartTransform.modelToViewPosition( position );
    } );
  }
}

calculusGrapher.register( 'CueingArrowsNode', CueingArrowsNode );