// Copyright 2026, University of Colorado Boulder

/**
 * SecondDerivativeGraphAccessibleListNode is the accessible list that describes the second derivative graph.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedStringProperty from '../../../../../axon/js/DerivedStringProperty.js';
import { TReadOnlyProperty } from '../../../../../axon/js/TReadOnlyProperty.js';
import { AccessibleListItem } from '../../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import calculusGrapher from '../../../calculusGrapher.js';
import CalculusGrapherFluent from '../../../CalculusGrapherFluent.js';
import SecondDerivativeCurve from '../../model/SecondDerivativeCurve.js';
import GraphAccessibleListNode from './GraphAccessibleListNode.js';

const ACCESSIBLE_LIST_STRINGS = CalculusGrapherFluent.a11y.graphArea.secondDerivative.accessibleListNode;

export default class SecondDerivativeGraphAccessibleListNode extends GraphAccessibleListNode {

  public constructor( secondDerivativeCurve: SecondDerivativeCurve,
                      secondDerivativeCurveVisibleProperty: TReadOnlyProperty<boolean>,
                      gridVisibleProperty: TReadOnlyProperty<boolean> ) {

    const listItems: AccessibleListItem[] = [
      SecondDerivativeGraphAccessibleListNode.getSecondDerivativeCurveListItem( secondDerivativeCurve, secondDerivativeCurveVisibleProperty ),
      GraphAccessibleListNode.getCoordinateGridListItem( gridVisibleProperty ),
      GraphAccessibleListNode.getValuesListItem()
    ];

    super( listItems );
  }

  /**
   * Gets the list item that describes the second derivative curve.
   */
  private static getSecondDerivativeCurveListItem(
    secondDerivativeCurve: SecondDerivativeCurve,
    secondDerivativeCurveVisibleProperty: TReadOnlyProperty<boolean> ): AccessibleListItem {

    // _.uniq is needed to prevent duplicate dependencies because FluentPatterns share dependent Properties.
    const dependencies = _.uniq( [

      // Possible description strings.
      ...ACCESSIBLE_LIST_STRINGS.discontinuousAndNotDifferentiable.getDependentProperties(),
      ACCESSIBLE_LIST_STRINGS.continuousAndDifferentiableStringProperty,
      ACCESSIBLE_LIST_STRINGS.hiddenStringProperty,

      // Values to fill in the above descriptions.
      secondDerivativeCurve.numberOfDiscontinuitiesProperty,
      secondDerivativeCurve.numberOfCuspsProperty,
      secondDerivativeCurveVisibleProperty
    ] );

    const stringProperty = DerivedStringProperty.deriveAny( dependencies,
      () => {
        let string: string;
        if ( secondDerivativeCurveVisibleProperty.value ) {
          const numberOfDiscontinuities = secondDerivativeCurve.numberOfDiscontinuitiesProperty.value;
          if ( numberOfDiscontinuities === 0 ) {
            string = ACCESSIBLE_LIST_STRINGS.continuousAndDifferentiableStringProperty.value;
          }
          else {
            string = ACCESSIBLE_LIST_STRINGS.discontinuousAndNotDifferentiable.format( {
              numberOfDiscontinuities: numberOfDiscontinuities
            } );
          }
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

calculusGrapher.register( 'SecondDerivativeGraphAccessibleListNode', SecondDerivativeGraphAccessibleListNode );