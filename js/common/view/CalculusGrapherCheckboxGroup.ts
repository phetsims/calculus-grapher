// Copyright 2022-2023, University of Colorado Boulder

/**
 * CalculusGrapherCheckboxGroup is a group of checkboxes for controlling visibility of the grid lines and the reference line
 *
 * @author Martin Veillette
 */

import VerticalCheckboxGroup, { VerticalCheckboxGroupItem, VerticalCheckboxGroupOptions } from '../../../../sun/js/VerticalCheckboxGroup.js';
import calculusGrapher from '../../calculusGrapher.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import Property from '../../../../axon/js/Property.js';
import CalculusGrapherVisibleProperties from './CalculusGrapherVisibleProperties.js';
import { Node } from '../../../../scenery/js/imports.js';
import GridIcon from '../../../../scenery-phet/js/GridIcon.js';
import ReferenceLineNode from './ReferenceLineNode.js';

type SelfOptions = EmptySelfOptions;

type CalculusGrapherCheckboxGroupOptions = SelfOptions & VerticalCheckboxGroupOptions;

export default class CalculusGrapherCheckboxGroup extends VerticalCheckboxGroup {

  public constructor( visibleProperties: CalculusGrapherVisibleProperties,
                      providedOptions: CalculusGrapherCheckboxGroupOptions ) {

    const options = providedOptions;

    const items: VerticalCheckboxGroupItem[] = [

      // Item for grid checkbox
      createItem( new GridIcon(), visibleProperties.gridVisibleProperty, {
        tandemName: 'gridCheckbox'
      } ),

      // Item for reference line checkbox
      createItem( ReferenceLineNode.getIcon(), visibleProperties.referenceLineVisibleProperty, {
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
    createNode: () => labelNode,
    property: property,
    options: providedOptions.options,
    tandemName: providedOptions.tandemName
  };
}

calculusGrapher.register( 'CalculusGrapherCheckboxGroup', CalculusGrapherCheckboxGroup );
