// Copyright 2022-2023, University of Colorado Boulder

/**
 * GraphSetRadioButtonGroup is a group of buttons for controlling the visibility of a set of graph nodes
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import RectangularRadioButtonGroup, { RectangularRadioButtonGroupItem } from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import calculusGrapher from '../../calculusGrapher.js';
import Property from '../../../../axon/js/Property.js';
import GraphType from '../model/GraphType.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import RectangularRadioButton from '../../../../sun/js/buttons/RectangularRadioButton.js';
import { AlignGroup } from '../../../../scenery/js/imports.js';
import GraphTypeLabelNode from './GraphTypeLabelNode.js';
import { LabelColorIcon } from './LabelColorIcon.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import GraphSet from '../model/GraphSet.js';

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
        yMargin: 10,
        phetioVisiblePropertyInstrumented: false
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
