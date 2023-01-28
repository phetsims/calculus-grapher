// Copyright 2022-2023, University of Colorado Boulder

/**
 * GraphSetRadioButtonGroup is a group of buttons for controlling visibility of a set of graph nodes
 *
 * @author Martin Veillette
 */

import RectangularRadioButtonGroup, { RectangularRadioButtonGroupItem } from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import calculusGrapher from '../../calculusGrapher.js';
import Property from '../../../../axon/js/Property.js';
import GraphType, { GraphSet } from '../model/GraphType.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import RectangularRadioButton from '../../../../sun/js/buttons/RectangularRadioButton.js';
import { AlignGroup } from '../../../../scenery/js/imports.js';
import GraphTypeLabelNode from './GraphTypeLabelNode.js';
import { LabelColorIcon } from './LabelColorIcon.js';
import Tandem from '../../../../tandem/js/Tandem.js';

export type GraphSetRadioButtonGroupItem = RectangularRadioButtonGroupItem<GraphSet>;

export default class GraphSetRadioButtonGroup extends RectangularRadioButtonGroup<GraphSet> {

  public constructor( graphSetProperty: Property<GraphSet>,
                      graphSetRadioButtonGroupItems: GraphSetRadioButtonGroupItem[],
                      tandem: Tandem ) {

    super( graphSetProperty, graphSetRadioButtonGroupItems, {
      spacing: 5,
      radioButtonOptions: {
        baseColor: CalculusGrapherColors.panelFillProperty,
        xMargin: 10,
        yMargin: 10
      },
      tandem: tandem
    } );
  }

  /**
   * Creates an item for this radio button group.
   */
  public static createItem( graphSet: GraphSet, graphType: GraphType, labelAlignGroup: AlignGroup ): GraphSetRadioButtonGroupItem {
    assert && assert( graphSet.includes( graphType ) );
    return {
      createNode: () => new LabelColorIcon( new GraphTypeLabelNode( graphType ), labelAlignGroup, graphType.strokeProperty ),
      value: graphSet,
      tandemName: `${graphType.tandemNamePrefix}${RectangularRadioButton.TANDEM_NAME_SUFFIX}`
    };
  }
}

calculusGrapher.register( 'GraphSetRadioButtonGroup', GraphSetRadioButtonGroup );
