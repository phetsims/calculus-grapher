// Copyright 2026, University of Colorado Boulder

/**
 * DerivativeGraphAccessibleListNode is the accessible list that describes the derivative graph.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { TReadOnlyProperty } from '../../../../../axon/js/TReadOnlyProperty.js';
import { AccessibleListItem } from '../../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import calculusGrapher from '../../../calculusGrapher.js';
import DerivativeCurve from '../../model/DerivativeCurve.js';
import GraphAccessibleListNode from './GraphAccessibleListNode.js';

export default class DerivativeGraphAccessibleListNode extends GraphAccessibleListNode {

  public constructor( derivativeCurve: DerivativeCurve, gridVisibleProperty: TReadOnlyProperty<boolean> ) {

    const listItems: AccessibleListItem[] = [
      GraphAccessibleListNode.getGridLinesListItem( gridVisibleProperty ),
      GraphAccessibleListNode.getValuesListItem()
    ];

    super( listItems );
  }
}

calculusGrapher.register( 'DerivativeGraphAccessibleListNode', DerivativeGraphAccessibleListNode );