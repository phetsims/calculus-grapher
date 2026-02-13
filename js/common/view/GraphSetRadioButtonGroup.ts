// Copyright 2022-2026, University of Colorado Boulder

/**
 * GraphSetRadioButtonGroup is a group of buttons for controlling the visibility of a set of graph nodes
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import AlignGroup from '../../../../scenery/js/layout/constraints/AlignGroup.js';
import RectangularRadioButtonGroup, { RectangularRadioButtonGroupItem } from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import GraphSet from '../model/GraphSet.js';
import GraphType from '../model/GraphType.js';
import GraphTypeLabelNode from './GraphTypeLabelNode.js';
import { LabelColorIcon } from './LabelColorIcon.js';

const ACCESSIBLE_STRINGS = CalculusGrapherFluent.a11y.graphSetRadioButtonGroup;

export type GraphSetRadioButtonGroupItem = RectangularRadioButtonGroupItem<GraphSet>;

export default class GraphSetRadioButtonGroup extends RectangularRadioButtonGroup<GraphSet> {

  public constructor( graphSetProperty: Property<GraphSet>,
                      graphSetRadioButtonGroupItems: GraphSetRadioButtonGroupItem[],
                      tandem: Tandem ) {

    super( graphSetProperty, graphSetRadioButtonGroupItems, {
      isDisposable: false,
      spacing: 5,
      radioButtonOptions: {
        baseColor: CalculusGrapherColors.panelFillProperty,
        xMargin: 10,
        yMargin: 10,
        phetioVisiblePropertyInstrumented: false
      },
      accessibleName: ACCESSIBLE_STRINGS.accessibleNameStringProperty,
      accessibleHelpText: ACCESSIBLE_STRINGS.accessibleHelpTextStringProperty,
      tandem: tandem
    } );
  }

  /**
   * Creates an item for this radio button group.
   */
  public static createItem( graphSet: GraphSet,
                            graphType: GraphType,
                            labelAlignGroup: AlignGroup,
                            accessibleNameProperty: TReadOnlyProperty<string>,
                            accessibleHelpTextProperty: TReadOnlyProperty<string> ): GraphSetRadioButtonGroupItem {
    affirm( graphSet.includes( graphType ), 'graphSet should include graphType' );
    return {
      createNode: () => new LabelColorIcon( new GraphTypeLabelNode( graphType ), labelAlignGroup, graphType.strokeProperty ),
      value: graphSet,
      tandemName: `${graphType.tandemNamePrefix}RadioButton`,
      options: {
        accessibleName: accessibleNameProperty,
        accessibleHelpText: accessibleHelpTextProperty
      }
    };
  }
}

calculusGrapher.register( 'GraphSetRadioButtonGroup', GraphSetRadioButtonGroup );