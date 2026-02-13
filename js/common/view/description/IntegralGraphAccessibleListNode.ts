// Copyright 2026, University of Colorado Boulder

/**
 * IntegralGraphAccessibleListNode is the accessible list that describes the integral graph.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedStringProperty from '../../../../../axon/js/DerivedStringProperty.js';
import { TReadOnlyProperty } from '../../../../../axon/js/TReadOnlyProperty.js';
import { AccessibleListItem } from '../../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import calculusGrapher from '../../../calculusGrapher.js';
import CalculusGrapherFluent from '../../../CalculusGrapherFluent.js';
import CalculusGrapherSymbols from '../../CalculusGrapherSymbols.js';
import GraphAccessibleListNode from './GraphAccessibleListNode.js';

const ACCESSIBLE_LIST_STRINGS = CalculusGrapherFluent.a11y.graphArea.integral.accessibleListNode;

export default class IntegralGraphAccessibleListNode extends GraphAccessibleListNode {

  public constructor( integralCurveVisibleProperty: TReadOnlyProperty<boolean>,
                      gridVisibleProperty: TReadOnlyProperty<boolean> ) {

    const listItems: AccessibleListItem[] = [
      IntegralGraphAccessibleListNode.getIntegralCurveListItem( integralCurveVisibleProperty ),
      GraphAccessibleListNode.getCoordinateGridListItem( gridVisibleProperty ),
      GraphAccessibleListNode.getValuesListItem()
    ];

    super( listItems );
  }

  /**
   * Gets the list item that describes the integral curve.
   */
  private static getIntegralCurveListItem( integralCurveVisibleProperty: TReadOnlyProperty<boolean> ): AccessibleListItem {

    // _.uniq is needed to prevent duplicate dependencies because FluentPatterns share dependent Properties.
    const dependencies = _.uniq( [

      // Possible description strings.
      ...ACCESSIBLE_LIST_STRINGS.continuous.getDependentProperties(),
      ACCESSIBLE_LIST_STRINGS.hiddenStringProperty,

      // Values to fill in the above descriptions.
      CalculusGrapherSymbols.accessibleVariableSymbolProperty,
      integralCurveVisibleProperty
    ] );

    const stringProperty = DerivedStringProperty.deriveAny( dependencies,
      () => {
        let string: string;
        if ( integralCurveVisibleProperty.value ) {
          string = ACCESSIBLE_LIST_STRINGS.continuous.format( {
            variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty.value
          } );
        }
        else {
          // Hidden
          string = ACCESSIBLE_LIST_STRINGS.hiddenStringProperty.value;
        }
        return string;
      } );

    return {
      stringProperty: stringProperty
    };
  }

}

calculusGrapher.register( 'IntegralGraphAccessibleListNode', IntegralGraphAccessibleListNode );