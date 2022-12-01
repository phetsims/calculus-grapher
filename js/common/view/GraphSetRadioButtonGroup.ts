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
import CurveLabelNode from './CurveLabelNode.js';
import { Node } from '../../../../scenery/js/imports.js';
import { GraphSet } from '../model/GraphType.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';

type SelfOptions = EmptySelfOptions;

export type GraphSetRadioButtonGroupOptions = SelfOptions & RectangularRadioButtonGroupOptions;

export default class GraphSetRadioButtonGroup extends RectangularRadioButtonGroup<GraphSet> {

  public constructor( graphsSelectionProperty: Property<GraphSet>,
                      graphSets: GraphSet[],
                      providedOptions: GraphSetRadioButtonGroupOptions ) {

    const options = optionize<GraphSetRadioButtonGroupOptions, SelfOptions, RectangularRadioButtonGroupOptions>()(
      {

        // RectangularRadioButtonGroupOptions
        spacing: 5,
        radioButtonOptions: {
          baseColor: CalculusGrapherColors.panelFillProperty
        }
      }, providedOptions );

    assert && assert( graphSets[ 0 ][ 0 ] === 'integral', 'first button matches integral of graph set' );

    // Item for integral radio button
    const integralRadioButtonItem = createItem(
      new CurveLabelNode( { graphType: 'integral' } ),
      graphSets[ 0 ], {
        tandemName: 'integralRadioButton'
      } );

    // Item for derivative radio button
    const derivativeRadioButtonItem = createItem(
      new CurveLabelNode( { graphType: 'derivative' } ),
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
