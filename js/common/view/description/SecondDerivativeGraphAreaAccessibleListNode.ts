// Copyright 2026, University of Colorado Boulder

/**
 * SecondDerivativeGraphAreaAccessibleListNode is the accessible list that describes the Second Derivative Graph Area.
 *
 * Note most of the code and PhET-iO API use the term "Second Derivative Graph", while core description uses
 * "Second Derivative Graph Area". Since this code is specific to core description, we use that terminology herein.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedStringProperty from '../../../../../axon/js/DerivedStringProperty.js';
import { TReadOnlyProperty } from '../../../../../axon/js/TReadOnlyProperty.js';
import { AccessibleListItem } from '../../../../../scenery-phet/js/accessibility/AccessibleList.js';
import calculusGrapher from '../../../calculusGrapher.js';
import CalculusGrapherFluent from '../../../CalculusGrapherFluent.js';
import SecondDerivativeCurve from '../../model/SecondDerivativeCurve.js';
import GraphAreaAccessibleListNode from './GraphAreaAccessibleListNode.js';

export default class SecondDerivativeGraphAreaAccessibleListNode extends GraphAreaAccessibleListNode {

  public constructor( secondDerivativeCurve: SecondDerivativeCurve,
                      secondDerivativeCurveVisibleProperty: TReadOnlyProperty<boolean>,
                      gridVisibleProperty: TReadOnlyProperty<boolean> ) {

    const listItems: AccessibleListItem[] = [
      SecondDerivativeGraphAreaAccessibleListNode.getSecondDerivativeCurveListItem( secondDerivativeCurve, secondDerivativeCurveVisibleProperty ),
      GraphAreaAccessibleListNode.getCoordinateGridListItem( gridVisibleProperty ),
      GraphAreaAccessibleListNode.getValuesListItem()
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

calculusGrapher.register( 'SecondDerivativeGraphAreaAccessibleListNode', SecondDerivativeGraphAreaAccessibleListNode );