// Copyright 2026, University of Colorado Boulder

/**
 * SecondDerivativeGraphAccessibleListNode is the accessible list that describes the second derivative graph.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { TReadOnlyProperty } from '../../../../../axon/js/TReadOnlyProperty.js';
import { AccessibleListItem } from '../../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import calculusGrapher from '../../../calculusGrapher.js';
import SecondDerivativeCurve from '../../model/SecondDerivativeCurve.js';
import GraphAccessibleListNode from './GraphAccessibleListNode.js';

export default class SecondDerivativeGraphAccessibleListNode extends GraphAccessibleListNode {

  public constructor( secondDerivativeCurve: SecondDerivativeCurve,
                      gridVisibleProperty: TReadOnlyProperty<boolean> ) {

    const listItems: AccessibleListItem[] = [
      GraphAccessibleListNode.getGridLinesShownHidden( gridVisibleProperty ),
      GraphAccessibleListNode.getValuesLabeledOnAxesItem()
    ];

    super( listItems );
  }
}

calculusGrapher.register( 'SecondDerivativeGraphAccessibleListNode', SecondDerivativeGraphAccessibleListNode );