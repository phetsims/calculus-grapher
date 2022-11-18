// Copyright 2022, University of Colorado Boulder

/**
 * GraphSetRadioButtonGroup is a group of buttons for controlling visibility of a set of graph nodes
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
import { GraphSet } from './CalculusGrapherScreenView.js';

type SelfOptions = EmptySelfOptions;

export type GraphSetRadioButtonGroupOptions = SelfOptions & RectangularRadioButtonGroupOptions;

export default class GraphSetRadioButtonGroup extends RectangularRadioButtonGroup<GraphSet> {

  public constructor( graphsSelectionProperty: Property<GraphSet>,
                      graphSets: GraphSet[],
                      providedOptions: GraphSetRadioButtonGroupOptions ) {

    const options = optionize<GraphSetRadioButtonGroupOptions, SelfOptions, RectangularRadioButtonGroupOptions>()(
      {}, providedOptions );


    assert && assert( graphSets[ 0 ][ 0 ] === 'integral', 'first button matches integral of graph set' );

    // Item for integral radio button
    const integralRadioButtonItem = createItem(
      CurveLabelsNode.getIntegralLabel(),
      graphSets[ 0 ], {
        tandemName: 'integralRadioButton'
      } );

    // Item for integral radio button
    const derivativeRadioButtonItem = createItem(
      CurveLabelsNode.getDerivativeLabel(),
      graphSets[ 1 ], {
        tandemName: 'derivativeRadioButton'
      } );

    super( graphsSelectionProperty, [ integralRadioButtonItem, derivativeRadioButtonItem ], options );
  }
}

type ItemOptions = PickRequired<RectangularRadioButtonGroupItem<GraphSet>, 'tandemName'>;

function createItem( labelNode: Node,
                     value: GraphSet,
                     providedOptions: ItemOptions ): RectangularRadioButtonGroupItem<GraphSet> {

  return {
    createNode: () => labelNode,
    value: value,
    tandemName: providedOptions.tandemName
  };
}

calculusGrapher.register( 'GraphSetRadioButtonGroup', GraphSetRadioButtonGroup );
