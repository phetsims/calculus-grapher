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

  // Grid lines show.
  // Grid lines hidden.
  protected static getGridLinesShownHidden( gridLinesVisibleProperty: TReadOnlyProperty<boolean> ): AccessibleListItem {
    return {
      stringProperty: new DerivedStringProperty( [
          gridLinesVisibleProperty,
          CalculusGrapherFluent.a11y.allGraphAreas.accessibleParagraph.gridLinesShownStringProperty,
          CalculusGrapherFluent.a11y.allGraphAreas.accessibleParagraph.gridLinesHiddenStringProperty
        ],
        ( gridLinesVisible, gridLinesShownString, gridLinesHiddenString ) => gridLinesVisible ? gridLinesShownString : gridLinesHiddenString )
    };
  }

  // Values labeled on axes.
  protected static getValuesLabeledOnAxesItem(): AccessibleListItem {
    return {
      stringProperty: CalculusGrapherFluent.a11y.allGraphAreas.accessibleParagraph.valuesLabeledOnAxesStringProperty,
      visibleProperty: CalculusGrapherPreferences.valuesVisibleProperty
    };
  }
}

calculusGrapher.register( 'GraphAccessibleListNode', GraphAccessibleListNode );