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

    // _.uniq is needed to prevent duplicate dependencies because FluentPatterns share dependent Properties.
    const dependencies = _.uniq( [

      // Description choices.
      ...CalculusGrapherFluent.a11y.graphArea.derivative.accessibleList.discontinuousAndNotDifferentiable.getDependentProperties(),
      CalculusGrapherFluent.a11y.graphArea.derivative.accessibleList.continuousAndDifferentiableStringProperty,
      CalculusGrapherFluent.a11y.graphArea.derivative.accessibleList.hiddenStringProperty,

      // Values used in the above descriptions.
      derivativeCurve.numberOfDiscontinuitiesProperty,
      derivativeCurve.numberOfCuspsProperty,
      derivativeCurveVisibleProperty
    ] );

    const stringProperty = DerivedStringProperty.deriveAny( dependencies,
      () => {
        let string: string;
        if ( derivativeCurveVisibleProperty.value ) {
          const numberOfDiscontinuities = derivativeCurve.numberOfDiscontinuitiesProperty.value;
          if ( numberOfDiscontinuities === 0 ) {
            string = CalculusGrapherFluent.a11y.graphArea.derivative.accessibleList.continuousAndDifferentiableStringProperty.value;
          }
          else {
            string = CalculusGrapherFluent.a11y.graphArea.derivative.accessibleList.discontinuousAndNotDifferentiable.format( {
              numberOfDiscontinuities: numberOfDiscontinuities
            } );
          }
        }
        else {
          // Hidden
          string = CalculusGrapherFluent.a11y.graphArea.derivative.accessibleList.hiddenStringProperty.value;
        }
        return string;
      } );

    return {
      stringProperty: stringProperty
    };
  }
}

calculusGrapher.register( 'DerivativeGraphAccessibleListNode', DerivativeGraphAccessibleListNode );