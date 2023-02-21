// Copyright 2022-2023, University of Colorado Boulder

/**
 * CalculusGrapherCheckboxGroup is a group of checkboxes for controlling visibility of the grid lines and the reference line
 *
 * @author Martin Veillette
 */

import VerticalCheckboxGroup, { VerticalCheckboxGroupItem } from '../../../../sun/js/VerticalCheckboxGroup.js';
import calculusGrapher from '../../calculusGrapher.js';
import Property from '../../../../axon/js/Property.js';
import { Node } from '../../../../scenery/js/imports.js';
import GridIcon from '../../../../scenery-phet/js/GridIcon.js';
import ReferenceLineNode from './ReferenceLineNode.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import Tandem from '../../../../tandem/js/Tandem.js';

export default class CalculusGrapherCheckboxGroup extends VerticalCheckboxGroup {

  public constructor( gridVisibleProperty: Property<boolean>, referenceLineVisibleProperty: Property<boolean>, tandem: Tandem ) {

    const items: VerticalCheckboxGroupItem[] = [

      // Item for grid checkbox
      createItem( new GridIcon(), gridVisibleProperty, 'gridCheckbox' ),

      // Item for reference line checkbox
      createItem( ReferenceLineNode.createIcon(), referenceLineVisibleProperty, 'referenceLineCheckbox' )
    ];

    super( items, {
      checkboxOptions: {
        boxWidth: CalculusGrapherConstants.CHECKBOX_WIDTH
      },
      layoutOptions: {
        xMargin: CalculusGrapherConstants.PANEL_X_MARGIN
      },
      tandem: tandem
    } );
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
