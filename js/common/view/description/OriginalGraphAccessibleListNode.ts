// Copyright 2026, University of Colorado Boulder

/**
 * OriginalGraphAccessibleListNode is the accessible list that describes the original graph,
 * which is (confusingly) known as the "primary graph" for core description.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { TReadOnlyProperty } from '../../../../../axon/js/TReadOnlyProperty.js';
import { AccessibleListItem } from '../../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import calculusGrapher from '../../../calculusGrapher.js';
import TransformedCurve from '../../model/TransformedCurve.js';
import GraphAccessibleListNode from './GraphAccessibleListNode.js';

export default class OriginalGraphAccessibleListNode extends GraphAccessibleListNode {

  public constructor( originalCurve: TransformedCurve,
                      predictCurve: TransformedCurve,
                      gridVisibleProperty: TReadOnlyProperty<boolean> ) {

    const listItems: AccessibleListItem[] = [
      GraphAccessibleListNode.getGridLinesShownHidden( gridVisibleProperty ),
      GraphAccessibleListNode.getValuesLabeledOnAxesItem()
    ];

    super( listItems );
  }
}

calculusGrapher.register( 'OriginalGraphAccessibleListNode', OriginalGraphAccessibleListNode );