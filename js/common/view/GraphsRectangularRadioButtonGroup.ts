// Copyright 2022, University of Colorado Boulder

/**
 * GraphsRectangularRadioButtonGroup is a group of buttons for controlling visibility of graph nodes
 *
 * @author Martin Veillette
 */

import RectangularRadioButtonGroup, { RectangularRadioButtonGroupItem, RectangularRadioButtonGroupOptions } from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import calculusGrapher from '../../calculusGrapher.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import Property from '../../../../axon/js/Property.js';
import CurveLabelsNode from './CurveLabelsNode.js';
import { Node } from '../../../../scenery/js/imports.js';
import { GraphChoice, GraphChoices } from './CalculusGrapherScreenView.js';

type SelfOptions = EmptySelfOptions;

export type GraphsRectangularRadioButtonGroupOptions = SelfOptions & RectangularRadioButtonGroupOptions;

export default class GraphsRectangularRadioButtonGroup extends RectangularRadioButtonGroup<GraphChoice> {

  public constructor( graphsSelectionProperty: Property<GraphChoice>,
                      graphsChoices: GraphChoices,
                      providedOptions: GraphsRectangularRadioButtonGroupOptions ) {

    const options = optionize<GraphsRectangularRadioButtonGroupOptions, SelfOptions, RectangularRadioButtonGroupOptions>()(
      {}, providedOptions );


    // content array for items in radio button group
    const items: RectangularRadioButtonGroupItem<GraphChoice>[] = [

      // Item for integral radio button
      createItem(
        CurveLabelsNode.getIntegralLabel(),
        graphsChoices[ 0 ], {
          tandemName: 'integralRadioButton'
        } ),

      // Item for first Derivative radio button
      createItem(
        CurveLabelsNode.getDerivativeLabel(),
        graphsChoices[ 1 ], {
          tandemName: 'derivativeRadioButton'
        } )
    ];

    super( graphsSelectionProperty, items, options );
  }
}

type ItemOptions = PickRequired<RectangularRadioButtonGroupItem<GraphChoice>, 'tandemName'>;

function createItem( labelNode: Node,
                     value: GraphChoice,
                     providedOptions: ItemOptions ): RectangularRadioButtonGroupItem<GraphChoice> {

  return {
    createNode: () => labelNode,
    value: value,
    tandemName: providedOptions.tandemName
  };
}

calculusGrapher.register( 'GraphsRectangularRadioButtonGroup', GraphsRectangularRadioButtonGroup );
