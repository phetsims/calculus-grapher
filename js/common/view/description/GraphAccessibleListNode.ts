// Copyright 2026, University of Colorado Boulder

/**
 * GraphAccessibleListNode is the base class for accessible lists that describe graphs.
 * It handles the parts of the accessible list that are common to all graphs.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedStringProperty from '../../../../../axon/js/DerivedStringProperty.js';
import { TReadOnlyProperty } from '../../../../../axon/js/TReadOnlyProperty.js';
import AccessibleListNode, { AccessibleListItem } from '../../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import calculusGrapher from '../../../calculusGrapher.js';
import CalculusGrapherFluent from '../../../CalculusGrapherFluent.js';
import CalculusGrapherPreferences from '../../model/CalculusGrapherPreferences.js';

export default class GraphAccessibleListNode extends AccessibleListNode {

  protected constructor( listItems: AccessibleListItem[] ) {

    super( listItems, {
      leadingParagraphStringProperty: CalculusGrapherFluent.a11y.allGraphAreas.accessibleParagraph.rightNowStringProperty
    } );
  }

  /**
   * Gets the list item that describes the coordinate grid.
   */
  protected static getCoordinateGridListItem( gridLinesVisibleProperty: TReadOnlyProperty<boolean> ): AccessibleListItem {
    return {
      stringProperty: new DerivedStringProperty( [
          gridLinesVisibleProperty,
          CalculusGrapherFluent.a11y.allGraphAreas.accessibleParagraph.coordinateGridShownStringProperty,
          CalculusGrapherFluent.a11y.allGraphAreas.accessibleParagraph.coordinateGridHiddenStringProperty
        ],
        ( gridLinesVisible, gridLinesShownString, gridLinesHiddenString ) => gridLinesVisible ? gridLinesShownString : gridLinesHiddenString )
    };
  }

  /**
   * Gets the list item that describes the values on the axes.
   */
  protected static getValuesListItem(): AccessibleListItem {
    return {
      stringProperty: CalculusGrapherFluent.a11y.allGraphAreas.accessibleParagraph.valuesLabeledOnAxesStringProperty,
      visibleProperty: CalculusGrapherPreferences.valuesVisibleProperty
    };
  }
}

calculusGrapher.register( 'GraphAccessibleListNode', GraphAccessibleListNode );