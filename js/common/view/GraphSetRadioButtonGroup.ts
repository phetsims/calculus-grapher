// Copyright 2022-2023, University of Colorado Boulder

/**
 * GraphSetRadioButtonGroup is a group of buttons for controlling visibility of a set of graph nodes
 *
 * @author Martin Veillette
 */

import RectangularRadioButtonGroup, { RectangularRadioButtonGroupItem, RectangularRadioButtonGroupOptions } from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import calculusGrapher from '../../calculusGrapher.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import Property from '../../../../axon/js/Property.js';
import { getGraphTypeStrokeProperty, GraphSet, GraphType } from '../model/GraphType.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import RectangularRadioButton from '../../../../sun/js/buttons/RectangularRadioButton.js';
import { AlignGroup } from '../../../../scenery/js/imports.js';
import GraphTypeLabelNode from './GraphTypeLabelNode.js';
import { LabelColorIcon } from './LabelColorIcon.js';

type SelfOptions = EmptySelfOptions;

type GraphSetRadioButtonGroupOptions = SelfOptions & RectangularRadioButtonGroupOptions;

export type GraphSetRadioButtonGroupItem = RectangularRadioButtonGroupItem<GraphSet>;

export default class GraphSetRadioButtonGroup extends RectangularRadioButtonGroup<GraphSet> {

  public constructor( graphsSelectionProperty: Property<GraphSet>,
                      graphSetRadioButtonGroupItems: GraphSetRadioButtonGroupItem[],
                      providedOptions: GraphSetRadioButtonGroupOptions ) {

    const options = optionize<GraphSetRadioButtonGroupOptions, SelfOptions, RectangularRadioButtonGroupOptions>()( {

      // RectangularRadioButtonGroupOptions
      spacing: 5,
      radioButtonOptions: {
        baseColor: CalculusGrapherColors.panelFillProperty,
        xMargin: 10,
        yMargin: 10
      }
    }, providedOptions );

    super( graphsSelectionProperty, graphSetRadioButtonGroupItems, options );
  }

  /**
   * Creates an item for this radio button group.
   */
  public static createItem( graphSet: GraphSet, graphType: GraphType, labelAlignGroup: AlignGroup ): GraphSetRadioButtonGroupItem {
    assert && assert( graphSet.includes( graphType ) );
    return {
      createNode: () => new GraphSetRadioButtonIcon( graphType, labelAlignGroup ),
      value: graphSet,
      tandemName: `${graphType}${RectangularRadioButton.TANDEM_NAME_SUFFIX}`
    };
  }
}

export class GraphSetRadioButtonIcon extends LabelColorIcon {

  /**
   * @param graphType
   * @param labelAlignGroup - to give labels the same effective size
   */
  public constructor( graphType: GraphType, labelAlignGroup: AlignGroup ) {
    super( new GraphTypeLabelNode( graphType ), labelAlignGroup, getGraphTypeStrokeProperty( graphType ) );
  }
}

calculusGrapher.register( 'GraphSetRadioButtonGroup', GraphSetRadioButtonGroup );
