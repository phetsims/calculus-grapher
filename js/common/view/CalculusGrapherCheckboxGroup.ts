// Copyright 2022-2023, University of Colorado Boulder

/**
 * CalculusGrapherCheckboxGroup is a group of checkboxes for controlling visibility of the grid lines and the reference line
 *
 * @author Martin Veillette
 */

import VerticalCheckboxGroup, { VerticalCheckboxGroupItem, VerticalCheckboxGroupOptions } from '../../../../sun/js/VerticalCheckboxGroup.js';
import calculusGrapher from '../../calculusGrapher.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
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
      createItem( new GridIcon(), visibleProperties.gridVisibleProperty, 'gridCheckbox' ),

      // Item for reference line checkbox
      createItem( ReferenceLineNode.getIcon(), visibleProperties.referenceLineVisibleProperty, 'referenceLineCheckbox' )
    ];

    super( items, options );
  }
}

function createItem( labelNode: Node, property: Property<boolean>, tandemName: string ): VerticalCheckboxGroupItem {
  return {
    createNode: () => labelNode,
    property: property,
    tandemName: tandemName
  };
}

calculusGrapher.register( 'CalculusGrapherCheckboxGroup', CalculusGrapherCheckboxGroup );
