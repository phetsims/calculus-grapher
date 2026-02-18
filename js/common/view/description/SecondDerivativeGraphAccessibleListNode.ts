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

    const stringProperty = new DerivedStringProperty( [

        // Description choices.
        CalculusGrapherFluent.a11y.graphAreas.secondDerivative.accessibleList.continuousStringProperty,
        CalculusGrapherFluent.a11y.graphAreas.secondDerivative.accessibleList.discontinuousStringProperty,
        CalculusGrapherFluent.a11y.graphAreas.secondDerivative.accessibleList.hiddenStringProperty,

        // Values used to select one of the above descriptions.
        secondDerivativeCurve.numberOfDiscontinuousPointsProperty,
        secondDerivativeCurveVisibleProperty
      ],
      (
        continuousString,
        discontinuousString,
        hiddenString,
        numberOfDiscontinuousPoints,
        secondDerivativeCurveVisible
      ) => {
        let string: string;
        if ( secondDerivativeCurveVisible ) {
          if ( numberOfDiscontinuousPoints === 0 ) {
            // Continuous and differentiable.
            string = continuousString;
          }
          else {
            // Not differentiable at one or more discontinuities.
            string = discontinuousString;
          }
        }
        else {
          // Hidden
          string = hiddenString;
        }
        return string;
      } );

    return {
      stringProperty: stringProperty
    };
  }

}

calculusGrapher.register( 'SecondDerivativeGraphAccessibleListNode', SecondDerivativeGraphAccessibleListNode );