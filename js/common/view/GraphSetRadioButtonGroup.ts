// Copyright 2022, University of Colorado Boulder

/**
 * GraphSetRadioButtonGroup is a group of buttons for controlling visibility of a set of graph nodes
 *
 * @author Martin Veillette
 */

import RectangularRadioButtonGroup, { RectangularRadioButtonGroupItem, RectangularRadioButtonGroupOptions } from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import calculusGrapher from '../../calculusGrapher.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import Property from '../../../../axon/js/Property.js';
import CurveLabelNode from './CurveLabelNode.js';
import { GraphSet, GraphType } from '../model/GraphType.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import RectangularRadioButton from '../../../../sun/js/buttons/RectangularRadioButton.js';

type SelfOptions = EmptySelfOptions;

export type GraphSetRadioButtonGroupOptions = SelfOptions & RectangularRadioButtonGroupOptions;

export type GraphSetRadioButtonGroupItem = RectangularRadioButtonGroupItem<GraphSet>;

export default class GraphSetRadioButtonGroup extends RectangularRadioButtonGroup<GraphSet> {

  public constructor( graphsSelectionProperty: Property<GraphSet>,
                      graphSetRadioButtonGroupItems: GraphSetRadioButtonGroupItem[],
                      providedOptions: GraphSetRadioButtonGroupOptions ) {

    const options = optionize<GraphSetRadioButtonGroupOptions, SelfOptions, RectangularRadioButtonGroupOptions>()( {

      // RectangularRadioButtonGroupOptions
      spacing: 5,
      radioButtonOptions: {
        baseColor: CalculusGrapherColors.panelFillProperty
      }
    }, providedOptions );

    super( graphsSelectionProperty, graphSetRadioButtonGroupItems, options );
  }

  /**
   * Creates an item for this radio button group.
   */
  public static createItem( graphSet: GraphSet, graphType: GraphType ): GraphSetRadioButtonGroupItem {
    assert && assert( graphSet.includes( graphType ) );
    return {
      createNode: tandem => new CurveLabelNode( { graphType: graphType } ),
      value: graphSet,
      tandemName: `${graphType}${RectangularRadioButton.TANDEM_NAME_SUFFIX}`
    };
  }
}

calculusGrapher.register( 'GraphSetRadioButtonGroup', GraphSetRadioButtonGroup );
