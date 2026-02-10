// Copyright 2026, University of Colorado Boulder

/**
 * GraphAccessibleListNode is the accessible list that describes the integral graph.
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
      leadingParagraphStringProperty: CalculusGrapherFluent.a11y.accessibleParagraphs.rightNowStringProperty
    } );
  }

  protected static getGridLinesShownHidden( gridLinesVisibleProperty: TReadOnlyProperty<boolean> ): AccessibleListItem {
    return {
      stringProperty: new DerivedStringProperty( [
          gridLinesVisibleProperty,
          CalculusGrapherFluent.a11y.accessibleParagraphs.gridLinesShownStringProperty,
          CalculusGrapherFluent.a11y.accessibleParagraphs.gridLinesHiddenStringProperty
        ],
        ( gridLinesVisible, gridLinesShownString, gridLinesHiddenString ) => gridLinesVisible ? gridLinesShownString : gridLinesHiddenString )
    };
  }

  protected static getValuesLabeledOnAxesItem(): AccessibleListItem {
    return {
      stringProperty: CalculusGrapherFluent.a11y.accessibleParagraphs.valuesLabeledOnAxesStringProperty,
      visibleProperty: CalculusGrapherPreferences.valuesVisibleProperty
    };
  }
}

calculusGrapher.register( 'GraphAccessibleListNode', GraphAccessibleListNode );