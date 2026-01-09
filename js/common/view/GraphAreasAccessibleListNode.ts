// Copyright 2025, University of Colorado Boulder

/**
 * GraphAreasAccessibleListNode is the description of what currently appears under the 'Graph Areas' heading.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import AccessibleListNode, { AccessibleListItem } from '../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import GraphSet from '../model/GraphSet.js';
import GraphType from '../model/GraphType.js';

export class GraphAreasAccessibleListNode extends AccessibleListNode {

  public constructor( graphSetProperty: TReadOnlyProperty<GraphSet> ) {

    const listItems: AccessibleListItem[] = [
      {
        stringProperty: CalculusGrapherFluent.a11y.integralGraph.accessibleHeadingStringProperty,
        visibleProperty: new DerivedProperty( [ graphSetProperty ], graphSet => graphSet.includes( GraphType.INTEGRAL ) )
      },
      {
        stringProperty: CalculusGrapherFluent.a11y.originalGraph.accessibleHeadingStringProperty,
        visibleProperty: new DerivedProperty( [ graphSetProperty ], graphSet => graphSet.includes( GraphType.ORIGINAL ) )
      },
      {
        stringProperty: CalculusGrapherFluent.a11y.derivativeGraph.accessibleHeadingStringProperty,
        visibleProperty: new DerivedProperty( [ graphSetProperty ], graphSet => graphSet.includes( GraphType.DERIVATIVE ) )
      },
      {
        stringProperty: CalculusGrapherFluent.a11y.secondDerivativeGraph.accessibleHeadingStringProperty,
        visibleProperty: new DerivedProperty( [ graphSetProperty ], graphSet => graphSet.includes( GraphType.SECOND_DERIVATIVE ) )
      }
    ];

    super( listItems, {
      leadingParagraphStringProperty: CalculusGrapherFluent.a11y.graphAreas.accessibleListLeadingParagraphStringProperty
    } );
  }
}

calculusGrapher.register( 'GraphAreasAccessibleListNode', GraphAreasAccessibleListNode );