// Copyright 2022, University of Colorado Boulder

/**
 * ToolsCheckboxGroup is a group of checkboxes for controlling visibility of the grid lines and the reference line
 *
 * @author Martin Veillette
 */

import VerticalCheckboxGroup, { VerticalCheckboxGroupItem, VerticalCheckboxGroupOptions } from '../../../../sun/js/VerticalCheckboxGroup.js';
import calculusGrapher from '../../calculusGrapher.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import Property from '../../../../axon/js/Property.js';
import CalculusGrapherVisibleProperties from './CalculusGrapherVisibleProperties.js';
import { Node } from '../../../../scenery/js/imports.js';
import GridIcon from '../../../../scenery-phet/js/GridIcon.js';
import VerticalLineNode from './VerticalLineNode.js';

type SelfOptions = EmptySelfOptions;

export type ToolsCheckboxGroupOptions = SelfOptions & VerticalCheckboxGroupOptions;

export default class ToolsCheckboxGroup extends VerticalCheckboxGroup {

  public constructor( visibleProperties: CalculusGrapherVisibleProperties,
                      providedOptions: ToolsCheckboxGroupOptions ) {

    const options = optionize<ToolsCheckboxGroupOptions, SelfOptions, VerticalCheckboxGroupOptions>()(
      {}, providedOptions );

    const items: VerticalCheckboxGroupItem[] = [

      // Item for grid checkbox
      createItem(
        new GridIcon(),
        visibleProperties.gridVisibleProperty, {
          tandemName: 'gridCheckbox'
        } ),

      // Item for reference line checkbox
      createItem(
        VerticalLineNode.getIcon(),
        visibleProperties.referenceLineVisibleProperty, {
          tandemName: 'referenceLineCheckbox'
        } )
    ];

    super( items, options );
  }
}

type ItemOptions = PickRequired<VerticalCheckboxGroupItem, 'tandemName'> & PickOptional<VerticalCheckboxGroupItem, 'options'>;

function createItem( labelNode: Node,
                     property: Property<boolean>,
                     providedOptions: ItemOptions ): VerticalCheckboxGroupItem {

  return {
    createNode: () => {
      return labelNode;
    },
    property: property,
    options: providedOptions.options,
    tandemName: providedOptions.tandemName
  };
}

calculusGrapher.register( 'ToolsCheckboxGroup', ToolsCheckboxGroup );
