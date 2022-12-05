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
import { getGraphTypeStroke, GraphSet, GraphType } from '../model/GraphType.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import RectangularRadioButton from '../../../../sun/js/buttons/RectangularRadioButton.js';
import { AlignBox, AlignGroup, Line, VBox } from '../../../../scenery/js/imports.js';

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
      createNode: tandem => new GraphSetRadioButtonIcon( graphType, labelAlignGroup ),
      value: graphSet,
      tandemName: `${graphType}${RectangularRadioButton.TANDEM_NAME_SUFFIX}`
    };
  }
}

class GraphSetRadioButtonIcon extends VBox {

  public constructor( graphType: GraphType, labelAlignGroup: AlignGroup ) {

    const labelNode = new AlignBox( new CurveLabelNode( graphType ), {
      group: labelAlignGroup
    } );

    // Horizontal line showing the color that is used to stroke graphType.
    const colorLine = new Line( 0, 0, 40, 0, {
      stroke: getGraphTypeStroke( graphType ),
      lineWidth: 3
    } );

    super( {
      children: [ labelNode, colorLine ],
      spacing: 7,
      align: 'center'
    } );
  }
}

calculusGrapher.register( 'GraphSetRadioButtonGroup', GraphSetRadioButtonGroup );
