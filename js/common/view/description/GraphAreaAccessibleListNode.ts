// Copyright 2026, University of Colorado Boulder

/**
 * GraphAreaAccessibleListNode is the base class for accessible lists that describe Graph Areas.
 * It handles the parts of the accessible list that are common to all Graph Areas.
 *
 * Note most of the code and PhET-iO API use the term "Graph", while core description uses "Graph Area".
 * Since this code is specific to core description, we use that terminology herein.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { TReadOnlyProperty } from '../../../../../axon/js/TReadOnlyProperty.js';
import AccessibleList, { AccessibleListItem } from '../../../../../scenery-phet/js/accessibility/AccessibleList.js';
import Node from '../../../../../scenery/js/nodes/Node.js';
import calculusGrapher from '../../../calculusGrapher.js';
import CalculusGrapherFluent from '../../../CalculusGrapherFluent.js';
import CalculusGrapherPreferences from '../../model/CalculusGrapherPreferences.js';

export default class GraphAreaAccessibleListNode extends Node {

  protected constructor( listItems: AccessibleListItem[] ) {

    super( {
      accessibleTemplate: AccessibleList.createTemplate( {
        listItems: listItems,
        leadingParagraphStringProperty: CalculusGrapherFluent.a11y.graphAreas.defaults.accessibleList.leadingParagraphStringProperty
      } )
    } );
  }

  /**
   * Gets the list item that describes the coordinate grid.
   */
  protected static getCoordinateGridListItem( gridLinesVisibleProperty: TReadOnlyProperty<boolean> ): AccessibleListItem {
    return {
      stringProperty: CalculusGrapherFluent.a11y.graphAreas.defaults.accessibleList.coordinateGridShownStringProperty,
      visibleProperty: gridLinesVisibleProperty
    };
  }

  /**
   * Gets the list item that describes the values on the axes.
   */
  protected static getValuesListItem(): AccessibleListItem {
    return {
      stringProperty: CalculusGrapherFluent.a11y.graphAreas.defaults.accessibleList.valuesLabeledOnAxesStringProperty,
      visibleProperty: CalculusGrapherPreferences.valuesVisibleProperty
    };
  }
}

calculusGrapher.register( 'GraphAreaAccessibleListNode', GraphAreaAccessibleListNode );