// Copyright 2026, University of Colorado Boulder

/**
 * IntegralGraphAccessibleListNode is the accessible list that describes the integral graph.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { TReadOnlyProperty } from '../../../../../axon/js/TReadOnlyProperty.js';
import { AccessibleListItem } from '../../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import calculusGrapher from '../../../calculusGrapher.js';
import IntegralCurve from '../../model/IntegralCurve.js';
import GraphAccessibleListNode from './GraphAccessibleListNode.js';

export default class IntegralGraphAccessibleListNode extends GraphAccessibleListNode {

  public constructor( integralCurve: IntegralCurve,
                      integralCurveVisibleProperty: TReadOnlyProperty<boolean>,
                      gridVisibleProperty: TReadOnlyProperty<boolean> ) {

    const listItems: AccessibleListItem[] = [
      GraphAccessibleListNode.getGridLinesListItem( gridVisibleProperty ),
      GraphAccessibleListNode.getValuesListItem()
    ];

    super( listItems );
  }
}

calculusGrapher.register( 'IntegralGraphAccessibleListNode', IntegralGraphAccessibleListNode );