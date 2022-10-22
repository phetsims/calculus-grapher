// Copyright 2022, University of Colorado Boulder

/**
 * GraphsCheckboxGroup is a group of checkboxes for controlling visibility of graph nodes
 *
 * @author Martin Veillette
 */

import RectangularRadioButtonGroup, { RectangularRadioButtonGroupOptions, RectangularRadioButtonGroupItem } from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import calculusGrapher from '../../calculusGrapher.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import Property from '../../../../axon/js/Property.js';
import CurveLabelsNode from './CurveLabelsNode.js';
import { Node } from '../../../../scenery/js/imports.js';

type SelfOptions = EmptySelfOptions;

export type GraphsRectangularRadioButtonGroupOptions = SelfOptions & RectangularRadioButtonGroupOptions;

export default class GraphsRectangularRadioButtonGroup extends RectangularRadioButtonGroup<string> {

  public constructor( graphsSelectionProperty: Property<string>,
                      providedOptions: GraphsRectangularRadioButtonGroupOptions ) {

    const options = optionize<GraphsRectangularRadioButtonGroupOptions, SelfOptions, RectangularRadioButtonGroupOptions>()(
      {}, providedOptions );


    // content array for checkbox items
    const items: RectangularRadioButtonGroupItem<string>[] = [

      // Item for integral radio button
      createItem(
        CurveLabelsNode.getIntegralLabel(),
        'integral', {
          tandemName: 'integralRadioButton'
        } ),

      // Item for first Derivative radio button
      createItem(
        CurveLabelsNode.getDerivativeLabel(),
        'derivative', {
          tandemName: 'derivativeRadioButton'
        } )
    ];

    super( graphsSelectionProperty, items, options );
  }
}

type ItemOptions = PickRequired<RectangularRadioButtonGroupItem<string>, 'tandemName'>;

function createItem( labelNode: Node,
                     value: string,
                     providedOptions: ItemOptions ): RectangularRadioButtonGroupItem<string> {

  return {
    createNode: () => labelNode,
    value: value,
    tandemName: providedOptions.tandemName
  };
}

calculusGrapher.register( 'GraphsRectangularRadioButtonGroup', GraphsRectangularRadioButtonGroup );
