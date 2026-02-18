// Copyright 2026, University of Colorado Boulder

/**
 * DerivativeGraphAccessibleListNode is the accessible list that describes the derivative graph.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedStringProperty from '../../../../../axon/js/DerivedStringProperty.js';
import { TReadOnlyProperty } from '../../../../../axon/js/TReadOnlyProperty.js';
import { AccessibleListItem } from '../../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import calculusGrapher from '../../../calculusGrapher.js';
import CalculusGrapherFluent from '../../../CalculusGrapherFluent.js';
import DerivativeCurve from '../../model/DerivativeCurve.js';
import GraphAccessibleListNode from './GraphAccessibleListNode.js';

export default class DerivativeGraphAccessibleListNode extends GraphAccessibleListNode {

  public constructor( derivativeCurve: DerivativeCurve,
                      derivativeCurveVisibleProperty: TReadOnlyProperty<boolean>,
                      gridVisibleProperty: TReadOnlyProperty<boolean> ) {

    const listItems: AccessibleListItem[] = [
      DerivativeGraphAccessibleListNode.getDerivativeCurveListItem( derivativeCurve, derivativeCurveVisibleProperty ),
      GraphAccessibleListNode.getCoordinateGridListItem( gridVisibleProperty ),
      GraphAccessibleListNode.getValuesListItem()
    ];

    super( listItems );
  }

  /**
   * Gets the list item that describes the derivative curve.
   */
  private static getDerivativeCurveListItem(
    derivativeCurve: DerivativeCurve,
    derivativeCurveVisibleProperty: TReadOnlyProperty<boolean> ): AccessibleListItem {

    const stringProperty = new DerivedStringProperty( [

        // Description choices.
        CalculusGrapherFluent.a11y.graphAreas.derivative.accessibleList.continuousStringProperty,
        CalculusGrapherFluent.a11y.graphAreas.derivative.accessibleList.discontinuousStringProperty,
        CalculusGrapherFluent.a11y.graphAreas.derivative.accessibleList.hiddenStringProperty,

        // Values used to select one of the above descriptions.
        derivativeCurve.numberOfDiscontinuousPointsProperty,
        derivativeCurveVisibleProperty
      ],
      (
        continuousString,
        discontinuousString,
        hiddenString,
        numberOfDiscontinuousPoints,
        derivativeCurveVisible
      ) => {
        let string: string;
        if ( derivativeCurveVisible ) {
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

calculusGrapher.register( 'DerivativeGraphAccessibleListNode', DerivativeGraphAccessibleListNode );